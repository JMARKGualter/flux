// Model URLs for the application
export const logoUrl = '/models/Logo.glb';
export const logo2Url = '/models/Logo2.glb';

// Model configuration interface
export interface ModelConfig {
  url: string;                       // Path to the GLB file
  position: [number, number, number]; // Camera position [x, y, z]
  target?: [number, number, number];  // Camera target [x, y, z]
  scale?: number;                     // Model scale factor
  name: string;                       // Display name
  category: string;                    // Category folder name
}

// ==================== BREADBOARD CATEGORY ====================
export const breadboardModels: Record<string, ModelConfig> = {
  'breadboard-63r10c': {
    url: '/models/breadboard/Breadboard63R10C.glb',
    position: [0, 2, 8],
    target: [0, 0, 0],
    scale: 20,
    name: 'Breadboard 63R10C',
    category: 'breadboard'
  },
  'breadboard-mini-17r10c': {
    url: '/models/breadboard/BreadboardMini17R10C.glb',
    position: [0, 2, 5],
    target: [0, 0, 0],
    scale: 15,
    name: 'Mini Breadboard 17R10C',
    category: 'breadboard'
  },
  'breadboard-small-30r10c': {
    url: '/models/breadboard/BreadboardSmall30R10C.glb',
    position: [0, 2, 6],
    target: [0, 0, 0],
    scale: 18,
    name: 'Small Breadboard 30R10C',
    category: 'breadboard'
  }
};

// ==================== DISPLAY CATEGORY ====================
export const displayModels: Record<string, ModelConfig> = {
  '7segment-clock': {
    url: '/models/display/7SegmentClockDisplay.glb',
    position: [0, 2, 6],
    target: [0, 0, 0],
    scale: 18,
    name: '7-Segment Clock Display',
    category: 'display'
  },
  '7segment': {
    url: '/models/display/7SegmentDisplay.glb',
    position: [0, 2, 5],
    target: [0, 0, 0],
    scale: 16,
    name: '7-Segment Display',
    category: 'display'
  },
  'lcd-16x2': {
    url: '/models/display/LCD16x2.glb',
    position: [0, 2, 7],
    target: [0, 0, 0],
    scale: 20,
    name: 'LCD 16x2',
    category: 'display'
  },
  'lcd-16x2-i2c': {
    url: '/models/display/LCD16x2_12C.glb', // Note: I2C typo in filename
    position: [0, 2, 7],
    target: [0, 0, 0],
    scale: 20,
    name: 'LCD 16x2 I2C',
    category: 'display'
  }
};

// ==================== GENERAL CATEGORY ====================
export const generalModels: Record<string, ModelConfig> = {
  'capacitor': {
    url: '/models/general/Capacitor.glb',
    position: [0, 1, 4],
    target: [0, 0, 0],
    scale: 12,
    name: 'Capacitor',
    category: 'general'
  },
  'diode': {
    url: '/models/general/Diode.glb',
    position: [0, 1, 3],
    target: [0, 0, 0],
    scale: 10,
    name: 'Diode',
    category: 'general'
  },
  'inductor': {
    url: '/models/general/Inductor.glb',
    position: [0, 1, 4],
    target: [0, 0, 0],
    scale: 12,
    name: 'Inductor',
    category: 'general'
  },
  'polarized-capacitor': {
    url: '/models/general/PolarizedCapacitor.glb',
    position: [0, 1, 4],
    target: [0, 0, 0],
    scale: 12,
    name: 'Polarized Capacitor',
    category: 'general'
  },
  'resistor': {
    url: '/models/general/Resistor.glb',
    position: [0, 1, 3],
    target: [0, 0, 0],
    scale: 10,
    name: 'Resistor',
    category: 'general'
  },
  'zener-diode': {
    url: '/models/general/ZenerDiode.glb',
    position: [0, 1, 3],
    target: [0, 0, 0],
    scale: 10,
    name: 'Zener Diode',
    category: 'general'
  }
};

