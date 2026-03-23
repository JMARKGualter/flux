export interface TriviaItem {
  fact: string;
  source?: string;
  year?: string;
}

export interface ComponentTrivia {
  [key: string]: TriviaItem[];
}

// Trivia organized by individual component
export const componentTrivia: ComponentTrivia = {

  // ==================== GENERAL ====================

  resistor: [
    { fact: "The resistor was born from a smoking problem - early telegraph operators noticed carbon deposits from sparks had predictable resistance." },
    { fact: "Today, a single phone contains hundreds of resistors, and the global industry produces over 1 trillion resistors every year!" },
    { fact: "Resistor color codes were developed in the 1920s to help soldiers identify values while repairing radios in the field.", year: "1920s" },
    { fact: "The most common failure mode for a resistor is an open circuit, usually caused by overheating or exceeding its power rating." },
  ],

  capacitor: [
    { fact: "The very first capacitor, the Leyden Jar (1745), could store enough charge to knock a person off their feet.", year: "1745" },
    { fact: "Benjamin Franklin famously used a Leyden Jar in his lightning experiments." },
    { fact: "Modern capacitors can charge and discharge in mere nanoseconds!" },
    { fact: "The capacitance of the Earth itself is about 710 microfarads - roughly the same as a large electrolytic capacitor!" },
  ],

  polarizedcapacitor: [
    { fact: "Hook a polarized capacitor backwards and it can literally explode! The electrolyte inside turns to gas, building pressure until it pops." },
    { fact: "Engineers call it 'capacitor plague' - it destroyed millions of computers in the early 2000s due to a stolen, flawed electrolyte formula." },
    { fact: "Polarized capacitors can store far more energy than non-polarized ones of the same size, but only work correctly with DC voltage." },
    { fact: "Always check the stripe - the white or black stripe on an electrolytic capacitor marks the negative lead." },
  ],

  diode: [
    { fact: "The first diodes were vacuum tubes the size of your fist! Today's diodes are so small that billions fit on a fingernail." },
    { fact: "A diode is essentially a one-way valve for electricity - it's what allows your phone charger to convert AC wall power into DC battery power." },
    { fact: "Diodes were originally called 'valves' because they act like one-way valves for electricity. The term is still used in the UK.", source: "British Science Museum" },
    { fact: "Schottky diodes can switch on and off in picoseconds, making them essential for 5G and radar applications." },
  ],

  zenerdiode: [
    { fact: "Named after physicist Clarence Zener, this diode is designed to break down on purpose! When voltage gets too high, it 'zeners' and clamps it safely." },
    { fact: "Zener diodes are the unsung heroes protecting nearly every sensitive circuit you own." },
    { fact: "The Zener effect was discovered in 1934. Clarence Zener was a physicist who never actually worked with diodes!", year: "1934" },
    { fact: "Zener diodes are used in almost every voltage regulator - they keep output voltage rock solid even as input fluctuates." },
  ],

  inductor: [
    { fact: "Inductors hate change! They resist any change in current flow, a property called inductance." },
    { fact: "This same principle is why you sometimes see a spark when you unplug a device." },
    { fact: "The coiled wire in a guitar pickup is an inductor - turning string vibrations into the electric signal of rock and roll!" },
    { fact: "Inductors are used in virtually every power supply to smooth out voltage ripple and filter unwanted frequencies." },
  ],

  // ==================== INPUT ====================

  pushbutton: [
    { fact: "A push button can register a single press as dozens of signals - a phenomenon called 'contact bounce.'" },
    { fact: "Engineers must write special 'debouncing' code or add tiny capacitors to filter the noise. Without it, one press could trigger multiple unintended actions!" },
    { fact: "The humble push button is one of the most common electronic components in the world, found in everything from elevators to spacecraft." },
    { fact: "A mechanical switch can typically handle 10,000 to 100,000 cycles before wearing out. Solid-state switches can handle billions." },
  ],

  potentiometer: [
    { fact: "The word 'potentiometer' means 'potential measurer' in Greek." },
    { fact: "The volume knob on your guitar amp, the dimmer on your living room lights, and the joystick in old Atari controllers all use potentiometers." },
    { fact: "Potentiometers are over 170 years old and still everywhere!" },
    { fact: "Digital potentiometers now exist - tiny chips that mimic the behavior of mechanical pots but can be controlled by a microcontroller." },
  ],

  slideswitch: [
    { fact: "Slide switches are used in situations where you need to visually confirm a state - you can physically see if something is ON or OFF at a glance." },
    { fact: "Early computers like the Altair 8800 used rows of toggle/slide switches as the primary way to input programs, one bit at a time!" },
    { fact: "The first electrical switch was patented in 1884 by John Henry Holmes, introducing the 'quick-break' mechanism still used in modern switches.", year: "1884" },
    { fact: "Before USB, slide and DIP switches were how you configured printers, modems, and network cards." },
  ],

  photoresistor: [
    { fact: "Also called an LDR (Light Dependent Resistor), a photoresistor can change its resistance by over 1,000x between darkness and bright light!" },
    { fact: "They're made from cadmium sulfide, which is why they're slowly being phased out in consumer electronics due to environmental concerns." },
    { fact: "Photoresistors were widely used in early automatic street lights - the light itself tells the lamp to switch off at dawn." },
    { fact: "Response time is relatively slow compared to photodiodes, making them better for ambient light sensing than high-speed optical communication." },
  ],

  photodiode: [
    { fact: "Photodiodes are incredibly fast - they can detect millions of light pulses per second." },
    { fact: "That's the technology behind fiber optic internet, where light pulses carry your Netflix stream at nearly the speed of light!" },
    { fact: "Your TV remote's receiver is also a photodiode." },
    { fact: "Photodiodes are used in medical pulse oximeters to measure blood oxygen levels by shining light through your fingertip." },
  ],

  ambientlightsensor: [
    { fact: "Your smartphone's screen brightness adjustment uses an ambient light sensor." },
    { fact: "Apple's True Tone display uses sensors to measure the color temperature of ambient light and adjusts white balance so photos look the same as in real life!" },
    { fact: "Ambient light sensors help devices save battery by reducing screen brightness in dark environments automatically." },
    { fact: "Some ambient light sensors can distinguish between different types of artificial light - LED, fluorescent, and incandescent - and adjust accordingly." },
  ],

  flexsensor: [
    { fact: "Flex sensors were originally developed for use in the Nintendo Power Glove in 1989!", year: "1989" },
    { fact: "Today they're used in robotic hands, medical rehabilitation gloves, and VFX studio data gloves to capture hand movements for movies." },
    { fact: "A flex sensor works by changing resistance as it bends - the more it curves, the higher the resistance." },
    { fact: "Surgeons are experimenting with flex sensors in minimally invasive tools to sense the curvature of instruments inside the body." },
  ],

  forcesensor: [
    { fact: "The touch screen on older phones used force sensors, not capacitive touch!" },
    { fact: "Today's Apple Watch uses force sensing to distinguish a tap from a firm press." },
    { fact: "Force sensors inside airplane seats can detect if a passenger is seated before arming airbag systems." },
    { fact: "Force sensors are used in robotic surgery systems to give surgeons a sense of 'touch' through the robot's instruments." },
  ],

  irsensor: [
    { fact: "IR sensors can 'see' heat! Every warm object emits infrared radiation." },
    { fact: "Thermal cameras used in firefighting, night-vision goggles, and the James Webb Space Telescope all use infrared sensing." },
    { fact: "Your TV remote sends IR pulses at 38,000 times per second!" },
    { fact: "IR proximity sensors are used in smartphones to turn off the display when you hold the phone to your ear during a call." },
  ],

  ultrasonicsensor: [
    { fact: "Ultrasonic sensors work just like bat echolocation! Bats emit sound at 20,000–100,000 Hz and calculate distance from the echo." },
    { fact: "Your car's parking sensors use the exact same principle." },
    { fact: "These sensors can accurately measure distances as precise as 3 millimeters!" },
    { fact: "Ultrasonic sensors are used in industrial automation to detect objects on conveyor belts regardless of color, transparency, or surface texture." },
  ],

  ultrasonicsensor4pin: [
    { fact: "The 4-pin version separates the trigger and echo pins, giving you more precise timing control." },
    { fact: "The HC-SR04, used in millions of Arduino projects, can measure distances from 2 cm to 4 meters with a beam angle of about 15 degrees - like a tiny sonar cone!" },
    { fact: "Sound travels at about 343 m/s in air. The sensor calculates distance by timing how long the echo takes to return." },
    { fact: "Temperature affects sound speed significantly - professional ultrasonic sensors include a temperature sensor to auto-correct their readings." },
  ],

  pirsensor: [
    { fact: "PIR stands for Passive Infrared - 'passive' because it never emits anything, only detects." },
    { fact: "The Fresnel lens on the front splits the field of view into zones; movement is detected when a warm body crosses between zones." },
    { fact: "A PIR sensor only needs milliwatts of power, so security lights can run for years on batteries!" },
    { fact: "PIR sensors are deliberately blind to slow temperature changes - that's why standing perfectly still can make automatic lights turn off!" },
  ],

  soilmoisturesensor: [
    { fact: "NASA uses soil moisture sensors across the entire globe via its SMAP satellite to monitor drought conditions and predict crop yields." },
    { fact: "The same capacitive sensing principle helps smart irrigation systems save up to 50% of water used in agriculture!" },
    { fact: "Capacitive soil sensors measure how water changes the dielectric constant of soil - no metal contacts needed, so they last much longer than resistive types." },
    { fact: "Some smart home garden systems use soil moisture sensors to send you a notification when your plants need watering." },
  ],

  tiltsensor: [
    { fact: "Tilt sensors (also called ball switches) are deceptively simple - just a tiny metal ball that rolls to touch two contacts." },
    { fact: "They're hidden inside power tools to automatically shut them off if they tip over, preventing thousands of injuries every year!" },
    { fact: "Early tilt sensors used liquid mercury instead of a metal ball - highly effective but now banned in many countries due to toxicity." },
    { fact: "Modern MEMS accelerometers have largely replaced simple tilt sensors in phones and tablets, but tilt switches remain popular for their simplicity and low cost." },
  ],

  temperaturesensor: [
    { fact: "The most accurate temperature sensors use the fact that silicon's electrical properties change in a perfectly predictable way with temperature." },
    { fact: "Modern sensors like the DS18B20 are accurate to ±0.5°C - precise enough to detect the tiny heat your body gives off from 10 cm away!" },
    { fact: "The first electronic thermometer was developed in the 1950s and could take a reading in under a minute - revolutionary compared to glass thermometers!" },
    { fact: "Temperature sensors are used in everything from engine management systems and weather stations to smart ovens and COVID fever screening cameras." },
  ],

  gassensor: [
    { fact: "Gas sensors save lives daily! The MQ series can detect everything from LPG and alcohol to carbon monoxide and ozone." },
    { fact: "Carbon monoxide detectors use an electrochemical gas sensor, and they've become so cheap they're now required by law in most homes and hotels worldwide." },
    { fact: "Some gas sensors can detect concentrations as low as 10 parts per billion - like finding a single drop of water in an Olympic-sized swimming pool." },
    { fact: "Electronic noses (e-noses) combine arrays of gas sensors with AI to identify complex smells - they're used in food quality control and disease diagnosis." },
  ],

  keypad4x4: [
    { fact: "A 4x4 keypad has 16 buttons but only needs 8 wires thanks to a clever matrix scanning technique." },
    { fact: "The same technique is used in full-size computer keyboards - your 100+ key keyboard might only use around 18 signal wires!" },
    { fact: "Matrix scanning works by rapidly cycling through rows and columns to detect which intersection is pressed." },
    { fact: "ATMs and door-entry keypads use the same matrix principle, but with hardened metal keys designed to withstand millions of presses." },
  ],

  dipswitch: [
    { fact: "DIP stands for 'Dual In-line Package,' matching the standard chip pin spacing." },
    { fact: "Before USB, DIP switches were how you configured printers, modems, and network cards. Each switch position represented a binary bit - you were manually programming hardware with your fingers!" },
    { fact: "DIP switches are still common in industrial equipment and embedded systems where settings need to be set once and never changed remotely." },
    { fact: "Reading a DIP switch setting is essentially reading a binary number - the combination of ON/OFF positions encodes a unique value." },
  ],

  // ==================== OUTPUT ====================

  led: [
    { fact: "The first practical LED was invented in 1962 by Nick Holonyak Jr., and it only glowed red. Blue LEDs weren't cracked until 1994.", year: "1962" },
    { fact: "The blue LED breakthrough won the Nobel Prize in Physics in 2014. Without it, we wouldn't have white LEDs or modern energy-efficient lighting!", year: "2014" },
    { fact: "LEDs can last up to 100,000 hours - that's over 11 years of continuous use. Traditional incandescent bulbs last only about 1,000 hours." },
    { fact: "LEDs are so efficient that replacing one incandescent bulb per home in America would save enough energy to power 3 million homes for a year." },
  ],

  rgbled: [
    { fact: "An RGB LED contains three separate LEDs inside one tiny package - red, green, and blue." },
    { fact: "By mixing brightness levels, it can produce over 16 million colors!" },
    { fact: "The same mixing principle is used in every TV, monitor, and phone screen you've ever looked at." },
    { fact: "Human eyes have three types of color receptors - coincidentally matching red, green, and blue. RGB displays exploit this biological fact directly!" },
  ],

  lightbulb: [
    { fact: "Thomas Edison didn't invent the light bulb - he perfected it. Over 20 inventors had working versions before him." },
    { fact: "What Edison truly invented was the entire electrical system to power it: generators, switches, wiring, and meters. He basically invented the modern power grid!" },
    { fact: "Edison's first successful carbon filament bulb burned for 13.5 hours in October 1879.", year: "1879" },
    { fact: "Incandescent bulbs are only about 5% efficient - 95% of the energy is lost as heat, not light." },
  ],

  neopixel: [
    { fact: "NeoPixel LEDs (WS2812B) are remarkably smart - each tiny LED has its own microchip embedded inside!" },
    { fact: "They communicate using a single data wire and can be chained in the hundreds." },
    { fact: "One Arduino pin can control an entire strip of 1,000 individually addressable, full-color LEDs." },
    { fact: "NeoPixels use a precise timing protocol - the data signal must be accurate to within hundreds of nanoseconds or the colors go haywire!" },
  ],

  piezobuzzer: [
    { fact: "A piezo buzzer works in reverse too - squeeze it mechanically and it generates electricity! This is the piezoelectric effect." },
    { fact: "This effect is used in gas lighters (that spark when you press the button), sonar systems, and medical ultrasound machines to image babies before they're born." },
    { fact: "The word 'piezo' comes from the Greek word for 'press' or 'squeeze.'" },
    { fact: "Piezoelectric crystals were first studied by Pierre and Jacques Curie in 1880 - yes, Pierre Curie of radioactivity fame!", year: "1880" },
  ],

  // ==================== POWER ====================

  battery9v: [
    { fact: "That distinctive 9V battery shape with both terminals on top was designed so you can quickly test it by touching it to your tongue - the tingle means it still has charge!" },
    { fact: "It was originally designed for early transistor radios in the 1950s and hasn't changed much since.", year: "1950s" },
    { fact: "A 9V battery is just six 1.5V cells stacked in series inside a rectangular casing." },
    { fact: "The 9V battery's snap connector was specifically designed so it's impossible to connect backwards - a polarity protection feature built into the physical shape." },
  ],

  battery15v: [
    { fact: "AA batteries are the world's most sold battery size." },
    { fact: "The 1.5V output is no coincidence - it's the natural electrochemical potential of a zinc-manganese dioxide reaction." },
    { fact: "Stacking cells multiplies voltage, which is why a 9V battery is just six 1.5V cells inside!" },
    { fact: "The first true battery was invented by Alessandro Volta in 1800 - Napoleon Bonaparte was so impressed he made Volta a count.", year: "1800" },
  ],

  coincell: [
    { fact: "Coin cell batteries (like the CR2032) are so low-drain that they can power a real-time clock chip for over 10 years!" },
    { fact: "They're what keep your computer's BIOS clock ticking even when it's unplugged." },
    { fact: "Some medical devices and key fobs run on coin cells for over 5 years." },
    { fact: "The 'CR' in CR2032 means it uses lithium chemistry. '20' is the diameter in mm and '32' is the thickness in tenths of a mm." },
  ],

  solarcell: [
    { fact: "The first solar panels were used in 1958 to power the Vanguard 1 satellite - and it's still in orbit today!", year: "1958" },
    { fact: "Modern solar cells convert up to 47% of sunlight into electricity in lab conditions." },
    { fact: "The entire global electricity demand could theoretically be met by solar panels covering just 0.3% of Earth's land area." },
    { fact: "The cost of solar panels has dropped by over 99% since 1977, making them one of the fastest-falling technologies in history.", year: "1977" },
  ],

  // ==================== MOTOR ====================

  vibrationmotor: [
    { fact: "The tiny vibration motor in your phone is called an eccentric rotating mass (ERM) motor - it spins an off-center weight to create vibration." },
    { fact: "More advanced phones now use a linear resonant actuator (LRA), which moves a weight back and forth like a tiny speaker, producing much more precise 'haptic' feedback." },
    { fact: "Haptic feedback motors in game controllers can simulate textures, impacts, and resistance - making virtual experiences feel physical." },
    { fact: "The vibration alert in mobile phones was introduced in the early 1990s so phones could be used silently in meetings.", year: "1990s" },
  ],

  dcmotor: [
    { fact: "DC motors work by electromagnetic attraction and repulsion between a spinning electromagnet and fixed magnets." },
    { fact: "The principle is so simple that Michael Faraday demonstrated the world's first electric motor in 1821 using just a wire, a magnet, and a battery of acid!", year: "1821" },
    { fact: "Electric motors consume about 45% of all electricity generated worldwide - more than lighting, heating, or any other application." },
    { fact: "A DC motor can also act as a generator - spin the shaft and it produces electricity. This is how regenerative braking in electric cars works!" },
  ],

  dcmotorencoder: [
    { fact: "An encoder turns a motor into a precise positioning system by counting tiny pulses - sometimes thousands per revolution." },
    { fact: "This is how 3D printers, CNC machines, and robotic arms know exactly where they are." },
    { fact: "Without encoders, your printer head would have no idea how far it had moved!" },
    { fact: "Optical encoders use a spinning disk with tiny holes that interrupt a light beam. Magnetic encoders use a spinning magnet and Hall effect sensor - more durable in dusty environments." },
  ],

  microservo: [
    { fact: "Servo motors don't just spin - they hold position! Using feedback from an internal potentiometer, a servo constantly corrects itself to stay exactly where commanded." },
    { fact: "RC planes, boats, and cars use servos for control surfaces." },
    { fact: "They were originally developed for steering naval guns with precision." },
    { fact: "A standard servo is controlled by a PWM signal - the pulse width (usually 1–2ms) tells it exactly which angle to move to." },
  ],

  hobbygearmotor: [
    { fact: "Gearmotors trade speed for torque using a gear train. Each gear stage can multiply torque by 5–10x." },
    { fact: "A small motor spinning at 10,000 RPM might exit a gearbox at just 100 RPM, but with 100x the turning force." },
    { fact: "This is how tiny motors can drive heavy robots and power wheelchairs!" },
    { fact: "The gear ratio is stamped on most gearmotors - a '1:48' ratio means the output shaft spins once for every 48 turns of the motor." },
  ],

  // ==================== DISPLAY ====================

  sevensegmentdisplay: [
    { fact: "7-segment displays use just 7 LED segments to represent any digit - a design from the 1950s.", year: "1950s" },
    { fact: "The arrangement was chosen so that a single stuck segment causes the least confusion." },
    { fact: "The number '8' uses all 7 segments, making it the best way to test if all segments work!" },
    { fact: "Early 7-segment displays used vacuum fluorescent tubes, not LEDs. They glowed a distinctive blue-green color seen in old electronics." },
  ],

  sevensegmentclock: [
    { fact: "The colon between hours and minutes on a clock display is often a separate LED or two dots - NOT part of the standard 7-segment spec." },
    { fact: "Some clock displays add extra segments just for the colon, and they typically blink once per second to visualize the passing of time." },
    { fact: "Digital clocks became widespread in the 1970s thanks to the LED 7-segment display, replacing analog clock faces in appliances worldwide.", year: "1970s" },
    { fact: "The RTC (Real Time Clock) chip behind most digital clocks can keep accurate time for years on a tiny coin cell battery." },
  ],

  lcd16x2: [
    { fact: "The 'LCD' in LCD screens stands for Liquid Crystal Display - the liquid crystals don't emit light themselves, they just twist to block a backlight." },
    { fact: "The HD44780 controller chip behind most 16x2 LCDs was released by Hitachi in 1987 and became so dominant that every modern LCD still speaks the same protocol!", year: "1987" },
    { fact: "LCD technology was discovered in 1888 by Friedrich Reinitzer, but it took nearly 80 years before the first practical LCD display was developed.", year: "1888" },
    { fact: "A 16x2 LCD has 32 character positions, each made of a 5x8 dot matrix - that's 1,280 individual tiny squares controlled by one chip!" },
  ],

  lcd16x2i2c: [
    { fact: "The I2C interface on this LCD lets you control 16 pins using just 2 wires!" },
    { fact: "I2C was invented by Philips in 1982 to let chips on a circuit board talk to each other without a tangle of wires.", year: "1982" },
    { fact: "The '2' in I2C stands for 'Inter-Integrated Circuit,' and it's used in billions of devices today." },
    { fact: "Each I2C device has a unique address - you can connect up to 127 different devices on the same two wires!" },
  ],

  // ==================== BREADBOARD ====================

  breadboard63r: [
    { fact: "Breadboards get their name from actual wooden bread-cutting boards! Early experimenters would literally push wires and components into the soft wood to prototype circuits." },
    { fact: "The modern solderless breadboard with spring-loaded clips wasn't patented until 1971 by Ronald J. Portugal.", year: "1971" },
    { fact: "A standard full-size breadboard has around 2,000 connection points and can be used for thousands of projects before the springs wear out." },
    { fact: "The holes in a breadboard are spaced exactly 0.1 inches (2.54mm) apart - matching the standard DIP chip pin spacing defined by IBM in the 1960s.", year: "1960s" },
  ],

  breadboardsmall: [
    { fact: "The half-size breadboard is perfect for quick experiments. All breadboard holes are spaced exactly 0.1 inches (2.54mm) apart, matching the standard DIP chip pin spacing." },
    { fact: "This spacing standard was defined by IBM in the 1960s and remains the global standard to this day!", year: "1960s" },
    { fact: "Half-size breadboards are popular in classrooms and workshops because they're large enough for most beginner projects but small enough to carry around." },
    { fact: "The power rails on the sides of a breadboard are connected along the entire length - perfect for distributing VCC and GND to all your components." },
  ],

  breadboardmini: [
    { fact: "Mini breadboards are a favorite for wearable electronics and tiny sensor projects." },
    { fact: "Internally, each row of 5 holes is connected by a single metal clip. These clips are essentially tiny springs, and they can make and break a connection over 50,000 times without wearing out!" },
    { fact: "Mini breadboards often have adhesive backing so they can be stuck to enclosures, robots, or even other breadboards for modular prototyping." },
    { fact: "Despite their small size, mini breadboards follow the exact same internal wiring pattern as full-size boards - making them fully interchangeable in most circuits." },
  ],

  // ==================== POWER CONTROL ====================

  npntransistor: [
    { fact: "The transistor is arguably the greatest invention of the 20th century. Its inventors at Bell Labs won the Nobel Prize in 1956.", year: "1956" },
    { fact: "An NPN transistor acts like a water faucet: a tiny base current controls a much larger collector-emitter current." },
    { fact: "Modern smartphones contain over 15 billion transistors. Placed end-to-end, they would stretch farther than the distance to the moon!" },
    { fact: "The first transistor was invented at Bell Labs in 1947 by John Bardeen, Walter Brattain, and William Shockley.", year: "1947" },
  ],

  pnptransistor: [
    { fact: "PNP transistors are the 'mirror image' of NPNs - they conduct when the base is pulled LOW instead of HIGH." },
    { fact: "The complementary nature of NPN/PNP pairs is what makes 'push-pull' amplifier circuits possible - the same principle used in every audio amplifier from earbuds to concert speakers!" },
    { fact: "In a PNP transistor, conventional current flows from emitter to collector - the opposite direction of an NPN." },
    { fact: "PNP and NPN transistors are often used together in complementary pairs for maximum efficiency in power amplifier designs." },
  ],

  nmostransistor: [
    { fact: "MOSFETs are voltage-controlled, unlike BJT transistors which are current-controlled. This means they draw almost zero gate current - making them incredibly efficient." },
    { fact: "A single CPU contains over 100 billion MOSFETs, switching billions of times per second, yet consumes only a few watts of power." },
    { fact: "Small signal nMOS transistors are the workhorses of digital logic - the foundation of every computer, phone, and microcontroller." },
    { fact: "The MOSFET was invented in 1959 by Mohamed Atalla and Dawon Kahng at Bell Labs - it became the most manufactured device in history.", year: "1959" },
  ],

  pmostransistor: [
    { fact: "pMOS transistors were the first type of MOSFET used in commercial chips in the 1960s, before nMOS was perfected.", year: "1960s" },
    { fact: "Today, combining nMOS and pMOS into CMOS circuits is the foundation of all modern digital electronics - it only draws power when switching, not when idle." },
    { fact: "pMOS transistors conduct when the gate voltage is low - the opposite behavior of nMOS - making them naturally suited for high-side switching." },
    { fact: "CMOS (Complementary MOS) was invented in 1963 by Frank Wanlass and uses both nMOS and pMOS to dramatically reduce power consumption.", year: "1963" },
  ],

  nmosmosfet: [
    { fact: "Power MOSFETs can switch hundreds of amperes with just a 5V signal!" },
    { fact: "The MOSFET in an electric car's motor controller might handle 300 amps and 400 volts." },
    { fact: "Its on-resistance can be as low as 1 milliohm - nearly a dead short - making it among the most efficient switches ever made." },
    { fact: "nMOS power MOSFETs are used in switching power supplies, motor drivers, and battery management systems in laptops and EVs." },
  ],

  pmosmosfet: [
    { fact: "pMOS power transistors are often used on the 'high side' of circuits - between the power supply and the load." },
    { fact: "Unlike nMOS devices that switch the ground side, pMOS naturally controls the positive rail - making them essential in battery management systems in laptops and electric vehicles." },
    { fact: "pMOS power transistors require a gate voltage below the source to turn on - the lower the gate voltage, the more current flows." },
    { fact: "In automotive electronics, pMOS transistors protect circuits from reverse polarity - a common cause of damage when jump-starting a car incorrectly." },
  ],

  tip120: [
    { fact: "The TIP120 is a Darlington transistor - actually TWO transistors in one package!" },
    { fact: "The pair gives it an enormous current gain of up to 1,000x." },
    { fact: "This means a mere 5mA Arduino signal can control over 5 Amps of current - enough to drive motors, solenoids, and relays with ease." },
    { fact: "The Darlington configuration was invented by Sidney Darlington at Bell Labs in 1953. He never patented it personally, and it became one of the most widely used transistor configurations ever.", year: "1953" },
  ],

};

