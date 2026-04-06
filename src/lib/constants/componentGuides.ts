// ==================== COMPONENT GUIDES ====================

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

// ==================== GENERAL ====================

export const resistorGuide: ComponentGuide = {
  title: 'Resistor Guide',
  icon: 'Circle',
  sections: [
    { title: 'What is a Resistor?', type: 'paragraph', icon: 'Info', content: 'A resistor is a passive two-terminal component that limits the flow of electric current. It is one of the most fundamental components in electronics.' },
    { title: 'Color Code (Black to White)', type: 'list', icon: 'Palette', content: ['Black: 0', 'Brown: 1', 'Red: 2', 'Orange: 3', 'Yellow: 4', 'Green: 5', 'Blue: 6', 'Violet: 7', 'Gray: 8', 'White: 9'] },
    { title: 'Reading a 4-Band Resistor', type: 'list', icon: 'Hash', content: ['Band 1: First significant digit', 'Band 2: Second significant digit', 'Band 3: Multiplier (power of 10)', 'Band 4: Tolerance (Gold = ±5%, Silver = ±10%)'] },
    { title: 'Common Uses', type: 'list', icon: 'Cpu', content: ['Limiting current through LEDs', 'Voltage dividers', 'Pull-up and pull-down resistors', 'Setting gain in amplifier circuits'] },
  ],
  proTips: ['Read from the end with bands closer together', 'Use a multimeter to verify before placing in circuit', 'Choose power rating at least 2x the expected dissipation'],
  commonMistakes: ['Reading bands in the wrong direction', 'Using too low a power rating', 'Confusing the tolerance band with the multiplier band'],
};

export const capacitorGuide: ComponentGuide = {
  title: 'Capacitor Guide',
  icon: 'Layers',
  sections: [
    { title: 'What is a Capacitor?', type: 'paragraph', icon: 'Info', content: 'A capacitor stores electrical energy in an electric field between two conductive plates separated by a dielectric. It charges and discharges rapidly, making it essential for filtering and timing circuits.' },
    { title: 'Reading Ceramic Capacitor Codes', type: 'list', icon: 'Hash', content: ['3-digit code: first two digits are significant figures', 'Third digit is the multiplier (number of zeros in pF)', 'Example: 104 = 10 x 10^4 pF = 100nF = 0.1uF', 'No code or single value = value in pF'] },
    { title: 'Common Uses', type: 'list', icon: 'Cpu', content: ['Decoupling: place near IC power pins to filter noise', 'Timing circuits with resistors (RC networks)', 'Signal coupling between amplifier stages', 'Power supply filtering'] },
  ],
  proTips: ['Place decoupling caps as close to IC power pins as possible', 'Use voltage rating at least 2x the expected circuit voltage', 'Non-polarized - can be inserted either way'],
  commonMistakes: ['Confusing microfarads (uF) with picofarads (pF)', 'Using voltage rating too close to actual voltage', 'Overlooking the need for decoupling in digital circuits'],
};

export const polarizedCapacitorGuide: ComponentGuide = {
  title: 'Polarized Capacitor Guide',
  icon: 'Layers',
  sections: [
    { title: 'What is a Polarized Capacitor?', type: 'paragraph', icon: 'Info', content: 'A polarized (electrolytic) capacitor has a positive and negative terminal. It offers much higher capacitance than ceramic types of the same size, making it ideal for power supply filtering and bulk energy storage.' },
    { title: 'Identifying Polarity', type: 'list', icon: 'ArrowRight', content: ['Longer lead = Positive (+) Anode', 'Shorter lead = Negative (-) Cathode', 'White or black stripe on the body marks the NEGATIVE side', 'Some have a plus (+) symbol near the positive lead'] },
    { title: 'WARNING - Never Reverse Polarity', type: 'warning', icon: 'AlertTriangle', content: 'Connecting a polarized capacitor backwards can cause it to heat up, leak, and in some cases explode violently. Always double-check polarity before powering the circuit.' },
    { title: 'Common Uses', type: 'list', icon: 'Cpu', content: ['Power supply smoothing and bulk filtering', 'Audio coupling between stages', 'Timing circuits requiring high capacitance', 'Motor start capacitors'] },
  ],
  proTips: ['Always verify polarity before powering up', 'Use voltage rating at least 2x your supply voltage', 'Replace if you notice bulging or leaking electrolyte'],
  commonMistakes: ['Connecting backwards (can explode!)', 'Using in AC circuits without a bridge rectifier', 'Ignoring the voltage rating'],
};

export const diodeGuide: ComponentGuide = {
  title: 'Diode Guide',
  icon: 'ArrowRight',
  sections: [
    { title: 'What is a Diode?', type: 'paragraph', icon: 'Info', content: 'A diode is a semiconductor device that allows current to flow in one direction only. It acts as a one-way valve for electricity, essential for rectification, protection, and signal detection.' },
    { title: 'Identifying Polarity', type: 'list', icon: 'ArrowRight', content: ['Cathode (-): the end with a stripe or band - current exits here', 'Anode (+): the unmarked end - current enters here', 'Forward voltage drop: typically 0.6-0.7V for silicon diodes', 'Use a multimeter in diode mode to confirm orientation'] },
    { title: 'Common Types', type: 'list', icon: 'Layers', content: ['Rectifier (1N4007) - General purpose, power conversion', 'Schottky (1N5819) - Low voltage drop, fast switching', 'Zener - Voltage regulation (see Zener Diode guide)', 'LED - Emits light when forward biased'] },
    { title: 'Common Uses', type: 'list', icon: 'Cpu', content: ['Reverse polarity protection', 'AC to DC rectification', 'Flyback protection for motors and relays', 'Signal clipping and clamping'] },
  ],
  proTips: ['Add flyback diodes across relay coils and motor terminals', 'Check forward voltage drop in power-sensitive circuits', 'Schottky diodes are preferred for low-voltage circuits'],
  commonMistakes: ['Installing backwards (no current flows, circuit fails)', 'Forgetting flyback diodes on inductive loads', 'Using rectifier diodes in high-frequency switching circuits'],
};

export const zenerDiodeGuide: ComponentGuide = {
  title: 'Zener Diode Guide',
  icon: 'ArrowRight',
  sections: [
    { title: 'What is a Zener Diode?', type: 'paragraph', icon: 'Info', content: 'A Zener diode is a specially doped diode designed to operate reliably in reverse breakdown. When reverse voltage exceeds the Zener voltage, it conducts at a stable, precise voltage - clamping voltage spikes and regulating power rails.' },
    { title: 'How to Use', type: 'list', icon: 'Cpu', content: ['Connect cathode to positive supply, anode to ground (reverse biased)', 'Always include a series resistor to limit current', 'Zener voltage is maintained across it when conducting', 'Common Zener voltages: 3.3V, 5.1V, 6.2V, 12V'] },
    { title: 'Voltage Regulator Circuit', type: 'list', icon: 'Zap', content: ['Series resistor from supply to Zener cathode', 'Load connected in parallel with the Zener', 'Zener clamps voltage to its rated Vz', 'Works best with a small, stable load current'] },
  ],
  proTips: ['Always use a series resistor to prevent excessive current', 'Choose Zener power rating well above your expected dissipation', 'For precision, use a dedicated voltage regulator IC instead'],
  commonMistakes: ['Forgetting the series resistor (destroys the Zener)', 'Using Zener forward-biased (acts like a regular diode)', 'Choosing too low a power rating'],
};

export const inductorGuide: ComponentGuide = {
  title: 'Inductor Guide',
  icon: 'Circle',
  sections: [
    { title: 'What is an Inductor?', type: 'paragraph', icon: 'Info', content: 'An inductor stores energy in a magnetic field when current flows through its coil. It resists changes in current, making it essential for filtering, energy storage in switching supplies, and tuned circuits.' },
    { title: 'Key Properties', type: 'list', icon: 'Hash', content: ['Inductance measured in Henries (H), millihenries (mH), microhenries (uH)', 'Higher turns count = higher inductance', 'Ferrite or iron core increases inductance significantly', 'Current rating: exceeding it saturates the core and kills inductance'] },
    { title: 'Common Uses', type: 'list', icon: 'Cpu', content: ['Power supply inductors in buck/boost converters', 'EMI filters to block high-frequency noise', 'Tuned LC oscillator circuits', 'Guitar pickups and audio transformers'] },
  ],
  proTips: ['Never exceed the rated current - saturation ruins performance', 'Keep inductors away from each other to prevent magnetic coupling', 'Use a ferrite bead (a tiny inductor) for simple EMI filtering'],
  commonMistakes: ['Exceeding the current rating causing core saturation', 'Placing inductors too close together (mutual inductance)', 'Using wrong inductance value in switching converter design'],
};

// ==================== INPUT ====================

export const pushButtonGuide: ComponentGuide = {
  title: 'Push Button Guide',
  icon: 'Square',
  sections: [
    { title: 'What is a Push Button?', type: 'paragraph', icon: 'Info', content: 'A push button is a momentary switch that closes or opens a circuit only while pressed. When released, it returns to its default state via an internal spring.' },
    { title: 'Pin Configuration (4-pin)', type: 'list', icon: 'Grid', content: ['Pins 1 & 2 are connected internally (one side)', 'Pins 3 & 4 are connected internally (other side)', 'Pressing the button connects both sides', 'Diagonal pins are NOT connected - use adjacent pairs'] },
    { title: 'Debouncing', type: 'list', icon: 'Cpu', content: ['Mechanical contacts bounce when pressed, creating multiple signals', 'Hardware debounce: add a 100nF capacitor across the switch', 'Software debounce: add a small delay after detecting a press', 'Libraries like Bounce2 handle this automatically in Arduino'] },
    { title: 'Pull-up and Pull-down Resistors', type: 'list', icon: 'ArrowRight', content: ['Pull-up (10k to VCC): pin reads HIGH normally, LOW when pressed', 'Pull-down (10k to GND): pin reads LOW normally, HIGH when pressed', 'Most microcontrollers have built-in pull-ups (INPUT_PULLUP)'] },
  ],
  proTips: ['Use INPUT_PULLUP in Arduino to avoid needing an external resistor', 'Debounce in software for cleaner button reads', 'For latching behavior, toggle a boolean variable on each press'],
  commonMistakes: ['Floating input pins without pull-up or pull-down resistors', 'Ignoring contact bounce causing multiple triggers', 'Using diagonal pins instead of adjacent pairs on 4-pin buttons'],
};

