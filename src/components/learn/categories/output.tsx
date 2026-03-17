'use client';

import { Folder } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';

// Output models configuration with optimized POV
const outputModels = {
  'led': {
    url: '/models/output/LED.glb',
    name: 'LED',
    position: [28, 42, 60] as [number, number, number],
    target: [0, 7, 0] as [number, number, number],
    scale: 18,
    category: 'output'
  },
  'rgb-led': {
    url: '/models/output/LEDRGB.glb',
    name: 'RGB LED',
    position: [28, 42, 60] as [number, number, number],
    target: [0, 7, 0] as [number, number, number],
    scale: 18,
    category: 'output'
  },
  'lightbulb': {
    url: '/models/output/LightBulb.glb',
    name: 'LightBulb',
    position: [30, 45, 65] as [number, number, number],
    target: [0, 8, 0] as [number, number, number],
    scale: 20,
    category: 'output'
  },
  'neopixel': {
    url: '/models/output/NeoPixel.glb',
    name: 'NeoPixel',
    position: [34, 50, 70] as [number, number, number],
    target: [0, 9, 0] as [number, number, number],
    scale: 22,
    category: 'output'
  },
  'piezo': {
    url: '/models/output/PiezoBuzzer.glb',
    name: 'Piezo Buzzer',
    position: [32, 48, 68] as [number, number, number],
    target: [0, 8, 0] as [number, number, number],
    scale: 20,
    category: 'output'
  }
};

interface OutputCategoryProps {
  onModelSelect: (
    url: string,
    position: [number, number, number],
    target: [number, number, number],
    scale?: number
  ) => void;
}

export function OutputCategory({ onModelSelect }: OutputCategoryProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleModelClick = (modelId: string) => {
    const model = outputModels[modelId as keyof typeof outputModels];
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
        <span className="flex-1 text-left">Output</span>
        <span className="text-xs opacity-60">{isOpen ? '▼' : '►'}</span>
      </button>

      {isOpen && (
        <ul className="ml-6 mt-1 space-y-1">
          <li
            onClick={() => handleModelClick('led')}
            className="flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors hover:bg-blue-500/10 text-sm"
          >
            <span className="w-1 h-1 rounded-full bg-blue-400"></span>
            <span>LED</span>
          </li>

          <li
            onClick={() => handleModelClick('rgb-led')}
            className="flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors hover:bg-blue-500/10 text-sm"
          >
            <span className="w-1 h-1 rounded-full bg-blue-400"></span>
            <span>RGB LED</span>
          </li>

          <li
            onClick={() => handleModelClick('lightbulb')}
            className="flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors hover:bg-blue-500/10 text-sm"
          >
            <span className="w-1 h-1 rounded-full bg-blue-400"></span>
            <span>LightBulb</span>
          </li>

          <li
            onClick={() => handleModelClick('neopixel')}
            className="flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors hover:bg-blue-500/10 text-sm"
          >
            <span className="w-1 h-1 rounded-full bg-blue-400"></span>
            <span>NeoPixel</span>
          </li>

          <li
            onClick={() => handleModelClick('piezo')}
            className="flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors hover:bg-blue-500/10 text-sm"
          >
            <span className="w-1 h-1 rounded-full bg-blue-400"></span>
            <span>Piezo Buzzer</span>
          </li>
        </ul>
      )}
    </li>
  );
}

export { outputModels };