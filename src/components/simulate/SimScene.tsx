'use client';

import { useMemo, useState, useCallback, Suspense } from 'react';
import { useThree, ThreeEvent } from '@react-three/fiber';
import { useGLTF, OrbitControls, Grid, Center } from '@react-three/drei';
import * as THREE from 'three';
import { modelRegistry } from '@/lib/3d/ModelLibrary';
import {
  PlacedComponent, Wire, TerminalRef, SolveResult, SIM_SPECS, isSimulatable,
} from '@/lib/sim/types';

// Components are normalized so their largest dimension is 1 world unit
const COMPONENT_SIZE = 1;
// Terminal ports sit just outside the normalized footprint on the local X axis
export const PORT_OFFSET_X = 0.62;
const PORT_Y = 0.1;
const GRID_SNAP = 0.25;
const BOARD_LIMIT = 6;

export type SimMode = 'select' | 'wire' | 'run';

// World position of a component's terminal port (mirrors the port meshes below)
export function portWorldPosition(comp: PlacedComponent, terminal: string): [number, number, number] {
  const lx = terminal === 'a' ? PORT_OFFSET_X : -PORT_OFFSET_X;
  const cos = Math.cos(comp.rotationY);
  const sin = Math.sin(comp.rotationY);
  return [comp.position[0] + lx * cos, PORT_Y, comp.position[2] - lx * sin];
}

// ==================== TERMINAL PORT ====================

interface PortProps {
  terminal: 'a' | 'b';
  mode: SimMode;
  isPending: boolean;
  onTerminalClick: (terminal: 'a' | 'b') => void;
}

function Port({ terminal, mode, isPending, onTerminalClick }: PortProps) {
  const [hovered, setHovered] = useState(false);
  const color = isPending ? '#facc15' : terminal === 'a' ? '#ef4444' : '#475569';
  const active = mode === 'wire';

  return (
    <mesh
      position={[terminal === 'a' ? PORT_OFFSET_X : -PORT_OFFSET_X, PORT_Y, 0]}
      scale={hovered && active ? 1.5 : 1}
      onClick={(e) => {
        if (!active) return;
        e.stopPropagation();
        onTerminalClick(terminal);
      }}
      onPointerOver={(e) => {
        if (!active) return;
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'crosshair';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'default';
      }}
    >
      <sphereGeometry args={[0.07, 16, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={isPending ? '#facc15' : '#000000'}
        emissiveIntensity={isPending ? 0.8 : 0}
      />
    </mesh>
  );
}

// ==================== PLACED COMPONENT ====================

interface SceneComponentProps {
  comp: PlacedComponent;
  mode: SimMode;
  selected: boolean;
  pendingTerminal: TerminalRef | null;
  result: SolveResult['perComponent'][string] | undefined;
  onSelect: (id: string) => void;
  onMove: (id: string, position: [number, number, number]) => void;
  onDragChange: (dragging: boolean) => void;
  onTerminalClick: (ref: TerminalRef) => void;
  onRunClick: (id: string) => void;
}

function SceneComponent({
  comp, mode, selected, pendingTerminal, result,
  onSelect, onMove, onDragChange, onTerminalClick, onRunClick,
}: SceneComponentProps) {
  const model = modelRegistry[comp.modelId];
  const { scene } = useGLTF(model.url);
  const { camera, gl } = useThree();

  // Each placed instance needs its own scene graph (useGLTF caches per URL)
  const instance = useMemo(() => scene.clone(true), [scene]);

  const normalized = useMemo(() => {
    const box = new THREE.Box3().setFromObject(instance);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = maxDim > 0 ? COMPONENT_SIZE / maxDim : 1;
    return { scale, yOffset: -box.min.y * scale };
  }, [instance]);

  const handlePointerDown = useCallback((e: ThreeEvent<PointerEvent>) => {
    if (mode === 'wire') return; // ports handle wiring clicks
    e.stopPropagation();

    if (mode === 'run') {
      onRunClick(comp.id);
      return;
    }

    onSelect(comp.id);
    onDragChange(true);

    // Manual ground-plane drag: raycast from the camera on every move
    const raycaster = new THREE.Raycaster();
    const ndc = new THREE.Vector2();
    const rect = gl.domElement.getBoundingClientRect();

    const groundPoint = (clientX: number, clientY: number): [number, number] | null => {
      ndc.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      ndc.y = -((clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(ndc, camera);
      const t = -raycaster.ray.origin.y / raycaster.ray.direction.y;
      if (t <= 0 || !Number.isFinite(t)) return null;
      const p = raycaster.ray.origin.clone().addScaledVector(raycaster.ray.direction, t);
      return [p.x, p.z];
    };

    const start = groundPoint(e.clientX, e.clientY);
    const offset: [number, number] = start
      ? [comp.position[0] - start[0], comp.position[2] - start[1]]
      : [0, 0];

    const onPointerMove = (ev: PointerEvent) => {
      const p = groundPoint(ev.clientX, ev.clientY);
      if (!p) return;
      const snap = (v: number) => Math.round(v / GRID_SNAP) * GRID_SNAP;
      const x = THREE.MathUtils.clamp(snap(p[0] + offset[0]), -BOARD_LIMIT, BOARD_LIMIT);
      const z = THREE.MathUtils.clamp(snap(p[1] + offset[1]), -BOARD_LIMIT, BOARD_LIMIT);
      onMove(comp.id, [x, 0, z]);
    };

    const onPointerUp = () => {
      window.removeEventListener('pointermove', onPointerMove);
      onDragChange(false);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp, { once: true });
  }, [mode, comp.id, comp.position, camera, gl, onSelect, onMove, onDragChange, onRunClick]);

  const glowColor = SIM_SPECS[comp.modelId]?.kind === 'led'
    ? (SIM_SPECS[comp.modelId] as { color?: string }).color ?? '#ffcc66'
    : '#ffd27f';

  return (
    <group position={comp.position} rotation={[0, comp.rotationY, 0]}>
      <group onPointerDown={handlePointerDown}>
        <group position={[0, normalized.yOffset, 0]} scale={normalized.scale}>
          <Center disableY>
            <primitive object={instance} />
          </Center>
        </group>
      </group>

      {/* selection ring */}
      {selected && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, 0]}>
          <ringGeometry args={[0.55, 0.65, 40]} />
          <meshBasicMaterial color="#f59e0b" transparent opacity={0.9} />
        </mesh>
      )}

      {/* terminal ports for simulatable parts */}
      {isSimulatable(comp.modelId) && (
        <>
          <Port
            terminal="a"
            mode={mode}
            isPending={pendingTerminal?.componentId === comp.id && pendingTerminal.terminal === 'a'}
            onTerminalClick={(t) => onTerminalClick({ componentId: comp.id, terminal: t })}
          />
          <Port
            terminal="b"
            mode={mode}
            isPending={pendingTerminal?.componentId === comp.id && pendingTerminal.terminal === 'b'}
            onTerminalClick={(t) => onTerminalClick({ componentId: comp.id, terminal: t })}
          />
        </>
      )}

      {/* run-mode glow for lit parts */}
      {mode === 'run' && result?.on && result.brightness > 0 && (
        <>
          <pointLight position={[0, 0.5, 0]} color={glowColor} intensity={result.brightness * 3} distance={2.5} />
          <mesh position={[0, 0.45, 0]}>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshBasicMaterial color={glowColor} transparent opacity={0.35 + result.brightness * 0.5} />
          </mesh>
        </>
      )}
    </group>
  );
}

// ==================== WIRE ====================

interface SceneWireProps {
  wire: Wire;
  components: PlacedComponent[];
  selected: boolean;
  onSelect: (id: string) => void;
}

function SceneWire({ wire, components, selected, onSelect }: SceneWireProps) {
  const geometry = useMemo(() => {
    const fromComp = components.find((c) => c.id === wire.from.componentId);
    const toComp = components.find((c) => c.id === wire.to.componentId);
    if (!fromComp || !toComp) return null;

    const a = portWorldPosition(fromComp, wire.from.terminal);
    const b = portWorldPosition(toComp, wire.to.terminal);
    const mid = new THREE.Vector3((a[0] + b[0]) / 2, Math.max(a[1], b[1]) + 0.35, (a[2] + b[2]) / 2);
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(...a), mid, new THREE.Vector3(...b),
    );
    return new THREE.TubeGeometry(curve, 24, 0.025, 8, false);
  }, [wire, components]);

  if (!geometry) return null;

  return (
    <mesh
      geometry={geometry}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(wire.id);
      }}
      onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { document.body.style.cursor = 'default'; }}
    >
      <meshStandardMaterial color={selected ? '#f59e0b' : '#b45309'} roughness={0.4} />
    </mesh>
  );
}