export const potentiometerGuide: ComponentGuide = {
  title: 'Potentiometer Guide',
  icon: 'Sliders',
  sections: [
    { title: 'What is a Potentiometer?', type: 'paragraph', icon: 'Info', content: 'A potentiometer is a three-terminal variable resistor with a sliding or rotating contact. Turning the shaft moves the wiper along a resistive track, outputting a voltage anywhere between the two end pins.' },
    { title: 'Pin Connections', type: 'list', icon: 'Grid', content: ['Pin 1 (End): Connect to VCC or GND', 'Pin 2 (Wiper/Middle): Output voltage - connect to analog input', 'Pin 3 (End): Connect to the other rail (GND or VCC)', 'Output voltage = VCC x (wiper position / total track)'] },
    { title: 'Common Uses', type: 'list', icon: 'Cpu', content: ['Volume and brightness control knobs', 'Analog joystick axis sensing', 'LCD contrast adjustment', 'Setting reference voltages'] },
  ],
  proTips: ['Swap pins 1 and 3 to reverse the direction of the output', 'Use analogRead() on the wiper pin for 0-1023 range on Arduino', 'Add a small capacitor from wiper to GND to filter electrical noise'],
  commonMistakes: ['Leaving the wiper pin floating (erratic readings)', 'Forgetting that the wiper is the middle pin', 'Using potentiometers in high-vibration environments where they can drift'],
};

export const slideSwitchGuide: ComponentGuide = {
  title: 'Slide Switch Guide',
  icon: 'ToggleLeft',
  sections: [
    { title: 'What is a Slide Switch?', type: 'paragraph', icon: 'Info', content: 'A slide switch is a latching switch that maintains its position until physically moved. Unlike a push button, it stays ON or OFF until you slide it to the other position.' },
    { title: 'Pin Configuration (SPDT)', type: 'list', icon: 'Grid', content: ['Center pin: Common (COM) - always connected', 'Left pin: Position A - connected when slider is left', 'Right pin: Position B - connected when slider is right', 'Use between COM and either side to detect switch state'] },
    { title: 'Common Uses', type: 'list', icon: 'Cpu', content: ['Power ON/OFF switch for a project', 'Selecting between two operating modes', 'Enabling/disabling a feature', 'Polarity reversal by swapping connections'] },
  ],
  proTips: ['Use the common + one side for simple ON/OFF control', 'Use common + both sides to switch between two circuits (SPDT mode)', 'Add a pull-down resistor on unused pins to prevent floating inputs'],
  commonMistakes: ['Connecting to non-common pins and getting no switching action', 'Leaving floating pins causing erratic microcontroller reads', 'Using in high-current applications without checking the rating'],
};

export const photoresistorGuide: ComponentGuide = {
  title: 'Photoresistor Guide',
  icon: 'Sun',
  sections: [
    { title: 'What is a Photoresistor?', type: 'paragraph', icon: 'Info', content: 'A photoresistor (LDR - Light Dependent Resistor) changes its resistance based on light intensity. In darkness, resistance is very high (>1MΩ). In bright light, it drops dramatically (as low as 1kΩ).' },
    { title: 'Using with a Voltage Divider', type: 'list', icon: 'Cpu', content: ['Connect LDR from VCC to analog input pin', 'Connect a 10k resistor from the same pin to GND', 'Read the voltage: higher = more light (LDR resistance drops)', 'Swap LDR and resistor positions to invert the response'] },
    { title: 'Common Uses', type: 'list', icon: 'Zap', content: ['Automatic street light detection', 'Night light activation', 'Light-following robots', 'Ambient light measurement'] },
  ],
  proTips: ['Calibrate by reading values in your expected light range', 'Use analogRead() for a variable reading, not just a threshold', 'Shield from direct sunlight if used outdoors to prevent saturation'],
  commonMistakes: ['Not using a pull-down or voltage divider resistor', 'Expecting fast response - LDRs are slow compared to photodiodes', 'Not accounting for the slow response time in fast-switching applications'],
};

export const photodiodeGuide: ComponentGuide = {
  title: 'Photodiode Guide',
  icon: 'Sun',
  sections: [
    { title: 'What is a Photodiode?', type: 'paragraph', icon: 'Info', content: 'A photodiode generates current proportional to light intensity. It is much faster than a photoresistor and is used in fiber optics, remote controls, and precision light measurement.' },
    { title: 'Operating Modes', type: 'list', icon: 'Layers', content: ['Photoconductive (reverse biased): faster response, used for detection', 'Photovoltaic (no bias): generates small voltage, used in solar cells', 'For detection circuits, reverse bias is most common'] },
    { title: 'Pin Identification', type: 'list', icon: 'ArrowRight', content: ['Anode (+): longer lead', 'Cathode (-): shorter lead', 'In reverse bias: cathode to positive supply, anode to ground via resistor', 'Light causes current to flow from cathode to anode'] },
  ],
  proTips: ['Use in reverse bias mode for faster and more linear response', 'Pair with a transimpedance amplifier for precise light measurement', 'Shield from unwanted light sources for best accuracy'],
  commonMistakes: ['Confusing with an LED (looks identical!)', 'Using in forward bias when reverse bias is needed', 'Not accounting for ambient light interference'],
};

export const ambientLightSensorGuide: ComponentGuide = {
  title: 'Ambient Light Sensor Guide',
  icon: 'Sun',
  sections: [
    { title: 'What is an Ambient Light Sensor?', type: 'paragraph', icon: 'Info', content: 'An ambient light sensor measures the intensity of surrounding light. Unlike a basic LDR, it has a spectral response similar to the human eye and communicates digitally via I2C.' },
    { title: 'I2C Connection', type: 'list', icon: 'Grid', content: ['VCC: 3.3V or 5V power supply', 'GND: Ground', 'SDA: I2C data line - connect to microcontroller SDA', 'SCL: I2C clock line - connect to microcontroller SCL', 'Common I2C address: 0x23 or 0x5C (set by ADDR pin)'] },
    { title: 'Common Uses', type: 'list', icon: 'Cpu', content: ['Automatic screen brightness adjustment', 'Smart lighting control', 'Display backlight dimming', 'Environmental monitoring stations'] },
  ],
  proTips: ['Use the BH1750 library in Arduino for easy lux readings', 'Add 4.7k pull-up resistors on SDA and SCL if not on the module', 'Position away from direct light sources for ambient measurement'],
  commonMistakes: ['Using wrong I2C address when multiple devices share the bus', 'Not adding I2C pull-up resistors when required', 'Placing sensor directly under a lamp instead of reading ambient light'],
};

export const flexSensorGuide: ComponentGuide = {
  title: 'Flex Sensor Guide',
  icon: 'Activity',
  sections: [
    { title: 'What is a Flex Sensor?', type: 'paragraph', icon: 'Info', content: 'A flex sensor changes resistance as it bends. Flat resistance is typically 10-30kΩ; bending increases it. It is used in wearables, gloves, and robotic fingers to detect bend angle.' },
    { title: 'Circuit Setup', type: 'list', icon: 'Grid', content: ['Use in a voltage divider with a 47k fixed resistor', 'Connect flex sensor from VCC to analog pin', 'Connect 47k from the same analog pin to GND', 'Higher voltage reading = more bending'] },
    { title: 'Common Uses', type: 'list', icon: 'Cpu', content: ['Gesture recognition gloves', 'Robotic finger position sensing', 'Physical therapy rehabilitation monitoring', 'Controller input devices'] },
  ],
  proTips: ['Calibrate flat and fully bent positions for mapping to angles', 'Avoid bending sharply at the connector end - it damages the sensor', 'Use a running average to smooth analog readings'],
  commonMistakes: ['Bending at the connector area (damages the sensor permanently)', 'Not calibrating for the specific bend range needed', 'Using without a series resistor (voltage divider is required)'],
};

export const forceSensorGuide: ComponentGuide = {
  title: 'Force Sensor (FSR) Guide',
  icon: 'Activity',
  sections: [
    { title: 'What is a Force Sensor?', type: 'paragraph', icon: 'Info', content: 'A Force Sensitive Resistor (FSR) decreases in resistance when pressure is applied to its surface. No force = very high resistance (>1MΩ). Maximum force = low resistance (~200Ω).' },
    { title: 'Circuit Setup', type: 'list', icon: 'Grid', content: ['Connect FSR from VCC to analog input pin', 'Add 10k resistor from analog input to GND (pull-down)', 'Higher voltage = more force applied', 'Typical useful range: 100g to 10kg'] },
    { title: 'Common Uses', type: 'list', icon: 'Cpu', content: ['Touch-sensitive buttons and pads', 'Grip force measurement', 'Weight sensing in simple scales', 'Pressure-activated triggers'] },
  ],
  proTips: ['Distribute force evenly across the sensing area for consistent readings', 'Calibrate with known weights for accurate force measurement', 'The response is logarithmic - map it carefully in code'],
  commonMistakes: ['Point-loading the sensor (apply force to the full active area)', 'Ignoring the logarithmic response curve', 'Expecting precision measurement - FSRs are better for detection than measurement'],
};

export const irSensorGuide: ComponentGuide = {
  title: 'IR Sensor Guide',
  icon: 'Crosshair',
  sections: [
    { title: 'What is an IR Sensor?', type: 'paragraph', icon: 'Info', content: 'An IR (Infrared) proximity sensor consists of an IR LED that emits light and a photodiode that detects reflections. It outputs a digital signal when an object is within range.' },
    { title: 'Pin Connections', type: 'list', icon: 'Grid', content: ['VCC: Connect to 3.3V or 5V', 'GND: Connect to ground', 'OUT: Digital output - LOW when object detected (active low)', 'Some modules have a potentiometer to adjust sensitivity'] },
    { title: 'Common Uses', type: 'list', icon: 'Cpu', content: ['Line-following robots (detecting black/white lines)', 'Obstacle avoidance', 'Object counting on conveyor belts', 'Proximity detection for automatic systems'] },
  ],
  proTips: ['Adjust the onboard potentiometer to set detection distance', 'IR sensors can be confused by strong ambient IR (sunlight) - shield if needed', 'Use multiple sensors for line following robots'],
  commonMistakes: ['Not adjusting sensitivity for the specific environment', 'Using in direct sunlight causing false detections', 'Confusing active low output (LOW = detected) with active high'],
};