// ==================== INPUT CATEGORY ====================
export const inputModels: Record<string, ModelConfig> = {
  '4x4-keypad': {
    url: '/models/input/4x4Keypad.glb',
    position: [0, 2, 7],
    target: [0, 0, 0],
    scale: 20,
    name: '4x4 Keypad',
    category: 'input'
  },
  'ambient-light-sensor': {
    url: '/models/input/AmbientLightSensor.glb',
    position: [0, 1, 5],
    target: [0, 0, 0],
    scale: 15,
    name: 'Ambient Light Sensor',
    category: 'input'
  },
  'dip-switch': {
    url: '/models/input/DipSwitch.glb',
    position: [0, 1, 4],
    target: [0, 0, 0],
    scale: 14,
    name: 'DIP Switch',
    category: 'input'
  },
  'flex-sensor': {
    url: '/models/input/FlexSensor.glb',
    position: [0, 1, 5],
    target: [0, 0, 0],
    scale: 15,
    name: 'Flex Sensor',
    category: 'input'
  },
  'force-sensor': {
    url: '/models/input/ForceSensor.glb',
    position: [0, 1, 4],
    target: [0, 0, 0],
    scale: 13,
    name: 'Force Sensor',
    category: 'input'
  },
  'gas-sensor': {
    url: '/models/input/GasSensor.glb',
    position: [0, 1, 5],
    target: [0, 0, 0],
    scale: 15,
    name: 'Gas Sensor',
    category: 'input'
  },
  'ir-sensor': {
    url: '/models/input/IRSensor.glb',
    position: [0, 1, 5],
    target: [0, 0, 0],
    scale: 16,
    name: 'IR Sensor',
    category: 'input'
  },
  'photodiode': {
    url: '/models/input/Photodiode.glb',
    position: [0, 1, 3],
    target: [0, 0, 0],
    scale: 10,
    name: 'Photodiode',
    category: 'input'
  },
  'photoresistor': {
    url: '/models/input/Photoresistor.glb',
    position: [0, 1, 3],
    target: [0, 0, 0],
    scale: 11,
    name: 'Photoresistor',
    category: 'input'
  },
  'pir-sensor': {
    url: '/models/input/PIRSensor.glb',
    position: [0, 1, 5],
    target: [0, 0, 0],
    scale: 15,
    name: 'PIR Sensor',
    category: 'input'
  },
  'potentiometer': {
    url: '/models/input/Potentiometer.glb',
    position: [0, 1, 4],
    target: [0, 0, 0],
    scale: 13,
    name: 'Potentiometer',
    category: 'input'
  },
  'push-button': {
    url: '/models/input/PushButton.glb',
    position: [0, 1, 3],
    target: [0, 0, 0],
    scale: 10,
    name: 'Push Button',
    category: 'input'
  },
  'slide-switch': {
    url: '/models/input/SlideSwitch.glb',
    position: [0, 1, 3],
    target: [0, 0, 0],
    scale: 11,
    name: 'Slide Switch',
    category: 'input'
  },
  'soil-moisture-sensor': {
    url: '/models/input/SoilMoistureSensor.glb',
    position: [0, 1, 5],
    target: [0, 0, 0],
    scale: 15,
    name: 'Soil Moisture Sensor',
    category: 'input'
  },
  'temperature-sensor': {
    url: '/models/input/TemperatureSensor.glb',
    position: [0, 1, 4],
    target: [0, 0, 0],
    scale: 12,
    name: 'Temperature Sensor',
    category: 'input'
  },
  'tilt-sensor': {
    url: '/models/input/TiltSensor.glb',
    position: [0, 1, 4],
    target: [0, 0, 0],
    scale: 13,
    name: 'Tilt Sensor',
    category: 'input'
  },
  'ultrasonic-sensor': {
    url: '/models/input/UltrasonicDistanceSensor.glb',
    position: [0, 1, 6],
    target: [0, 0, 0],
    scale: 18,
    name: 'Ultrasonic Distance Sensor',
    category: 'input'
  },
  'ultrasonic-sensor-4pin': {
    url: '/models/input/UltrasonicDistanceSensor4Pins.glb',
    position: [0, 1, 6],
    target: [0, 0, 0],
    scale: 18,
    name: 'Ultrasonic Sensor 4-Pin',
    category: 'input'
  }
};

