'use client';

import { Folder } from 'lucide-react';
import { useState } from 'react';

const microcontrollerModels = {
  'trioeboard': {
    url: '/models/microcontroller/TrioeBoard.glb',
    name: 'Trioe Board',
    position: [30, 45, 65] as [number, number, number],
    target: [0, 8, 0] as [number, number, number],
    scale: 20,
    category: 'microcontroller'
  },
  'trioebreadboard': {
    url: '/models/microcontroller/TrioeBreadboard.glb',
    name: 'Trioe Breadboard',
    position: [30, 45, 65] as [number, number, number],
    target: [0, 8, 0] as [number, number, number],
    scale: 20,
    category: 'microcontroller'
  }
};

interface MicrocontrollerCategoryProps {
  onModelSelect: (
    url: string,
    position: [number, number, number],
    target: [number, number, number],
    scale?: number
  ) => void;
}

export function MicrocontrollerCategory({ onModelSelect }: MicrocontrollerCategoryProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleModelClick = (modelId: string) => {
    const model = microcontrollerModels[modelId as keyof typeof microcontrollerModels];
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
        <span className="flex-1 text-left">Microcontroller</span>
        <span className="text-xs opacity-60">{isOpen ? '▼' : '►'}</span>
      </button>

      {isOpen && (
        <ul className="ml-6 mt-1 space-y-1">
          <li
            onClick={() => handleModelClick('trioeboard')}
            className="flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors hover:bg-blue-500/10 text-sm"
          >
            <span className="w-1 h-1 rounded-full bg-blue-400"></span>
            <span>Trioe Board</span>
          </li>

          <li
            onClick={() => handleModelClick('trioebreadboard')}
            className="flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors hover:bg-blue-500/10 text-sm"
          >
            <span className="w-1 h-1 rounded-full bg-blue-400"></span>
            <span>Trioe Breadboard</span>
          </li>
        </ul>
      )}
    </li>
  );
}

export { microcontrollerModels };