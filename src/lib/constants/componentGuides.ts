// ==================== COMPONENT GUIDES ====================
// This file contains all the guide content for different component categories.
// Your colleague can edit the text in this file to update the information displayed.

export interface GuideSection {
  title: string;
  content: string | string[];
  type?: 'paragraph' | 'list' | 'warning' | 'tip';
  icon?: string;
}

export interface ComponentGuide {
  title: string;
  icon?: string;
  sections: GuideSection[];
  commonMistakes?: string[];
  proTips?: string[];
}

// ==================== BREADBOARD GUIDE ====================
export const breadboardGuide: ComponentGuide = {
  title: 'Breadboard Guide',
  icon: 'CircuitBoard',
  sections: [
    {
      title: 'What is a Breadboard?',
      type: 'paragraph',
      icon: 'Info',
      content: 'A breadboard is a reusable solderless device used to build and test electronic circuits quickly. It has holes arranged in a grid where you can insert components and wires to create connections without soldering.'
    },
    {
      title: 'Power Rails',
      type: 'list',
      icon: 'Zap',
      content: [
        'Red Line (+) - Connected vertically, use for power (VCC, 5V, 3.3V)',
        'Blue Line (-) - Connected vertically, use for ground (GND)',
        'Each column of 5 holes is connected internally',
        'Usually have a gap in the middle separating left and right rails'
      ]
    },
    {
      title: 'Terminal Strips',
      type: 'list',
      icon: 'Grid',
      content: [
        'Rows labeled A-J (or 1-10) horizontally',
        'Each row of 5 holes (a-e or f-j) is connected',
        'The center channel separates the two sides',
        'Perfect for placing ICs across the center'
      ]
    },
    {
      title: 'How to Use',
      type: 'list',
      icon: 'Cpu',
      content: [
        'Insert components into holes - they\'ll grip firmly',
        'Use jumper wires to connect between rows',
        'Connect power to the red rails, ground to blue',
        'ICs straddle the center channel - pin 1 orientation matters',
        'Components in the same row (a-e) are connected'
      ]
    }
  ],
  proTips: [
    'Color-code your wires: red for power, black for ground',
    'Keep wires flat against the board for cleaner circuits',
    'Use shorter wires for better signal integrity',
    'Leave room around ICs for easy removal/changes',
    'Take photos of working circuits before disassembly'
  ],
  commonMistakes: [
    'Forgetting that rows are connected horizontally',
    'Putting IC pins in the same row (short circuit!)',
    'Not connecting both power rails together',
    'Using components with legs too thick/bent',
    'Leaving unused jumpers creating accidental connections'
  ]
};

// ==================== RESISTOR GUIDE ====================
export const resistorGuide: ComponentGuide = {
  title: 'Resistor Guide',
  icon: 'Circle',
  sections: [
    {
      title: 'What is a Resistor?',
      type: 'paragraph',
      icon: 'Info',
      content: 'A resistor is a passive two-terminal electrical component that implements electrical resistance as a circuit element. Resistors limit the flow of electric current.'
    },
    {
      title: 'Color Code Guide',
      type: 'list',
      icon: 'Palette',
      content: [
        'Black: 0',
        'Brown: 1',
        'Red: 2',
        'Orange: 3',
        'Yellow: 4',
        'Green: 5',
        'Blue: 6',
        'Violet: 7',
        'Gray: 8',
        'White: 9'
      ]
    },
    {
      title: 'Types of Resistors',
      type: 'list',
      icon: 'Layers',
      content: [
        'Carbon Film - Most common, low cost',
        'Metal Film - More precise, low noise',
        'Wire Wound - High power handling',
        'Variable (Potentiometer) - Adjustable resistance'
      ]
    }
  ],
  proTips: [
    'Read resistors from the side with bands closer together',
    'Use a multimeter to verify resistance values',
    'Leave space for heat dissipation in high-power circuits'
  ],
  commonMistakes: [
    'Reading color bands in the wrong direction',
    'Using too low power rating for the circuit',
    'Confusing tolerance bands with multiplier bands'
  ]
};

