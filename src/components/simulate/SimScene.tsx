'use client';

import { useMemo, useState, useCallback, useEffect, Suspense } from 'react';
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
// The workbench always starts with a breadboard; its long axis spans this many units
const BOARD_LENGTH = 7;
const BOARD_SNAP = 0.1;   // breadboard hole pitch feel
const GRID_SNAP = 0.25;   // off-board snapping
const BOARD_LIMIT = 8;

// Jumper-wire colors, cycled per wire like a real kit
const WIRE_COLORS = ['#dc2626', '#1f2937', '#2563eb', '#16a34a', '#eab308', '#ea580c'];

export type SimMode = 'select' | 'wire' | 'run';

export interface BoardInfo {
  topY: number;
  halfX: number;
  halfZ: number;
}

// World position of a component's terminal port (mirrors the port meshes below)
export function portWorldPosition(comp: PlacedComponent, terminal: string): [number, number, number] {
  const lx = terminal === 'a' ? PORT_OFFSET_X : -PORT_OFFSET_X;
  const cos = Math.cos(comp.rotationY);
  const sin = Math.sin(comp.rotationY);
  return [
    comp.position[0] + lx * cos,
    comp.position[1] + PORT_Y,
    comp.position[2] - lx * sin,
  ];
}

// ==================== BREADBOARD BASE ====================
// Every workspace starts from a breadboard, PCBX-style. It is fixed scenery:
// components are placed and snapped onto its top surface.

function BreadboardBase({ onMeasured, onBackgroundClick }: {
  onMeasured: (board: BoardInfo) => void;
  onBackgroundClick: () => void;
}) {
  const { scene } = useGLTF('/models/breadboard/Breadboard63R10C.glb');
  const instance = useMemo(() => scene.clone(true), [scene]);

  const layout = useMemo(() => {
    const box = new THREE.Box3().setFromObject(instance);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const horizontal = Math.max(size.x, size.z);
    const scale = horizontal > 0 ? BOARD_LENGTH / horizontal : 1;
    const rotY = size.z > size.x ? Math.PI / 2 : 0; // long axis along X
    return {
      scale,
      rotY,
      center,
      yOffset: -box.min.y * scale,
      topY: size.y * scale,
      halfX: (Math.max(size.x, size.z) * scale) / 2,
      halfZ: (Math.min(size.x, size.z) * scale) / 2,
    };
  }, [instance]);

  useEffect(() => {
    onMeasured({ topY: layout.topY, halfX: layout.halfX, halfZ: layout.halfZ });
  }, [layout, onMeasured]);

  return (
    <group rotation={[0, layout.rotY, 0]} position={[0, layout.yOffset, 0]} scale={layout.scale}>
      <group
        position={[-layout.center.x, 0, -layout.center.z]}
        onClick={onBackgroundClick}
      >
        <primitive object={instance} />
      </group>
    </group>
  );
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
  board: BoardInfo | null;
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
  comp, mode, board, selected, pendingTerminal, result,
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
      const rawX = p[0] + offset[0];
      const rawZ = p[1] + offset[1];
      const onBoard = !!board && Math.abs(rawX) <= board.halfX && Math.abs(rawZ) <= board.halfZ;
      const step = onBoard ? BOARD_SNAP : GRID_SNAP;
      const snap = (v: number) => Math.round(v / step) * step;
      const x = THREE.MathUtils.clamp(snap(rawX), -BOARD_LIMIT, BOARD_LIMIT);
      const z = THREE.MathUtils.clamp(snap(rawZ), -BOARD_LIMIT, BOARD_LIMIT);
      const y = onBoard ? board.topY : 0;
      onMove(comp.id, [x, y, z]);
    };

    const onPointerUp = () => {
      window.removeEventListener('pointermove', onPointerMove);
      onDragChange(false);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp, { once: true });
  }, [mode, board, comp.id, comp.position, camera, gl, onSelect, onMove, onDragChange, onRunClick]);

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
  colorIndex: number;
  components: PlacedComponent[];
  selected: boolean;
  onSelect: (id: string) => void;
}

function SceneWire({ wire, colorIndex, components, selected, onSelect }: SceneWireProps) {
  const geometry = useMemo(() => {
    const fromComp = components.find((c) => c.id === wire.from.componentId);
    const toComp = components.find((c) => c.id === wire.to.componentId);
    if (!fromComp || !toComp) return null;

    const a = portWorldPosition(fromComp, wire.from.terminal);
    const b = portWorldPosition(toComp, wire.to.terminal);
    const dist = Math.hypot(b[0] - a[0], b[2] - a[2]);
    // low jumper-wire arc that hugs the board
    const arc = 0.12 + dist * 0.08;
    const mid = new THREE.Vector3(
      (a[0] + b[0]) / 2,
      Math.max(a[1], b[1]) + arc,
      (a[2] + b[2]) / 2,
    );
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(...a), mid, new THREE.Vector3(...b),
    );
    return new THREE.TubeGeometry(curve, 24, 0.022, 8, false);
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
      <meshStandardMaterial
        color={selected ? '#f59e0b' : WIRE_COLORS[colorIndex % WIRE_COLORS.length]}
        roughness={0.45}
      />
    </mesh>
  );
}

// ==================== CAMERA RESET ====================

const CAMERA_HOME: [number, number, number] = [0, 6.5, 8];

function CameraReset({ signal }: { signal: number }) {
  const { camera, controls } = useThree();
  useEffect(() => {
    if (signal === 0) return;
    camera.position.set(...CAMERA_HOME);
    const orbit = controls as { target?: THREE.Vector3; update?: () => void } | null;
    orbit?.target?.set(0, 0, 0);
    orbit?.update?.();
  }, [signal, camera, controls]);
  return null;
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
  fitSignal: number;
  onBoardMeasured: (board: BoardInfo) => void;
  board: BoardInfo | null;
  onSelect: (id: string | null) => void;
  onMove: (id: string, position: [number, number, number]) => void;
  onTerminalClick: (ref: TerminalRef) => void;
  onRunClick: (id: string) => void;
}

export function SimScene({
  isDark, mode, components, wires, selectedId, pendingTerminal, results,
  fitSignal, onBoardMeasured, board,
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
      <CameraReset signal={fitSignal} />

      <Suspense fallback={null}>
        <BreadboardBase onMeasured={onBoardMeasured} onBackgroundClick={() => onSelect(null)} />
      </Suspense>

      {components.map((comp) => (
        <Suspense key={comp.id} fallback={null}>
          <SceneComponent
            comp={comp}
            mode={mode}
            board={board}
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

      {wires.map((wire, i) => (
        <SceneWire
          key={wire.id}
          wire={wire}
          colorIndex={i}
          components={components}
          selected={selectedId === wire.id}
          onSelect={onSelect}
        />
      ))}
    </>
  );
}