export const ultrasonicSensorGuide: ComponentGuide = {
  title: 'Ultrasonic Distance Sensor Guide',
  icon: 'Radio',
  sections: [
    { title: 'What is an Ultrasonic Sensor?', type: 'paragraph', icon: 'Info', content: 'An ultrasonic sensor measures distance by sending a sound pulse at 40kHz and measuring how long the echo takes to return. Distance = (echo time x speed of sound) / 2.' },
    { title: 'Pin Connections', type: 'list', icon: 'Grid', content: ['VCC: 5V power supply', 'GND: Ground', 'TRIG: Send a 10 microsecond HIGH pulse to trigger a measurement', 'ECHO: Goes HIGH for a duration proportional to distance'] },
    { title: 'Distance Calculation', type: 'list', icon: 'Hash', content: ['Speed of sound = 343 m/s at room temperature', 'Distance (cm) = echo duration (us) / 58', 'Distance (inches) = echo duration (us) / 148', 'Useful range: 2cm to 400cm'] },
  ],
  proTips: ['Add a timeout in code to prevent hanging if no echo returns', 'Use pulseIn() in Arduino to measure echo duration', 'Take multiple readings and average them for stability'],
  commonMistakes: ['Not triggering before each reading (always send a fresh TRIG pulse)', 'Measuring soft or angled surfaces that absorb/deflect sound', 'Forgetting to divide by 2 (sound travels to object AND back)'],
};

export const ultrasonicSensor4PinGuide: ComponentGuide = {
  title: 'Ultrasonic Sensor (4-Pin) Guide',
  icon: 'Radio',
  sections: [
    { title: 'What is the 4-Pin Ultrasonic Sensor?', type: 'paragraph', icon: 'Info', content: 'The HC-SR04 style 4-pin ultrasonic sensor has separate TRIG and ECHO pins for more precise timing control. It is the most widely used ultrasonic sensor in maker projects.' },
    { title: 'Pin Connections', type: 'list', icon: 'Grid', content: ['VCC: 5V (does not work reliably at 3.3V)', 'GND: Ground', 'TRIG: Output from microcontroller - send 10us HIGH pulse', 'ECHO: Input to microcontroller - measure HIGH pulse duration'] },
    { title: 'Arduino Code Structure', type: 'list', icon: 'Cpu', content: ['digitalWrite(TRIG_PIN, LOW) for 2us (clean start)', 'digitalWrite(TRIG_PIN, HIGH) for 10us', 'digitalWrite(TRIG_PIN, LOW)', 'duration = pulseIn(ECHO_PIN, HIGH)', 'distance_cm = duration / 58.0'] },
  ],
  proTips: ['Add a voltage divider on ECHO pin if using 3.3V microcontroller (5V signal)', 'Use the NewPing library for cleaner code and timeout handling', 'Mount at a slight downward angle for floor distance sensing'],
  commonMistakes: ['Connecting ECHO directly to a 3.3V microcontroller (5V signal can damage it)', 'Too short a trigger pulse (must be at least 10 microseconds)', 'Objects smaller than 2cm wide may not reflect enough sound'],
};

export const pirSensorGuide: ComponentGuide = {
  title: 'PIR Sensor Guide',
  icon: 'Eye',
  sections: [
    { title: 'What is a PIR Sensor?', type: 'paragraph', icon: 'Info', content: 'A Passive Infrared (PIR) sensor detects motion by measuring changes in infrared radiation from warm bodies moving across its field of view. It does not emit anything - it only listens.' },
    { title: 'Pin Connections', type: 'list', icon: 'Grid', content: ['VCC: 5V to 12V depending on module', 'GND: Ground', 'OUT: Goes HIGH when motion is detected', 'Most modules have delay and sensitivity trim potentiometers'] },
    { title: 'Adjustments', type: 'list', icon: 'Sliders', content: ['Sensitivity pot: adjusts detection range (3m to 7m typical)', 'Time delay pot: sets how long OUT stays HIGH after detection', 'Jumper (if present): single trigger vs repeating trigger mode', 'Warm-up time: 30-60 seconds after power-on before reliable use'] },
  ],
  proTips: ['Allow 60 seconds warm-up time before testing', 'Place at 2-3m height for best human detection coverage', 'Avoid pointing at heat sources (vents, sunny windows) for false-trigger prevention'],
  commonMistakes: ['Testing immediately after power-on (sensor needs warm-up time)', 'Ignoring the Fresnel lens angle - coverage is not 360 degrees', 'Placing near heat vents causing constant false triggers'],
};

export const soilMoistureSensorGuide: ComponentGuide = {
  title: 'Soil Moisture Sensor Guide',
  icon: 'Droplets',
  sections: [
    { title: 'What is a Soil Moisture Sensor?', type: 'paragraph', icon: 'Info', content: 'A soil moisture sensor measures water content in soil by detecting changes in electrical resistance or capacitance between its probes. Wetter soil conducts more current.' },
    { title: 'Pin Connections', type: 'list', icon: 'Grid', content: ['VCC: 3.3V or 5V', 'GND: Ground', 'AOUT: Analog output - higher voltage = drier soil', 'DOUT: Digital output - LOW when moisture exceeds threshold', 'Threshold set by onboard potentiometer'] },
    { title: 'Common Uses', type: 'list', icon: 'Cpu', content: ['Automatic plant watering systems', 'Garden irrigation control', 'Greenhouse monitoring', 'Soil health data logging'] },
  ],
  proTips: ['Calibrate with dry soil and saturated soil for the full range', 'Use capacitive sensors for longevity (resistive probes corrode quickly)', 'Only power the sensor during readings to extend probe life'],
  commonMistakes: ['Leaving resistive probes powered continuously (they corrode in days)', 'Not calibrating for your specific soil type', 'Reading while the soil is disturbed (wait for settling)'],
};

export const tiltSensorGuide: ComponentGuide = {
  title: 'Tilt Sensor Guide',
  icon: 'Activity',
  sections: [
    { title: 'What is a Tilt Sensor?', type: 'paragraph', icon: 'Info', content: 'A tilt sensor (ball switch) contains a small conductive ball inside a housing. When tilted, the ball rolls to bridge the two contacts. It is a simple, non-electronic way to detect orientation.' },
    { title: 'How It Works', type: 'list', icon: 'Activity', content: ['Upright: ball rests away from contacts - circuit open', 'Tilted past threshold: ball rolls to touch contacts - circuit closes', 'Acts as a digital switch (open or closed)', 'No defined threshold angle - varies by orientation axis'] },
    { title: 'Connection', type: 'list', icon: 'Grid', content: ['Connect one lead to a digital input with pull-up resistor', 'Connect the other lead to GND', 'Read LOW when tilted (ball bridges contacts), HIGH when upright', 'Apply debouncing - the ball rolls and bounces'] },
  ],
  proTips: ['Apply software debouncing - the rolling ball causes contact bounce', 'Test all axes to understand detection angle for your orientation', 'Cheap and reliable alternative to accelerometers for simple tilt detection'],
  commonMistakes: ['Not debouncing (rolling ball bounces on contacts)', 'Expecting a specific tilt angle - varies with manufacturing tolerance', 'Floating input pin without a pull-up resistor'],
};

export const temperatureSensorGuide: ComponentGuide = {
  title: 'Temperature Sensor Guide',
  icon: 'Thermometer',
  sections: [
    { title: 'What is a Temperature Sensor?', type: 'paragraph', icon: 'Info', content: 'A temperature sensor converts ambient temperature into an electrical signal - either analog voltage, PWM, or a digital protocol like OneWire or I2C.' },
    { title: 'Common Types', type: 'list', icon: 'Layers', content: ['LM35: Analog, 10mV per degree Celsius, simple and accurate', 'DS18B20: Digital OneWire, ±0.5°C accuracy, multiple sensors on one wire', 'DHT11/DHT22: Digital, measures both temperature and humidity', 'NTC Thermistor: Analog, requires voltage divider and calibration'] },
    { title: 'Pin Connections (LM35 style)', type: 'list', icon: 'Grid', content: ['Pin 1 (flat side left): VCC - connect to 3.3V or 5V', 'Pin 2 (flat side center): OUTPUT - connect to analog input', 'Pin 3 (flat side right): GND - connect to ground', 'Read output: Temperature (°C) = analogRead() x (5.0/1023) / 0.01'] },
  ],
  proTips: ['For DS18B20, add a 4.7k pull-up on the data line', 'Place sensor away from heat-generating components for accurate ambient readings', 'Average multiple readings to reduce noise'],
  commonMistakes: ['Touching the sensor body while testing (body heat affects readings)', 'Not adding a pull-up resistor for OneWire sensors', 'Wrong pinout - always verify with the specific sensor datasheet'],
};

export const gasSensorGuide: ComponentGuide = {
  title: 'Gas Sensor Guide',
  icon: 'Wind',
  sections: [
    { title: 'What is a Gas Sensor?', type: 'paragraph', icon: 'Info', content: 'MQ-series gas sensors detect specific gases by measuring resistance changes in a heated metal oxide surface. Each variant targets different gases: MQ-2 (LPG/smoke), MQ-7 (CO), MQ-135 (air quality).' },
    { title: 'Pin Connections', type: 'list', icon: 'Grid', content: ['VCC: 5V (heater requires significant current ~150mA)', 'GND: Ground', 'AOUT: Analog output - voltage increases with gas concentration', 'DOUT: Digital output - HIGH when concentration exceeds threshold', 'Threshold set by onboard potentiometer'] },
    { title: 'Warm-Up Requirement', type: 'warning', icon: 'AlertTriangle', content: 'MQ sensors require a 24-48 hour burn-in period when brand new, and a 20-second warm-up every time they are powered on. Readings are unreliable until the heater reaches operating temperature.' },
  ],
  proTips: ['Allow 20 seconds warm-up before taking readings', 'New sensors need 24-48 hours of powered operation for accurate readings', 'Use analog output with known gas concentrations to calibrate'],
  commonMistakes: ['Reading immediately after power-on (sensor not yet at temperature)', 'Using a 3.3V supply (heater requires 5V for correct operation)', 'Forgetting new sensors need a burn-in period'],
};

