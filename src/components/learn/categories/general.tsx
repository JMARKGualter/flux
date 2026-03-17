'use client';

import { Folder } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';

// General components models configuration
// EXTREMELY HIGH Y positions with MAXIMUM ZOOM for dramatic preview
const generalModels = {
  'capacitor': {
    url: '/models/general/Capacitor.glb',
    name: 'Capacitor',
    position: [0, 15, 0] as [number, number, number], // Much higher (was 8)
    target: [0, 15, 0] as [number, number, number],
    cameraPosition: [8, 35, 25] as [number, number, number], // Closer zoom (was 12,25,35)
    scale: 22, // Larger scale for more presence
    category: 'general'
  },
  'polarized-capacitor': {
    url: '/models/general/PolarizedCapacitor.glb',
    name: 'Polarized Capacitor',
    position: [0, 17, 0] as [number, number, number], // Much higher (was 9)
    target: [0, 17, 0] as [number, number, number],
    cameraPosition: [9, 37, 27] as [number, number, number], // Closer zoom (was 13,26,37)
    scale: 24,
    category: 'general'
  },
  'resistor': {
    url: '/models/general/Resistor.glb',
    name: 'Resistor',
    position: [0, 13, 0] as [number, number, number], // Much higher (was 7)
    target: [0, 13, 0] as [number, number, number],
    cameraPosition: [7, 32, 22] as [number, number, number], // Closer zoom (was 10,22,32)
    scale: 20,
    category: 'general'
  },
  'diode': {
    url: '/models/general/Diode.glb',
    name: 'Diode',
    position: [0, 14, 0] as [number, number, number], // Much higher (was 7.5)
    target: [0, 14, 0] as [number, number, number],
    cameraPosition: [7.5, 33, 23] as [number, number, number], // Closer zoom (was 11,23,33)
    scale: 21,
    category: 'general'
  },
  'zener-diode': {
    url: '/models/general/ZenerDiode.glb',
    name: 'Zener Diode',
    position: [0, 14, 0] as [number, number, number], // Much higher (was 7.5)
    target: [0, 14, 0] as [number, number, number],
    cameraPosition: [7.5, 33, 23.5] as [number, number, number], // Closer zoom (was 11,23,34)
    scale: 21,
    category: 'general'
  },
  'inductor': {
    url: '/models/general/Inductor.glb',
    name: 'Inductor',
    position: [0, 16, 0] as [number, number, number], // Much higher (was 8.5)
    target: [0, 16, 0] as [number, number, number],
    cameraPosition: [8, 35, 26] as [number, number, number], // Closer zoom (was 12,24,36)
    scale: 23,
    category: 'general'
  }
};

interface GeneralCategoryProps {
  onModelSelect: (
    url: string, 
    position: [number, number, number], 
    target: [number, number, number],
    scale?: number,
    cameraPosition?: [number, number, number]
  ) => void;
}

export function GeneralCategory({ onModelSelect }: GeneralCategoryProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Preload all general models with Draco
  useEffect(() => {
    Object.values(generalModels).forEach(model => {
      useGLTF.preload(model.url);
    });
  }, []);

  const handleModelClick = (modelId: string) => {
    const model = generalModels[modelId as keyof typeof generalModels];
    if (model) {
      onModelSelect(
        model.url, 
        model.cameraPosition,
        model.target,
        model.scale,
        model.position
      );
    }
  };

  return (
    <li className="mb-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-2 w-full rounded-md cursor-pointer transition-colors hover:bg-blue-500/10"
      >
        <Folder className="w-4 h-4 text-blue-400/80" />
        <span className="flex-1 text-left">General</span>
        <span className="text-xs opacity-60">{isOpen ? '▼' : '►'}</span>
      </button>
      
      {isOpen && (
        <ul className="ml-6 mt-1 space-y-1">
          <li
            onClick={() => handleModelClick('capacitor')}
            className="flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors hover:bg-blue-500/10 text-sm"
          >
            <span className="w-1 h-1 rounded-full bg-blue-400"></span>
            <span>Capacitor</span>
          </li>
          
          <li
            onClick={() => handleModelClick('polarized-capacitor')}
            className="flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors hover:bg-blue-500/10 text-sm"
          >
            <span className="w-1 h-1 rounded-full bg-blue-400"></span>
            <span>Polarized Capacitor</span>
          </li>
          
          <li
            onClick={() => handleModelClick('resistor')}
            className="flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors hover:bg-blue-500/10 text-sm"
          >
            <span className="w-1 h-1 rounded-full bg-blue-400"></span>
            <span>Resistor</span>
          </li>
          
          <li
            onClick={() => handleModelClick('diode')}
            className="flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors hover:bg-blue-500/10 text-sm"
          >
            <span className="w-1 h-1 rounded-full bg-blue-400"></span>
            <span>Diode</span>
          </li>
          
          <li
            onClick={() => handleModelClick('zener-diode')}
            className="flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors hover:bg-blue-500/10 text-sm"
          >
            <span className="w-1 h-1 rounded-full bg-blue-400"></span>
            <span>Zener Diode</span>
          </li>
          
          <li
            onClick={() => handleModelClick('inductor')}
            className="flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors hover:bg-blue-500/10 text-sm"
          >
            <span className="w-1 h-1 rounded-full bg-blue-400"></span>
            <span>Inductor</span>
          </li>
        </ul>
      )}
    </li>
  );
}

// Export models for use in other components if needed
export { generalModels };