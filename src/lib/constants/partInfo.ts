// ==================== COMPONENT PART INFORMATION ====================
// This file contains organized part information for each component type.
// Your colleague can edit the text in this file to update the information displayed.

export interface PartInfo {
  partName: string;
  description: string;
  category?: string;
}

export interface ComponentPartInfo {
  [key: string]: PartInfo[];
}

// Organize parts by component type for better maintainability
export const componentPartInfo: ComponentPartInfo = {
  // Breadboard Parts
  breadboard: [
    {
      partName: "Power Rails",
      description: "The long rows marked with red (+) and blue (-) on the sides. Connected vertically, use for power (VCC, 5V, 3.3V) and ground (GND).",
      category: "Power Distribution"
    },
    {
      partName: "Terminal Strips",
      description: "The main area where components are placed. Each row of 5 holes (a-e or f-j) is connected horizontally.",
      category: "Component Area"
    },
    {
      partName: "Center Channel",
      description: "The gap in the middle that separates the two sides. Perfect for placing ICs across the channel.",
      category: "Structure"
    }
  ],

  // Resistor Parts
  resistor: [
    {
      partName: "Resistor Body",
      description: "The main ceramic body that contains the resistive element. It limits the flow of electric current.",
      category: "Main Body"
    },
    {
      partName: "Color Bands",
      description: "Colored rings that indicate the resistance value, tolerance, and sometimes temperature coefficient.",
      category: "Markings"
    },
    {
      partName: "Leads",
      description: "Metal wires on both ends that connect the resistor to the circuit. They are typically tinned copper.",
      category: "Terminals"
    }
  ],

  // LED Parts
  led: [
    {
      partName: "LED Lens/Epoxy Body",
      description: "The colored or clear dome that focuses and diffuses light. It's made of epoxy resin and contains the LED chip.",
      category: "Optics"
    },
    {
      partName: "Anode (+)",
      description: "The longer lead. Current flows into the LED through this pin. Connect to positive voltage.",
      category: "Terminals"
    },
    {
      partName: "Cathode (-)",
      description: "The shorter lead. Current flows out of the LED through this pin. Connect to ground.",
      category: "Terminals"
    },
    {
      partName: "LED Chip",
      description: "The semiconductor die inside that actually emits light when current passes through it.",
      category: "Active Element"
    }
  ],

  // Capacitor Parts
  capacitor: [
    {
      partName: "Capacitor Body",
      description: "The cylindrical or rectangular housing that contains the plates and dielectric material.",
      category: "Main Body"
    },
    {
      partName: "Positive Lead (+)",
      description: "The longer lead on polarized capacitors. Must be connected to higher potential. Usually marked with a stripe.",
      category: "Terminals"
    },
    {
      partName: "Negative Lead (-)",
      description: "The shorter lead on polarized capacitors. Must be connected to lower potential or ground.",
      category: "Terminals"
    },
    {
      partName: "Dielectric Material",
      description: "The insulating layer between plates that stores electrical energy. Can be ceramic, electrolytic, tantalum, etc.",
      category: "Internal"
    }
  ],

  // Diode Parts
  diode: [
    {
      partName: "Diode Body",
      description: "The cylindrical or rectangular housing that contains the semiconductor junction.",
      category: "Main Body"
    },
    {
      partName: "Cathode Band",
      description: "The striped or marked end indicating the cathode (-) side where current flows out.",
      category: "Markings"
    },
    {
      partName: "Anode Lead",
      description: "The unmarked end where current enters the diode. Connect to positive side.",
      category: "Terminals"
    },
    {
      partName: "P-N Junction",
      description: "The internal semiconductor junction that allows current to flow in only one direction.",
      category: "Active Element"
    }
  ],

  // Transistor Parts
  transistor: [
    {
      partName: "Transistor Body",
      description: "The plastic or metal housing that protects the internal semiconductor die.",
      category: "Main Body"
    },
    {
      partName: "Collector (C)",
      description: "The pin that collects current. For NPN, connect to positive through load. For PNP, connect to ground.",
      category: "Terminals"
    },
    {
      partName: "Base (B)",
      description: "The control pin. A small current here controls a larger current between collector and emitter.",
      category: "Terminals"
    },
    {
      partName: "Emitter (E)",
      description: "The pin that emits current. For NPN, connect to ground. For PNP, connect to positive.",
      category: "Terminals"
    }
  ],

  // Motor Parts
  motor: [
    {
      partName: "Motor Housing",
      description: "The metal or plastic casing that protects internal components and provides mounting points.",
      category: "Structure"
    },
    {
      partName: "Output Shaft",
      description: "The rotating rod that delivers mechanical power to your project. May be round or D-shaped.",
      category: "Mechanical"
    },
    {
      partName: "Power Terminals",
      description: "The two wires or terminals where DC power is applied. Reversing polarity changes rotation direction.",
      category: "Electrical"
    },
    {
      partName: "Mounting Flanges",
      description: "Holes or tabs on the housing for securing the motor to your project.",
      category: "Mounting"
    }
  ],

  // Sensor Parts
  sensor: [
    {
      partName: "Sensor Body",
      description: "The main housing that contains the sensing element and support circuitry.",
      category: "Main Body"
    },
    {
      partName: "Sensing Element",
      description: "The actual component that detects physical phenomena (light, temperature, motion, etc.).",
      category: "Active Element"
    },
    {
      partName: "VCC/Power Pin",
      description: "Connect to positive voltage (usually 3.3V or 5V) to power the sensor.",
      category: "Power"
    },
    {
      partName: "GND/Ground Pin",
      description: "Connect to ground (0V) to complete the circuit.",
      category: "Power"
    },
    {
      partName: "Signal/Output Pin",
      description: "The pin that outputs the sensor reading, either as analog voltage or digital signal.",
      category: "Signal"
    }
  ],

  // Battery/Power Parts
  power: [
    {
      partName: "Positive Terminal (+)",
      description: "The end where current flows out to power your circuit. Usually marked with a plus sign.",
      category: "Terminals"
    },
    {
      partName: "Negative Terminal (-)",
      description: "The end where current returns to the battery. Usually marked with a minus sign.",
      category: "Terminals"
    },
    {
      partName: "Battery Body",
      description: "The outer casing that contains the electrochemical cells and provides protection.",
      category: "Structure"
    },
    {
      partName: "Vent/Seal",
      description: "Safety feature that releases pressure if the battery overheats or malfunctions.",
      category: "Safety"
    }
  ],

  // Default/General Parts
  general: [
    {
      partName: "Component Body",
      description: "The main housing that contains and protects the internal elements.",
      category: "Structure"
    },
    {
      partName: "Terminal/Pin",
      description: "Metal connection point for soldering or inserting into breadboards.",
      category: "Electrical"
    },
    {
      partName: "Markings",
      description: "Labels, numbers, or symbols that identify the component and its specifications.",
      category: "Identification"
    }
  ]
};

// Helper function to get part info for a specific component
export const getPartInfoForComponent = (url: string): PartInfo[] => {
  const urlLower = url.toLowerCase();
  
  if (urlLower.includes('breadboard')) return componentPartInfo.breadboard;
  if (urlLower.includes('resistor')) return componentPartInfo.resistor;
  if (urlLower.includes('led')) return componentPartInfo.led;
  if (urlLower.includes('light')) return componentPartInfo.led;
  if (urlLower.includes('capacitor')) return componentPartInfo.capacitor;
  if (urlLower.includes('diode')) return componentPartInfo.diode;
  if (urlLower.includes('transistor')) return componentPartInfo.transistor;
  if (urlLower.includes('motor')) return componentPartInfo.motor;
  if (urlLower.includes('sensor')) return componentPartInfo.sensor;
  if (urlLower.includes('battery') || urlLower.includes('power') || urlLower.includes('cell') || urlLower.includes('solar')) {
    return componentPartInfo.power;
  }
  
  return componentPartInfo.general;
};