export const keypad4x4Guide: ComponentGuide = {
  title: '4x4 Keypad Guide',
  icon: 'Grid',
  sections: [
    { title: 'What is a 4x4 Keypad?', type: 'paragraph', icon: 'Info', content: 'A 4x4 membrane keypad has 16 buttons in a matrix arrangement. Only 8 wires are needed thanks to row/column scanning - each button sits at the intersection of one row and one column.' },
    { title: 'Pin Connections', type: 'list', icon: 'Grid', content: ['Pins 1-4: Row pins (R1, R2, R3, R4)', 'Pins 5-8: Column pins (C1, C2, C3, C4)', 'Connect to 8 digital I/O pins on microcontroller', 'Use the Keypad library in Arduino to handle scanning automatically'] },
    { title: 'How Scanning Works', type: 'list', icon: 'Cpu', content: ['Microcontroller drives each row HIGH one at a time', 'Reads which column pin goes HIGH when a key is pressed', 'Row + column intersection identifies the pressed key', 'The Keypad library handles all of this automatically'] },
  ],
  proTips: ['Use the Arduino Keypad library for simple, reliable key detection', 'Combine with a 16x2 LCD for a simple entry system', 'Add long-press detection in code for multi-function keys'],
  commonMistakes: ['Reversing the row and column order (wrong keys detected)', 'Not using a library and manually scanning incorrectly', 'Expecting multiple simultaneous key presses to work (not supported without extra hardware)'],
};

export const dipSwitchGuide: ComponentGuide = {
  title: 'DIP Switch Guide',
  icon: 'ToggleLeft',
  sections: [
    { title: 'What is a DIP Switch?', type: 'paragraph', icon: 'Info', content: 'A DIP (Dual In-line Package) switch contains multiple independent SPST switches in one package. Each switch independently connects or isolates its two pins, used for hardware configuration.' },
    { title: 'How to Read Settings', type: 'list', icon: 'Hash', content: ['Each switch is a binary bit (ON=1, OFF=0)', 'Read left to right or right to left depending on convention', 'Example: 4-switch, ON-OFF-ON-OFF = 1010 in binary = 10 in decimal', 'Always check which end is bit 0 in your schematic'] },
    { title: 'Common Uses', type: 'list', icon: 'Cpu', content: ['Setting device I2C/SPI address', 'Configuring communication baud rate', 'Enabling/disabling hardware features', 'Setting unique device IDs in multi-unit systems'] },
  ],
  proTips: ['Use pull-up or pull-down resistors on all switch pins to prevent floating', 'Label each switch position clearly on the enclosure', 'Document the meaning of each switch combination in your project notes'],
  commonMistakes: ['Floating switch pins (causes erratic behavior)', 'Reading bit order incorrectly (MSB vs LSB)', 'Changing DIP switch settings while powered on in sensitive systems'],
};

// ==================== OUTPUT ====================

export const ledGuide: ComponentGuide = {
  title: 'LED Guide',
  icon: 'Lightbulb',
  sections: [
    { title: 'What is an LED?', type: 'paragraph', icon: 'Info', content: 'An LED (Light Emitting Diode) emits light when current flows through it in the forward direction. Like all diodes, it only allows current in one direction - polarity matters.' },
    { title: 'Polarity Identification', type: 'list', icon: 'ArrowRight', content: ['Anode (+): Longer lead - connect toward positive voltage', 'Cathode (-): Shorter lead - connect toward ground', 'Flat edge on the LED base also marks the cathode', 'Forward voltage: ~2V (red/yellow) to ~3.5V (blue/white)'] },
    { title: 'Current Limiting Resistor', type: 'list', icon: 'Hash', content: ['Always use a resistor in series with an LED!', 'Formula: R = (VCC - VLED) / ILED', 'Typical LED current: 10-20mA', 'Example (5V, red LED): R = (5V - 2V) / 0.02A = 150 ohms'] },
  ],
  proTips: ['330 ohm is a safe all-purpose resistor for LEDs on 5V', 'Use PWM to dim LEDs rather than lowering current (better color)', 'Check forward voltage from datasheet for precise resistor calculation'],
  commonMistakes: ['Connecting without a current-limiting resistor (burns out LED instantly)', 'Reversing polarity (LED simply does not light - no damage unless forced)', 'Using LED directly on 5V GPIO without a resistor'],
};

export const rgbLedGuide: ComponentGuide = {
  title: 'RGB LED Guide',
  icon: 'Lightbulb',
  sections: [
    { title: 'What is an RGB LED?', type: 'paragraph', icon: 'Info', content: 'An RGB LED contains three LEDs (Red, Green, Blue) in one package. By mixing their brightness via PWM, over 16 million colors are possible.' },
    { title: 'Common Cathode vs Common Anode', type: 'list', icon: 'Layers', content: ['Common Cathode: longest pin to GND, others to GPIO through resistors', 'Common Anode: longest pin to VCC, others to GPIO through resistors (active LOW)', 'Check the datasheet for your specific type', 'Use analogWrite() or PWM for color mixing'] },
    { title: 'Current Limiting', type: 'list', icon: 'Hash', content: ['Each color channel needs its own current-limiting resistor', 'Red: ~150 ohm on 5V (lower forward voltage)', 'Green/Blue: ~100 ohm on 5V (higher forward voltage)', 'Values vary - calculate for your specific LED'] },
  ],
  proTips: ['Use Adafruit_NeoPixel library if you have addressable RGB LEDs', 'Map RGB values 0-255 to PWM for intuitive color control', 'Red needs a slightly higher resistor value than green and blue'],
  commonMistakes: ['Using the same resistor for all channels (colors will be unbalanced)', 'Confusing common cathode and common anode (inverted logic for anode)', 'Forgetting that each channel needs its own resistor'],
};

export const lightBulbGuide: ComponentGuide = {
  title: 'Light Bulb Guide',
  icon: 'Lightbulb',
  sections: [
    { title: 'What is a Miniature Light Bulb?', type: 'paragraph', icon: 'Info', content: 'A miniature incandescent bulb passes current through a thin tungsten filament, heating it until it glows. It requires much more current than an LED and generates significant heat.' },
    { title: 'Key Specifications', type: 'list', icon: 'Hash', content: ['Voltage rating: must match your supply (3V, 5V, 6V, 12V etc.)', 'Current: typically 50mA to 300mA (much more than LEDs)', 'Cannot be driven directly from microcontroller GPIO pins', 'Use a transistor or MOSFET as a switch'] },
    { title: 'Driving a Bulb from a Microcontroller', type: 'list', icon: 'Cpu', content: ['GPIO -> Base resistor (1k) -> NPN transistor base', 'Transistor collector -> bulb -> VCC', 'Transistor emitter -> GND', 'Add flyback diode across bulb for protection'] },
  ],
  proTips: ['Always verify the bulb voltage rating matches your supply', 'Use PWM through a transistor for dimming control', 'Add a fuse in series for high-current bulb circuits'],
  commonMistakes: ['Driving bulb directly from GPIO pin (too much current - damages MCU)', 'Mismatching bulb voltage to supply voltage', 'Forgetting that bulbs generate significant heat'],
};

export const neoPixelGuide: ComponentGuide = {
  title: 'NeoPixel Guide',
  icon: 'Lightbulb',
  sections: [
    { title: 'What is a NeoPixel?', type: 'paragraph', icon: 'Info', content: 'NeoPixels (WS2812B) are individually addressable RGB LEDs with a built-in control chip. A single data wire daisy-chains through hundreds of LEDs, each receiving its own 24-bit color value.' },
    { title: 'Pin Connections', type: 'list', icon: 'Grid', content: ['VCC: 5V (can draw up to 60mA per LED at full white)', 'GND: Ground - must share ground with microcontroller', 'DIN: Data input - connect to GPIO via 300-500 ohm resistor', 'DOUT: Data output - connects to next NeoPixel DIN in chain'] },
    { title: 'Power Planning', type: 'list', icon: 'Zap', content: ['60mA per LED at full white brightness', '10 LEDs = 600mA, 30 LEDs = 1.8A, 60 LEDs = 3.6A!', 'Use a dedicated 5V power supply for strips longer than 10 LEDs', 'Add 1000uF capacitor across power rails to prevent voltage spikes'] },
  ],
  proTips: ['Use the Adafruit NeoPixel library for reliable control', 'Add a 300-500 ohm resistor on the data line to prevent ringing', 'Cap brightness in software to reduce power consumption', 'Add a 1000uF cap across VCC and GND at the power input'],
  commonMistakes: ['Powering many LEDs from the microcontroller 5V pin (insufficient current)', 'Connecting data line without a series resistor', 'Not sharing ground between power supply and microcontroller'],
};

export const piezoBuzzerGuide: ComponentGuide = {
  title: 'Piezo Buzzer Guide',
  icon: 'Volume2',
  sections: [
    { title: 'What is a Piezo Buzzer?', type: 'paragraph', icon: 'Info', content: 'A piezo buzzer uses the piezoelectric effect - applying voltage causes a ceramic disc to flex, creating sound. Active buzzers have a built-in oscillator and buzz at one tone. Passive buzzers need an external PWM signal.' },
    { title: 'Active vs Passive', type: 'list', icon: 'Layers', content: ['Active: Apply 5V = constant tone. Simple but only one frequency.', 'Passive: Requires PWM signal. Frequency of PWM = pitch of tone.', 'Most bare discs are passive. Modules with small PCB are often active.', 'Use tone() function in Arduino for passive buzzers'] },
    { title: 'Pin Connections', type: 'list', icon: 'Grid', content: ['Positive (+): Connect to GPIO pin (active) or PWM pin (passive)', 'Negative (-): Connect to GND', 'Can be driven directly from most microcontroller GPIO pins', 'Optional: add 100 ohm resistor to limit current'] },
  ],
  proTips: ['Use tone() and noTone() in Arduino for passive buzzers', 'Create melodies by varying frequency and duration with tone()', 'Add a transistor for louder volume by driving with more current'],
  commonMistakes: ['Using tone() on an active buzzer (works but ignores frequency)', 'Leaving buzzer connected and tone() running with no noTone() call', 'Confusing active and passive (they look identical)'],
};

// ==================== POWER ====================

export const battery9VGuide: ComponentGuide = {
  title: '9V Battery Guide',
  icon: 'Battery',
  sections: [
    { title: 'About the 9V Battery', type: 'paragraph', icon: 'Info', content: 'The 9V battery contains six 1.5V cells in series inside a rectangular casing. Its unique snap connector makes reverse connection impossible by design.' },
    { title: 'Specifications', type: 'list', icon: 'Hash', content: ['Nominal voltage: 9V', 'Typical capacity: 500-600 mAh (alkaline)', 'Internal resistance increases as battery drains', 'Not ideal for high-current loads (drops voltage quickly)'] },
    { title: 'Common Uses', type: 'list', icon: 'Cpu', content: ['Powering Arduino and similar microcontrollers', 'Smoke detectors and alarm systems', 'Portable audio equipment', 'Prototyping power supply'] },
  ],
  proTips: ['Use a voltage regulator (7805 or LM317) to step down to 5V cleanly', 'Check battery voltage under load - it drops as current increases', 'Rechargeable 9V batteries (NiMH) have lower internal resistance for better performance'],
  commonMistakes: ['Connecting high-current loads directly (battery drains very quickly)', 'Ignoring voltage drop under load', 'Not using a regulator - 9V directly damages 5V-only components'],
};

