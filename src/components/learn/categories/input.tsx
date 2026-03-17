'use client';

import { Folder } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';

// Input components models configuration
// Using Display category camera settings for consistency
const inputModels = {
  '4x4-keypad': {
    url: '/models/input/4x4Keypad.glb',
    name: '4x4 Keypad',
    position: [30, 45, 65] as [number, number, number],
    target: [0, 8, 0] as [number, number, number],
    scale: 20,
    category: 'input'
  },
  'ambient-light-sensor': {
    url: '/models/input/AmbientLightSensor.glb',
    name: 'Ambient Light Sensor',
    position: [28, 42, 60] as [number, number, number],
    target: [0, 7, 0] as [number, number, number],
    scale: 16,
    category: 'input'
  },
  'dip-switch': {
    url: '/models/input/DipSwitch.glb',
    name: 'Dip Switch',
    position: [28, 42, 60] as [number, number, number],
    target: [0, 7, 0] as [number, number, number],
    scale: 16,
    category: 'input'
  },
  'flex-sensor': {
    url: '/models/input/FlexSensor.glb',
    name: 'Flex Sensor',
    position: [30, 45, 65] as [number, number, number],
    target: [0, 8, 0] as [number, number, number],
    scale: 18,
    category: 'input'
  },
  'force-sensor': {
    url: '/models/input/ForceSensor.glb',
    name: 'Force Sensor',
    position: [28, 42, 60] as [number, number, number],
    target: [0, 7, 0] as [number, number, number],
    scale: 16,
    category: 'input'
  },
  'gas-sensor': {
    url: '/models/input/GasSensor.glb',
    name: 'Gas Sensor',
    position: [30, 45, 65] as [number, number, number],
    target: [0, 8, 0] as [number, number, number],
    scale: 18,
    category: 'input'
  },
  'ir-sensor': {
    url: '/models/input/IRSensor.glb',
    name: 'IR Sensor',
    position: [30, 45, 65] as [number, number, number],
    target: [0, 8, 0] as [number, number, number],
    scale: 18,
    category: 'input'
  },
  'photodiode': {
    url: '/models/input/Photodiode.glb',
    name: 'Photodiode',
    position: [28, 42, 60] as [number, number, number],
    target: [0, 7, 0] as [number, number, number],
    scale: 15,
    category: 'input'
  },
  'photoresistor': {
    url: '/models/input/Photoresistor.glb',
    name: 'Photoresistor',
    position: [28, 42, 60] as [number, number, number],
    target: [0, 7, 0] as [number, number, number],
    scale: 15,
    category: 'input'
  },
  'pir-sensor': {
    url: '/models/input/PIRSensor.glb',
    name: 'PIR Sensor',
    position: [32, 48, 68] as [number, number, number],
    target: [0, 9, 0] as [number, number, number],
    scale: 20,
    category: 'input'
  },
  'potentiometer': {
    url: '/models/input/Potentiometer.glb',
    name: 'Potentiometer',
    position: [30, 45, 65] as [number, number, number],
    target: [0, 8, 0] as [number, number, number],
    scale: 18,
    category: 'input'
  },
  'push-button': {
    url: '/models/input/PushButton.glb',
    name: 'Push Button',
    position: [28, 42, 60] as [number, number, number],
    target: [0, 7, 0] as [number, number, number],
    scale: 15,
    category: 'input'
  },
  'slide-switch': {
    url: '/models/input/SlideSwitch.glb',
    name: 'Slide Switch',
    position: [28, 42, 60] as [number, number, number],
    target: [0, 7, 0] as [number, number, number],
    scale: 16,
    category: 'input'
  },
  'soil-moisture': {
    url: '/models/input/SoilMoistureSensor.glb',
    name: 'Soil Moisture Sensor',
    position: [32, 48, 68] as [number, number, number],
    target: [0, 9, 0] as [number, number, number],
    scale: 20,
    category: 'input'
  },
  'temperature-sensor': {
    url: '/models/input/TemperatureSensor.glb',
    name: 'Temperature Sensor',
    position: [28, 42, 60] as [number, number, number],
    target: [0, 7, 0] as [number, number, number],
    scale: 16,
    category: 'input'
  },
  'tilt-sensor': {
    url: '/models/input/TiltSensor.glb',
    name: 'Tilt Sensor',
    position: [30, 45, 65] as [number, number, number],
    target: [0, 8, 0] as [number, number, number],
    scale: 18,
    category: 'input'
  },
  'ultrasonic-sensor': {
    url: '/models/input/UltrasonicDistanceSensor.glb',
    name: 'Ultrasonic Sensor',
    position: [34, 50, 70] as [number, number, number],
    target: [0, 9, 0] as [number, number, number],
    scale: 22,
    category: 'input'
  },
  'ultrasonic-sensor-4pin': {
    url: '/models/input/UltrasonicDistanceSensor4Pins.glb',
    name: 'Ultrasonic Sensor (4 pins)',
    position: [34, 50, 70] as [number, number, number],
    target: [0, 9, 0] as [number, number, number],
    scale: 22,
    category: 'input'
  }
};

interface InputCategoryProps {
  onModelSelect: (
    url: string, 
    position: [number, number, number], 
    target: [number, number, number],
    scale?: number
  ) => void;
}

