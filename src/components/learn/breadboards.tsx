'use client';

import { Folder } from 'lucide-react';
import { useState } from 'react';
import { breadboardModels } from '@/lib/constants/models';

interface BreadboardCategoryProps {
  onModelSelect: (url: string, position: [number, number, number], target: [number, number, number]) => void;
  setIsPanEnabled: (enabled: boolean) => void;
}

export function BreadboardCategory({ onModelSelect, setIsPanEnabled }: BreadboardCategoryProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleModelClick = (modelId: string) => {
    const model = breadboardModels[modelId];
    if (model) {
      onModelSelect(model.url, model.position, model.target || [0, 0, 0]);
      setIsPanEnabled(true);
    }
  };

  return (
    <li className="mb-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-2 w-full rounded-md cursor-pointer transition-colors hover:bg-blue-500/10"
      >
        <Folder className="w-4 h-4 text-blue-400/80" />
        <span className="flex-1 text-left">Breadboard</span>
        <span className="text-xs opacity-60">{isOpen ? '▼' : '►'}</span>
      </button>
      
      {isOpen && (
        <ul className="ml-6 mt-1 space-y-1">
          {Object.entries(breadboardModels).map(([key, model]) => (
            <li
              key={key}
              onClick={() => handleModelClick(key)}
              className="flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors hover:bg-blue-500/10 text-sm"
            >
              <span className="w-1 h-1 rounded-full bg-blue-400"></span>
              <span>{model.name}</span>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}