export const battery15VGuide: ComponentGuide = {
  title: '1.5V Battery Guide',
  icon: 'Battery',
  sections: [
    { title: 'About the 1.5V Battery', type: 'paragraph', icon: 'Info', content: 'The 1.5V alkaline cell (AA, AAA, C, D) produces voltage from a zinc-manganese dioxide electrochemical reaction. Stacking cells in series multiplies voltage: 2 cells = 3V, 4 cells = 6V, 6 cells = 9V.' },
    { title: 'Connecting Cells', type: 'list', icon: 'Grid', content: ['Series: positive of one to negative of next - voltages add', 'Parallel: positives together, negatives together - current capacity adds', 'Never mix old and new cells in series or parallel', 'AA batteries offer good balance of capacity and size'] },
    { title: 'Voltage Over Discharge Curve', type: 'list', icon: 'Activity', content: ['Fresh: 1.6V open circuit', 'Under load: typically 1.2-1.5V', 'Depleted: below 1.0V under load', 'Most circuits stop working reliably below 1.0-1.1V per cell'] },
  ],
  proTips: ['4x AA (6V) through a 5V regulator is a reliable portable supply', 'Use rechargeable NiMH AA cells (1.2V each) for sustainable projects', 'Monitor battery voltage in code to warn the user before complete depletion'],
  commonMistakes: ['Mixing battery brands or ages in the same holder', 'Forgetting NiMH cells are 1.2V each (not 1.5V) affecting total voltage', 'Leaving dead batteries in holders (can leak and corrode contacts)'],
};

export const coinCellGuide: ComponentGuide = {
  title: 'Coin Cell Battery Guide',
  icon: 'Battery',
  sections: [
    { title: 'About Coin Cell Batteries', type: 'paragraph', icon: 'Info', content: 'Coin cell batteries (most commonly CR2032) are compact lithium primary cells providing 3V. They are designed for ultra-low power applications where small size matters more than current capacity.' },
    { title: 'Specifications (CR2032)', type: 'list', icon: 'Hash', content: ['Voltage: 3V nominal', 'Capacity: ~220 mAh', 'Maximum continuous current: ~1-2mA (brief pulses up to 15mA)', 'Chemistry: Lithium manganese dioxide'] },
    { title: 'Common Uses', type: 'list', icon: 'Cpu', content: ['Real-time clock (RTC) backup power', 'Key fobs and remote controls', 'BIOS/CMOS memory retention on computers', 'Low-power sensors and wearables'] },
  ],
  proTips: ['Not suitable for high-current loads - use only for low-power circuits', 'Voltage remains stable until very near end of life, then drops quickly', 'Check polarity: positive face (flat top) and negative rim (bottom edge)'],
  commonMistakes: ['Attempting to draw more than a few mA (voltage collapses)', 'Shorting the battery (thin case can rupture - a safety hazard)', 'Confusing CR2032 (3V Li) with SR2032 (1.55V Silver Oxide)'],
};

export const solarCellGuide: ComponentGuide = {
  title: 'Solar Cell Guide',
  icon: 'Sun',
  sections: [
    { title: 'What is a Solar Cell?', type: 'paragraph', icon: 'Info', content: 'A solar cell (photovoltaic cell) converts light energy into electrical energy using the photovoltaic effect. Multiple cells in series increase voltage; cells in parallel increase current.' },
    { title: 'Key Specifications', type: 'list', icon: 'Hash', content: ['Open circuit voltage (Voc): maximum voltage with no load', 'Short circuit current (Isc): maximum current with terminals shorted', 'Maximum power point: optimal voltage/current balance', 'Efficiency: ratio of light energy converted to electricity'] },
    { title: 'Charging Batteries', type: 'list', icon: 'Zap', content: ['Add a diode to prevent battery discharging back through panel at night', 'Use a solar charge controller for lithium or lead-acid batteries', 'For simple NiMH charging, a resistor and diode can work for small panels'] },
  ],
  proTips: ['Direct sunlight produces maximum output - shade dramatically reduces output', 'Add a bypass diode if cells are in series to handle partial shading', 'A TP4056 module provides easy solar-to-LiPo charging'],
  commonMistakes: ['Testing indoors under artificial light (much lower output than rated)', 'Connecting directly to LiPo without a charge controller (dangerous)', 'Not accounting for the voltage drop of the blocking diode in calculations'],
};

// ==================== MOTOR ====================

export const vibrationMotorGuide: ComponentGuide = {
  title: 'Vibration Motor Guide',
  icon: 'Zap',
  sections: [
    { title: 'What is a Vibration Motor?', type: 'paragraph', icon: 'Info', content: 'A vibration motor uses an off-center (eccentric) rotating mass to create vibration. The faster it spins, the stronger the vibration. It is the haptic feedback component found in phones and game controllers.' },
    { title: 'Pin Connections', type: 'list', icon: 'Grid', content: ['Red wire (+): Connect to positive voltage (2V-5V typical)', 'Black wire (-): Connect to ground', 'Cannot be driven directly from most GPIO pins (draws too much current)', 'Use a transistor or MOSFET switch driven by GPIO'] },
    { title: 'Driving Circuit', type: 'list', icon: 'Cpu', content: ['GPIO -> 1k resistor -> NPN base (e.g. 2N2222)', 'NPN Collector -> Motor positive terminal', 'Motor negative -> GND', 'Add flyback diode across motor terminals for protection'] },
  ],
  proTips: ['Use PWM to control vibration intensity', 'Add a flyback diode (1N4001) across motor terminals', 'Secure the motor well - vibration can loosen connections'],
  commonMistakes: ['Driving directly from GPIO pin without a transistor (damages MCU)', 'Forgetting flyback diode protection', 'Not securing the motor - vibration shakes connections loose'],
};

export const dcMotorGuide: ComponentGuide = {
  title: 'DC Motor Guide',
  icon: 'Zap',
  sections: [
    { title: 'What is a DC Motor?', type: 'paragraph', icon: 'Info', content: 'A DC motor converts electrical energy into rotational mechanical motion. Reversing the polarity reverses the direction of rotation. Speed is controlled by PWM.' },
    { title: 'Driving a DC Motor', type: 'list', icon: 'Cpu', content: ['Never connect directly to a microcontroller GPIO pin', 'Use an H-Bridge (L298N, L293D, DRV8833) for direction control', 'H-Bridge allows forward, reverse, and braking', 'PWM on the enable pin controls speed'] },
    { title: 'L298N Motor Driver Pins', type: 'list', icon: 'Grid', content: ['IN1/IN2: Direction control (HIGH/LOW = forward, LOW/HIGH = reverse)', 'ENA: PWM speed control for motor A', 'OUT1/OUT2: Motor terminals', 'VCC: Motor supply (up to 35V), 5V logic supply'] },
    { title: 'Flyback Protection', type: 'list', icon: 'AlertTriangle', content: ['Motors generate voltage spikes when switching off', 'Add 1N4001 diodes across motor terminals (most drivers include these)', 'Use separate power supply for motors and logic'] },
  ],
  proTips: ['Add a large capacitor (100-1000uF) across motor power supply', 'Use separate power supplies for motor and microcontroller', 'Stall current can be 5-10x running current - size your supply accordingly'],
  commonMistakes: ['Driving motor directly from GPIO (destroys the pin)', 'Using same power supply for motor and MCU without decoupling', 'Forgetting flyback protection causes erratic MCU resets'],
};

export const dcMotorEncoderGuide: ComponentGuide = {
  title: 'DC Motor with Encoder Guide',
  icon: 'Zap',
  sections: [
    { title: 'What is an Encoder?', type: 'paragraph', icon: 'Info', content: 'An encoder attached to a motor provides position and speed feedback by counting pulses as the shaft rotates. Quadrature encoders use two channels (A and B) that allow both speed and direction sensing.' },
    { title: 'Encoder Pin Connections', type: 'list', icon: 'Grid', content: ['VCC: 3.3V or 5V for encoder electronics', 'GND: Ground', 'Channel A: Connect to interrupt-capable pin on MCU', 'Channel B: Connect to another digital pin for direction sensing', 'Motor terminals: Connect to motor driver as usual'] },
    { title: 'Reading the Encoder', type: 'list', icon: 'Cpu', content: ['Use hardware interrupts for reliable counting', 'Rising edge of A: if B is LOW = forward, B is HIGH = reverse', 'Pulses per revolution (PPR) given in motor specs', 'Position (degrees) = (count / PPR) x 360'] },
  ],
  proTips: ['Always use interrupt pins for encoder channels for reliable counting', 'Use the Encoder library in Arduino for clean quadrature reading', 'Add PID control loop for precise speed and position control'],
  commonMistakes: ['Polling encoder instead of using interrupts (misses pulses at speed)', 'Forgetting encoder requires its own power supply (VCC/GND)', 'Not knowing the PPR value makes position calculation impossible'],
};

export const microServoGuide: ComponentGuide = {
  title: 'Micro Servo Guide',
  icon: 'Zap',
  sections: [
    { title: 'What is a Servo Motor?', type: 'paragraph', icon: 'Info', content: 'A servo motor uses an internal potentiometer and control circuit to hold a precise angular position. It moves to a commanded angle and holds it, unlike a DC motor which spins continuously.' },
    { title: 'Pin Connections (3-wire)', type: 'list', icon: 'Grid', content: ['Brown/Black wire: GND', 'Red wire: VCC (4.8V to 6V - use 5V)', 'Orange/Yellow wire: PWM Signal from microcontroller', 'Pulse width 1ms = 0 degrees, 2ms = 180 degrees, 1.5ms = 90 degrees'] },
    { title: 'Arduino Code', type: 'list', icon: 'Cpu', content: ['#include <Servo.h>', 'Servo myServo;', 'myServo.attach(9); // PWM pin', 'myServo.write(90); // Move to 90 degrees', 'Range: 0-180 degrees'] },
  ],
  proTips: ['Power the servo from a separate 5V supply for stable operation under load', 'Servos draw high peak current when moving - add 100-470uF capacitor', 'Never force the servo arm past its physical limits'],
  commonMistakes: ['Powering from the Arduino 5V pin (insufficient current under load)', 'Using a non-PWM pin (servo will jitter or not respond)', 'Setting angles beyond the servo mechanical limits'],
};

