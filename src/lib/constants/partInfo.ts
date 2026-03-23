export interface PartInfo {
  partName: string;
  description: string;
  category?: string;
}

export interface ComponentPartInfo {
  [key: string]: PartInfo[];
}

export const componentPartInfo: ComponentPartInfo = {

  // ==================== GENERAL ====================

  resistor: [
    { partName: "Resistor Body", description: "The main ceramic or carbon body that contains the resistive element. It limits the flow of electric current in a circuit.", category: "Main Body" },
    { partName: "Band 1", description: "First color band. Represents the first significant digit of the resistance value.", category: "Markings" },
    { partName: "Band 2", description: "Second color band. Represents the second significant digit of the resistance value.", category: "Markings" },
    { partName: "Band 3", description: "Third color band. Represents the multiplier - the power of ten to multiply the first two digits by.", category: "Markings" },
    { partName: "Band 4", description: "Fourth color band. Represents the tolerance - how close the actual resistance is to the stated value (e.g. gold = ±5%).", category: "Markings" },
    { partName: "Leads", description: "Tinned copper wires on both ends that connect the resistor to the circuit via solder or breadboard.", category: "Terminals" },
  ],

  capacitor: [
    { partName: "Ceramic Body", description: "The small disc or rectangular ceramic housing. It stores electrical energy by creating an electric field when voltage is applied.", category: "Main Body" },
    { partName: "Leads", description: "Two equal-length metal leads. Non-polarized - can be connected either way in a circuit.", category: "Terminals" },
  ],

  polarizedcapacitor: [
    { partName: "Capacitor Body", description: "The cylindrical aluminum housing containing the electrolyte and rolled foil plates. Stores much more charge than ceramic types of the same size.", category: "Main Body" },
    { partName: "Positive Lead (+)", description: "The longer lead. Must always be connected to the higher potential side. Connecting it backwards can cause the capacitor to fail or explode.", category: "Terminals" },
    { partName: "Negative Lead (-)", description: "The shorter lead, also marked by a stripe on the body. Must be connected to ground or lower potential.", category: "Terminals" },
    { partName: "Vent", description: "The scored markings on the top of the cap. If the capacitor overheats or is connected incorrectly, the vent ruptures to release pressure safely.", category: "Safety" },
  ],

  diode: [
    { partName: "Diode Body", description: "The glass or epoxy housing containing the P-N semiconductor junction that allows current to flow in only one direction.", category: "Main Body" },
    { partName: "Cathode Band", description: "The stripe or ring at one end marking the cathode (-). Current exits here. Always connect this side toward ground.", category: "Markings" },
    { partName: "Anode Lead", description: "The unmarked end where current enters the diode. Connect to the positive side of the circuit.", category: "Terminals" },
    { partName: "P-N Junction", description: "The internal semiconductor junction. The P-type and N-type silicon layers meet here, creating the one-way current gate.", category: "Active Element" },
  ],

  zenerdiode: [
    { partName: "Zener Body", description: "Similar in appearance to a standard diode but engineered to operate reliably in reverse breakdown. Used for voltage regulation.", category: "Main Body" },
    { partName: "Cathode Band", description: "The striped end marking the cathode (-). In Zener operation, current flows from cathode to anode in reverse breakdown.", category: "Markings" },
    { partName: "Anode Lead", description: "The unmarked end. In normal diode mode, current enters here. In Zener mode, this side faces ground.", category: "Terminals" },
    { partName: "Zener Junction", description: "The specially doped P-N junction that breaks down at a precise, stable voltage - clamping voltage spikes and regulating power rails.", category: "Active Element" },
  ],

  inductor: [
    { partName: "Coil Winding", description: "Tightly wound copper wire that creates a magnetic field when current flows through it. More turns means higher inductance.", category: "Active Element" },
    { partName: "Core", description: "The material inside the coil (air, ferrite, or iron). Ferrite and iron cores increase inductance significantly.", category: "Main Body" },
    { partName: "Leads", description: "The two wire terminals extending from the coil. Non-polarized - can be connected in either direction.", category: "Terminals" },
  ],

  // ==================== INPUT ====================

  pushbutton: [
    { partName: "Actuator", description: "The plastic cap you press. Pushing it down bridges the internal contacts and closes the circuit.", category: "Mechanical" },
    { partName: "Pin 1 & Pin 2", description: "One pair of pins on one side of the button. These are internally connected.", category: "Terminals" },
    { partName: "Pin 3 & Pin 4", description: "The other pair of pins on the opposite side. When the button is pressed, all four pins become connected.", category: "Terminals" },
    { partName: "Spring Mechanism", description: "Internal spring that pushes the actuator back up when released, opening the circuit again.", category: "Mechanical" },
  ],

  potentiometer: [
    { partName: "Resistive Track", description: "The internal carbon or cermet strip that provides a fixed total resistance from pin 1 to pin 3.", category: "Active Element" },
    { partName: "Wiper Pin (Middle)", description: "The center pin. Connected to the sliding contact that moves along the resistive track, outputting a variable voltage.", category: "Terminals" },
    { partName: "End Pin 1", description: "One end of the resistive track. Typically connected to VCC or ground depending on the circuit.", category: "Terminals" },
    { partName: "End Pin 2", description: "The other end of the resistive track. Typically connected to the opposite rail from Pin 1.", category: "Terminals" },
    { partName: "Shaft/Knob", description: "The rotating part that moves the internal wiper. Turning it changes the output voltage linearly.", category: "Mechanical" },
  ],

  slideswitch: [
    { partName: "Slider Actuator", description: "The part you physically move to switch between positions. It slides a conductive bridge between contact sets.", category: "Mechanical" },
    { partName: "Common Pin", description: "The center pin that is always connected. It bridges either to the left or right pin depending on slider position.", category: "Terminals" },
    { partName: "Position A Pin", description: "Connected to the common pin when the slider is in one position.", category: "Terminals" },
    { partName: "Position B Pin", description: "Connected to the common pin when the slider is in the other position.", category: "Terminals" },
  ],

  photoresistor: [
    { partName: "Sensing Surface", description: "The zigzag cadmium sulfide (CdS) track exposed to light. Resistance drops dramatically as light intensity increases.", category: "Active Element" },
    { partName: "Leads", description: "Two equal leads - non-polarized. Can be connected either way in the circuit.", category: "Terminals" },
  ],

  photodiode: [
    { partName: "Photodiode Window", description: "The clear or tinted lens on top that allows light to reach the semiconductor junction inside.", category: "Optics" },
    { partName: "Anode (+)", description: "The longer lead. In photoconductive mode, connect to ground. In photovoltaic mode, this outputs positive voltage.", category: "Terminals" },
    { partName: "Cathode (-)", description: "The shorter lead. In photoconductive mode, connect to reverse bias voltage. Generates current when light hits the junction.", category: "Terminals" },
  ],

  ambientlightsensor: [
    { partName: "Sensor Body", description: "The IC package containing a photodiode array and signal conditioning circuitry that mimics human eye response.", category: "Main Body" },
    { partName: "VCC Pin", description: "Power supply pin. Connect to 3.3V or 5V depending on the module.", category: "Power" },
    { partName: "GND Pin", description: "Ground reference pin. Connect to circuit ground.", category: "Power" },
    { partName: "SDA Pin", description: "I2C data line for communicating light level readings to a microcontroller.", category: "Signal" },
    { partName: "SCL Pin", description: "I2C clock line. Synchronizes data transfer between sensor and microcontroller.", category: "Signal" },
  ],

  flexsensor: [
    { partName: "Flexible Substrate", description: "The thin plastic strip coated with a resistive ink. Bending it stretches the ink layer and increases resistance.", category: "Active Element" },
    { partName: "Sensing Area", description: "The active region of the strip. More bending in this area = greater resistance change.", category: "Active Element" },
    { partName: "Leads", description: "Two terminals at one end. Non-polarized. Resistance typically ranges from 10K (flat) to 35K (fully bent).", category: "Terminals" },
  ],

  forcesensor: [
    { partName: "Sensing Area", description: "The circular or square active zone. Applying pressure here reduces the resistance between the two terminals.", category: "Active Element" },
    { partName: "FSR Film", description: "The Force Sensitive Resistor film uses conductive polymer layers that make more contact points under pressure, lowering resistance.", category: "Active Element" },
    { partName: "Leads", description: "Two terminals. Non-polarized. With no force applied resistance is very high (>1MΩ). Under pressure it drops below 1kΩ.", category: "Terminals" },
  ],

  irsensor: [
    { partName: "IR Emitter (LED)", description: "Transmits infrared light (typically 38kHz modulated). Objects reflect this light back to the receiver.", category: "Emitter" },
    { partName: "IR Receiver (Photodiode)", description: "Detects the reflected infrared light and changes output state when an object is detected within range.", category: "Receiver" },
    { partName: "VCC Pin", description: "Power supply. Connect to 3.3V or 5V.", category: "Power" },
    { partName: "GND Pin", description: "Ground reference. Connect to circuit ground.", category: "Power" },
    { partName: "OUT Pin", description: "Digital output. Goes LOW when an object is detected, HIGH when the path is clear (active low logic).", category: "Signal" },
  ],

  ultrasonicsensor: [
    { partName: "Ultrasonic Transmitter", description: "Emits ultrasonic sound pulses at 40kHz. Looks like a small speaker cone.", category: "Emitter" },
    { partName: "Ultrasonic Receiver", description: "Detects the echo of the transmitted pulse reflecting off objects.", category: "Receiver" },
    { partName: "VCC Pin", description: "Power supply. Connect to 5V.", category: "Power" },
    { partName: "GND Pin", description: "Ground reference.", category: "Power" },
    { partName: "TRIG Pin", description: "Trigger input. Send a 10 microsecond HIGH pulse to start a measurement.", category: "Signal" },
    { partName: "ECHO Pin", description: "Echo output. Goes HIGH for a duration proportional to the measured distance.", category: "Signal" },
  ],

  ultrasonicsensor4pin: [
    { partName: "Ultrasonic Transmitter", description: "Emits 40kHz ultrasonic pulses to measure distance via echo timing.", category: "Emitter" },
    { partName: "Ultrasonic Receiver", description: "Listens for the reflected echo pulse to calculate distance.", category: "Receiver" },
    { partName: "VCC Pin", description: "Power supply. Connect to 5V.", category: "Power" },
    { partName: "GND Pin", description: "Ground reference.", category: "Power" },
    { partName: "TRIG Pin", description: "Trigger input. A 10us HIGH pulse initiates one measurement cycle.", category: "Signal" },
    { partName: "ECHO Pin", description: "Echo output. Pulse width in microseconds divided by 58 gives distance in centimeters.", category: "Signal" },
  ],

  pirsensor: [
    { partName: "Fresnel Lens", description: "The white plastic dome on top. It splits the field of view into multiple zones so the sensor detects movement between zones, not just presence.", category: "Optics" },
    { partName: "PIR Element", description: "A dual-element pyroelectric sensor beneath the lens that detects changes in infrared radiation from warm bodies.", category: "Active Element" },
    { partName: "VCC Pin", description: "Power supply. Typically 5V to 12V depending on module.", category: "Power" },
    { partName: "GND Pin", description: "Ground reference.", category: "Power" },
    { partName: "OUT Pin", description: "Digital output. Goes HIGH when motion is detected. Duration adjustable via onboard trim pots.", category: "Signal" },
  ],

  soilmoisturesensor: [
    { partName: "Probe Electrodes", description: "The two metal tines inserted into soil. They measure the resistance (resistive type) or capacitance (capacitive type) of the soil, which changes with moisture.", category: "Active Element" },
    { partName: "VCC Pin", description: "Power supply. Connect to 3.3V or 5V.", category: "Power" },
    { partName: "GND Pin", description: "Ground reference.", category: "Power" },
    { partName: "AOUT Pin", description: "Analog output. Higher voltage = drier soil. Use with an ADC pin on your microcontroller.", category: "Signal" },
    { partName: "DOUT Pin", description: "Digital output. Goes LOW when soil moisture exceeds a threshold set by the onboard potentiometer.", category: "Signal" },
  ],

  tiltsensor: [
    { partName: "Metal Ball", description: "A small conductive ball inside the housing. When tilted, it rolls to bridge the two contacts and close the circuit.", category: "Active Element" },
    { partName: "Housing", description: "The cylindrical tube that contains the ball and defines the tilt threshold angle.", category: "Main Body" },
    { partName: "Lead 1", description: "One of two equal terminals. Non-polarized.", category: "Terminals" },
    { partName: "Lead 2", description: "The other terminal. Circuit closes when the ball rolls to touch both leads simultaneously.", category: "Terminals" },
  ],

  temperaturesensor: [
    { partName: "Sensor Body", description: "The TO-92 or similar package containing the temperature-sensitive semiconductor. Temperature changes alter the silicon's electrical properties predictably.", category: "Main Body" },
    { partName: "VCC Pin", description: "Power supply. Typically 3.3V or 5V.", category: "Power" },
    { partName: "GND Pin", description: "Ground reference.", category: "Power" },
    { partName: "Data/Signal Pin", description: "Outputs temperature data either as analog voltage, PWM, or digital protocol (e.g. OneWire for DS18B20).", category: "Signal" },
  ],

  gassensor: [
    { partName: "Sensing Element", description: "A heated metal oxide surface (e.g. tin dioxide). Target gases react with it and change its resistance - the core of the detection.", category: "Active Element" },
    { partName: "Heater Coil", description: "An internal resistive coil that heats the sensing element to its operating temperature (typically 100-300°C). Required for gas detection.", category: "Active Element" },
    { partName: "VCC Pin", description: "Power supply. Typically 5V.", category: "Power" },
    { partName: "GND Pin", description: "Ground reference.", category: "Power" },
    { partName: "AOUT Pin", description: "Analog output. Higher voltage = higher gas concentration. Connect to an ADC pin.", category: "Signal" },
    { partName: "DOUT Pin", description: "Digital output. Goes HIGH when gas concentration exceeds threshold set by onboard potentiometer.", category: "Signal" },
  ],

  keypad4x4: [
    { partName: "Key Matrix", description: "16 buttons arranged in a 4x4 grid. Each button sits at the intersection of a row and column wire.", category: "Active Element" },
    { partName: "Row Pins (R1-R4)", description: "Four pins representing the horizontal rows. The microcontroller drives these one at a time during scanning.", category: "Terminals" },
    { partName: "Column Pins (C1-C4)", description: "Four pins representing the vertical columns. Read by the microcontroller to detect which key in an active row is pressed.", category: "Terminals" },
    { partName: "Membrane Layer", description: "The flexible printed circuit underneath the keys that makes contact when pressed.", category: "Structure" },
  ],

  dipswitch: [
    { partName: "Switch Array", description: "Multiple individual SPST (Single Pole Single Throw) switches in one package. Each can be independently set to ON or OFF.", category: "Active Element" },
    { partName: "Actuator Tabs", description: "The small tabs you slide to toggle each switch. Position toward ON connects the pins; toward OFF opens the circuit.", category: "Mechanical" },
    { partName: "Pin Pairs", description: "Each switch has two pins. When the switch is ON, the two pins are connected. When OFF, they are isolated.", category: "Terminals" },
  ],

  // ==================== OUTPUT ====================

  led: [
    { partName: "LED Lens / Epoxy Body", description: "The colored or clear dome that focuses and diffuses light. Made of epoxy resin encapsulating the LED chip inside.", category: "Optics" },
    { partName: "Anode (+)", description: "The longer lead. Current flows into the LED here. Connect to positive voltage through a current-limiting resistor.", category: "Terminals" },
    { partName: "Cathode (-)", description: "The shorter lead, also indicated by a flat edge on the base. Current exits here. Connect to ground.", category: "Terminals" },
    { partName: "LED Chip", description: "The tiny semiconductor die inside the epoxy that emits light when current flows through the P-N junction.", category: "Active Element" },
  ],

  rgbled: [
    { partName: "Red LED Element", description: "One of three internal LEDs. Controls the red channel. Brightness set by PWM or resistor value.", category: "Active Element" },
    { partName: "Green LED Element", description: "Controls the green channel. Combined with red and blue, enables the full color spectrum.", category: "Active Element" },
    { partName: "Blue LED Element", description: "Controls the blue channel. Blue was the hardest color LED to develop - a Nobel Prize-winning achievement.", category: "Active Element" },
    { partName: "Common Pin", description: "Shared anode (+) or cathode (-) depending on type. Common cathode: connect to GND. Common anode: connect to VCC.", category: "Terminals" },
    { partName: "R, G, B Pins", description: "Individual control pins for each color channel. Connect through current-limiting resistors to your microcontroller.", category: "Terminals" },
  ],

  lightbulb: [
    { partName: "Glass Envelope", description: "The glass bulb that contains the filament and inert gas. Protects the filament and controls the light output.", category: "Main Body" },
    { partName: "Filament", description: "The thin tungsten wire that glows white-hot when current passes through it. Operates at around 2,500°C.", category: "Active Element" },
    { partName: "Base Contacts", description: "The metal contacts at the bottom that connect to the power supply.", category: "Terminals" },
    { partName: "Inert Gas Fill", description: "Argon or nitrogen gas inside the bulb that slows filament evaporation and extends bulb life.", category: "Structure" },
  ],

  neopixel: [
    { partName: "RGB LED Array", description: "Three individual LEDs (red, green, blue) combined in one package, capable of producing over 16 million colors.", category: "Active Element" },
    { partName: "Integrated Control IC", description: "A tiny microchip inside each NeoPixel that receives serial color data and drives the three LEDs independently.", category: "Active Element" },
    { partName: "VCC Pin", description: "Power supply. Connect to 5V. Each NeoPixel can draw up to 60mA at full white brightness.", category: "Power" },
    { partName: "GND Pin", description: "Ground reference.", category: "Power" },
    { partName: "DIN Pin", description: "Data input. Receives the serial color data from the microcontroller or previous NeoPixel in the chain.", category: "Signal" },
    { partName: "DOUT Pin", description: "Data output. Passes remaining color data to the next NeoPixel in the chain.", category: "Signal" },
  ],

  piezobuzzer: [
    { partName: "Piezoelectric Disc", description: "A ceramic disc bonded to a metal plate. When voltage is applied, it flexes. Rapid flexing creates sound waves.", category: "Active Element" },
    { partName: "Housing", description: "The plastic casing that amplifies and directs the sound from the vibrating disc.", category: "Structure" },
    { partName: "Positive Pin (+)", description: "Connect to your signal or PWM output. The frequency of the signal determines the pitch of the sound.", category: "Terminals" },
    { partName: "Negative Pin (-)", description: "Connect to ground to complete the circuit.", category: "Terminals" },
  ],

  // ==================== POWER ====================

  battery9v: [
    { partName: "Positive Terminal (Snap)", description: "The smaller, raised circular snap terminal. Always on top. Connect to the positive rail of your circuit.", category: "Terminals" },
    { partName: "Negative Terminal (Snap)", description: "The larger collar surrounding the positive snap. Connect to ground. The shape makes reverse connection impossible.", category: "Terminals" },
    { partName: "Battery Body", description: "Contains six 1.5V cells stacked in series inside a rectangular casing, totaling 9V.", category: "Structure" },
  ],

  battery15v: [
    { partName: "Positive Terminal (+)", description: "The raised nub at the top of the battery. Current flows out from here to power your circuit.", category: "Terminals" },
    { partName: "Negative Terminal (-)", description: "The flat contact at the bottom. Current returns to the battery here.", category: "Terminals" },
    { partName: "Battery Body", description: "The cylindrical outer casing containing the zinc-manganese dioxide electrochemical cell producing 1.5V.", category: "Structure" },
  ],

  coincell: [
    { partName: "Positive Face (+)", description: "The flat top surface of the coin cell. This is the positive terminal. Connect to positive rail.", category: "Terminals" },
    { partName: "Negative Rim (-)", description: "The outer metal rim on the bottom edge. This is the negative terminal. Connect to ground.", category: "Terminals" },
    { partName: "Cell Body", description: "The sealed lithium chemistry cell that provides a stable 3V output over its entire discharge life.", category: "Structure" },
  ],

  solarcell: [
    { partName: "Photovoltaic Surface", description: "The blue or black silicon panel that converts photons from sunlight into electron flow (electricity).", category: "Active Element" },
    { partName: "Positive Lead (+)", description: "Output terminal for the generated electricity. Connect to your circuit's positive rail or a battery charging circuit.", category: "Terminals" },
    { partName: "Negative Lead (-)", description: "Ground return terminal. Connect to circuit ground.", category: "Terminals" },
    { partName: "Anti-reflective Coating", description: "The fine grid pattern visible on the panel surface. Reduces light reflection so more photons are absorbed.", category: "Structure" },
  ],

  // ==================== MOTOR ====================

  vibrationmotor: [
    { partName: "Motor Body", description: "The sealed cylindrical or coin-shaped housing containing the eccentric rotating mass (ERM) or linear resonant actuator (LRA).", category: "Main Body" },
    { partName: "Positive Wire (+)", description: "Red wire. Connect to positive voltage (typically 3V-5V). Current direction determines vibration behavior.", category: "Terminals" },
    { partName: "Negative Wire (-)", description: "Black wire. Connect to ground to complete the circuit.", category: "Terminals" },
    { partName: "Eccentric Mass", description: "An off-center weight on the motor shaft. When it spins, the imbalance creates the vibration sensation.", category: "Mechanical" },
  ],

  dcmotor: [
    { partName: "Motor Housing", description: "The metal cylinder containing the stator magnets, armature windings, and brushes.", category: "Structure" },
    { partName: "Output Shaft", description: "The rotating rod that delivers mechanical power. Reversing polarity reverses shaft direction.", category: "Mechanical" },
    { partName: "Terminal A", description: "One power input terminal. Apply positive voltage here for one rotation direction.", category: "Terminals" },
    { partName: "Terminal B", description: "The other power input terminal. Swap polarity between A and B to reverse the motor.", category: "Terminals" },
  ],

  dcmotorencoder: [
    { partName: "Motor Housing", description: "Contains the DC motor mechanism - armature, stator magnets, and brushes.", category: "Structure" },
    { partName: "Output Shaft", description: "The mechanical output. Encoder tracks its exact position and speed.", category: "Mechanical" },
    { partName: "Encoder Disc", description: "A slotted or magnetic disc attached to the shaft. A sensor counts pulses as it spins to measure position.", category: "Active Element" },
    { partName: "Motor Terminals (M+ M-)", description: "Power inputs for the DC motor. Reversing polarity reverses direction.", category: "Terminals" },
    { partName: "Encoder Pins (VCC, GND, A, B)", description: "Power and signal pins for the encoder. Channels A and B output quadrature pulses for direction and speed sensing.", category: "Signal" },
  ],

  microservo: [
    { partName: "Servo Body", description: "The plastic housing containing the DC motor, gear train, potentiometer, and control circuit.", category: "Structure" },
    { partName: "Output Horn", description: "The plastic arm or wheel attached to the output shaft. Attach your mechanism here.", category: "Mechanical" },
    { partName: "Gear Train", description: "A set of plastic or metal gears inside that trade motor speed for holding torque.", category: "Mechanical" },
    { partName: "PWM Signal Wire", description: "Usually orange or yellow. Connect to a PWM-capable microcontroller pin. Pulse width (1-2ms) sets the angle.", category: "Signal" },
    { partName: "Power Wire (VCC)", description: "Usually red. Connect to 5V. Servos can draw significant current under load.", category: "Power" },
    { partName: "Ground Wire", description: "Usually brown or black. Connect to circuit ground.", category: "Power" },
  ],

  hobbygearmotor: [
    { partName: "Motor Body", description: "The DC motor section that spins at high RPM with low torque.", category: "Structure" },
    { partName: "Gearbox", description: "The gear reduction housing attached to the motor. Multiplies torque while reducing output speed.", category: "Mechanical" },
    { partName: "Output Shaft", description: "The slow but powerful shaft exiting the gearbox. D-shaped for easy wheel attachment.", category: "Mechanical" },
    { partName: "Terminal A", description: "One power input. Apply positive voltage here for one rotation direction.", category: "Terminals" },
    { partName: "Terminal B", description: "Other power input. Reversing polarity between A and B reverses direction.", category: "Terminals" },
  ],

  // ==================== DISPLAY ====================

  sevensegmentdisplay: [
    { partName: "Segment A", description: "Top horizontal segment.", category: "Segments" },
    { partName: "Segment B", description: "Upper right vertical segment.", category: "Segments" },
    { partName: "Segment C", description: "Lower right vertical segment.", category: "Segments" },
    { partName: "Segment D", description: "Bottom horizontal segment.", category: "Segments" },
    { partName: "Segment E", description: "Lower left vertical segment.", category: "Segments" },
    { partName: "Segment F", description: "Upper left vertical segment.", category: "Segments" },
    { partName: "Segment G", description: "Middle horizontal segment.", category: "Segments" },
    { partName: "Common Pin", description: "Shared anode (+) or cathode (-) for all segments. Common cathode: GND. Common anode: VCC.", category: "Terminals" },
  ],

  sevensegmentclock: [
    { partName: "Digit 1 & 2", description: "Left pair of 7-segment digits displaying the hours.", category: "Display" },
    { partName: "Digit 3 & 4", description: "Right pair of 7-segment digits displaying the minutes.", category: "Display" },
    { partName: "Colon LEDs", description: "Two dots between the digit pairs. Usually blink at 1Hz to indicate the clock is running.", category: "Display" },
    { partName: "Control Pins", description: "Interface pins (often I2C or direct segment drive) for the microcontroller to update the display.", category: "Signal" },
  ],

  lcd16x2: [
    { partName: "LCD Panel", description: "The 16x2 liquid crystal display showing 2 rows of 16 characters each. Uses the HD44780 compatible controller.", category: "Display" },
    { partName: "VSS / GND", description: "Pin 1. Ground reference.", category: "Power" },
    { partName: "VDD / VCC", description: "Pin 2. Power supply, typically 5V.", category: "Power" },
    { partName: "VO / Contrast", description: "Pin 3. Contrast adjustment. Connect to a potentiometer wiper to set display contrast.", category: "Control" },
    { partName: "RS Pin", description: "Pin 4. Register select. LOW = command mode, HIGH = data mode.", category: "Signal" },
    { partName: "RW Pin", description: "Pin 5. Read/Write select. Usually tied to GND for write-only operation.", category: "Signal" },
    { partName: "E Pin", description: "Pin 6. Enable. Pulse HIGH to latch data or command into the display.", category: "Signal" },
    { partName: "Data Pins (D0-D7)", description: "Pins 7-14. Parallel data bus. 4-bit mode uses only D4-D7.", category: "Signal" },
    { partName: "Backlight Pins (A/K)", description: "Pins 15-16. Anode and Cathode for the LED backlight. Connect through a resistor.", category: "Power" },
  ],

  lcd16x2i2c: [
    { partName: "LCD Panel", description: "Same 16x2 HD44780 display panel, but controlled via an I2C backpack module instead of 8 parallel data pins.", category: "Display" },
    { partName: "VCC Pin", description: "Power supply for both the LCD and I2C module. Typically 5V.", category: "Power" },
    { partName: "GND Pin", description: "Ground reference.", category: "Power" },
    { partName: "SDA Pin", description: "I2C data line. Connect to the SDA pin of your microcontroller.", category: "Signal" },
    { partName: "SCL Pin", description: "I2C clock line. Connect to the SCL pin of your microcontroller. Default address is usually 0x27 or 0x3F.", category: "Signal" },
    { partName: "I2C Backpack Module", description: "The PCF8574 chip soldered to the back. Converts I2C serial data into the 8-bit parallel signals the LCD needs.", category: "Active Element" },
  ],

  // ==================== BREADBOARD ====================

  breadboard63r: [
    { partName: "Power Rails", description: "The long rows on both sides marked (+) and (-). Connected vertically along the full length for easy power distribution.", category: "Power Distribution" },
    { partName: "Terminal Strips", description: "The main 63-row component area. Each row of 5 holes (a-e and f-j) is connected horizontally, separated by the center channel.", category: "Component Area" },
    { partName: "Center Channel", description: "The gap dividing the two halves. Designed to straddle IC chips so each pin gets its own isolated row.", category: "Structure" },
    { partName: "Binding Posts", description: "Some versions include screw terminals at the end for connecting external power supplies.", category: "Power Distribution" },
  ],

  breadboardsmall: [
    { partName: "Power Rails", description: "Shorter power rails on both sides. Still connected vertically but covering fewer rows than a full-size board.", category: "Power Distribution" },
    { partName: "Terminal Strips", description: "30 rows of connection points. Each row of 5 holes is internally connected. Ideal for smaller circuits.", category: "Component Area" },
    { partName: "Center Channel", description: "The dividing gap for IC chip placement.", category: "Structure" },
  ],

  breadboardmini: [
    { partName: "Terminal Strips", description: "17 rows of connection points. Each row of 5 holes is internally connected. No power rails - add your own power connections.", category: "Component Area" },
    { partName: "Adhesive Base", description: "Most mini breadboards have a peel-and-stick base for mounting to enclosures or robots.", category: "Structure" },
    { partName: "Center Channel", description: "The dividing gap for IC chip placement, even on this compact size.", category: "Structure" },
  ],

  // ==================== POWER CONTROL ====================

  npntransistor: [
    { partName: "Transistor Body", description: "The TO-92 or similar plastic package housing the NPN semiconductor die.", category: "Main Body" },
    { partName: "Base (B)", description: "Control pin. A small current flowing into the base allows a much larger current to flow from collector to emitter.", category: "Terminals" },
    { partName: "Collector (C)", description: "The pin connected to the load and positive supply. Main current flows in through here.", category: "Terminals" },
    { partName: "Emitter (E)", description: "Current exits through the emitter to ground. Usually identified by the flat side of the TO-92 package.", category: "Terminals" },
  ],

  pnptransistor: [
    { partName: "Transistor Body", description: "The TO-92 or similar plastic package housing the PNP semiconductor die.", category: "Main Body" },
    { partName: "Base (B)", description: "Control pin. Pulling the base LOW (toward ground) allows current to flow from emitter to collector.", category: "Terminals" },
    { partName: "Collector (C)", description: "Connected toward ground through the load. Current flows out through the collector in PNP operation.", category: "Terminals" },
    { partName: "Emitter (E)", description: "Connected to the positive supply. Current flows in through the emitter.", category: "Terminals" },
  ],

  nmostransistor: [
    { partName: "Transistor Body", description: "Small signal nMOS transistor in SOT-23 or TO-92 package. Voltage-controlled with near-zero gate current draw.", category: "Main Body" },
    { partName: "Gate (G)", description: "Voltage control input. Applying voltage here opens the channel between drain and source. Draws almost no current.", category: "Terminals" },
    { partName: "Drain (D)", description: "Current flows in through the drain when the gate is active.", category: "Terminals" },
    { partName: "Source (S)", description: "Current flows out through the source to ground.", category: "Terminals" },
  ],

  pmostransistor: [
    { partName: "Transistor Body", description: "Small signal pMOS transistor. Conducts when gate voltage is pulled LOW relative to the source.", category: "Main Body" },
    { partName: "Gate (G)", description: "Control input. Applying LOW voltage relative to source turns the transistor ON. Draws near-zero current.", category: "Terminals" },
    { partName: "Drain (D)", description: "Current flows out through the drain toward the load.", category: "Terminals" },
    { partName: "Source (S)", description: "Connected to the positive supply. Current flows in through the source.", category: "Terminals" },
  ],

  nmosmosfet: [
    { partName: "MOSFET Body", description: "Power nMOS transistor capable of switching high currents. Voltage-controlled - gate draws virtually no current.", category: "Main Body" },
    { partName: "Gate (G)", description: "Voltage input that controls channel conductivity. Typically needs 3-10V to fully turn on (Vgs threshold).", category: "Terminals" },
    { partName: "Drain (D)", description: "Connected to the load and positive supply. Can handle hundreds of amps on power MOSFETs.", category: "Terminals" },
    { partName: "Source (S)", description: "Connected to ground. Current exits through the source.", category: "Terminals" },
    { partName: "Body Diode", description: "An intrinsic diode between drain and source inherent to MOSFET construction. Can conduct reverse current in some circuits.", category: "Internal" },
  ],

  pmosmosfet: [
    { partName: "MOSFET Body", description: "Power pMOS transistor used for high-side switching - controlling the positive rail between supply and load.", category: "Main Body" },
    { partName: "Gate (G)", description: "Control input. Gate voltage must be pulled LOW relative to source to turn on. Logic-level pMOS needs only 3-5V gate drive.", category: "Terminals" },
    { partName: "Drain (D)", description: "Connected to the load output. Current flows from source through channel to drain.", category: "Terminals" },
    { partName: "Source (S)", description: "Connected to the positive supply rail. Current enters through the source.", category: "Terminals" },
    { partName: "Body Diode", description: "Intrinsic reverse diode. Conducts if drain goes above source voltage.", category: "Internal" },
  ],

  tip120: [
    { partName: "TIP120 Body", description: "TO-220 package containing a Darlington pair - two transistors in series with combined gain up to 1000x.", category: "Main Body" },
    { partName: "Base (B)", description: "Control input. A small signal (as low as 5mA from an Arduino) triggers the Darlington pair to conduct several amperes.", category: "Terminals" },
    { partName: "Collector (C)", description: "Connect to the load and positive supply. The TIP120 can handle up to 5A continuous and 60V.", category: "Terminals" },
    { partName: "Emitter (E)", description: "Connect to ground. Current exits here after passing through the load.", category: "Terminals" },
    { partName: "Mounting Tab", description: "The metal tab is electrically connected to the collector. Can be bolted to a heatsink for high-current applications.", category: "Thermal" },
  ],

};