// Helper function to get trivia for a specific component - covers all 52 components
export const getTriviaForComponent = (url: string, count: number = 4): TriviaItem[] => {
  const u = url.toLowerCase();

  // ── GENERAL ──
  if (u.includes('resistor')) return componentTrivia.resistor.slice(0, count);
  if (u.includes('polarized')) return componentTrivia.polarizedcapacitor.slice(0, count);
  if (u.includes('capacitor')) return componentTrivia.capacitor.slice(0, count);
  if (u.includes('inductor')) return componentTrivia.inductor.slice(0, count);
  if (u.includes('zener')) return componentTrivia.zenerdiode.slice(0, count);
  if (u.includes('diode')) return componentTrivia.diode.slice(0, count);

  // ── INPUT ──
  if (u.includes('pushbutton')) return componentTrivia.pushbutton.slice(0, count);
  if (u.includes('potentiometer')) return componentTrivia.potentiometer.slice(0, count);
  if (u.includes('slideswitch')) return componentTrivia.slideswitch.slice(0, count);
  if (u.includes('dipswitch')) return componentTrivia.dipswitch.slice(0, count);
  if (u.includes('keypad')) return componentTrivia.keypad4x4.slice(0, count);
  if (u.includes('photoresistor')) return componentTrivia.photoresistor.slice(0, count);
  if (u.includes('photodiode')) return componentTrivia.photodiode.slice(0, count);
  if (u.includes('ambientlight')) return componentTrivia.ambientlightsensor.slice(0, count);
  if (u.includes('flexsensor')) return componentTrivia.flexsensor.slice(0, count);
  if (u.includes('forcesensor')) return componentTrivia.forcesensor.slice(0, count);
  if (u.includes('pirsensor')) return componentTrivia.pirsensor.slice(0, count);
  if (u.includes('irsensor')) return componentTrivia.irsensor.slice(0, count);
  if (u.includes('ultrasonic') && u.includes('4')) return componentTrivia.ultrasonicsensor4pin.slice(0, count);
  if (u.includes('ultrasonic')) return componentTrivia.ultrasonicsensor.slice(0, count);
  if (u.includes('soilmoisture')) return componentTrivia.soilmoisturesensor.slice(0, count);
  if (u.includes('tiltsensor')) return componentTrivia.tiltsensor.slice(0, count);
  if (u.includes('temperaturesensor')) return componentTrivia.temperaturesensor.slice(0, count);
  if (u.includes('gassensor')) return componentTrivia.gassensor.slice(0, count);

  // ── OUTPUT ──
  if (u.includes('rgbled')) return componentTrivia.rgbled.slice(0, count);
  if (u.includes('neopixel')) return componentTrivia.neopixel.slice(0, count);
  if (u.includes('lightbulb')) return componentTrivia.lightbulb.slice(0, count);
  if (u.includes('piezo')) return componentTrivia.piezobuzzer.slice(0, count);
  if (u.includes('led')) return componentTrivia.led.slice(0, count);

  // ── POWER ──
  if (u.includes('9v') || u.includes('9battery')) return componentTrivia.battery9v.slice(0, count);
  if (u.includes('1.5') || u.includes('15battery')) return componentTrivia.battery15v.slice(0, count);
  if (u.includes('coincell')) return componentTrivia.coincell.slice(0, count);
  if (u.includes('solar')) return componentTrivia.solarcell.slice(0, count);

  // ── MOTOR ──
  if (u.includes('vibration')) return componentTrivia.vibrationmotor.slice(0, count);
  if (u.includes('encoder')) return componentTrivia.dcmotorencoder.slice(0, count);
  if (u.includes('dcmotor')) return componentTrivia.dcmotor.slice(0, count);
  if (u.includes('microservo')) return componentTrivia.microservo.slice(0, count);
  if (u.includes('hobbygear')) return componentTrivia.hobbygearmotor.slice(0, count);

  // ── DISPLAY ──
  if (u.includes('7segmentclock')) return componentTrivia.sevensegmentclock.slice(0, count);
  if (u.includes('7segment')) return componentTrivia.sevensegmentdisplay.slice(0, count);
  if (u.includes('lcd16x2') && u.includes('i2c')) return componentTrivia.lcd16x2i2c.slice(0, count);
  if (u.includes('lcd16x2')) return componentTrivia.lcd16x2.slice(0, count);

  // ── BREADBOARD ──
  if (u.includes('breadboard63')) return componentTrivia.breadboard63r.slice(0, count);
  if (u.includes('breadboardsmall')) return componentTrivia.breadboardsmall.slice(0, count);
  if (u.includes('breadboardmini')) return componentTrivia.breadboardmini.slice(0, count);

  // ── POWER CONTROL ──
  if (u.includes('npntransistor')) return componentTrivia.npntransistor.slice(0, count);
  if (u.includes('pnptransistor')) return componentTrivia.pnptransistor.slice(0, count);
  if (u.includes('nmostransistor')) return componentTrivia.nmostransistor.slice(0, count);
  if (u.includes('pmostransistor')) return componentTrivia.pmostransistor.slice(0, count);
  if (u.includes('nmosmosfet')) return componentTrivia.nmosmosfet.slice(0, count);
  if (u.includes('pmosmosfet')) return componentTrivia.pmosmosfet.slice(0, count);
  if (u.includes('tip120')) return componentTrivia.tip120.slice(0, count);

  // ── DEFAULT ──
  return componentTrivia.resistor.slice(0, count);
};