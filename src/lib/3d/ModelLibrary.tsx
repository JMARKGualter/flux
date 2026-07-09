'use client';

import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// ==================== MODEL INTERFACES ====================
export interface ModelData {
  id: string;
  url: string;
  name: string;
  category: string;
  description?: string;
  specifications?: Record<string, string | number | boolean>; // Added boolean as allowed type
  defaultScale?: number;
  defaultPosition?: [number, number, number];
  defaultRotation?: [number, number, number];
}

export interface ModelComponentProps {
  modelId: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  onClick?: () => void;
  hoverEffect?: boolean;
  animation?: 'float' | 'rotate' | 'none';
}

// ==================== MODEL REGISTRY ====================
// Central registry of all available 3D models
export const modelRegistry: Record<string, ModelData> = {
  // ===== BREADBOARD CATEGORY =====
  'breadboard-63r10c': {
    id: 'breadboard-63r10c',
    url: '/models/breadboard/Breadboard63R10C.glb',
    name: 'Breadboard 63R10C',
    category: 'breadboard',
    description: 'Full-size breadboard with 63 rows and 10 columns',
    specifications: { rows: 63, columns: 10, powerRails: 2 },
    defaultScale: 20,
    defaultPosition: [0, 0, 0],
  },
  'breadboard-mini-17r10c': {
    id: 'breadboard-mini-17r10c',
    url: '/models/breadboard/BreadboardMini17R10C.glb',
    name: 'Mini Breadboard 17R10C',
    category: 'breadboard',
    description: 'Compact breadboard for small projects',
    specifications: { rows: 17, columns: 10, powerRails: 2 },
    defaultScale: 15,
    defaultPosition: [0, 0, 0],
  },
  'breadboard-small-30r10c': {
    id: 'breadboard-small-30r10c',
    url: '/models/breadboard/BreadboardSmall30R10C.glb',
    name: 'Small Breadboard 30R10C',
    category: 'breadboard',
    description: 'Medium-sized breadboard for prototyping',
    specifications: { rows: 30, columns: 10, powerRails: 2 },
    defaultScale: 18,
    defaultPosition: [0, 0, 0],
  },

  // ===== DISPLAY CATEGORY =====
  '7segment-clock': {
    id: '7segment-clock',
    url: '/models/display/7SegmentClockDisplay.glb',
    name: '7-Segment Clock Display',
    category: 'display',
    description: '4-digit 7-segment display with colon for clock projects',
    defaultScale: 18,
    defaultPosition: [0, 0, 0],
  },
  '7segment': {
    id: '7segment',
    url: '/models/display/7SegmentDisplay.glb',
    name: '7-Segment Display',
    category: 'display',
    description: 'Single-digit 7-segment display',
    defaultScale: 16,
    defaultPosition: [0, 0, 0],
  },
  'lcd-16x2': {
    id: 'lcd-16x2',
    url: '/models/display/LCD16x2.glb',
    name: 'LCD 16x2',
    category: 'display',
    description: '16x2 character LCD display',
    specifications: { rows: 2, columns: 16, backlight: "yes" }, // Changed boolean to string
    defaultScale: 20,
    defaultPosition: [0, 0, 0],
  },
  'lcd-16x2-i2c': {
    id: 'lcd-16x2-i2c',
    url: '/models/display/LCD16x2_I2C.glb',
    name: 'LCD 16x2 I2C',
    category: 'display',
    description: '16x2 LCD with I2C backpack',
    specifications: { rows: 2, columns: 16, interface: 'I2C' },
    defaultScale: 20,
    defaultPosition: [0, 0, 0],
  },

  // ===== GENERAL COMPONENTS =====
  'capacitor': {
    id: 'capacitor',
    url: '/models/general/Capacitor.glb',
    name: 'Capacitor',
    category: 'general',
    description: 'Ceramic disc capacitor',
    defaultScale: 12,
    defaultPosition: [0, 0, 0],
  },
  'polarized-capacitor': {
    id: 'polarized-capacitor',
    url: '/models/general/PolarizedCapacitor.glb',
    name: 'Polarized Capacitor',
    category: 'general',
    description: 'Electrolytic capacitor with polarity marking',
    defaultScale: 12,
    defaultPosition: [0, 0, 0],
  },
  'resistor': {
    id: 'resistor',
    url: '/models/general/Resistor.glb',
    name: 'Resistor',
    category: 'general',
    description: 'Carbon film resistor with color bands',
    defaultScale: 10,
    defaultPosition: [0, 0, 0],
  },
  'diode': {
    id: 'diode',
    url: '/models/general/Diode.glb',
    name: 'Diode',
    category: 'general',
    description: 'Standard silicon diode',
    defaultScale: 10,
    defaultPosition: [0, 0, 0],
  },
  'zener-diode': {
    id: 'zener-diode',
    url: '/models/general/ZenerDiode.glb',
    name: 'Zener Diode',
    category: 'general',
    description: 'Zener diode for voltage regulation',
    defaultScale: 10,
    defaultPosition: [0, 0, 0],
  },
  'inductor': {
    id: 'inductor',
    url: '/models/general/Inductor.glb',
    name: 'Inductor',
    category: 'general',
    description: 'Wire-wound inductor',
    defaultScale: 12,
    defaultPosition: [0, 0, 0],
  },

  // ===== INPUT DEVICES =====
  'push-button': {
    id: 'push-button',
    url: '/models/input/PushButton.glb',
    name: 'Push Button',
    category: 'input',
    description: 'Tactile push button switch',
    defaultScale: 10,
    defaultPosition: [0, 0, 0],
  },
  'slide-switch': {
    id: 'slide-switch',
    url: '/models/input/SlideSwitch.glb',
    name: 'Slide Switch',
    category: 'input',
    description: 'SPDT slide switch',
    defaultScale: 11,
    defaultPosition: [0, 0, 0],
  },
  'dip-switch': {
    id: 'dip-switch',
    url: '/models/input/DipSwitch.glb',
    name: 'DIP Switch',
    category: 'input',
    description: '4-position DIP switch',
    defaultScale: 14,
    defaultPosition: [0, 0, 0],
  },
  'potentiometer': {
    id: 'potentiometer',
    url: '/models/input/Potentiometer.glb',
    name: 'Potentiometer',
    category: 'input',
    description: '10kΩ rotary potentiometer',
    defaultScale: 13,
    defaultPosition: [0, 0, 0],
  },
  'keypad-4x4': {
    id: 'keypad-4x4',
    url: '/models/input/4x4Keypad.glb',
    name: '4x4 Matrix Keypad',
    category: 'input',
    description: '16-button matrix keypad',
    defaultScale: 20,
    defaultPosition: [0, 0, 0],
  },

  // ===== SENSORS =====
  'temperature-sensor': {
    id: 'temperature-sensor',
    url: '/models/input/TemperatureSensor.glb',
    name: 'Temperature Sensor',
    category: 'sensors',
    description: 'LM35 or similar temperature sensor',
    defaultScale: 12,
    defaultPosition: [0, 0, 0],
  },
  'pir-sensor': {
    id: 'pir-sensor',
    url: '/models/input/PIRSensor.glb',
    name: 'PIR Motion Sensor',
    category: 'sensors',
    description: 'Passive infrared motion detector',
    defaultScale: 15,
    defaultPosition: [0, 0, 0],
  },
  'ultrasonic-sensor': {
    id: 'ultrasonic-sensor',
    url: '/models/input/UltrasonicDistanceSensor.glb',
    name: 'Ultrasonic Distance Sensor',
    category: 'sensors',
    description: 'HC-SR04 ultrasonic distance sensor',
    defaultScale: 18,
    defaultPosition: [0, 0, 0],
  },
  'ir-sensor': {
    id: 'ir-sensor',
    url: '/models/input/IRSensor.glb',
    name: 'IR Sensor',
    category: 'sensors',
    description: 'Infrared obstacle detection sensor',
    defaultScale: 16,
    defaultPosition: [0, 0, 0],
  },
  'photoresistor': {
    id: 'photoresistor',
    url: '/models/input/Photoresistor.glb',
    name: 'Photoresistor (LDR)',
    category: 'sensors',
    description: 'Light-dependent resistor',
    defaultScale: 11,
    defaultPosition: [0, 0, 0],
  },
  'soil-moisture': {
    id: 'soil-moisture',
    url: '/models/input/SoilMoistureSensor.glb',
    name: 'Soil Moisture Sensor',
    category: 'sensors',
    description: 'Capacitive soil moisture sensor',
    defaultScale: 15,
    defaultPosition: [0, 0, 0],
  },
  'ambient-light-sensor': {
    id: 'ambient-light-sensor',
    url: '/models/input/AmbientLightSensor.glb',
    name: 'Ambient Light Sensor',
    category: 'sensors',
    description: 'Analog ambient light sensor',
    defaultScale: 12,
    defaultPosition: [0, 0, 0],
  },
  'flex-sensor': {
    id: 'flex-sensor',
    url: '/models/input/FlexSensor.glb',
    name: 'Flex Sensor',
    category: 'sensors',
    description: 'Bend-sensitive resistive strip',
    defaultScale: 15,
    defaultPosition: [0, 0, 0],
  },
  'force-sensor': {
    id: 'force-sensor',
    url: '/models/input/ForceSensor.glb',
    name: 'Force Sensor',
    category: 'sensors',
    description: 'Force-sensitive resistor (FSR)',
    defaultScale: 14,
    defaultPosition: [0, 0, 0],
  },
  'gas-sensor': {
    id: 'gas-sensor',
    url: '/models/input/GasSensor.glb',
    name: 'Gas Sensor',
    category: 'sensors',
    description: 'MQ-series gas sensor module',
    defaultScale: 14,
    defaultPosition: [0, 0, 0],
  },
  'photodiode': {
    id: 'photodiode',
    url: '/models/input/Photodiode.glb',
    name: 'Photodiode',
    category: 'sensors',
    description: 'Light-sensitive diode',
    defaultScale: 10,
    defaultPosition: [0, 0, 0],
  },
  'tilt-sensor': {
    id: 'tilt-sensor',
    url: '/models/input/TiltSensor.glb',
    name: 'Tilt Sensor',
    category: 'sensors',
    description: 'Ball-type tilt switch',
    defaultScale: 11,
    defaultPosition: [0, 0, 0],
  },
  'ultrasonic-sensor-4pin': {
    id: 'ultrasonic-sensor-4pin',
    url: '/models/input/UltrasonicDistanceSensor4Pins.glb',
    name: 'Ultrasonic Sensor (4 pins)',
    category: 'sensors',
    description: '4-pin ultrasonic distance sensor',
    defaultScale: 18,
    defaultPosition: [0, 0, 0],
  },

  // ===== MICROCONTROLLER =====
  'trioe-board': {
    id: 'trioe-board',
    url: '/models/microcontroller/TrioeBoard.glb',
    name: 'Trioe Board',
    category: 'microcontroller',
    description: 'TRIOE development board',
    defaultScale: 20,
    defaultPosition: [0, 0, 0],
  },
  'trioe-breadboard': {
    id: 'trioe-breadboard',
    url: '/models/microcontroller/TrioeBreadboard.glb',
    name: 'Trioe Breadboard',
    category: 'microcontroller',
    description: 'TRIOE breadboard companion',
    defaultScale: 20,
    defaultPosition: [0, 0, 0],
  },

  // ===== OUTPUT DEVICES =====
  'led-red': {
    id: 'led-red',
    url: '/models/output/LED.glb',
    name: 'Red LED',
    category: 'output',
    description: '5mm red LED',
    defaultScale: 10,
    defaultPosition: [0, 0, 0],
  },
  'led-rgb': {
    id: 'led-rgb',
    url: '/models/output/LEDRGB.glb',
    name: 'RGB LED',
    category: 'output',
    description: 'Common cathode RGB LED',
    defaultScale: 11,
    defaultPosition: [0, 0, 0],
  },
  'buzzer': {
    id: 'buzzer',
    url: '/models/output/PiezoBuzzer.glb',
    name: 'Piezo Buzzer',
    category: 'output',
    description: 'Magnetic or piezo buzzer',
    defaultScale: 12,
    defaultPosition: [0, 0, 0],
  },
  'neopixel': {
    id: 'neopixel',
    url: '/models/output/NeoPixel.glb',
    name: 'NeoPixel LED',
    category: 'output',
    description: 'Addressable RGB LED',
    defaultScale: 12,
    defaultPosition: [0, 0, 0],
  },
  'lightbulb': {
    id: 'lightbulb',
    url: '/models/output/LightBulb.glb',
    name: 'LightBulb',
    category: 'output',
    description: 'Incandescent light bulb',
    defaultScale: 14,
    defaultPosition: [0, 0, 0],
  },

  // ===== MOTORS =====
  'dc-motor': {
    id: 'dc-motor',
    url: '/models/motor/DCMotor.glb',
    name: 'DC Motor',
    category: 'motor',
    description: 'Standard DC motor',
    defaultScale: 15,
    defaultPosition: [0, 0, 0],
  },
  'servo-micro': {
    id: 'servo-micro',
    url: '/models/motor/MicroServo.glb',
    name: 'Micro Servo',
    category: 'motor',
    description: '9g micro servo motor',
    defaultScale: 14,
    defaultPosition: [0, 0, 0],
  },
  'dc-motor-encoder': {
    id: 'dc-motor-encoder',
    url: '/models/motor/DCMotorWithEncoder.glb',
    name: 'DC Motor with Encoder',
    category: 'motor',
    description: 'DC motor with rotary encoder feedback',
    defaultScale: 15,
    defaultPosition: [0, 0, 0],
  },
  'hobby-gear-motor': {
    id: 'hobby-gear-motor',
    url: '/models/motor/HobbyGearMotor.glb',
    name: 'Hobby Gear Motor',
    category: 'motor',
    description: 'Yellow TT hobby gear motor',
    defaultScale: 15,
    defaultPosition: [0, 0, 0],
  },
  'vibration-motor': {
    id: 'vibration-motor',
    url: '/models/motor/VibrationMotor.glb',
    name: 'Vibration Motor',
    category: 'motor',
    description: 'Coin-type vibration motor',
    defaultScale: 12,
    defaultPosition: [0, 0, 0],
  },

  // ===== POWER SOURCES =====
  'battery-aa': {
    id: 'battery-aa',
    url: '/models/power/1.5VBattery.glb',
    name: 'AA Battery (1.5V)',
    category: 'power',
    description: 'Standard AA battery',
    defaultScale: 12,
    defaultPosition: [0, 0, 0],
  },
  'battery-9v': {
    id: 'battery-9v',
    url: '/models/power/9VBattery.glb',
    name: '9V Battery',
    category: 'power',
    description: 'PP3 9V battery',
    defaultScale: 14,
    defaultPosition: [0, 0, 0],
  },
  'coin-cell': {
    id: 'coin-cell',
    url: '/models/power/CoinCell3VBattery.glb',
    name: 'Coin Cell (3V)',
    category: 'power',
    description: 'CR2032 coin cell battery',
    defaultScale: 10,
    defaultPosition: [0, 0, 0],
  },
  'solar-cell': {
    id: 'solar-cell',
    url: '/models/power/SolarCell.glb',
    name: 'Solar Cell',
    category: 'power',
    description: 'Small photovoltaic solar cell',
    defaultScale: 16,
    defaultPosition: [0, 0, 0],
  },

  // ===== POWER CONTROL =====
  'nmos-transistor': {
    id: 'nmos-transistor',
    url: '/models/powercontrol/NMOSTransistor.glb',
    name: 'NMOS Transistor',
    category: 'powercontrol',
    description: 'N-channel MOSFET',
    defaultScale: 11,
    defaultPosition: [0, 0, 0],
  },
  'pmos-transistor': {
    id: 'pmos-transistor',
    url: '/models/powercontrol/PMOSTransistor.glb',
    name: 'PMOS Transistor',
    category: 'powercontrol',
    description: 'P-channel MOSFET',
    defaultScale: 11,
    defaultPosition: [0, 0, 0],
  },
  'nmos-mosfet': {
    id: 'nmos-mosfet',
    url: '/models/powercontrol/NMOSMOSFET.glb',
    name: 'nMOS MOSFET',
    category: 'powercontrol',
    description: 'N-channel power MOSFET',
    defaultScale: 11,
    defaultPosition: [0, 0, 0],
  },
  'pmos-mosfet': {
    id: 'pmos-mosfet',
    url: '/models/powercontrol/PMOSMOSFET.glb',
    name: 'pMOS MOSFET',
    category: 'powercontrol',
    description: 'P-channel power MOSFET',
    defaultScale: 11,
    defaultPosition: [0, 0, 0],
  },
  'npn-transistor': {
    id: 'npn-transistor',
    url: '/models/powercontrol/NPNTransistor.glb',
    name: 'NPN Transistor',
    category: 'powercontrol',
    description: 'NPN bipolar junction transistor',
    defaultScale: 11,
    defaultPosition: [0, 0, 0],
  },
  'pnp-transistor': {
    id: 'pnp-transistor',
    url: '/models/powercontrol/PNPTransistor.glb',
    name: 'PNP Transistor',
    category: 'powercontrol',
    description: 'PNP bipolar junction transistor',
    defaultScale: 11,
    defaultPosition: [0, 0, 0],
  },
  'tip120': {
    id: 'tip120',
    url: '/models/powercontrol/TIP120.glb',
    name: 'TIP120 Darlington',
    category: 'powercontrol',
    description: 'TIP120 Darlington transistor pair',
    defaultScale: 14,
    defaultPosition: [0, 0, 0],
  },
};

// ==================== HELPER FUNCTIONS ====================
export function getModelsByCategory(category: string): ModelData[] {
  return Object.values(modelRegistry).filter(model => model.category === category);
}

export function getAllCategories(): string[] {
  const categories = new Set(Object.values(modelRegistry).map(model => model.category));
  return Array.from(categories);
}

export function searchModels(query: string): ModelData[] {
  const lowercaseQuery = query.toLowerCase();
  return Object.values(modelRegistry).filter(model => 
    model.name.toLowerCase().includes(lowercaseQuery) ||
    model.category.toLowerCase().includes(lowercaseQuery) ||
    model.description?.toLowerCase().includes(lowercaseQuery)
  );
}

// ==================== PRELOAD ALL MODELS ====================
export function preloadAllModels() {
  Object.values(modelRegistry).forEach(model => {
    useGLTF.preload(model.url);
  });
}