// ==================== MOTOR CATEGORY ====================
export const motorModels: Record<string, ModelConfig> = {
  'dc-motor': {
    url: '/models/motor/DCMotor.glb',
    position: [0, 2, 5],
    target: [0, 0, 0],
    scale: 15,
    name: 'DC Motor',
    category: 'motor'
  },
  'dc-motor-encoder': {
    url: '/models/motor/DCMotorWithEncoder.glb',
    position: [0, 2, 6],
    target: [0, 0, 0],
    scale: 16,
    name: 'DC Motor with Encoder',
    category: 'motor'
  },
  'hobby-gear-motor': {
    url: '/models/motor/HobbyGearMotor.glb',
    position: [0, 2, 5],
    target: [0, 0, 0],
    scale: 15,
    name: 'Hobby Gear Motor',
    category: 'motor'
  },
  'micro-servo': {
    url: '/models/motor/MicroServo.glb',
    position: [0, 2, 4],
    target: [0, 0, 0],
    scale: 14,
    name: 'Micro Servo',
    category: 'motor'
  },
  'vibration-motor': {
    url: '/models/motor/VibrationMotor.glb',
    position: [0, 1, 4],
    target: [0, 0, 0],
    scale: 12,
    name: 'Vibration Motor',
    category: 'motor'
  }
};

// ==================== OUTPUT CATEGORY ====================
export const outputModels: Record<string, ModelConfig> = {
  'led': {
    url: '/models/output/LED.glb',
    position: [0, 1, 3],
    target: [0, 0, 0],
    scale: 10,
    name: 'LED',
    category: 'output'
  },
  'led-rgb': {
    url: '/models/output/LEDRGB.glb',
    position: [0, 1, 3],
    target: [0, 0, 0],
    scale: 11,
    name: 'RGB LED',
    category: 'output'
  },
  'light-bulb': {
    url: '/models/output/LightBulb.glb',
    position: [0, 2, 4],
    target: [0, 0, 0],
    scale: 14,
    name: 'Light Bulb',
    category: 'output'
  },
  'neopixel': {
    url: '/models/output/NeoPixel.glb',
    position: [0, 1, 4],
    target: [0, 0, 0],
    scale: 12,
    name: 'NeoPixel',
    category: 'output'
  },
  'piezo-buzzer': {
    url: '/models/output/PiezoBuzzer.glb',
    position: [0, 1, 4],
    target: [0, 0, 0],
    scale: 12,
    name: 'Piezo Buzzer',
    category: 'output'
  }
};

// ==================== POWER CATEGORY ====================
export const powerModels: Record<string, ModelConfig> = {
  'battery-1.5v': {
    url: '/models/power/1.5V Battery.glb',
    position: [0, 1, 4],
    target: [0, 0, 0],
    scale: 12,
    name: '1.5V Battery',
    category: 'power'
  },
  'battery-9v': {
    url: '/models/power/9V Battery.glb',
    position: [0, 1, 5],
    target: [0, 0, 0],
    scale: 14,
    name: '9V Battery',
    category: 'power'
  },
  'coin-cell': {
    url: '/models/power/CoinCell3V Battery.glb',
    position: [0, 1, 3],
    target: [0, 0, 0],
    scale: 10,
    name: 'Coin Cell 3V',
    category: 'power'
  },
  'solar-cell': {
    url: '/models/power/SolarCell.glb',
    position: [0, 1, 5],
    target: [0, 0, 0],
    scale: 16,
    name: 'Solar Cell',
    category: 'power'
  }
};

