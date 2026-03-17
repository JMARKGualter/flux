'use client';

import { Folder } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';

const powerControlModels = {
  'nmosmosfet': {
    url: '/models/powercontrol/NMOSMOSFET.glb',
    name: 'nMOS MOSFET',
    position: [28, 42, 60] as [number, number, number],
    target: [0, 7, 0] as [number, number, number],
    scale: 18,
    category: 'powercontrol'
  },
  'pmosmosfet': {
    url: '/models/powercontrol/PMOSMOSFET.glb',
    name: 'pMOS MOSFET',
    position: [28, 42, 60] as [number, number, number],
    target: [0, 7, 0] as [number, number, number],
    scale: 18,
    category: 'powercontrol'
  },
  'npntransistor': {
    url: '/models/powercontrol/NPNTransistor.glb',
    name: 'NPN Transistor',
    position: [32, 48, 68] as [number, number, number],
    target: [0, 8, 0] as [number, number, number],
    scale: 20,
    category: 'powercontrol'
  },
  'pnptransistor': {
    url: '/models/powercontrol/PNPTransistor.glb',
    name: 'PNP Transistor',
    position: [34, 50, 70] as [number, number, number],
    target: [0, 9, 0] as [number, number, number],
    scale: 22,
    category: 'powercontrol'
  },
  'nmostransistor': {
    url: '/models/powercontrol/NMOSTransistor.glb',
    name: 'NMOS Transistor',
    position: [28, 42, 60] as [number, number, number],
    target: [0, 7, 0] as [number, number, number],
    scale: 18,
    category: 'powercontrol'
  },
  'pmostransistor': {
    url: '/models/powercontrol/PMOSTransistor.glb',
    name: 'PMOS Transistor',
    position: [28, 42, 60] as [number, number, number],
    target: [0, 7, 0] as [number, number, number],
    scale: 18,
    category: 'powercontrol'
  },
  'tip120': {
    url: '/models/powercontrol/TIP120.glb',
    name: 'TIP120',
    position: [30, 45, 65] as [number, number, number],
    target: [0, 8, 0] as [number, number, number],
    scale: 20,
    category: 'powercontrol'
  }
};

interface PowerControlCategoryProps {
  onModelSelect: (
    url: string,
    position: [number, number, number],
    target: [number, number, number],
    scale?: number
  ) => void;
}

export function PowerControlCategory({ onModelSelect }: PowerControlCategoryProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    Object.values(powerControlModels).forEach(model => {
      useGLTF.preload(model.url);
    });
  }, []);

  const handleModelClick = (modelId: string) => {
    const model = powerControlModels[modelId as keyof typeof powerControlModels];
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
        <span className="flex-1 text-left">Power Control</span>
        <span className="text-xs opacity-60">{isOpen ? '▼' : '►'}</span>
      </button>

      {isOpen && (
        <ul className="ml-6 mt-1 space-y-1">
          <li
            onClick={() => handleModelClick('nmosmosfet')}
            className="flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors hover:bg-blue-500/10 text-sm"
          >
            <span className="w-1 h-1 rounded-full bg-blue-400"></span>
            <span>nMOS MOSFET</span>
          </li>

          <li
            onClick={() => handleModelClick('pmosmosfet')}
            className="flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors hover:bg-blue-500/10 text-sm"
          >
            <span className="w-1 h-1 rounded-full bg-blue-400"></span>
            <span>pMOS MOSFET</span>
          </li>

          <li
            onClick={() => handleModelClick('npntransistor')}
            className="flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors hover:bg-blue-500/10 text-sm"
          >
            <span className="w-1 h-1 rounded-full bg-blue-400"></span>
            <span>NPN Transistor</span>
          </li>

          <li
            onClick={() => handleModelClick('pnptransistor')}
            className="flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors hover:bg-blue-500/10 text-sm"
          >
            <span className="w-1 h-1 rounded-full bg-blue-400"></span>
            <span>PNP Transistor</span>
          </li>

          <li
            onClick={() => handleModelClick('nmostransistor')}
            className="flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors hover:bg-blue-500/10 text-sm"
          >
            <span className="w-1 h-1 rounded-full bg-blue-400"></span>
            <span>nMOS Transistor</span>
          </li>

          <li
            onClick={() => handleModelClick('pmostransistor')}
            className="flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors hover:bg-blue-500/10 text-sm"
          >
            <span className="w-1 h-1 rounded-full bg-blue-400"></span>
            <span>pMOS Transistor</span>
          </li>

          <li
            onClick={() => handleModelClick('tip120')}
            className="flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors hover:bg-blue-500/10 text-sm"
          >
            <span className="w-1 h-1 rounded-full bg-blue-400"></span>
            <span>TIP120</span>
          </li>
        </ul>
      )}
    </li>
  );
}

export { powerControlModels };