export const hobbyGearmotorGuide: ComponentGuide = {
  title: 'Hobby Gearmotor Guide',
  icon: 'Zap',
  sections: [
    { title: 'What is a Gearmotor?', type: 'paragraph', icon: 'Info', content: 'A gearmotor combines a DC motor with a gear reduction box. The gears trade high motor speed for increased torque at the output shaft - enabling small motors to move heavy loads.' },
    { title: 'Key Specifications', type: 'list', icon: 'Hash', content: ['Gear ratio (e.g. 1:48): motor turns 48x for each output revolution', 'No-load speed: output RPM with no load attached', 'Stall torque: maximum torque before motor stalls', 'Stall current: highest current draw, occurs when shaft is blocked'] },
    { title: 'Driving the Motor', type: 'list', icon: 'Cpu', content: ['Use an H-Bridge driver (L298N, DRV8833) for direction control', 'PWM on enable pin controls speed', 'Reversing IN1/IN2 logic reverses direction', 'Add flyback diodes on motor terminals'] },
  ],
  proTips: ['Higher gear ratio = more torque but slower speed', 'Size your motor driver for at least 2x the stall current', 'D-shaped shaft pairs well with standard robot wheels'],
  commonMistakes: ['Not accounting for stall current when choosing motor driver', 'Expecting high speed from a high-ratio gearbox (physics says no)', 'Running motor at stall continuously (overheats the motor)'],
};

// ==================== DISPLAY ====================

export const sevenSegmentDisplayGuide: ComponentGuide = {
  title: '7-Segment Display Guide',
  icon: 'Monitor',
  sections: [
    { title: 'What is a 7-Segment Display?', type: 'paragraph', icon: 'Info', content: 'A 7-segment display uses 7 LED segments (A-G) arranged to display digits 0-9 and some letters. Each segment is an individual LED controlled independently.' },
    { title: 'Common Cathode vs Common Anode', type: 'list', icon: 'Layers', content: ['Common Cathode (CC): COM pins to GND. Send HIGH to light segments.', 'Common Anode (CA): COM pins to VCC. Send LOW to light segments (inverted).', 'Check your specific display datasheet to confirm type'] },
    { title: 'Segment to Digit Mapping', type: 'list', icon: 'Hash', content: ['0: A,B,C,D,E,F on (G off)', '1: B,C on only', '2: A,B,D,E,G on', '3: A,B,C,D,G on', '8: All segments on (good for testing)'] },
    { title: 'Current Limiting', type: 'list', icon: 'Zap', content: ['Each segment needs its own current-limiting resistor (~220-470 ohm)', 'Multiple segments on simultaneously share current - verify brightness is acceptable', 'Use shift registers (74HC595) to reduce pin count'] },
  ],
  proTips: ['Test with all segments on first (displays "8") to verify wiring', 'Use a 74HC595 shift register to drive from only 3 microcontroller pins', 'For multiple digits use multiplexing - display one digit at a time rapidly'],
  commonMistakes: ['Forgetting current-limiting resistors on each segment', 'Mixing up CC and CA (segments on or inverted logic)', 'Trying to multiplex without reducing resistor values accordingly'],
};

export const sevenSegmentClockGuide: ComponentGuide = {
  title: '7-Segment Clock Display Guide',
  icon: 'Monitor',
  sections: [
    { title: 'What is a 7-Segment Clock Display?', type: 'paragraph', icon: 'Info', content: 'A 7-segment clock display combines four digits with a colon separator specifically for clock applications. The colon LEDs blink at 1Hz to indicate the clock is running.' },
    { title: 'Driving Options', type: 'list', icon: 'Layers', content: ['Direct drive: connect all segments and digit pins to MCU (many pins)', 'I2C backpack (HT16K33): control all digits with just 2 wires', 'SPI driver: fast update for multiplexed displays', 'Adafruit 7-segment backpack library for HT16K33 modules'] },
    { title: 'RTC Integration', type: 'list', icon: 'Cpu', content: ['Pair with DS3231 or DS1307 RTC chip via I2C', 'RTC maintains time even when main power is off (coin cell backup)', 'Read hours and minutes from RTC and write to display each second', 'Toggle colon state each second for the blinking effect'] },
  ],
  proTips: ['Use a DS3231 RTC (more accurate than DS1307) for clock projects', 'Dim display in the evening using PWM on the brightness control', 'Add a button to set time without reprogramming'],
  commonMistakes: ['Using millis() for timekeeping (drifts noticeably over days)', 'Not accounting for 12h/24h format in display logic', 'Forgetting the coin cell backup for the RTC'],
};

export const lcd16x2Guide: ComponentGuide = {
  title: 'LCD 16x2 Guide',
  icon: 'Monitor',
  sections: [
    { title: 'What is an LCD 16x2?', type: 'paragraph', icon: 'Info', content: 'A 16x2 LCD displays 2 rows of 16 characters each using the industry-standard HD44780 controller. It is driven via a parallel interface requiring up to 10 pins from the microcontroller.' },
    { title: 'Pin Connections (4-bit mode)', type: 'list', icon: 'Grid', content: ['VSS (1): GND', 'VDD (2): 5V', 'VO (3): Contrast - connect potentiometer wiper (10k pot)', 'RS (4): Register Select - GPIO', 'RW (5): Read/Write - tie to GND for write-only', 'E (6): Enable - GPIO', 'D4-D7 (11-14): Data pins - 4 GPIOs', 'A (15): Backlight + through 220 ohm resistor', 'K (16): Backlight GND'] },
    { title: 'Arduino Code', type: 'list', icon: 'Cpu', content: ['#include <LiquidCrystal.h>', 'LiquidCrystal lcd(RS, E, D4, D5, D6, D7);', 'lcd.begin(16, 2);', 'lcd.print("Hello World!");', 'lcd.setCursor(0, 1); // column 0, row 1'] },
  ],
  proTips: ['Adjust VO contrast pot until you can see the character blocks clearly', 'Use lcd.clear() sparingly - it is slow and causes flicker', 'Create custom characters with lcd.createChar() for symbols'],
  commonMistakes: ['Not connecting the contrast pin (screen appears blank)', 'Wiring RS and Enable pins swapped', 'Using lcd.clear() in a fast loop causing visible flicker'],
};

export const lcd16x2I2CGuide: ComponentGuide = {
  title: 'LCD 16x2 I2C Guide',
  icon: 'Monitor',
  sections: [
    { title: 'What is the I2C LCD?', type: 'paragraph', icon: 'Info', content: 'An I2C LCD module combines a standard 16x2 LCD with a PCF8574 I2C backpack. It reduces wiring from 10 pins to just 4 (VCC, GND, SDA, SCL).' },
    { title: 'Pin Connections', type: 'list', icon: 'Grid', content: ['VCC: 5V', 'GND: Ground', 'SDA: I2C data - connect to MCU SDA (Arduino: A4)', 'SCL: I2C clock - connect to MCU SCL (Arduino: A5)', 'Default I2C address: 0x27 or 0x3F'] },
    { title: 'Finding the I2C Address', type: 'list', icon: 'Hash', content: ['Run an I2C scanner sketch to find the address', 'Common addresses: 0x27 (PCF8574) or 0x3F (PCF8574A)', 'Some modules have solder jumpers to change address', 'Up to 8 LCD modules can share the same I2C bus with different addresses'] },
    { title: 'Arduino Library', type: 'list', icon: 'Cpu', content: ['Install: LiquidCrystal_I2C by Frank de Brabander', 'LiquidCrystal_I2C lcd(0x27, 16, 2);', 'lcd.init(); lcd.backlight();', 'lcd.print("Hello!");'] },
  ],
  proTips: ['Always run the I2C scanner first to confirm your module address', 'Use lcd.noBacklight() to save power when display is not needed', 'For long I2C cables add 4.7k pull-ups on SDA and SCL'],
  commonMistakes: ['Using wrong I2C address in code (display stays blank)', 'Forgetting lcd.init() and lcd.backlight() in setup()', 'Connecting SDA/SCL to wrong pins (varies by Arduino board)'],
};

// ==================== BREADBOARD ====================

export const breadboard63RGuide: ComponentGuide = {
  title: 'Breadboard 63R x 10C Guide',
  icon: 'CircuitBoard',
  sections: [
    { title: 'What is a Full-Size Breadboard?', type: 'paragraph', icon: 'Info', content: 'This full-size breadboard with 63 rows provides ample space for complex circuits with multiple ICs, sensors, and support components. It is the standard choice for prototyping on a workbench.' },
    { title: 'Power Rails', type: 'list', icon: 'Zap', content: ['Red (+) rail: connected vertically along full length', 'Blue (-) rail: connected vertically along full length', 'Rails on each side are independent - connect them with a wire if needed', 'Some boards have a gap at mid-length - bridge it for continuous rails'] },
    { title: 'Terminal Strips', type: 'list', icon: 'Grid', content: ['63 numbered rows', 'Each row has two groups of 5 holes (a-e and f-j)', 'The center channel separates the two groups', 'Each group of 5 in a row is connected internally'] },
  ],
  proTips: ['Color-code wires: red for power, black for ground, others for signals', 'Keep wires flat and short for cleaner layouts and easier debugging', 'Take a photo of working circuits before disassembling'],
  commonMistakes: ['Forgetting the center channel separates rows (IC pins not bridged)', 'Not connecting both sets of power rails when using both sides', 'Pushing components in at an angle (bent legs, poor contact)'],
};

export const breadboardSmallGuide: ComponentGuide = {
  title: 'Breadboard Small 30R x 10C Guide',
  icon: 'CircuitBoard',
  sections: [
    { title: 'What is a Half-Size Breadboard?', type: 'paragraph', icon: 'Info', content: 'The half-size breadboard with 30 rows is perfect for simple to medium complexity circuits. Compact enough for portable projects, it still supports most DIP ICs and sensor modules.' },
    { title: 'Layout', type: 'list', icon: 'Grid', content: ['30 rows of connection points', 'Standard 0.1 inch (2.54mm) hole spacing', 'Power rails on both sides', 'Center channel for IC placement'] },
    { title: 'Best Uses', type: 'list', icon: 'Cpu', content: ['Single IC projects with supporting components', 'Sensor breakout modules', 'Small filter or amplifier circuits', 'Quick proof-of-concept builds'] },
  ],
  proTips: ['Connect power rails to a nearby full-size breadboard for expansion', 'Great for portable projects in small enclosures', 'Combine two half-size boards for near-full-size capability'],
  commonMistakes: ['Running out of space when the project grows (plan ahead)', 'Not leaving enough rows for future debugging components', 'Forgetting rails may not be joined at center on some models'],
};