// ==================== SCENE ROOT ====================

interface SimSceneProps {
  isDark: boolean;
  mode: SimMode;
  components: PlacedComponent[];
  wires: Wire[];
  selectedId: string | null;
  pendingTerminal: TerminalRef | null;
  results: SolveResult | null;
  onSelect: (id: string | null) => void;
  onMove: (id: string, position: [number, number, number]) => void;
  onTerminalClick: (ref: TerminalRef) => void;
  onRunClick: (id: string) => void;
}

export function SimScene({
  isDark, mode, components, wires, selectedId, pendingTerminal, results,
  onSelect, onMove, onTerminalClick, onRunClick,
}: SimSceneProps) {
  const [dragging, setDragging] = useState(false);

  return (
    <>
      <ambientLight intensity={2.5} />
      <directionalLight position={[6, 10, 6]} intensity={2.5} />
      <directionalLight position={[-6, 8, -4]} intensity={1.5} />

      <Grid
        cellSize={GRID_SNAP * 2}
        sectionSize={2}
        cellThickness={0.8}
        sectionThickness={1.4}
        infiniteGrid
        fadeDistance={40}
        fadeStrength={4}
        sectionColor={isDark ? '#3b5b82' : '#a0b8d0'}
        cellColor={isDark ? '#22344d' : '#dbe6f2'}
      />

      <OrbitControls
        makeDefault
        enabled={!dragging}
        target={[0, 0, 0]}
        maxPolarAngle={Math.PI / 2.05}
        minDistance={2}
        maxDistance={30}
      />

      {components.map((comp) => (
        <Suspense key={comp.id} fallback={null}>
          <SceneComponent
            comp={comp}
            mode={mode}
            selected={selectedId === comp.id}
            pendingTerminal={pendingTerminal}
            result={results?.perComponent[comp.id]}
            onSelect={onSelect}
            onMove={onMove}
            onDragChange={setDragging}
            onTerminalClick={onTerminalClick}
            onRunClick={onRunClick}
          />
        </Suspense>
      ))}

      {wires.map((wire) => (
        <SceneWire
          key={wire.id}
          wire={wire}
          components={components}
          selected={selectedId === wire.id}
          onSelect={onSelect}
        />
      ))}
    </>
  );
}