// ==================== CAPACITOR GUIDE ====================
export const capacitorGuide: ComponentGuide = {
  title: 'Capacitor Guide',
  icon: 'Layers',
  sections: [
    {
      title: 'What is a Capacitor?',
      type: 'paragraph',
      icon: 'Info',
      content: 'A capacitor is a passive two-terminal electrical component that stores electrical energy in an electric field. It consists of two conductive plates separated by an insulating dielectric.'
    },
    {
      title: 'Types of Capacitors',
      type: 'list',
      icon: 'Grid',
      content: [
        'Electrolytic - Polarized, high capacitance, use for power filtering',
        'Ceramic - Non-polarized, small values, good for high frequency',
        'Tantalum - Stable, compact, polarized',
        'Film - Non-polarized, good for audio applications'
      ]
    },
    {
      title: 'Reading Capacitor Values',
      type: 'list',
      icon: 'Hash',
      content: [
        'Electrolytic: Value printed directly (e.g., 100µF, 25V)',
        'Ceramic: 3-digit code (e.g., 104 = 10 × 10^4 pF = 100nF)',
        'First two digits are significant figures',
        'Third digit is the multiplier in pF'
      ]
    }
  ],
  proTips: [
    'Always observe polarity on electrolytic capacitors',
    'Use voltage rating at least 2x your circuit voltage',
    'Place capacitors close to ICs for better decoupling'
  ],
  commonMistakes: [
    'Connecting polarized capacitors backwards (can explode!)',
    'Using voltage rating too close to circuit voltage',
    'Confusing microfarads (µF) with picofarads (pF)'
  ]
};

// ==================== DIODE GUIDE ====================
export const diodeGuide: ComponentGuide = {
  title: 'Diode Guide',
  icon: 'ArrowRight',
  sections: [
    {
      title: 'What is a Diode?',
      type: 'paragraph',
      icon: 'Info',
      content: 'A diode is a semiconductor device that allows current to flow in only one direction. It acts as a one-way valve for electricity.'
    },
    {
      title: 'Common Types',
      type: 'list',
      icon: 'Layers',
      content: [
        'Rectifier Diode - General purpose power conversion',
        'Zener Diode - Voltage regulation, reverse breakdown',
        'Schottky Diode - Fast switching, low voltage drop',
        'LED - Light Emitting Diode, produces light'
      ]
    },
    {
      title: 'Identifying Polarity',
      type: 'list',
      icon: 'ArrowRight',
      content: [
        'Cathode (-) side usually has a stripe or band',
        'Anode (+) is the other side',
        'Current flows from Anode to Cathode',
        'LEDs: longer leg is Anode (+), shorter is Cathode (-)'
      ]
    }
  ],
  proTips: [
    'Use a multimeter in diode mode to test and identify pins',
    'Schottky diodes are great for low-voltage applications',
    'Add current-limiting resistors for LEDs'
  ],
  commonMistakes: [
    'Connecting diodes backwards (circuit won\'t work)',
    'Using rectifier diodes for high-frequency circuits',
    'Forgetting current-limiting resistors with LEDs'
  ]
};

// ==================== TRANSISTOR GUIDE ====================
export const transistorGuide: ComponentGuide = {
  title: 'Transistor Guide',
  icon: 'Cpu',
  sections: [
    {
      title: 'What is a Transistor?',
      type: 'paragraph',
      icon: 'Info',
      content: 'A transistor is a semiconductor device used to amplify or switch electronic signals. It is the fundamental building block of modern electronics.'
    },
    {
      title: 'Main Types',
      type: 'list',
      icon: 'Layers',
      content: [
        'BJT (Bipolar Junction Transistor) - Current-controlled',
        '  - NPN: Current flows when base is positive',
        '  - PNP: Current flows when base is negative',
        'MOSFET (Metal-Oxide-Semiconductor FET) - Voltage-controlled',
        '  - N-Channel: Turns on with positive gate voltage',
        '  - P-Channel: Turns on with negative gate voltage'
      ]
    },
    {
      title: 'Pin Identification',
      type: 'list',
      icon: 'Grid',
      content: [
        'BJT: Collector (C), Base (B), Emitter (E)',
        '  - NPN: Arrow on emitter points OUT',
        '  - PNP: Arrow on emitter points IN',
        'MOSFET: Drain (D), Gate (G), Source (S)'
      ]
    }
  ],
  proTips: [
    'Use a datasheet to confirm pinouts (they vary!)',
    'Add pull-down resistors for MOSFET gates',
    'Use heatsinks for power transistors'
  ],
  commonMistakes: [
    'Mixing up NPN and PNP pin connections',
    'Driving MOSFET gates without proper voltage',
    'Forgetting base current limiting resistors for BJTs'
  ]
};

// ==================== MOTOR GUIDE ====================
export const motorGuide: ComponentGuide = {
  title: 'Motor Guide',
  icon: 'Zap',
  sections: [
    {
      title: 'What is an Electric Motor?',
      type: 'paragraph',
      icon: 'Info',
      content: 'An electric motor converts electrical energy into mechanical motion through the interaction of magnetic fields.'
    },
    {
      title: 'Common Motor Types',
      type: 'list',
      icon: 'Layers',
      content: [
        'DC Motor - Simple, continuous rotation',
        'Servo Motor - Position control, limited rotation',
        'Stepper Motor - Precise positioning, rotates in steps',
        'Brushless DC Motor - Efficient, long life'
      ]
    },
    {
      title: 'Motor Driver Basics',
      type: 'list',
      icon: 'CircuitBoard',
      content: [
        'H-Bridge circuits allow direction control',
        'PWM controls speed',
        'Flyback diodes protect against voltage spikes',
        'Motor drivers like L298N, L293D simplify control'
      ]
    }
  ],
  proTips: [
    'Add capacitors across motor terminals to reduce noise',
    'Use separate power supply for motors and logic',
    'Stall current can be 5-10x running current'
  ],
  commonMistakes: [
    'Driving motors directly from microcontroller pins',
    'Forgetting flyback diodes (can damage components)',
    'Using underpowered power supply'
  ]
};

