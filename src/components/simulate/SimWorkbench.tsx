'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { ArrowLeft, CircuitBoard, MousePointer2, Cable, Play, Square, Trash2, Zap, Scan } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { useTheme } from '@/contexts/ThemeContext';
import { modelRegistry } from '@/lib/3d/ModelLibrary';
import { PlacedComponent, Wire, TerminalRef, SIM_SPECS, terminalKey } from '@/lib/sim/types';
import { solveCircuit } from '@/lib/sim/solver';
import { SimScene, SimMode, BoardInfo } from './SimScene';
import { Palette } from './Palette';
import { Inspector } from './Inspector';

// Configure Draco loader globally (same decoder as the learn page)
useGLTF.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');

const STORAGE_KEY = 'sim-workbench-v1';

let instanceCounter = 0;
const newId = (modelId: string) => `${modelId}#${++instanceCounter}-${Date.now().toString(36)}`;

export function SimWorkbench() {
  const { isDark } = useTheme();
  const [components, setComponents] = useState<PlacedComponent[]>([]);
  const [wires, setWires] = useState<Wire[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mode, setMode] = useState<SimMode>('select');
  const [pendingTerminal, setPendingTerminal] = useState<TerminalRef | null>(null);
  const [board, setBoard] = useState<BoardInfo | null>(null);
  const [fitSignal, setFitSignal] = useState(0);
  const [elapsedMs, setElapsedMs] = useState(0);
  // Save is gated on `loaded` STATE (not a ref) so it can never run before the
  // loaded components/wires have actually been committed — otherwise the first
  // save-effect pass would overwrite the stored layout with the empty initial state.
  const [loaded, setLoaded] = useState(false);

  // ---------- persistence ----------
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as { components: PlacedComponent[]; wires: Wire[] };
        setComponents(saved.components.filter((c) => modelRegistry[c.modelId]));
        setWires(saved.wires);
      }
    } catch { /* corrupted save — start fresh */ }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ components, wires }));
    } catch { /* storage full/unavailable */ }
  }, [loaded, components, wires]);

  // ---------- simulation ----------
  const results = useMemo(
    () => (mode === 'run' ? solveCircuit(components, wires) : null),
    [mode, components, wires],
  );

  // Buzzer audio while running
  useEffect(() => {
    const buzzing = mode === 'run' && results != null &&
      components.some((c) => SIM_SPECS[c.modelId]?.kind === 'buzzer' && results.perComponent[c.id]?.on);
    if (!buzzing) return;

    let ctx: AudioContext | undefined;
    try {
      ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.value = 780;
      gain.gain.value = 0.02;
      osc.connect(gain).connect(ctx.destination);
      osc.start();
    } catch { /* audio unavailable */ }

    return () => { ctx?.close().catch(() => {}); };
  }, [mode, results, components]);

  // Simulation clock shown in the toolbar while running
  useEffect(() => {
    if (mode !== 'run') {
      setElapsedMs(0);
      return;
    }
    const t0 = performance.now();
    const id = setInterval(() => setElapsedMs(performance.now() - t0), 53);
    return () => clearInterval(id);
  }, [mode]);

  // ---------- editing actions ----------
  // New parts land on the breadboard, staggered along its length
  const addComponent = useCallback((modelId: string) => {
    setComponents((prev) => {
      const n = prev.length;
      const spanX = board ? board.halfX - 0.8 : 2.8;
      const x = ((n % 6) - 2.5) * (spanX / 2.5);
      const z = (Math.floor(n / 6) % 2 === 0 ? 1 : -1) * 0.4;
      const y = board ? board.topY : 0;
      const comp: PlacedComponent = {
        id: newId(modelId), modelId, position: [x, y, z], rotationY: 0, props: {},
      };
      setSelectedId(comp.id);
      return [...prev, comp];
    });
  }, [board]);

  const moveComponent = useCallback((id: string, position: [number, number, number]) => {
    setComponents((prev) => prev.map((c) => (c.id === id ? { ...c, position } : c)));
  }, []);

  const rotateComponent = useCallback((id: string) => {
    setComponents((prev) => prev.map((c) => (c.id === id ? { ...c, rotationY: c.rotationY + Math.PI / 2 } : c)));
  }, []);

  const duplicateComponent = useCallback((id: string) => {
    setComponents((prev) => {
      const src = prev.find((c) => c.id === id);
      if (!src) return prev;
      const copy: PlacedComponent = {
        ...src,
        id: newId(src.modelId),
        position: [src.position[0] + 0.75, 0, src.position[2] + 0.75],
        props: { ...src.props },
      };
      setSelectedId(copy.id);
      return [...prev, copy];
    });
  }, []);

  const deleteComponent = useCallback((id: string) => {
    setComponents((prev) => prev.filter((c) => c.id !== id));
    setWires((prev) => prev.filter((w) => w.from.componentId !== id && w.to.componentId !== id));
    setSelectedId((sel) => (sel === id ? null : sel));
    setPendingTerminal((p) => (p?.componentId === id ? null : p));
  }, []);

  const deleteWire = useCallback((id: string) => {
    setWires((prev) => prev.filter((w) => w.id !== id));
    setSelectedId((sel) => (sel === id ? null : sel));
  }, []);

  const setResistance = useCallback((id: string, ohms: number) => {
    setComponents((prev) => prev.map((c) => (c.id === id ? { ...c, props: { ...c.props, resistance: ohms } } : c)));
  }, []);

  const toggleSwitch = useCallback((id: string) => {
    setComponents((prev) => prev.map((c) => {
      if (c.id !== id) return c;
      const spec = SIM_SPECS[c.modelId];
      const closed = c.props.closed ?? (spec?.kind === 'switch' ? spec.defaultClosed : false);
      return { ...c, props: { ...c.props, closed: !closed } };
    }));
  }, []);

  const clearAll = useCallback(() => {
    setComponents([]);
    setWires([]);
    setSelectedId(null);
    setPendingTerminal(null);
  }, []);

  // ---------- wiring ----------
  const handleTerminalClick = useCallback((ref: TerminalRef) => {
    setPendingTerminal((pending) => {
      if (!pending) return ref;
      if (terminalKey(pending) === terminalKey(ref)) return null; // clicked same port: cancel
      setWires((prev) => {
        const exists = prev.some((w) =>
          (terminalKey(w.from) === terminalKey(pending) && terminalKey(w.to) === terminalKey(ref)) ||
          (terminalKey(w.from) === terminalKey(ref) && terminalKey(w.to) === terminalKey(pending)),
        );
        if (exists) return prev;
        return [...prev, { id: `wire#${++instanceCounter}-${Date.now().toString(36)}`, from: pending, to: ref }];
      });
      return null;
    });
  }, []);

  // In run mode, clicking a switch/button toggles it
  const handleRunClick = useCallback((id: string) => {
    const comp = components.find((c) => c.id === id);
    if (comp && SIM_SPECS[comp.modelId]?.kind === 'switch') toggleSwitch(id);
  }, [components, toggleSwitch]);

  const setModeSafe = useCallback((next: SimMode) => {
    setMode(next);
    setPendingTerminal(null);
  }, []);

  // ---------- keyboard shortcuts ----------
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT') return;
      if (!selectedId) return;
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (selectedId.startsWith('wire#')) deleteWire(selectedId);
        else deleteComponent(selectedId);
      } else if (e.key === 'r' || e.key === 'R') {
        if (!selectedId.startsWith('wire#')) rotateComponent(selectedId);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedId, deleteComponent, deleteWire, rotateComponent]);

  const selectedComponent = components.find((c) => c.id === selectedId) ?? null;
  const selectedWire = wires.find((w) => w.id === selectedId) ?? null;

  // ---------- UI ----------
  const formatClock = (ms: number) => {
    const m = Math.floor(ms / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    const x = Math.floor(ms % 1000);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}.${String(x).padStart(3, '0')} ms`;
  };

  // PCBX-style floating tool button: icon-only, highlighted when active
  const toolButton = (
    onClick: () => void,
    icon: React.ReactNode,
    title: string,
    active = false,
    activeClass = 'bg-blue-600 text-white',
  ) => (
    <button
      onClick={onClick}
      title={title}
      className={`flex items-center justify-center w-9 h-9 rounded-lg transition-colors ${
        active ? activeClass : 'text-gray-300 hover:bg-white/10'
      }`}
    >
      {icon}
    </button>
  );

  return (
    <div className={`h-screen w-screen ${isDark ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'} flex flex-col overflow-hidden`}>
      {/* Header / toolbar */}
      <header className={`flex items-center justify-between gap-4 px-4 py-2.5 border-b ${isDark ? 'border-blue-900/30 bg-blue-950/30' : 'border-blue-200/30 bg-white/50'} backdrop-blur-sm z-10`}>
        <div className="flex items-center gap-3 min-w-0">
          <Link
            href="/"
            className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg transition-colors ${isDark ? 'hover:bg-blue-900/40 text-gray-300' : 'hover:bg-blue-100 text-gray-700'}`}
          >
            <ArrowLeft className="w-4 h-4" />
            Home
          </Link>
          <h1 className="text-lg font-semibold flex items-center gap-2 truncate">
            <CircuitBoard className="w-5 h-5 text-blue-400 flex-shrink-0" />
            3D Simulation Workbench
          </h1>
        </div>

        <button
          onClick={clearAll}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors text-red-500 ${isDark ? 'hover:bg-red-900/30' : 'hover:bg-red-100'}`}
        >
          <Trash2 className="w-4 h-4" />
          Clear
        </button>
      </header>

      <main className="flex-1 grid grid-cols-[230px_1fr_250px] gap-3 p-3 min-h-0 min-w-0">
        <Palette isDark={isDark} onAdd={addComponent} />

        {/* 3D canvas */}
        <div className={`relative rounded-lg border overflow-hidden ${isDark ? 'bg-black/40 border-blue-900/30' : 'bg-white/40 border-blue-200/30'}`}>
          <Canvas
            camera={{ position: [0, 6.5, 8], fov: 45 }}
            onPointerMissed={() => { setSelectedId(null); setPendingTerminal(null); }}
          >
            <SimScene
              isDark={isDark}
              mode={mode}
              components={components}
              wires={wires}
              selectedId={selectedId}
              pendingTerminal={pendingTerminal}
              results={results}
              fitSignal={fitSignal}
              board={board}
              onBoardMeasured={setBoard}
              onSelect={setSelectedId}
              onMove={moveComponent}
              onTerminalClick={handleTerminalClick}
              onRunClick={handleRunClick}
            />
          </Canvas>

          {/* Floating tool bar, PCBX-style */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1 px-2 py-1.5 rounded-xl bg-gray-900/85 border border-white/10 shadow-xl backdrop-blur-sm">
            {toolButton(() => setModeSafe('select'), <MousePointer2 className="w-4.5 h-4.5" />, 'Select & move (drag parts)', mode === 'select')}
            {toolButton(() => setModeSafe('wire'), <Cable className="w-4.5 h-4.5" />, 'Wire terminals', mode === 'wire')}
            {toolButton(() => setFitSignal((s) => s + 1), <Scan className="w-4.5 h-4.5" />, 'Reset camera view')}
            <div className="w-px h-6 bg-white/15 mx-1" />
            {mode === 'run'
              ? toolButton(() => setModeSafe('select'), <Square className="w-4.5 h-4.5" />, 'Stop simulation', true, 'bg-red-600 text-white')
              : toolButton(() => setModeSafe('run'), <Play className="w-4.5 h-4.5" />, 'Run simulation', true, 'bg-blue-600 text-white hover:bg-blue-500')}
            <span className={`font-mono text-xs px-2 tabular-nums ${mode === 'run' ? 'text-green-400' : 'text-gray-500'}`}>
              {formatClock(elapsedMs)}
            </span>
          </div>

          {/* status bar */}
          <div className="absolute bottom-0 left-0 right-0 px-3 py-2 pointer-events-none">
            {mode === 'run' && (
              <p className="text-xs flex items-center gap-1.5 text-green-500 font-medium">
                <Zap className="w-3.5 h-3.5" />
                Simulation running — click switches and buttons to toggle them
              </p>
            )}
            {mode === 'wire' && (
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {pendingTerminal
                  ? 'Now click a second terminal to finish the wire (click the same one to cancel)'
                  : 'Click a terminal dot (red = +) to start a wire'}
              </p>
            )}
            {mode === 'select' && components.length === 0 && (
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Add components from the left panel, then wire them up and press Run
              </p>
            )}
            {results?.warnings.map((w, i) => (
              <p key={i} className="text-xs text-red-500 font-medium">⚠ {w}</p>
            ))}
          </div>
        </div>

        <Inspector
          isDark={isDark}
          mode={mode}
          selectedComponent={selectedComponent}
          selectedWire={selectedWire}
          results={results}
          onRotate={rotateComponent}
          onDuplicate={duplicateComponent}
          onDelete={deleteComponent}
          onDeleteWire={deleteWire}
          onSetResistance={setResistance}
          onToggleSwitch={toggleSwitch}
        />
      </main>
    </div>
  );
}
