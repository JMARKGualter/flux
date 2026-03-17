'use client';

import { Folder } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';

const powerModels = {
  '15battery': {
    url: '/models/power/1.5VBattery.glb',
    name: '1.5V Battery',
    position: [30, 45, 65] as [number, number, number],
    target: [0, 8, 0] as [number, number, number],
    scale: 20,
    category: 'power'
  },
  '9battery': {
    url: '/models/power/9VBattery.glb',
    name: '9V Battery',
    position: [32, 48, 68] as [number, number, number],
    target: [0, 8, 0] as [number, number, number],
    scale: 20,
    category: 'power'
  },
  'coincell': {
    url: '/models/power/CoinCell3VBattery.glb',
    name: 'Coin Cell Battery',
    position: [28, 42, 60] as [number, number, number],
    target: [0, 7, 0] as [number, number, number],
    scale: 18,
    category: 'power'
  },
  'solarcell': {
    url: '/models/power/SolarCell.glb',
    name: 'Solar Cell',
    position: [30, 45, 65] as [number, number, number],
    target: [0, 8, 0] as [number, number, number],
    scale: 20,
    category: 'power'
  }
};

interface PowerCategoryProps {
  onModelSelect: (
    url: string,
    position: [number, number, number],
    target: [number, number, number],
    scale?: number
  ) => void;
}

export function PowerCategory({ onModelSelect }: PowerCategoryProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    Object.values(powerModels).forEach(model => {
      useGLTF.preload(model.url);
    });
  }, []);

  const handleModelClick = (modelId: string) => {
    const model = powerModels[modelId as keyof typeof powerModels];
    if (model) {
      onModelSelect(model.url, model.position, model.target, model.scale);
    }
  };

  return (
    <li className="mb-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-2 w-full rounded-md cursor-pointer transition-colors hover:bg-blue-500/10"
      >
        <Folder className="w-4 h-4 text-blue-400/80" />
        <span className="flex-1 text-left">Power</span>
        <span className="text-xs opacity-60">{isOpen ? '▼' : '►'}</span>
      </button>

      {isOpen && (
        <ul className="ml-6 mt-1 space-y-1">
          <li
            onClick={() => handleModelClick('15battery')}
            className="flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors hover:bg-blue-500/10 text-sm"
          >
            <span className="w-1 h-1 rounded-full bg-blue-400"></span>
            <span>1.5V Battery</span>
          </li>

          <li
            onClick={() => handleModelClick('9battery')}
            className="flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors hover:bg-blue-500/10 text-sm"
          >
            <span className="w-1 h-1 rounded-full bg-blue-400"></span>
            <span>9V Battery</span>
          </li>

          <li
            onClick={() => handleModelClick('coincell')}
            className="flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors hover:bg-blue-500/10 text-sm"
          >
            <span className="w-1 h-1 rounded-full bg-blue-400"></span>
            <span>Coin Cell 3V Battery</span>
          </li>

          <li
            onClick={() => handleModelClick('solarcell')}
            className="flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors hover:bg-blue-500/10 text-sm"
          >
            <span className="w-1 h-1 rounded-full bg-blue-400"></span>
            <span>Solar Cell</span>
          </li>
        </ul>
      )}
    </li>
  );
}

export { powerModels };