// ==================== SENSOR GUIDE ====================
export const sensorGuide: ComponentGuide = {
  title: 'Sensor Guide',
  icon: 'Activity',
  sections: [
    {
      title: 'What are Sensors?',
      type: 'paragraph',
      icon: 'Info',
      content: 'Sensors detect and respond to physical inputs from the environment. They convert physical phenomena into electrical signals.'
    },
    {
      title: 'Sensor Categories',
      type: 'list',
      icon: 'Layers',
      content: [
        'Temperature - Thermistors, thermocouples, LM35, DHT22',
        'Distance/Proximity - Ultrasonic, IR, LiDAR',
        'Light - Photoresistors, photodiodes, phototransistors',
        'Motion - PIR, accelerometers, gyroscopes',
        'Environmental - Gas, humidity, pressure'
      ]
    },
    {
      title: 'Output Types',
      type: 'list',
      icon: 'Grid',
      content: [
        'Analog - Variable voltage (e.g., potentiometer, photoresistor)',
        'Digital - HIGH/LOW output (e.g., PIR motion sensor)',
        'I2C/SPI - Digital communication protocol (e.g., accelerometers)',
        'One-Wire - Single pin data (e.g., DHT22)'
      ]
    }
  ],
  proTips: [
    'Add pull-up resistors for open-collector outputs',
    'Use shielded cables for sensitive analog sensors',
    'Calibrate sensors for accurate readings'
  ],
  commonMistakes: [
    'Powering sensors with insufficient voltage/current',
    'Ignoring sensor warm-up time',
    'Not accounting for sensor noise in readings'
  ]
};

// ==================== POWER GUIDE ====================
export const powerGuide: ComponentGuide = {
  title: 'Power Components Guide',
  icon: 'Battery',
  sections: [
    {
      title: 'Power Sources',
      type: 'list',
      icon: 'Battery',
      content: [
        'Batteries - Primary (non-rechargeable) and Secondary (rechargeable)',
        'Power Supplies - AC to DC converters, wall adapters',
        'Solar Cells - Photovoltaic panels',
        'Voltage Regulators - Maintain constant voltage'
      ]
    },
    {
      title: 'Battery Types',
      type: 'list',
      icon: 'Layers',
      content: [
        'Alkaline - Common primary cells, 1.5V',
        'Lithium-Ion - Rechargeable, 3.7V, high energy density',
        'NiMH - Rechargeable, 1.2V, environmentally friendly',
        'Lead-Acid - High current, 12V, for automotive'
      ]
    },
    {
      title: 'Voltage Regulators',
      type: 'list',
      icon: 'Zap',
      content: [
        'Linear Regulators (78xx series) - Simple, but inefficient',
        'Switching Regulators - Efficient, but more complex',
        'LDO (Low Dropout) - Works with small input-output difference'
      ]
    }
  ],
  proTips: [
    'Add decoupling capacitors near voltage regulators',
    'Calculate power requirements before choosing batteries',
    'Use reverse polarity protection diodes'
  ],
  commonMistakes: [
    'Connecting batteries in wrong polarity',
    'Mixing old and new batteries',
    'Overloading regulators beyond their current rating'
  ]
};

// ==================== MASTER GUIDE EXPORT ====================
// This object contains all component guides organized by category
export const componentGuides = {
  breadboard: breadboardGuide,
  resistor: resistorGuide,
  capacitor: capacitorGuide,
  diode: diodeGuide,
  transistor: transistorGuide,
  motor: motorGuide,
  sensor: sensorGuide,
  power: powerGuide,
  
  // Helper function to get guide by URL
  getGuideByUrl: (url: string): ComponentGuide | null => {
    const urlLower = url.toLowerCase();
    if (urlLower.includes('breadboard')) return breadboardGuide;
    if (urlLower.includes('resistor')) return resistorGuide;
    if (urlLower.includes('capacitor')) return capacitorGuide;
    if (urlLower.includes('diode')) return diodeGuide;
    if (urlLower.includes('transistor')) return transistorGuide;
    if (urlLower.includes('motor')) return motorGuide;
    if (urlLower.includes('sensor')) return sensorGuide;
    if (urlLower.includes('battery') || urlLower.includes('power') || urlLower.includes('cell') || urlLower.includes('solar')) return powerGuide;
    return null;
  }
};