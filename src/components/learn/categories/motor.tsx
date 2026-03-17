'use client';

import { Folder } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';

// Motor models configuration with optimized POV
const motorModels = {
  'dc-motor': {
    url: '/models/motor/DCMotor.glb',
    name: 'DC Motor',
    position: [30, 45, 65] as [number, number, number],
    target: [0, 8, 0] as [number, number, number],
    scale: 20,
    category: 'motor'
  },
  'dc-motor-encoder': {
    url: '/models/motor/DCMotorWithEncoder.glb',
    name: 'DC Motor with Encoder',
    position: [28, 42, 60] as [number, number, number],
    target: [0, 7, 0] as [number, number, number],
    scale: 18,
    category: 'motor'
  },
  'hobby-motor': {
    url: '/models/motor/HobbyGearMotor.glb',
    name: 'Hobby Gear Motor',
    position: [32, 48, 68] as [number, number, number],
    target: [0, 8, 0] as [number, number, number],
    scale: 22,
    category: 'motor'
  },
  'micro-servo': {
    url: '/models/motor/MicroServo.glb',
    name: 'Micro Servo',
    position: [34, 50, 70] as [number, number, number],
    target: [0, 9, 0] as [number, number, number],
    scale: 22,
    category: 'motor'
  },
  'vibration-motor': {
    url: '/models/motor/VibrationMotor.glb',
    name: 'Vibration Motor',
    position: [26, 40, 58] as [number, number, number],
    target: [0, 6, 0] as [number, number, number],
    scale: 16,
    category: 'motor'
  }
};

interface MotorCategoryProps {
  onModelSelect: (
    url: string,
    position: [number, number, number],
    target: [number, number, number],
    scale?: number
  ) => void;
}

export function MotorCategory({ onModelSelect }: MotorCategoryProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleModelClick = (modelId: string) => {
    const model = motorModels[modelId as keyof typeof motorModels];
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
        <span className="flex-1 text-left">Motor</span>
        <span className="text-xs opacity-60">{isOpen ? '▼' : '►'}</span>
      </button>

      {isOpen && (
        <ul className="ml-6 mt-1 space-y-1">
          <li
            onClick={() => handleModelClick('dc-motor')}
            className="flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors hover:bg-blue-500/10 text-sm"
          >
            <span className="w-1 h-1 rounded-full bg-blue-400"></span>
            <span>DC Motor</span>
          </li>

          <li
            onClick={() => handleModelClick('dc-motor-encoder')}
            className="flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors hover:bg-blue-500/10 text-sm"
          >
            <span className="w-1 h-1 rounded-full bg-blue-400"></span>
            <span>DC Motor with Encoder</span>
          </li>

          <li
            onClick={() => handleModelClick('hobby-motor')}
            className="flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors hover:bg-blue-500/10 text-sm"
          >
            <span className="w-1 h-1 rounded-full bg-blue-400"></span>
            <span>Hobby Gear Motor</span>
          </li>

          <li
            onClick={() => handleModelClick('micro-servo')}
            className="flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors hover:bg-blue-500/10 text-sm"
          >
            <span className="w-1 h-1 rounded-full bg-blue-400"></span>
            <span>Micro Servo</span>
          </li>

          <li
            onClick={() => handleModelClick('vibration-motor')}
            className="flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors hover:bg-blue-500/10 text-sm"
          >
            <span className="w-1 h-1 rounded-full bg-blue-400"></span>
            <span>Vibration Motor</span>
          </li>
        </ul>
      )}
    </li>
  );
}

// Export models for use in other components if needed
export { motorModels };