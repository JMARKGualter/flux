// ==================== COMPONENT TRIVIA ====================
// This file contains all trivia facts for different component categories.
// Your colleague can edit the text in this file to update the trivia displayed.

export interface TriviaItem {
  fact: string;
  source?: string;
  year?: string;
}

export interface ComponentTrivia {
  [key: string]: TriviaItem[];
}

// Trivia organized by component type
export const componentTrivia: ComponentTrivia = {
  // Resistor Trivia
  resistor: [
    {
      fact: "Resistors were invented in 1885 by Otis Boykin. He also invented the control unit for the pacemaker!",
      source: "IEEE History",
      year: "1885"
    },
    {
      fact: "The first resistors were made of carbon composition and are still used today in high-energy applications.",
      source: "Electronic History Magazine"
    },
    {
      fact: "Resistor color codes were developed in the 1920s by the RMA (Radio Manufacturers Association) to make value identification easier for soldiers repairing radios in the field.",
      year: "1920s"
    },
    {
      fact: "The most common failure mode for a resistor is an open circuit, usually due to overheating or exceeding power ratings.",
      source: "Failure Analysis Journal"
    }
  ],

  // LED Trivia
  led: [
    {
      fact: "The first visible-spectrum LED was invented in 1962 by Nick Holonyak Jr. while working at General Electric. His colleagues called it 'the magic one'.",
      source: "General Electric Archives",
      year: "1962"
    },
    {
      fact: "LEDs can last up to 100,000 hours - that's over 11 years of continuous use! Traditional incandescent bulbs last only about 1,000 hours.",
      source: "Energy.gov"
    },
    {
      fact: "The blue LED was so difficult to create that it took nearly 30 years after red and green LEDs were invented. The inventors won the Nobel Prize in Physics in 2014.",
      year: "2014"
    },
    {
      fact: "LEDs are so efficient that if every American home replaced just one incandescent bulb with an LED, it would save enough energy to power 3 million homes for a year.",
      source: "Department of Energy"
    }
  ],

  // Capacitor Trivia
  capacitor: [
    {
      fact: "The first capacitor was invented in 1745 by Ewald Georg von Kleist. It was called a 'Leyden jar' and could store a deadly electric shock.",
      source: "Smithsonian Institution",
      year: "1745"
    },
    {
      fact: "A single lightning bolt contains enough energy to charge hundreds of thousands of capacitors, but the discharge happens too quickly to capture effectively.",
      source: "MIT Technology Review"
    },
    {
      fact: "Supercapacitors can store 10 to 100 times more energy per unit volume than electrolytic capacitors and can charge/discharge in seconds.",
      source: "Journal of Power Sources"
    },
    {
      fact: "The capacitance of the Earth itself is about 710 microfarads - roughly the same as a large electrolytic capacitor!",
      source: "Physics Today"
    }
  ],

  // Transistor Trivia
  transistor: [
    {
      fact: "The first transistor was invented at Bell Labs in 1947 by John Bardeen, Walter Brattain, and William Shockley. They won the Nobel Prize in 1956.",
      source: "Bell Labs Records",
      year: "1947"
    },
    {
      fact: "Early transistors were called 'transfer resistors' because they transfer current from a low-resistance to a high-resistance source. The name was later shortened to 'transistor'.",
      source: "IEEE Spectrum"
    },
    {
      fact: "Modern smartphones contain over 15 billion transistors. If you placed them end-to-end, they would stretch for over 300,000 miles - farther than the moon!",
      source: "TechInsights"
    },
    {
      fact: "The first transistor radio (1954) cost $49.95 - equivalent to about $500 today - and was considered a luxury item.",
      year: "1954"
    }
  ],

  // Breadboard Trivia
  breadboard: [
    {
      fact: "Breadboards got their name from old-timey kitchen breadboards where people would literally nail circuits to a wooden board to prototype their designs.",
      source: "Electronic Design Magazine"
    },
    {
      fact: "The first solderless breadboard was invented by Ronald Portugal in 1971 while he was an engineer at E&L Instruments.",
      year: "1971"
    },
    {
      fact: "The holes in a breadboard are spring-loaded to grip component leads tightly. These springs are typically made of beryllium copper alloy for excellent conductivity and memory.",
      source: "Materials Science Journal"
    },
    {
      fact: "A standard full-size breadboard has around 2,000 connection points and can be used for thousands of projects before the springs lose their tension.",
      source: "Prototyping Magazine"
    }
  ],

  // Diode Trivia
  diode: [
    {
      fact: "Diodes were originally called 'valves' because they act like one-way valves for electricity. The term is still used in the UK and Commonwealth countries.",
      source: "British Science Museum"
    },
    {
      fact: "The first diode was actually a 'cat's whisker' detector used in early crystal radios in the 1900s. It consisted of a thin wire touching a crystal of galena.",
      year: "1906"
    },
    {
      fact: "Zener diodes are named after Clarence Zener, who discovered the Zener effect in 1934. He was a physicist who never actually worked with diodes!",
      source: "Physical Review Letters"
    },
    {
      fact: "Schottky diodes can switch on and off in picoseconds (trillionths of a second), making them essential for high-frequency applications like 5G and radar.",
      source: "Microwave Journal"
    }
  ],

  // Motor Trivia
  motor: [
    {
      fact: "The first electric motor was invented in 1834 by Thomas Davenport, a Vermont blacksmith who used it to power a small printing press.",
      source: "Smithsonian American History Museum",
      year: "1834"
    },
    {
      fact: "Electric motors consume about 45% of all electricity generated worldwide - more than lighting, heating, or any other application.",
      source: "International Energy Agency"
    },
    {
      fact: "The smallest electric motor ever created is just a single molecule! Scientists built a molecular motor that can rotate on command.",
      source: "Nature Nanotechnology",
      year: "2011"
    },
    {
      fact: "Nikola Tesla's AC motor patent (1888) was so revolutionary that Westinghouse paid him $1 million plus royalties - a fortune at the time.",
      year: "1888"
    }
  ],

  // Sensor Trivia
  sensor: [
    {
      fact: "The first thermostat was invented in 1883 by Warren Johnson, founder of Johnson Controls. It used compressed air and a mercury switch.",
      source: "Johnson Controls History",
      year: "1883"
    },
    {
      fact: "A PIR (Passive Infrared) sensor doesn't actually detect motion - it detects changes in infrared radiation levels across its field of view.",
      source: "Sensor Technology Handbook"
    },
    {
      fact: "The human body is itself a sensor array with about 20 million sensory receptors, including 2 million for pain, 500,000 for touch, and 200,000 for temperature.",
      source: "Neuroscience Journal"
    },
    {
      fact: "Some gas sensors can detect concentrations as low as 10 parts per billion - equivalent to finding a single drop of water in an Olympic-sized swimming pool.",
      source: "Chemical Sensors Review"
    }
  ],

  // Battery/Power Trivia
  power: [
    {
      fact: "The first true battery was invented by Alessandro Volta in 1800, called the Voltaic Pile. Napoleon Bonaparte was so impressed he made Volta a count.",
      source: "Italian Science Academy",
      year: "1800"
    },
    {
      fact: "A standard AA alkaline battery contains enough energy to power a smartphone for about 2 hours, but the phone's battery is rechargeable hundreds of times.",
      source: "Battery University"
    },
    {
      fact: "The term 'battery' was first used by Benjamin Franklin to describe linked capacitors (Leyden jars) he used for experiments with electricity.",
      source: "Franklin Papers",
      year: "1749"
    },
    {
      fact: "Modern lithium-ion batteries lose only about 0.1% of their charge per month when not in use, compared to 20-30% for older nickel-based batteries.",
      source: "Journal of The Electrochemical Society"
    }
  ],

  // General/Default Trivia
  general: [
    {
      fact: "The first electronic component ever invented was the vacuum tube (1904), which made modern electronics possible and was used in computers until the 1960s.",
      source: "Computer History Museum"
    },
    {
      fact: "A typical desktop computer contains over 2,000 discrete electronic components including resistors, capacitors, and integrated circuits.",
      source: "PC Hardware Guide"
    },
    {
      fact: "The global electronics industry is worth over $3 trillion annually - larger than the global automobile and aerospace industries combined.",
      source: "World Economic Forum"
    },
    {
      fact: "The first integrated circuit (microchip) was invented in 1958 by Jack Kilby at Texas Instruments. He won the Nobel Prize in Physics in 2000.",
      year: "1958"
    }
  ]
};

// Helper function to get trivia for a specific component
export const getTriviaForComponent = (url: string, count: number = 3): TriviaItem[] => {
  const urlLower = url.toLowerCase();
  
  if (urlLower.includes('resistor')) return componentTrivia.resistor.slice(0, count);
  if (urlLower.includes('led') || urlLower.includes('light')) return componentTrivia.led.slice(0, count);
  if (urlLower.includes('capacitor')) return componentTrivia.capacitor.slice(0, count);
  if (urlLower.includes('transistor')) return componentTrivia.transistor.slice(0, count);
  if (urlLower.includes('breadboard')) return componentTrivia.breadboard.slice(0, count);
  if (urlLower.includes('diode')) return componentTrivia.diode.slice(0, count);
  if (urlLower.includes('motor')) return componentTrivia.motor.slice(0, count);
  if (urlLower.includes('sensor')) return componentTrivia.sensor.slice(0, count);
  if (urlLower.includes('battery') || urlLower.includes('power') || urlLower.includes('cell') || urlLower.includes('solar')) {
    return componentTrivia.power.slice(0, count);
  }
  
  return componentTrivia.general.slice(0, count);
};