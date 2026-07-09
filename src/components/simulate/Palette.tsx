'use client';

import { useMemo, useState } from 'react';
import { Zap, ChevronRight, ChevronDown } from 'lucide-react';
import { modelRegistry, ModelData } from '@/lib/3d/ModelLibrary';
import { isSimulatable } from '@/lib/sim/types';

interface PaletteProps {
  isDark: boolean;
  onAdd: (modelId: string) => void;
}

export function Palette({ isDark, onAdd }: PaletteProps) {
  const { simParts, byCategory } = useMemo(() => {
    const simParts: ModelData[] = [];
    const byCategory: Record<string, ModelData[]> = {};
    Object.values(modelRegistry).forEach((model) => {
      if (isSimulatable(model.id)) simParts.push(model);
      (byCategory[model.category] ??= []).push(model);
    });
    return { simParts, byCategory };
  }, []);

  const [open, setOpen] = useState<Record<string, boolean>>({ __sim: true });
  const toggle = (key: string) => setOpen((prev) => ({ ...prev, [key]: !prev[key] }));

  const rowClass = `w-full flex items-center gap-2 text-left text-xs px-2 py-1.5 rounded-md transition-colors ${
    isDark ? 'hover:bg-blue-900/40 text-gray-300' : 'hover:bg-blue-100 text-gray-700'
  }`;
  const headerClass = `w-full flex items-center justify-between text-left text-sm font-semibold px-2 py-1.5 rounded-md transition-colors ${
    isDark ? 'hover:bg-blue-900/40 text-gray-100' : 'hover:bg-blue-100 text-gray-900'
  }`;

  const renderItems = (models: ModelData[]) =>
    models.map((model) => (
      <li key={model.id}>
        <button className={rowClass} onClick={() => onAdd(model.id)} title={`Add ${model.name}`}>
          <span className="flex-1 truncate">{model.name}</span>
          {isSimulatable(model.id) && <Zap className="w-3 h-3 text-yellow-500 flex-shrink-0" />}
        </button>
      </li>
    ));

  return (
    <aside className={`rounded-lg border ${isDark ? 'bg-blue-950/30 border-blue-900/30' : 'bg-white/50 border-blue-200/30'} backdrop-blur-sm p-3 h-full overflow-y-auto`}>
      <h2 className="text-sm font-semibold mb-2 px-2">Add Components</h2>
      <p className={`text-[10px] px-2 mb-3 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
        Click a part to place it. <Zap className="w-2.5 h-2.5 inline text-yellow-500" /> = works in Run mode.
      </p>

      <ul className="space-y-0.5">
        {/* Simulatable starter parts, surfaced first */}
        <li>
          <button className={headerClass} onClick={() => toggle('__sim')}>
            <span className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-yellow-500" />
              Simulation Parts
            </span>
            {open['__sim'] ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
          </button>
        </li>
        {open['__sim'] && <ul className="ml-2 space-y-0.5 mb-2">{renderItems(simParts)}</ul>}

        {Object.entries(byCategory).map(([category, models]) => (
          <li key={category}>
            <button className={headerClass} onClick={() => toggle(category)}>
              <span>{category.charAt(0).toUpperCase() + category.slice(1)}</span>
              {open[category] ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </button>
            {open[category] && <ul className="ml-2 space-y-0.5 mb-2">{renderItems(models)}</ul>}
          </li>
        ))}
      </ul>
    </aside>
  );
}
