'use client';

import { Folder } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';

// Breadboard models configuration with optimized POV
const breadboardModels = {
  'full': { 
    url: '/models/breadboard/Breadboard63R10C.glb', 
    name: 'Full Breadboard', 
    position: [40, 60, 90] as [number, number, number], 
    target: [0, 12, 0] as [number, number, number],
    scale: 22,
    category: 'breadboard'
  },
  'small': { 
    url: '/models/breadboard/BreadboardSmall30R10C.glb', 
    name: 'Small Breadboard', 
    position: [38, 55, 80] as [number, number, number], 
    target: [0, 11, 0] as [number, number, number],
    scale: 20,
    category: 'breadboard'
  },
  'mini': { 
    url: '/models/breadboard/BreadboardMini17R10C.glb', 
    name: 'Mini Breadboard', 
    position: [35, 50, 75] as [number, number, number], 
    target: [0, 10, 0] as [number, number, number],
    scale: 18,
    category: 'breadboard'
  }
};

interface BreadboardCategoryProps {
  onModelSelect: (
    url: string, 
    position: [number, number, number], 
    target: [number, number, number],
    scale?: number
  ) => void;
}

export function BreadboardCategory({ onModelSelect }: BreadboardCategoryProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Preload all breadboard models with Draco
  useEffect(() => {
    Object.values(breadboardModels).forEach(model => {
      useGLTF.preload(model.url);
    });
  }, []);

  const handleModelClick = (modelId: string) => {
    const model = breadboardModels[modelId as keyof typeof breadboardModels];
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
        <span className="flex-1 text-left">Breadboard</span>
        <span className="text-xs opacity-60">{isOpen ? '▼' : '►'}</span>
      </button>
      
      {isOpen && (
        <ul className="ml-6 mt-1 space-y-1">
          <li
            onClick={() => handleModelClick('full')}
            className="flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors hover:bg-blue-500/10 text-sm"
          >
            <span className="w-1 h-1 rounded-full bg-blue-400"></span>
            <span>Full Breadboard 63R10C</span>
          </li>
          
          <li
            onClick={() => handleModelClick('small')}
            className="flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors hover:bg-blue-500/10 text-sm"
          >
            <span className="w-1 h-1 rounded-full bg-blue-400"></span>
            <span>Small Breadboard 30R10C</span>
          </li>
          
          <li
            onClick={() => handleModelClick('mini')}
            className="flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors hover:bg-blue-500/10 text-sm"
          >
            <span className="w-1 h-1 rounded-full bg-blue-400"></span>
            <span>Mini Breadboard 17R10C</span>
          </li>
        </ul>
      )}
    </li>
  );
}

// Export models for use in other components if needed
export { breadboardModels };