// ==================== POWER CONTROL CATEGORY ====================
export const powerControlModels: Record<string, ModelConfig> = {
  'nmos-mosfet': {
    url: '/models/powercontrol/NMOSMOSFET.glb',
    position: [0, 1, 4],
    target: [0, 0, 0],
    scale: 12,
    name: 'NMOS MOSFET',
    category: 'powercontrol'
  },
  'nmos-transistor': {
    url: '/models/powercontrol/NMOSTransistor.glb',
    position: [0, 1, 4],
    target: [0, 0, 0],
    scale: 11,
    name: 'NMOS Transistor',
    category: 'powercontrol'
  },
  'npn-transistor': {
    url: '/models/powercontrol/NPNTransistor.glb',
    position: [0, 1, 4],
    target: [0, 0, 0],
    scale: 11,
    name: 'NPN Transistor',
    category: 'powercontrol'
  },
  'pmos-mosfet': {
    url: '/models/powercontrol/PMOSMOSFET.glb',
    position: [0, 1, 4],
    target: [0, 0, 0],
    scale: 12,
    name: 'PMOS MOSFET',
    category: 'powercontrol'
  },
  'pmos-transistor': {
    url: '/models/powercontrol/PMOSTransistor.glb',
    position: [0, 1, 4],
    target: [0, 0, 0],
    scale: 11,
    name: 'PMOS Transistor',
    category: 'powercontrol'
  },
  'pnp-transistor': {
    url: '/models/powercontrol/PNPTransistor.glb',
    position: [0, 1, 4],
    target: [0, 0, 0],
    scale: 11,
    name: 'PNP Transistor',
    category: 'powercontrol'
  },
  'tip120': {
    url: '/models/powercontrol/TIP120.glb',
    position: [0, 1, 5],
    target: [0, 0, 0],
    scale: 14,
    name: 'TIP120 Transistor',
    category: 'powercontrol'
  }
};

// ==================== COMBINED MODELS ====================
// Combine all models for easy access
export const allModelsByCategory = {
  breadboard: breadboardModels,
  display: displayModels,
  general: generalModels,
  input: inputModels,
  motor: motorModels,
  output: outputModels,
  power: powerModels,
  powercontrol: powerControlModels
};

// Flat list of all models
export const allModels: ModelConfig[] = [
  ...Object.values(breadboardModels),
  ...Object.values(displayModels),
  ...Object.values(generalModels),
  ...Object.values(inputModels),
  ...Object.values(motorModels),
  ...Object.values(outputModels),
  ...Object.values(powerModels),
  ...Object.values(powerControlModels)
];

// Get models by category
export function getModelsByCategory(category: string): ModelConfig[] {
  switch(category) {
    case 'breadboard':
      return Object.values(breadboardModels);
    case 'display':
      return Object.values(displayModels);
    case 'general':
      return Object.values(generalModels);
    case 'input':
      return Object.values(inputModels);
    case 'motor':
      return Object.values(motorModels);
    case 'output':
      return Object.values(outputModels);
    case 'power':
      return Object.values(powerModels);
    case 'powercontrol':
      return Object.values(powerControlModels);
    default:
      return [];
  }
}

// Category display names for UI
export const categoryDisplayNames: Record<string, string> = {
  breadboard: 'Breadboards',
  display: 'Displays',
  general: 'General Components',
  input: 'Input Devices',
  motor: 'Motors & Drivers',
  output: 'Output Devices',
  power: 'Power Sources',
  powercontrol: 'Power Control'
};

// Component models for floating background (select a subset for performance)
export const floatingModels = [
  generalModels.resistor,
  generalModels.capacitor,
  generalModels.diode,
  outputModels.led,
  inputModels['push-button'],
  inputModels.potentiometer,
  powerModels['battery-1.5v'],
  powerModels['battery-9v'],
  motorModels['dc-motor'],
  generalModels.inductor
].filter(Boolean); // Remove any undefined entries