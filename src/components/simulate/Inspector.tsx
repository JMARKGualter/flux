'use client';

import { RotateCw, Copy, Trash2, Zap, ToggleLeft, ToggleRight } from 'lucide-react';
import { modelRegistry } from '@/lib/3d/ModelLibrary';
import { PlacedComponent, Wire, SIM_SPECS, SolveResult, terminalLabels, isSimulatable } from '@/lib/sim/types';

const RESISTOR_VALUES = [100, 220, 330, 470, 1000, 2200, 10000];

interface InspectorProps {
  isDark: boolean;
  mode: 'select' | 'wire' | 'run';
  selectedComponent: PlacedComponent | null;
  selectedWire: Wire | null;
  results: SolveResult | null;
  onRotate: (id: string) => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
  onDeleteWire: (id: string) => void;
  onSetResistance: (id: string, ohms: number) => void;
  onToggleSwitch: (id: string) => void;
}

function formatOhms(ohms: number) {
  return ohms >= 1000 ? `${ohms / 1000}kΩ` : `${ohms}Ω`;
}

export function Inspector({
  isDark, mode, selectedComponent, selectedWire, results,
  onRotate, onDuplicate, onDelete, onDeleteWire, onSetResistance, onToggleSwitch,
}: InspectorProps) {
  const panelClass = `rounded-lg border ${isDark ? 'bg-blue-950/30 border-blue-900/30' : 'bg-white/50 border-blue-200/30'} backdrop-blur-sm p-3 h-full overflow-y-auto text-sm`;
  const buttonClass = `flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-md border transition-colors ${
    isDark ? 'border-blue-900/50 hover:bg-blue-900/40 text-gray-300' : 'border-blue-200 hover:bg-blue-100 text-gray-700'
  }`;
  const mutedClass = isDark ? 'text-gray-400' : 'text-gray-500';

  if (selectedWire) {
    return (
      <aside className={panelClass}>
        <h2 className="font-semibold mb-2">Wire</h2>
        <p className={`text-xs mb-3 ${mutedClass}`}>
          {modelRegistry[selectedWire.from.componentId.split('#')[0]]?.name ?? 'component'} ↔{' '}
          {modelRegistry[selectedWire.to.componentId.split('#')[0]]?.name ?? 'component'}
        </p>
        <button className={`${buttonClass} text-red-500 border-red-500/30`} onClick={() => onDeleteWire(selectedWire.id)}>
          <Trash2 className="w-3.5 h-3.5" /> Delete wire
        </button>
      </aside>
    );
  }

  if (!selectedComponent) {
    return (
      <aside className={panelClass}>
        <h2 className="font-semibold mb-2">Inspector</h2>
        <ul className={`text-xs space-y-2 ${mutedClass}`}>
          <li><b>Select mode:</b> click a part to inspect it, drag to move it around the board.</li>
          <li><b>Wire mode:</b> click one terminal dot, then another, to connect them with a wire.</li>
          <li><b>Run mode:</b> electricity flows! Click switches and buttons to toggle them.</li>
          <li>Keys: <b>R</b> rotate · <b>Delete</b> remove selection.</li>
          <li className="flex items-center gap-1">
            <Zap className="w-3 h-3 text-yellow-500" />
            Parts with this badge participate in the simulation.
          </li>
        </ul>
      </aside>
    );
  }

  const model = modelRegistry[selectedComponent.modelId];
  const spec = SIM_SPECS[selectedComponent.modelId];
  const result = results?.perComponent[selectedComponent.id];
  const labels = terminalLabels(selectedComponent.modelId);

  return (
    <aside className={panelClass}>
      <h2 className="font-semibold flex items-center gap-1.5">
        {model?.name ?? selectedComponent.modelId}
        {isSimulatable(selectedComponent.modelId) && <Zap className="w-3.5 h-3.5 text-yellow-500" />}
      </h2>
      <p className={`text-[11px] mb-3 capitalize ${mutedClass}`}>{model?.category}</p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        <button className={buttonClass} onClick={() => onRotate(selectedComponent.id)}>
          <RotateCw className="w-3.5 h-3.5" /> Rotate
        </button>
        <button className={buttonClass} onClick={() => onDuplicate(selectedComponent.id)}>
          <Copy className="w-3.5 h-3.5" /> Duplicate
        </button>
        <button className={`${buttonClass} text-red-500 border-red-500/30`} onClick={() => onDelete(selectedComponent.id)}>
          <Trash2 className="w-3.5 h-3.5" /> Delete
        </button>
      </div>

      {spec?.kind === 'resistor' && (
        <div className="mb-4">
          <label className={`block text-[11px] mb-1 ${mutedClass}`}>Resistance</label>
          <div className="flex flex-wrap gap-1">
            {RESISTOR_VALUES.map((v) => {
              const active = (selectedComponent.props.resistance ?? spec.defaultR) === v;
              return (
                <button
                  key={v}
                  onClick={() => onSetResistance(selectedComponent.id, v)}
                  className={`text-[11px] px-2 py-1 rounded border transition-colors ${
                    active
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : isDark ? 'border-blue-900/50 text-gray-300 hover:bg-blue-900/40' : 'border-blue-200 text-gray-700 hover:bg-blue-100'
                  }`}
                >
                  {formatOhms(v)}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {spec?.kind === 'switch' && (
        <button className={`${buttonClass} mb-4`} onClick={() => onToggleSwitch(selectedComponent.id)}>
          {(selectedComponent.props.closed ?? spec.defaultClosed)
            ? <><ToggleRight className="w-4 h-4 text-green-500" /> Closed (conducting)</>
            : <><ToggleLeft className="w-4 h-4" /> Open (off)</>}
        </button>
      )}

      {spec && (
        <div className={`text-[11px] mb-4 ${mutedClass}`}>
          <p><span className="text-red-500 font-bold">●</span> {labels.a}</p>
          <p><span className={`${isDark ? 'text-gray-300' : 'text-gray-800'} font-bold`}>●</span> {labels.b}</p>
        </div>
      )}

      {!spec && (
        <p className={`text-[11px] mb-4 ${mutedClass}`}>
          This part is display-only for now — it can be placed and arranged but doesn&apos;t conduct in Run mode yet.
        </p>
      )}

      {mode === 'run' && result && (
        <div className={`rounded-md border p-2 text-xs space-y-1 ${isDark ? 'border-blue-900/50 bg-black/30' : 'border-blue-200 bg-blue-50/60'}`}>
          <p className="font-semibold flex items-center gap-1"><Zap className="w-3 h-3 text-yellow-500" /> Live readings</p>
          <p>Current: <b>{(Math.abs(result.current) * 1000).toFixed(1)} mA</b></p>
          <p>Voltage: <b>{result.voltage.toFixed(2)} V</b></p>
          {result.warning && <p className="text-red-500">{result.warning}</p>}
        </div>
      )}
    </aside>
  );
}