export function InputCategory({ onModelSelect }: InputCategoryProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Preload all input models with Draco
  useEffect(() => {
    Object.values(inputModels).forEach(model => {
      useGLTF.preload(model.url);
    });
  }, []);

  const handleModelClick = (modelId: string) => {
    const model = inputModels[modelId as keyof typeof inputModels];
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
        <span className="flex-1 text-left">Input</span>
        <span className="text-xs opacity-60">{isOpen ? '▼' : '►'}</span>
      </button>
      
      {isOpen && (
        <ul className="ml-6 mt-1 space-y-1 max-h-60 overflow-y-auto">
          <li
            onClick={() => handleModelClick('4x4-keypad')}
            className="flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors hover:bg-blue-500/10 text-sm"
          >
            <span className="w-1 h-1 rounded-full bg-blue-400"></span>
            <span>4x4 Keypad</span>
          </li>
          
          <li
            onClick={() => handleModelClick('ambient-light-sensor')}
            className="flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors hover:bg-blue-500/10 text-sm"
          >
            <span className="w-1 h-1 rounded-full bg-blue-400"></span>
            <span>Ambient Light Sensor</span>
          </li>
          
          <li
            onClick={() => handleModelClick('dip-switch')}
            className="flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors hover:bg-blue-500/10 text-sm"
          >
            <span className="w-1 h-1 rounded-full bg-blue-400"></span>
            <span>Dip Switch</span>
          </li>
          
          <li
            onClick={() => handleModelClick('flex-sensor')}
            className="flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors hover:bg-blue-500/10 text-sm"
          >
            <span className="w-1 h-1 rounded-full bg-blue-400"></span>
            <span>Flex Sensor</span>
          </li>
          
          <li
            onClick={() => handleModelClick('force-sensor')}
            className="flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors hover:bg-blue-500/10 text-sm"
          >
            <span className="w-1 h-1 rounded-full bg-blue-400"></span>
            <span>Force Sensor</span>
          </li>
          
          <li
            onClick={() => handleModelClick('gas-sensor')}
            className="flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors hover:bg-blue-500/10 text-sm"
          >
            <span className="w-1 h-1 rounded-full bg-blue-400"></span>
            <span>Gas Sensor</span>
          </li>
          
          <li
            onClick={() => handleModelClick('ir-sensor')}
            className="flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors hover:bg-blue-500/10 text-sm"
          >
            <span className="w-1 h-1 rounded-full bg-blue-400"></span>
            <span>IR Sensor</span>
          </li>
          
          <li
            onClick={() => handleModelClick('photodiode')}
            className="flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors hover:bg-blue-500/10 text-sm"
          >
            <span className="w-1 h-1 rounded-full bg-blue-400"></span>
            <span>Photodiode</span>
          </li>
          
          <li
            onClick={() => handleModelClick('photoresistor')}
            className="flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors hover:bg-blue-500/10 text-sm"
          >
            <span className="w-1 h-1 rounded-full bg-blue-400"></span>
            <span>Photoresistor</span>
          </li>
          
          <li
            onClick={() => handleModelClick('pir-sensor')}
            className="flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors hover:bg-blue-500/10 text-sm"
          >
            <span className="w-1 h-1 rounded-full bg-blue-400"></span>
            <span>PIR Sensor</span>
          </li>
          
          <li
            onClick={() => handleModelClick('potentiometer')}
            className="flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors hover:bg-blue-500/10 text-sm"
          >
            <span className="w-1 h-1 rounded-full bg-blue-400"></span>
            <span>Potentiometer</span>
          </li>
          
          <li
            onClick={() => handleModelClick('push-button')}
            className="flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors hover:bg-blue-500/10 text-sm"
          >
            <span className="w-1 h-1 rounded-full bg-blue-400"></span>
            <span>Push Button</span>
          </li>
          
          <li
            onClick={() => handleModelClick('slide-switch')}
            className="flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors hover:bg-blue-500/10 text-sm"
          >
            <span className="w-1 h-1 rounded-full bg-blue-400"></span>
            <span>Slide Switch</span>
          </li>
          
          <li
            onClick={() => handleModelClick('soil-moisture')}
            className="flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors hover:bg-blue-500/10 text-sm"
          >
            <span className="w-1 h-1 rounded-full bg-blue-400"></span>
            <span>Soil Moisture Sensor</span>
          </li>
          
          <li
            onClick={() => handleModelClick('temperature-sensor')}
            className="flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors hover:bg-blue-500/10 text-sm"
          >
            <span className="w-1 h-1 rounded-full bg-blue-400"></span>
            <span>Temperature Sensor</span>
          </li>
          
          <li
            onClick={() => handleModelClick('tilt-sensor')}
            className="flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors hover:bg-blue-500/10 text-sm"
          >
            <span className="w-1 h-1 rounded-full bg-blue-400"></span>
            <span>Tilt Sensor</span>
          </li>
          
          <li
            onClick={() => handleModelClick('ultrasonic-sensor')}
            className="flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors hover:bg-blue-500/10 text-sm"
          >
            <span className="w-1 h-1 rounded-full bg-blue-400"></span>
            <span>Ultrasonic Sensor</span>
          </li>
          
          <li
            onClick={() => handleModelClick('ultrasonic-sensor-4pin')}
            className="flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors hover:bg-blue-500/10 text-sm"
          >
            <span className="w-1 h-1 rounded-full bg-blue-400"></span>
            <span>Ultrasonic Sensor (4 pins)</span>
          </li>
        </ul>
      )}
    </li>
  );
}

// Export models for use in other components if needed
export { inputModels };