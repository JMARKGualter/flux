'use client';

import { Folder } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';

// Display models configuration with optimized POV
const displayModels = {
  '7segment-clock': {
    url: '/models/display/7SegmentClockDisplay.glb',
    name: '7 Segment Clock Display',
    position: [30, 45, 65] as [number, number, number],
    target: [0, 8, 0] as [number, number, number],
    scale: 20,
    category: 'display'
  },
  '7segment': {
    url: '/models/display/7SegmentDisplay.glb',
    name: '7 Segment Display',
    position: [28, 42, 60] as [number, number, number],
    target: [0, 7, 0] as [number, number, number],
    scale: 18,
    category: 'display'
  },
  'lcd-16x2': {
    url: '/models/display/LCD16x2.glb',
    name: 'LCD 16x2',
    position: [32, 48, 68] as [number, number, number],
    target: [0, 8, 0] as [number, number, number],
    scale: 22,
    category: 'display'
  },
  'lcd-16x2-i2c': {
    url: '/models/display/LCD16x2_I2C.glb', // Fixed path with underscore
    name: 'LCD 16x2 I2C',
    position: [34, 50, 70] as [number, number, number],
    target: [0, 9, 0] as [number, number, number],
    scale: 22,
    category: 'display'
  }
};

interface DisplayCategoryProps {
  onModelSelect: (
    url: string, 
    position: [number, number, number], 
    target: [number, number, number],
    scale?: number
  ) => void;
}

export function DisplayCategory({ onModelSelect }: DisplayCategoryProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Preload all display models with Draco
  useEffect(() => {
    Object.values(displayModels).forEach(model => {
      useGLTF.preload(model.url);
    });
  }, []);

  const handleModelClick = (modelId: string) => {
    const model = displayModels[modelId as keyof typeof displayModels];
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
        <span className="flex-1 text-left">Display</span>
        <span className="text-xs opacity-60">{isOpen ? '▼' : '►'}</span>
      </button>
      
      {isOpen && (
        <ul className="ml-6 mt-1 space-y-1">
          <li
            onClick={() => handleModelClick('7segment-clock')}
            className="flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors hover:bg-blue-500/10 text-sm"
          >
            <span className="w-1 h-1 rounded-full bg-blue-400"></span>
            <span>7 Segment Clock Display</span>
          </li>
          
          <li
            onClick={() => handleModelClick('7segment')}
            className="flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors hover:bg-blue-500/10 text-sm"
          >
            <span className="w-1 h-1 rounded-full bg-blue-400"></span>
            <span>7 Segment Display</span>
          </li>
          
          <li
            onClick={() => handleModelClick('lcd-16x2')}
            className="flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors hover:bg-blue-500/10 text-sm"
          >
            <span className="w-1 h-1 rounded-full bg-blue-400"></span>
            <span>LCD 16x2</span>
          </li>
          
          <li
            onClick={() => handleModelClick('lcd-16x2-i2c')}
            className="flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors hover:bg-blue-500/10 text-sm"
          >
            <span className="w-1 h-1 rounded-full bg-blue-400"></span>
            <span>LCD 16x2 I2C</span>
          </li>
        </ul>
      )}
    </li>
  );
}

// Export models for use in other components if needed
export { displayModels };