export const breadboardMiniGuide: ComponentGuide = {
  title: 'Breadboard Mini 17R x 10C Guide',
  icon: 'CircuitBoard',
  sections: [
    { title: 'What is a Mini Breadboard?', type: 'paragraph', icon: 'Info', content: 'The mini breadboard with 17 rows is the most compact prototyping option. Ideal for small sensor breakouts, wearables, and situations where space is extremely limited.' },
    { title: 'Layout', type: 'list', icon: 'Grid', content: ['17 rows of connection points', 'No power rails (add your own connections)', 'Standard 0.1 inch spacing', 'Often has adhesive backing for mounting'] },
    { title: 'Best Uses', type: 'list', icon: 'Cpu', content: ['Wearable electronics prototyping', 'Single-sensor breakout boards', 'Adding a small modification to a larger project', 'Mounting directly onto a robot or enclosure'] },
  ],
  proTips: ['Peel the adhesive backing and stick directly to your project enclosure', 'Add separate power and ground bus wires along the edge rows', 'Combine multiple mini boards for modular project layouts'],
  commonMistakes: ['Trying to fit a DIP-14 or larger IC (not enough rows on both sides)', 'Forgetting there are no built-in power rails', 'Overpopulating the board and making debugging impossible'],
};

// ==================== POWER CONTROL ====================

export const npnTransistorGuide: ComponentGuide = {
  title: 'NPN Transistor Guide',
  icon: 'Cpu',
  sections: [
    { title: 'What is an NPN Transistor?', type: 'paragraph', icon: 'Info', content: 'An NPN transistor is a current-controlled switch and amplifier. A small current into the Base allows a much larger current to flow from Collector to Emitter. It is the most common transistor type.' },
    { title: 'Pin Identification (TO-92)', type: 'list', icon: 'Grid', content: ['Flat side facing you: left=Emitter, center=Base, right=Collector', 'Always verify with the datasheet for your specific part', 'Common NPN types: 2N2222, BC547, 2N3904', 'Emitter typically goes to GND in switching circuits'] },
    { title: 'Switching Circuit', type: 'list', icon: 'Cpu', content: ['GPIO -> 1k resistor -> Base', 'Collector -> Load -> VCC', 'Emitter -> GND', 'Add flyback diode across inductive loads (motors, relays)'] },
  ],
  proTips: ['Add a 10k pull-down resistor from Base to GND to ensure clean OFF state', 'Use a base resistor to limit base current (1k for most logic switching)', 'For high-current loads, choose a transistor with sufficient hFE and Ic rating'],
  commonMistakes: ['Wrong pinout - always check datasheet (varies by package)', 'No base resistor (forces transistor into heavy saturation, wastes current)', 'Forgetting flyback diode on inductive loads (causes voltage spikes)'],
};

export const pnpTransistorGuide: ComponentGuide = {
  title: 'PNP Transistor Guide',
  icon: 'Cpu',
  sections: [
    { title: 'What is a PNP Transistor?', type: 'paragraph', icon: 'Info', content: 'A PNP transistor is the complement of NPN. Current flows from Emitter to Collector when the Base is pulled LOW relative to the Emitter. Used for high-side switching.' },
    { title: 'Pin Identification', type: 'list', icon: 'Grid', content: ['Flat side facing you: left=Emitter, center=Base, right=Collector', 'Common PNP types: 2N2907, BC557, 2N3906', 'Emitter typically connects to VCC in switching circuits', 'Transistor turns ON when Base is pulled LOW'] },
    { title: 'High-Side Switching Circuit', type: 'list', icon: 'Cpu', content: ['Emitter -> VCC', 'Collector -> Load -> GND', 'Base -> 1k resistor -> GPIO', 'GPIO LOW = transistor ON, GPIO HIGH = transistor OFF (inverted logic)'] },
  ],
  proTips: ['PNP is naturally suited for high-side (positive rail) switching', 'Add pull-up resistor from Base to VCC to ensure clean OFF state', 'Remember logic is inverted: LOW on Base = transistor ON'],
  commonMistakes: ['Forgetting inverted logic (LOW = ON, not HIGH = ON)', 'Connecting Emitter to GND instead of VCC', 'Using NPN circuit pinout for a PNP transistor'],
};

export const nMOSTransistorGuide: ComponentGuide = {
  title: 'Small Signal nMOS Transistor Guide',
  icon: 'Cpu',
  sections: [
    { title: 'What is a Small Signal nMOS?', type: 'paragraph', icon: 'Info', content: 'A small signal nMOS (n-channel MOSFET) is a voltage-controlled switch that draws virtually zero gate current. It turns on when Gate voltage exceeds the threshold voltage (typically 1-3V).' },
    { title: 'Pin Identification', type: 'list', icon: 'Grid', content: ['Gate (G): Voltage control input - draws no current', 'Drain (D): Current flows in through drain', 'Source (S): Current flows out to GND', 'Check datasheet for your specific package pinout'] },
    { title: 'Switching Circuit', type: 'list', icon: 'Cpu', content: ['GPIO -> Gate (no resistor needed, but 100 ohm helps stability)', 'Drain -> Load -> VCC', 'Source -> GND', 'Add 10k pull-down from Gate to GND to ensure OFF when GPIO floating'] },
  ],
  proTips: ['Always add 10k pull-down on Gate to prevent floating gate (random switching)', 'Gate needs no current - but a series resistor prevents ringing', 'For logic-level control use a logic-level MOSFET (Vgs(th) < 3.3V)'],
  commonMistakes: ['Floating gate causing random on/off switching', 'Using a MOSFET with too high Vgs(th) for 3.3V logic', 'Confusing Drain and Source (source is always lower potential for nMOS)'],
};

export const pMOSTransistorGuide: ComponentGuide = {
  title: 'Small Signal pMOS Transistor Guide',
  icon: 'Cpu',
  sections: [
    { title: 'What is a Small Signal pMOS?', type: 'paragraph', icon: 'Info', content: 'A small signal p-channel MOSFET turns on when the Gate voltage is pulled LOW relative to the Source. It naturally suits high-side switching - controlling the positive supply rail.' },
    { title: 'Pin Identification', type: 'list', icon: 'Grid', content: ['Gate (G): Voltage control - pull LOW to turn ON', 'Drain (D): Current flows out toward load', 'Source (S): Connect to positive supply VCC', 'Always check datasheet for your specific package'] },
    { title: 'High-Side Switching Circuit', type: 'list', icon: 'Cpu', content: ['Source -> VCC', 'Gate -> 10k pull-up to VCC (off state) and GPIO through 1k resistor', 'Drain -> Load -> GND', 'GPIO LOW = FET ON, GPIO HIGH = FET OFF (inverted logic)'] },
  ],
  proTips: ['Add 10k pull-up from Gate to VCC to ensure OFF when GPIO is floating', 'For 5V supply with 3.3V logic, verify the gate swing is sufficient to fully turn on', 'pMOS is preferred for high-side battery power switching'],
  commonMistakes: ['Connecting Source to GND (pMOS Source must be at higher potential)', 'Forgetting inverted logic: LOW = ON', 'Not pulling Gate to VCC for OFF state'],
};

export const nMOSMosfetGuide: ComponentGuide = {
  title: 'nMOS Power MOSFET Guide',
  icon: 'Cpu',
  sections: [
    { title: 'What is a Power nMOS MOSFET?', type: 'paragraph', icon: 'Info', content: 'A power n-channel MOSFET can switch very high currents (tens to hundreds of amps) with just a 5V gate signal. It is the primary switching element in motor controllers, switching power supplies, and battery management systems.' },
    { title: 'Key Specifications', type: 'list', icon: 'Hash', content: ['Vds(max): Maximum drain-source voltage', 'Id(max): Maximum continuous drain current', 'Rds(on): On-resistance - lower means less heat at high current', 'Vgs(th): Gate threshold voltage - must be below your logic level'] },
    { title: 'Pin Connections', type: 'list', icon: 'Grid', content: ['Gate (G): PWM or logic signal from MCU (via 10-100 ohm resistor)', 'Drain (D): To load, load to VCC', 'Source (S): To GND', 'Add 10k pull-down from Gate to GND'] },
  ],
  proTips: ['Use a gate driver IC for fast switching in high-frequency applications', 'Add a heatsink for continuous high-current operation', 'Choose Rds(on) as low as possible to minimize heat generation'],
  commonMistakes: ['Using a MOSFET with Vgs(th) higher than your logic voltage', 'No heatsink for high-power applications (MOSFET overheats)', 'No gate pull-down resistor causing undefined state when MCU resets'],
};

export const pMOSMosfetGuide: ComponentGuide = {
  title: 'pMOS Power MOSFET Guide',
  icon: 'Cpu',
  sections: [
    { title: 'What is a Power pMOS MOSFET?', type: 'paragraph', icon: 'Info', content: 'A power p-channel MOSFET controls current from a positive supply rail (high-side switching). It turns on when the Gate is pulled below the Source voltage, making it ideal for battery disconnect switches and load switching.' },
    { title: 'Key Specifications', type: 'list', icon: 'Hash', content: ['Vds(max): Maximum drain-source voltage (negative for pMOS)', 'Id(max): Maximum continuous current (negative convention)', 'Rds(on): On-resistance', 'Vgs(th): Negative threshold - Gate must drop below Source by this amount'] },
    { title: 'Pin Connections', type: 'list', icon: 'Grid', content: ['Source (S): Connect to VCC (positive supply)', 'Gate (G): Pull to VCC via 10k (OFF), drive LOW to turn ON', 'Drain (D): Connect to load', 'Load connects from Drain to GND'] },
  ],
  proTips: ['Use an N-channel with a gate driver for simpler high-side switching in most designs', 'pMOS is most useful when you want the gate tied to the same rail as Source', 'Add a gate-source zener diode to protect against Vgs exceeding the rating'],
  commonMistakes: ['Source to GND instead of VCC', 'Logic voltage not low enough to fully enhance the channel', 'Forgetting Vgs rating - exceeding it destroys the gate oxide'],
};