// Helper function to get part info for a specific component - covers all 52 components
export const getPartInfoForComponent = (url: string): PartInfo[] => {
  const u = url.toLowerCase();

  // ── GENERAL ──
  if (u.includes('resistor')) return componentPartInfo.resistor;
  if (u.includes('polarized')) return componentPartInfo.polarizedcapacitor;
  if (u.includes('capacitor')) return componentPartInfo.capacitor;
  if (u.includes('inductor')) return componentPartInfo.inductor;
  if (u.includes('zener')) return componentPartInfo.zenerdiode;
  if (u.includes('diode') && !u.includes('photo')) return componentPartInfo.diode;

  // ── INPUT ──
  if (u.includes('pushbutton')) return componentPartInfo.pushbutton;
  if (u.includes('potentiometer')) return componentPartInfo.potentiometer;
  if (u.includes('slideswitch')) return componentPartInfo.slideswitch;
  if (u.includes('dipswitch')) return componentPartInfo.dipswitch;
  if (u.includes('keypad')) return componentPartInfo.keypad4x4;
  if (u.includes('photoresistor')) return componentPartInfo.photoresistor;
  if (u.includes('photodiode')) return componentPartInfo.photodiode;
  if (u.includes('ambientlight')) return componentPartInfo.ambientlightsensor;
  if (u.includes('flexsensor')) return componentPartInfo.flexsensor;
  if (u.includes('forcesensor')) return componentPartInfo.forcesensor;
  if (u.includes('pirsensor')) return componentPartInfo.pirsensor;
  if (u.includes('irsensor')) return componentPartInfo.irsensor;
  if (u.includes('ultrasonic') && u.includes('4')) return componentPartInfo.ultrasonicsensor4pin;
  if (u.includes('ultrasonic')) return componentPartInfo.ultrasonicsensor;
  if (u.includes('soilmoisture')) return componentPartInfo.soilmoisturesensor;
  if (u.includes('tiltsensor')) return componentPartInfo.tiltsensor;
  if (u.includes('temperaturesensor')) return componentPartInfo.temperaturesensor;
  if (u.includes('gassensor')) return componentPartInfo.gassensor;

  // ── OUTPUT ──
  if (u.includes('rgbled')) return componentPartInfo.rgbled;
  if (u.includes('neopixel')) return componentPartInfo.neopixel;
  if (u.includes('lightbulb')) return componentPartInfo.lightbulb;
  if (u.includes('piezo')) return componentPartInfo.piezobuzzer;
  if (u.includes('led')) return componentPartInfo.led;

  // ── POWER ──
  if (u.includes('9v') || u.includes('9battery')) return componentPartInfo.battery9v;
  if (u.includes('1.5') || u.includes('15battery')) return componentPartInfo.battery15v;
  if (u.includes('coincell')) return componentPartInfo.coincell;
  if (u.includes('solar')) return componentPartInfo.solarcell;

  // ── MOTOR ──
  if (u.includes('vibration')) return componentPartInfo.vibrationmotor;
  if (u.includes('encoder')) return componentPartInfo.dcmotorencoder;
  if (u.includes('dcmotor')) return componentPartInfo.dcmotor;
  if (u.includes('microservo')) return componentPartInfo.microservo;
  if (u.includes('hobbygear')) return componentPartInfo.hobbygearmotor;

  // ── DISPLAY ──
  if (u.includes('7segmentclock')) return componentPartInfo.sevensegmentclock;
  if (u.includes('7segment')) return componentPartInfo.sevensegmentdisplay;
  if (u.includes('lcd16x2') && u.includes('i2c')) return componentPartInfo.lcd16x2i2c;
  if (u.includes('lcd16x2')) return componentPartInfo.lcd16x2;

  // ── BREADBOARD ──
  if (u.includes('breadboard63')) return componentPartInfo.breadboard63r;
  if (u.includes('breadboardsmall')) return componentPartInfo.breadboardsmall;
  if (u.includes('breadboardmini')) return componentPartInfo.breadboardmini;

  // ── POWER CONTROL ──
  if (u.includes('npntransistor')) return componentPartInfo.npntransistor;
  if (u.includes('pnptransistor')) return componentPartInfo.pnptransistor;
  if (u.includes('nmostransistor')) return componentPartInfo.nmostransistor;
  if (u.includes('pmostransistor')) return componentPartInfo.pmostransistor;
  if (u.includes('nmosmosfet')) return componentPartInfo.nmosmosfet;
  if (u.includes('pmosmosfet')) return componentPartInfo.pmosmosfet;
  if (u.includes('tip120')) return componentPartInfo.tip120;

  // ── DEFAULT ──
  return componentPartInfo.resistor;
};