export const tip120Guide: ComponentGuide = {
  title: 'TIP120 Darlington Transistor Guide',
  icon: 'Cpu',
  sections: [
    { title: 'What is the TIP120?', type: 'paragraph', icon: 'Info', content: 'The TIP120 is a Darlington transistor - two NPN transistors connected internally for a combined gain up to 1000x. A 5mA Arduino signal can control up to 5A of load current.' },
    { title: 'Pin Identification (TO-220)', type: 'list', icon: 'Grid', content: ['Base (B): Left pin - control input from MCU', 'Collector (C): Center pin - connect to load', 'Emitter (E): Right pin - connect to GND', 'Metal tab: electrically connected to Collector - use heatsink for high power'] },
    { title: 'Switching Circuit', type: 'list', icon: 'Cpu', content: ['GPIO -> 1k resistor -> Base', 'Collector -> Load -> VCC (up to 60V, 5A continuous)', 'Emitter -> GND', 'Always add flyback diode across inductive loads'] },
    { title: 'Voltage Drop Warning', type: 'warning', icon: 'AlertTriangle', content: 'The TIP120 has a higher saturation voltage (~1.4V) than a single transistor due to the Darlington pair. Account for this in low-voltage circuits.' },
  ],
  proTips: ['Add heatsink if switching more than 1-2A continuously', 'Use a 10k pull-down from Base to GND for a reliable OFF state', 'For motors, always add a 1N4001 flyback diode across the motor terminals'],
  commonMistakes: ['Forgetting the flyback diode on motors/relays/solenoids', 'Ignoring the 1.4V saturation voltage in low-voltage applications', 'No heatsink for high-current loads (TIP120 gets very hot)'],
};

// ==================== MICROCONTROLLER ====================

export const trioeboardGuide: ComponentGuide = {
  title: 'Trioe Board Guide',
  icon: 'Cpu',
  sections: [
    { title: 'What is the TrioeBoard?', type: 'paragraph', icon: 'Info', content: 'The TrioeBoard is an Arduino-compatible microcontroller board designed for learning electronics and IoT through hands-on projects. It can be programmed using the Arduino IDE and works with millions of existing Arduino libraries.' },
    { title: 'Getting Started', type: 'list', icon: 'Zap', content: ['Install the Arduino IDE from arduino.cc', 'Connect the board via USB', 'Select the correct board and port in Tools menu', 'Write your code and click Upload', 'Use Serial.begin(9600) and Serial.println() for debugging'] },
    { title: 'Pin Types', type: 'list', icon: 'Grid', content: ['Digital pins: read/write HIGH or LOW signals', 'Analog pins (A0-A5): read variable voltages 0-5V', 'PWM pins (~): simulate analog output for motors and LEDs', 'Power pins: 3.3V, 5V, and GND for powering components'] },
  ],
  proTips: ['Always connect GND before VCC when wiring components', 'Use Serial.println() to debug sensor readings', 'Never draw more than 40mA from a single digital pin', 'Add a 100-470uF capacitor across power rails to stabilize voltage'],
  commonMistakes: ['Wrong board or port selected in Arduino IDE', 'Forgetting to share GND between board and external components', 'Drawing too much current from a single pin (use a transistor for motors)', 'Not installing required libraries before uploading code'],
};

export const trioebreadboardGuide: ComponentGuide = {
  title: 'Trioe Breadboard Guide',
  icon: 'CircuitBoard',
  sections: [
    { title: 'What is the TrioeBreadboard?', type: 'paragraph', icon: 'Info', content: 'The TrioeBreadboard is a  prototyping board designed to pair with the Trioe Board.' },
  ],
  proTips: ['Color-code your wires: red for power, black for ground', 'Keep wires flat against the board for cleaner layouts', 'Take a photo of working circuits before disassembling'],
  commonMistakes: ['Not connecting both power rails to the TrioeBoard', 'Pushing components in at an angle causing poor contact'],
};

// ==================== GUIDE REGISTRY ====================

export const componentGuides = {
  // General
  resistor: resistorGuide,
  capacitor: capacitorGuide,
  polarizedcapacitor: polarizedCapacitorGuide,
  diode: diodeGuide,
  zenerdiode: zenerDiodeGuide,
  inductor: inductorGuide,
  // Input
  pushbutton: pushButtonGuide,
  potentiometer: potentiometerGuide,
  slideswitch: slideSwitchGuide,
  photoresistor: photoresistorGuide,
  photodiode: photodiodeGuide,
  ambientlightsensor: ambientLightSensorGuide,
  flexsensor: flexSensorGuide,
  forcesensor: forceSensorGuide,
  pirsensor: pirSensorGuide,
  irsensor: irSensorGuide,
  ultrasonicsensor: ultrasonicSensorGuide,
  ultrasonicsensor4pin: ultrasonicSensor4PinGuide,
  soilmoisturesensor: soilMoistureSensorGuide,
  tiltsensor: tiltSensorGuide,
  temperaturesensor: temperatureSensorGuide,
  gassensor: gasSensorGuide,
  keypad4x4: keypad4x4Guide,
  dipswitch: dipSwitchGuide,
  // Output
  led: ledGuide,
  rgbled: rgbLedGuide,
  lightbulb: lightBulbGuide,
  neopixel: neoPixelGuide,
  piezobuzzer: piezoBuzzerGuide,
  // Power
  battery9v: battery9VGuide,
  battery15v: battery15VGuide,
  coincell: coinCellGuide,
  solarcell: solarCellGuide,
  // Motor
  vibrationmotor: vibrationMotorGuide,
  dcmotor: dcMotorGuide,
  dcmotorencoder: dcMotorEncoderGuide,
  microservo: microServoGuide,
  hobbygearmotor: hobbyGearmotorGuide,
  // Display
  sevensegmentdisplay: sevenSegmentDisplayGuide,
  sevensegmentclock: sevenSegmentClockGuide,
  lcd16x2: lcd16x2Guide,
  lcd16x2i2c: lcd16x2I2CGuide,
  // Breadboard
  breadboard63r: breadboard63RGuide,
  breadboardsmall: breadboardSmallGuide,
  breadboardmini: breadboardMiniGuide,
  // Power Control
  npntransistor: npnTransistorGuide,
  pnptransistor: pnpTransistorGuide,
  nmostransistor: nMOSTransistorGuide,
  pmostransistor: pMOSTransistorGuide,
  nmosmosfet: nMOSMosfetGuide,
  pmosmosfet: pMOSMosfetGuide,
  tip120: tip120Guide,
  // Microcontroller
  trioeboard:  trioeboardGuide,
   trioebreadboard:  trioebreadboardGuide,

  // Helper function to get guide by component URL
  getGuideByUrl: (url: string): ComponentGuide | null => {
    const u = url.toLowerCase();
    // General
    if (u.includes('resistor')) return resistorGuide;
    if (u.includes('polarized')) return polarizedCapacitorGuide;
    if (u.includes('capacitor')) return capacitorGuide;
    if (u.includes('inductor')) return inductorGuide;
    if (u.includes('zener')) return zenerDiodeGuide;
    if (u.includes('diode') && !u.includes('photo')) return diodeGuide;
    // Input
    if (u.includes('pushbutton')) return pushButtonGuide;
    if (u.includes('potentiometer')) return potentiometerGuide;
    if (u.includes('slideswitch')) return slideSwitchGuide;
    if (u.includes('dipswitch')) return dipSwitchGuide;
    if (u.includes('keypad')) return keypad4x4Guide;
    if (u.includes('photoresistor')) return photoresistorGuide;
    if (u.includes('photodiode')) return photodiodeGuide;
    if (u.includes('ambientlight')) return ambientLightSensorGuide;
    if (u.includes('flexsensor')) return flexSensorGuide;
    if (u.includes('forcesensor')) return forceSensorGuide;
    if (u.includes('pirsensor')) return pirSensorGuide;
    if (u.includes('irsensor')) return irSensorGuide;
    if (u.includes('ultrasonic') && u.includes('4')) return ultrasonicSensor4PinGuide;
    if (u.includes('ultrasonic')) return ultrasonicSensorGuide;
    if (u.includes('soilmoisture')) return soilMoistureSensorGuide;
    if (u.includes('tiltsensor')) return tiltSensorGuide;
    if (u.includes('temperaturesensor')) return temperatureSensorGuide;
    if (u.includes('gassensor')) return gasSensorGuide;
    // Output
    if (u.includes('rgbled')) return rgbLedGuide;
    if (u.includes('neopixel')) return neoPixelGuide;
    if (u.includes('lightbulb')) return lightBulbGuide;
    if (u.includes('piezo')) return piezoBuzzerGuide;
    if (u.includes('led')) return ledGuide;
    // Power
    if (u.includes('9v') || u.includes('9battery')) return battery9VGuide;
    if (u.includes('1.5') || u.includes('15battery')) return battery15VGuide;
    if (u.includes('coincell')) return coinCellGuide;
    if (u.includes('solar')) return solarCellGuide;
    // Motor
    if (u.includes('vibration')) return vibrationMotorGuide;
    if (u.includes('encoder')) return dcMotorEncoderGuide;
    if (u.includes('dcmotor')) return dcMotorGuide;
    if (u.includes('microservo')) return microServoGuide;
    if (u.includes('hobbygear')) return hobbyGearmotorGuide;
    // Display
    if (u.includes('7segmentclock')) return sevenSegmentClockGuide;
    if (u.includes('7segment')) return sevenSegmentDisplayGuide;
    if (u.includes('lcd16x2') && u.includes('i2c')) return lcd16x2I2CGuide;
    if (u.includes('lcd16x2')) return lcd16x2Guide;
    // Breadboard
    if (u.includes('breadboard63')) return breadboard63RGuide;
    if (u.includes('breadboardsmall')) return breadboardSmallGuide;
    if (u.includes('breadboardmini')) return breadboardMiniGuide;
    // Power Control
    if (u.includes('npntransistor')) return npnTransistorGuide;
    if (u.includes('pnptransistor')) return pnpTransistorGuide;
    if (u.includes('nmostransistor')) return nMOSTransistorGuide;
    if (u.includes('pmostransistor')) return pMOSTransistorGuide;
    if (u.includes('nmosmosfet')) return nMOSMosfetGuide;
    if (u.includes('pmosmosfet')) return pMOSMosfetGuide;
    if (u.includes('tip120')) return tip120Guide;
    // Microcontroller
    if (u.includes('trioeboard')) return trioeboardGuide;
    if (u.includes('trioebreadboard')) return trioebreadboardGuide;
    return null;
  }
};