'use client';

import { useState, Suspense, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ArrowLeft, Sun, Moon, LayoutGrid, Orbit, Hand } from 'lucide-react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Center, useGLTF, Grid } from '@react-three/drei';
import * as THREE from 'three';
import { BreadboardCategory } from './categories/breadboard';
import { DisplayCategory } from './categories/display';
import { GeneralCategory } from './categories/general';
import { InputCategory } from './categories/input';
import { MotorCategory } from './categories/motor';
import { OutputCategory } from './categories/output';
import { PowerCategory } from './categories/power';
import { PowerControlCategory } from './categories/powercontrol';

// Configure Draco loader globally
useGLTF.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');

// ==================== TOOLTIP DEFINITIONS ====================
const meshTooltips: Record<string, string> = {

  // Full Breadboard
  'Cube010_1': 'Positive terminal (+)',
  'Cube010_2': 'Negative terminal (-)',
  // Small Breadboard
  'Cube002_2': 'Positive terminal (+)',
  'Cube002_1': 'Negative terminal (-)',
  // LED
  'LED_RGB': 'LED body - The epoxy lens that focuses and diffuses light.',
  'LED_RGB001': 'Red Anode/Cathode - Controls the red light element.',
  'LED_RGB002': 'If Anode = VCC, if Cathode = GND',
  'LED_RGB003': 'Green Anode/Cathode - Controls the green light element.',
  'LED_RGB004': 'Blue Anode/Cathode - Controls the blue light element.',
  // LED RGB
  'LEDAnode': 'Anode (+) - The longer pin. Current flows in here.',
  'LEDCathode': 'Cathode (−) - The shorter pin. Current flows out here.',
  'LED_2': 'LED body - The epoxy lens that focuses and diffuses light.',
  // Lightbulb
  'Lightbulb': 'Glass Envelope - Blown glass bulb containing the internal assembly, clear or frosted.',
  'Lightbulbbase': 'Base - Threaded metal shell that screws into a lamp socket.',
  // Piezo Buzzer
  'Cylinder009': 'Piezoelectric Disc - when voltage is applied, the ceramic layer contracts and expands, bending the entire disc up and down to produce vibration.',
  'Cylinder009_1': 'Positive (+) and Negative (-) pins.',
  // Resistor
  'ResistorBody_1': 'Resistor body - Limits the flow of electric current.',
  'Band_1': 'First color band - Represents the first digit of resistance value.',
  'Band_2': 'Second color band - Represents the second digit of resistance value.',
  'Band_3': 'Third color band - Represents the multiplier.',
  'Band_4': 'Fourth color band - Represents the tolerance.',
  'ResistorPins': 'Lead - Connect this to your circuit.',
  // Polarized Capacitor
  'PolarCap_2': 'Capacitor body - Stores and releases electrical charge.',
  'PolarCapAnode': 'Positive lead (+)  Must be connected to higher potential.',
  'PolarCapCathode': 'Negative lead (−) - Must be connected to lower potential.',
  // Capacitor
  'Cylinder027': 'Ceramic body - Responsible for storing electrical energy by creating an electric field when a voltage is applied.',
  'Cylinder027_1': 'Lead - Connect this to your circuit.',
  // Diode
  'Cylinder016': 'P-N junction - Allows current to flow easily from the anode to the cathode.',
  'Cylinder016_2': 'P-N junction - Allows current to flow easily from the anode to the cathode.',
  'Cylinder016_1': 'Anode / Cathode - Current enters through the anode and exits the cathode.',
  // Zener Diode
  'Cylinder005': 'P-N junction - Allows current to flow easily from the anode to the cathode.',
  'Cylinder005_2': 'P-N junction - Allows current to flow easily from the anode to the cathode.',
  'Cylinder005_1': 'Anode / Cathode - Current enters through the anode and exits the cathode.',
  // Inductor
  'Inductor': 'Material at the center of the coil that concentrates and strengthens the magnetic field',
  'Circle': 'Loops of insulated copper wire wound around the core',
  'Cylinder030_1': 'Terminals (No polarity)',
  'Cylinder031_1': 'Terminals (No polarity)',
  // nMOS MOSFET
  'Cube': 'Body / Substrate - Silicon base connecting source and body internally',
  'nMOS_MOSFET001': 'Gate (G) - Control terminal; voltage here switches the transistor on/off',
  'nMOS_MOSFET002': 'Source (S) - Terminal where current flows out to ground',
  'nMOS_MOSFET003': 'Drain (D) - Terminal where current flows in from the load',
  // pMOS MOSFET
  'Cube003': 'Body / Substrate - Silicon base connecting source and body internally',
  'pMOS_MOSFET001': 'Gate (G) - Control terminal; voltage here switches the transistor on/off',
  'pMOS_MOSFET002': 'Source (S) - Terminal where current flows out to ground',
  'pMOS_MOSFET003': 'Drain (D) - Terminal where current flows in from the load',
  // nMOS Transistor
  'nMOS_Transistor': 'Body / Substrate - Silicon base connecting source and body internally',
  'nMOS_Transistor001': 'Gate (G) - Control terminal; voltage here switches the transistor on/off',
  'nMOS_Transistor002': 'Source (S) - Terminal where current flows out to ground',
  'nMOS_Transistor003': 'Drain (D) - Terminal where current flows in from the load',
  // pMOS Transistor
  'pMOS_Transistor': 'Body / Substrate: Silicon base connecting source and body internally',
  'pMOS_Transistor001': 'Gate (G) - Control terminal; voltage here switches the transistor on/off',
  'pMOS_Transistor002': 'Source (S) - Terminal where current flows out to ground',
  'pMOS_Transistor003': 'Drain (D) - Terminal where current flows in from the load',
  // NPN Transistor
  'NPN_Transistor': 'The plastic casing electrically isolates the internal die from the outside world preventing accidental short circuits',
  'NPN_Transistor001': 'Collector (C) - Positive terminal, collects electrons flowing from the emitter',
  'NPN_Transistor002': 'Emitter (E) - Negative terminal, emits electrons toward the collector',
  'NPN_Transistor003': 'Base (B) - Control terminal, a small positive current here turns the transistor ON',
  // PNP Transistor
  'Cylinder': 'The plastic casing electrically isolates the internal die from the outside world preventing accidental short circuits',
  'PNP_Transistor001': 'Emitter (E) - Positive terminal, emits holes toward the collector',
  'PNP_Transistor002': 'Collector (C) - Negative terminal, collects holes flowing from the emitter',
  'PNP_Transistor003': 'Base (B) - Control terminal, a small negative current (sinking) here turns the transistor ON',
  // TIP120
  'Cube004': 'Package Body: Large black plastic housing encasing the entire internal assembly',
  'TIP_120001': 'Emitter (E) - Main current output connected to ground',
  'TIP_120002': 'Collector (C) - Main current input connected to the positive load side',
  'TIP_120003': 'Base (B) - Input control pin, a very small signal here switches large loads ON/OFF',
  // 1.5V Battery
  'Cylinder010': 'Steel or aluminum shell that contains all internal components',
  'Cylinder010_1': 'Steel or aluminum shell that contains all internal components',
  'Cylinder010_2': 'Positive terminal (+)',
  '15V_Battery001': 'Positive terminal (+)',
  '15V_Battery002': 'Negative terminal (-)',
  // 9V Battery
  'Cube007': 'Steel outer shell that contains and protects all internal cells',
  'Cube007_1': 'Steel outer shell that contains and protects all internal cells',
  '9V_Battery001': 'Negative terminal (-)',
  '9V_Battery002': 'Positive terminal (+)',
  // Voin Cell 3V Battery
  'Coin_Cell_3V_Battery001': 'Positive terminal (+) - Flat top surface of the coin where current flows out to the circuit',
  'Coin_Cell_3V_Battery': 'Negative terminal (-) - Flat bottom surface of the coin where current returns back into the battery',
  // Solar Cell
  'Cube005': 'Positive (+) - Thin silver grid lines on the top surface that collect electrons and route them to the busbars. Negative (-). Full aluminum layer covering the entire back surface acts as the negative terminal',
  'Cube005_1': 'Positive (+) - Thin silver grid lines on the top surface that collect electrons and route them to the busbars. Negative (-). Full aluminum layer covering the entire back surface acts as the negative terminal',
  'Cube036_1': 'Positive terminal (+) - Output of higher potential where current flows out to the circuit',
  'Cube037_1': 'Negative terminal (-) - Return path where current flows back into the cell',
  // 7 Segment Display
  'Cube012': 'Frosted plastic front panel showing the digit segments and decimal point',
  'Cube012_1': 'Frosted plastic front panel showing the digit segments and decimal point',
  'Cube012_2': 'Seven individual rectangular cutouts on the face through which LED light shines',
  '7_Segment_Display001': 'Controls segment E',
  '7_Segment_Display002': 'Controls segment D',
  '7_Segment_Display003': 'Shared positive or negative terminal',
  '7_Segment_Display004': 'Controls segment C',
  '7_Segment_Display005': 'Controls decimal point LED',
  '7_Segment_Display006': 'Controls segment B',
  '7_Segment_Display007': 'Controls segment A',
  '7_Segment_Display008': 'Shared positive or negative terminal',
  '7_Segment_Display009': 'Controls segment F',
  '7_Segment_Display010': 'Controls segment G',
  // 7 Segment Clock Display
  'Cube023_1': 'Frosted plastic front panel showing the digit segments and decimal point.',
  'Cube023_2': 'Frosted plastic front panel showing the digit segments and decimal point.',
  'Cube023_3': 'Frosted plastic front panel showing the digit segments and decimal point.',
  // LCD 16x2
  'Cube014': 'PCB Board - Circuit board holding all components together',
  'Cube056_1': 'VSS - Ground 0V reference',
  'Cube057_1': 'VDD / VCC - Positive power supply (5V)',
  'Cube058_1': 'V0 / VEE - Contrast adjustment, connect to potentiometer wiper',
  'Cube059_1': 'RS - Register select',
  'Cube060_1': 'RW - Read and write',
  'Cube061_1': 'EN - Enable, latches data into the controller on falling edge',
  'Cube062_1': 'D0 - Data bit 0, LSB, used only in 8-bit mode',
  'Cube063_1': 'D1 - Data bit 1, used only in 8-bit mode',
  'Cube064_1': 'D2 - Data bit 2, used only in 8-bit mode',
  'Cube065_1': 'D3 - Data bit 3, used only in 8-bit mode',
  'Cube066_1': 'D4 - Data bit 4, used in both 4-bit and 8-bit mode',
  'Cube067_1': 'D5 - Data bit 5, used in both 4-bit and 8-bit mode',
  'Cube068_1': 'D6 - Data bit 6, used in both 4-bit and 8-bit mode',
  'Cube069_1': 'D7 - Data bit 7, MSB, used in both 4-bit and 8-bit mode',
  'Cube070_1': 'A / LED+ - Backlight anode, positive backlight supply',
  'Cube071_1': 'K / LED- - Backlight cathode, backlight ground',
  'Cube072': 'LCD Panel - Rectangular liquid crystal display showing 16 columns × 2 rows of characters',
  'Cube072_1': 'LCD Panel - Rectangular liquid crystal display showing 16 columns × 2 rows of characters',
  'Cube072_2': 'LCD Panel - Rectangular liquid crystal display showing 16 columns × 2 rows of characters',
  // LCD 16x2 I2C
  'Cube015': 'PCB Board - Circuit board holding all components together',
  'GND003': 'GND - Ground',
  'VCC003': 'VCC - Positive power supply',
  'SDA001': 'SDA - Serial data line, carries I2C data',
  'SCL001': 'SCL - Serial clock line, carries I2C click signal',
  'Cube073': 'LCD Panel - Rectangular liquid crystal display showing 16 columns × 2 rows of characters',
  'Cube073_1': 'LCD Panel - Rectangular liquid crystal display showing 16 columns × 2 rows of characters',
  'Cube073_2': 'LCD Panel - Rectangular liquid crystal display showing 16 columns × 2 rows of characters',
  // Microservo
  'Cylinder024_1': 'Red = VCC, Black = GND',
  'Cylinder024_2': 'Red = VCC, Black = GND',
  'Cylinder024_3': 'Red = VCC, Black = GND',
  'Cylinder024_4': 'Red = VCC, Black = GND',
  'Cylinder024': 'Plastic Housing. Rectangular plastic shell enclosing all internal components.',
  'Cylinder050': 'Plastic arm or wheel that rotates.',
  'Cylinder050_1': 'Screw that holds the arm in place.',
  // Vibration Motor
  'Cylinder021_3': 'Positive (+) power supply input',
  'Cylinder021_4': 'Negative (-) return path',
  'Cylinder021': 'Cylindrical Metal Housing - Small metal tube enclosing all internal components.',
  'Cylinder021_1': 'Cylindrical Metal Housing - Small metal tube enclosing all internal components.',
  // Hobby Gear Motor
  'Cylinder028': 'Yellow plastic shell enclosing the gear train.',
  'Cylinder028_3': 'Gearbox - Plastic or metal housing attached to the front of the DC motor that contains a series of interlocking gears.',
  'Cylinder028_1': 'Gearbox - Plastic or metal housing attached to the front of the DC motor that contains a series of interlocking gears.',
  'Hobby_Gear_Motor001': 'Output shaft - Flat-sided rotating rod extending from the front of the gearbox.',
  // DC Motor
  'Cylinder020': 'Motor Body - Cylindrical metal housing containing the DC motor internals.',
  'Cylinder020_1': 'Motor Body - Cylindrical metal housing containing the DC motor internals.',
  'DC_Motor001': 'Output Shaft - Rotating metal rod extending out the front.',
  'DC_Motor002': 'Output Gear - gear attached to the to the end output shaft.',
  // DC Motor with Encoder
  'Cylinder022': 'Motor Body - Cylindrical metal housing containing the DC motor internals.',
  'Cylinder022_1': 'Motor Body - Cylindrical metal housing containing the DC motor internals.',
  'DC_Motor_with_Encoder001': 'Output Shaft - D-shaped or round rod extending from the front that connects to wheels or load.',
  'Cylinder022_4': '6-Pin Connector - Six color-coded wires or a JST connector grouping all motor and encoder signals.',
  'Cylinder022_5': '6-Pin Connector - Six color-coded wires or a JST connector grouping all motor and encoder signals.',
  // 4x4 Keypad
  'Cube006': 'Cover - Protects the internal components',
  'Cube013': 'Key Caps - Individual raised button surfaces the user presses, part of the membrane or separate plastic caps',
  'Cube013_1': 'Key Caps - Individual raised button surfaces the user presses, part of the membrane or separate plastic caps',
  'Cube013_2': 'Key Caps - Individual raised button surfaces the user presses, part of the membrane or separate plastic caps',
  '4x4_Keypad002': 'R1 - Row 1, top row of keys',
  '4x4_Keypad003': 'R2 - Row 2, second row of keys',
  '4x4_Keypad004': 'R3 - Row 3, third row of keys',
  '4x4_Keypad005': 'R4 - Row 4, bottom row of keys',
  '4x4_Keypad006': 'C1 - Column 1, leftmost column',
  '4x4_Keypad007': 'C2 - Column 2, second column',
  '4x4_Keypad008': 'C3 - Column 3, third column',
  '4x4_Keypad009': 'C4 - Column 4, rightmost column',
  // Tilt Sensor
  'Tilt_Sensor001': 'VCC - Positive power supply',
  'Tilt_Sensor002': 'GND - Ground',
  'Tilt_Sensor003': 'DO / OUT - Digital output, HIGH or LOW based on tilt state',
  'Cube081_1': 'Tilt Switch / Sensor - The actual sensing element mounted on the PCB, detects physical tilt',
  'Cube022': 'PCB Board - Small circuit board holding all components together',
  // Ultrasonic Distance Sensor
  'Ultrasonic_Distance_Sensor001': 'VCC - Positive power supply',
  'Ultrasonic_Distance_Sensor002': 'SIG / OUT - Combined trigger and echo pin, sends and receives signal on the same pin',
  'Ultrasonic_Distance_Sensor003': 'GND - Ground, 0V reference',
  'Ultrasonic_Distance_Sensor005': 'Transmitter Transducer - Left cylindrical silver can, emits ultrasonic pulses at 40kHz',
  'Cube091_1': 'Receiver Transducer - Right cylindrical silver can, detects returning reflected sound waves',
  'Cube011': 'PCB Board - Circuit board holding all components and the 3-pin connection header',
  // Ultrasonic Distance Sensor (4 pins)
  'Cube019': 'PCB Board - Circuit board holding all components and the 4-pin connection header',
  'Ultrasonic_Distance_Sensor_(4-Pin)001': 'VCC - Positive power supply',
  'Ultrasonic_Distance_Sensor_(4-Pin)002': 'TRIG - Trigger input, sends ultrasonic pulse when HIGH for 10µs',
  'Ultrasonic_Distance_Sensor_(4-Pin)003': 'ECHO - Echo output, goes HIGH for duration of pulse return time',
  'Ultrasonic_Distance_Sensor_(4-Pin)004': 'GND - Ground, 0V reference',
  'Ultrasonic_Distance_Sensor_(4-Pin)005': 'Transmitter Transducer - Left cylindrical silver can, emits ultrasonic pulses at 40kHz',
  'Ultrasonic_Distance_Sensor_(4-Pin)006': 'Receiver Transducer - Right cylindrical silver can, detects returning reflected sound waves',
  // Dip Switch
  'Dip_Switch001': 'Input side - connect to VCC or signal',
  'Dip_Switch002': 'Output side - connect to GPIO or GND',
  'Cube001': 'Slide Actuators - Small individual levers on top, one per switch position, slide to turn ON or OFF',
  'Cube001_1': 'Package Body - Rectangular black or white plastic housing encasing all switch positions',
  // Flex Sensor
  'Cylinder055': 'Terminal A - First end of the resistive element, connect to VCC through a fixed resistor',
  'Cylinder056': 'Terminal B - Second end of the resistive element, connect to analog input pin',
  'Cylinder023': 'Flexible Strip Body - Thin flat plastic strip that physically bends the entire sensing surface',
  'Cylinder023_1': 'Flexible Strip Body - Thin flat plastic strip that physically bends the entire sensing surface',
  'Cylinder023_2': 'Flexible Strip Body - Thin flat plastic strip that physically bends the entire sensing surface',
  'Cylinder023_3': 'Flexible Strip Body - Thin flat plastic strip that physically bends the entire sensing surface',
  // Force Sensor
  'Cylinder057_1': 'Terminal A - First end of the resistive element, connect to VCC through a fixed resistor',
  'Cylinder058_1': 'Terminal B - Second end of the resistive element, connect to analog input pin',
  'Cylinder019_1': 'Tail / Ribbon Cable - Flat flexible plastic strip extending from the sensing area carrying the two electrical connections',
  'Cylinder019_3': 'Tail / Ribbon Cable - Flat flexible plastic strip extending from the sensing area carrying the two electrical connections',
  'Cylinder059': 'Sensing Area / Active Zone - Circular or rectangular front face where pressure is applied, the only area that responds to force',
  'Cylinder059_1': 'Sensing Area / Active Zone - Circular or rectangular front face where pressure is applied, the only area that responds to force',
  // Gas Sensor
  'Cylinder014': 'PCB Board - Green circuit board holding the sensor element and all supporting components',
  'Gas_Sensor001': 'VCC - Power supply 5V',
  'Gas_Sensor002': 'GND - Ground, 0V reference',
  'Gas_Sensor003': 'DO - Digital output, HIGH or LOW based on gas threshold',
  'Gas_Sensor004': 'AO - Analog output, raw sensor voltage proportional to gas concentration',
  'Gas_Sensor005': 'MQ Sensor Element - Cylindrical metal cap sensor mounted upright on the PCB, the actual gas detecting component',
  // IR Sensor
  'Cube020': 'PCB Board - Green circuit board holding all components and the pin header',
  'IR_Sensor001': 'VCC - Power supply, 3.3V or 5V',
  'IR_Sensor002': 'GND - Ground, 0V reference',
  'IR_Sensor003': 'DO / OUT - Digital output, LOW when object detected, HIGH when clear',
  'IR_Sensor004': 'IR LED (Emitter) - Clear or dark colored LED that emits infrared light invisible to the human eye',
  'IR_Sensor005': 'Photodiode / Phototransistor (Receiver) - Dark colored component next to the IR LED that detects reflected infrared light returning from objects',
  // Photodiode
  'Cylinder033': 'Epoxy Lens / Dome - Clear or tinted transparent dome encasing the internal die that focuses incoming light onto the active area',
  'Photodiode001': 'Anode (+) - Positive terminal',
  'Photodiode002': 'Cathode (−) - Negative terminal',
  // Photoresistor
  'Cylinder013': 'Disc Body - Round flat epoxy or ceramic disc forming the main body of the component',
  'Cylinder013_1': 'Serpentine Track Window - Zigzag or spiral shaped exposed area on the top face, the active light sensing surface',
  'Cylinder067_1': 'Terminal A - First end of the resistive element, connect to VCC through a fixed resistor',
  'Cylinder068_1': 'Terminal B - Second end of the resistive element, connect to analog input pin',
  // PIR Sensor
  'Cylinder018': 'Fresnel Lens - White dome shaped plastic lens covering the entire top of the module, focuses and divides incoming infrared radiation onto the sensor element',
  'Cylinder018_1': 'PCB Board - Green circuit board holding all components and signal processing circuitry',
  'PIR_Sensor001': 'VCC - Power supply, 5V to 12V',
  'PIR_Sensor002': 'OUT - Digital output, HIGH when motion detected, LOW when clear',
  'PIR_Sensor003': 'GND - Ground, 0V reference',
  // Potentiometer
  'Potentiometer001': 'VCC / Terminal A - First fixed end of the resistive track, connect to VCC',
  'Potentiometer002': 'SIG / Wiper - Middle pin, variable output voltage proportional to knob position',
  'Potentiometer003': 'GND / Terminal B - Second fixed end of the resistive track, connect to GND',
  'Potentiometer004': 'Knob / Shaft - Rotating rod the user turns, transfers rotation to the internal wiper mechanism',
  'Potentiometer005': 'Mounting Nut - Hex nut screwed onto the bushing securing the pot to a front panel',
  'Cylinder011': 'Housing / Body - Plastic or metal rectangular enclosure containing all internal components',
  'Cylinder011_1': 'Housing / Body - Plastic or metal rectangular enclosure containing all internal components',
  // Push Button
  'Cylinder002': 'Housing / Body - Square or rectangular plastic enclosure containing all internal components',
  'Cylinder002_1': 'Button Cap / Actuator - Colored plastic top the user physically presses, available in multiple colors and heights',
  'Push_Button001': 'Terminal A1 (Pin 1) - First contact pair, electrically connected to Pin 2',
  'Push_Button002': 'Terminal B2 (Pin 4) - Second contact pair, electrically connected to Pin 3',
  'Push_Button003': 'Terminal A2 (Pin 2) - First contact pair, electrically connected to Pin 1',
  'Push_Button004': 'Terminal B1 (Pin 3) - Second contact pair, electrically connected to Pin 4',
  // Slide Switch
  'Cube017': 'Housing / Body - Rectangular plastic enclosure containing all internal components',
  'Cube017_1': 'Housing / Body - Rectangular plastic enclosure containing all internal components',
  'Slide_Switch001': 'Terminal A - First outer fixed contact',
  'Slide_Switch002': 'COM / Common - Middle pin, always connected to slider',
  'Slide_Switch003': 'Terminal B - Second outer fixed contact',
  'Slide_Switch004': 'Slider Actuator / Knob - Plastic lever the user physically slides left or right, the only user-accessible moving part',
  // Soil Moisture Sensor
  'Cube106': 'PCB Substrate - Fiberglass board the electrodes are printed on',
  'Cube106_1': 'Electrode - Exposed metal strip running along the probe length',
  'Cube107_1': 'PCB Substrate - Fiberglass board the electrodes are printed on',
  'Cube107_2': 'Electrode - Exposed metal strip running along the probe length',
  'Soil_Moisture_Sensor001': 'Positive (+) - Connect to VCC through a fixed resistor',
  'Soil_Moisture_Sensor002': 'Negative (−) - Connect to GND and analog input pin',
  // Temperature Sensor
  'Temperature_Sensor': 'TO-92 Package BodySmall plastic D-shaped housing identical to a transistor',
  'Temperature_Sensor001': 'VCC - Power supply, 4V to 30V',
  'Temperature_Sensor002': 'VOUT - Analog output, 10mV per °C',
  'Temperature_Sensor003': 'GND - Ground, 0V reference',

  // Add more mesh names here as you confirm them in gltf.report
};

// ==================== MODEL COMPONENT WITH DIRECT RAYCASTING ====================
function ComponentModel({ url, isActive, scale = 20, onTooltipChange }: {
  url: string;
  isActive: boolean;
  scale?: number;
  onTooltipChange?: (tooltip: { text: string; x: number; y: number } | null) => void;
}) {
  const { scene } = useGLTF(url);
  const { camera, gl } = useThree();
  const sceneRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!isActive) return;

    // Force all meshes to double-sided so raycaster hits from any angle
    scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        if (Array.isArray(obj.material)) {
          obj.material.forEach(m => m.side = THREE.DoubleSide);
        } else {
          obj.material.side = THREE.DoubleSide;
        }
      }
    });

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let currentHovered: string | null = null;

    const onPointerMove = (e: PointerEvent) => {
      const rect = gl.domElement.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(pointer, camera);
      scene.updateMatrixWorld(true);

      const intersects = raycaster.intersectObjects(scene.children, true);

      // Position relative to the canvas container
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (intersects.length > 0) {
        const hit = intersects[0].object as THREE.Mesh;
        console.log('Hovered mesh name:', hit.name);

        if (hit.name !== currentHovered) {
          currentHovered = hit.name;

          if (meshTooltips[hit.name]) {
            onTooltipChange?.({ text: meshTooltips[hit.name], x: x + 12, y });
            document.body.style.cursor = 'pointer';
          } else {
            onTooltipChange?.(null);
            document.body.style.cursor = 'default';
          }
        } else if (currentHovered && meshTooltips[currentHovered]) {
          // Update tooltip position as mouse moves
          onTooltipChange?.({ text: meshTooltips[currentHovered], x: x + 12, y });
        }
      } else {
        if (currentHovered) {
          currentHovered = null;
          onTooltipChange?.(null);
          document.body.style.cursor = 'default';
        }
      }
    };

    gl.domElement.addEventListener('pointermove', onPointerMove);

    return () => {
      gl.domElement.removeEventListener('pointermove', onPointerMove);
      document.body.style.cursor = 'default';
      onTooltipChange?.(null);
    };
  }, [scene, camera, gl, isActive, onTooltipChange]);

  if (!isActive) return null;

  return (
    <Center bottom position={[0, 10, 0]}>
      <group ref={sceneRef}>
        <primitive object={scene} scale={scale} />
      </group>
    </Center>
  );
}

// ==================== CAMERA RESET ====================
function CameraReset({ position, target }: {
  position: [number, number, number];
  target: [number, number, number];
}) {
  const { camera, controls } = useThree();

  useEffect(() => {
    camera.position.set(...position);
    if (controls) {
      const orbitControls = controls as unknown as {
        target: THREE.Vector3;
        update: () => void;
      };
      orbitControls.target.set(...target);
      orbitControls.update();
    }
  }, [position, target, camera, controls]);

  return null;
}

// ==================== HEADER ====================
function Header({ isDark, toggleTheme }: { isDark: boolean; toggleTheme: () => void }) {
  const handleThemeToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!document.startViewTransition) {
      toggleTheme();
      return;
    }

    const x = event.clientX;
    const y = event.clientY;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = document.startViewTransition(() => toggleTheme());
    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`],
        },
        { duration: 750, easing: 'ease-in-out', pseudoElement: '::view-transition-new(root)' }
      );
    });
  };

  return (
    <header className={`p-4 flex justify-between items-center border-b ${isDark ? 'border-blue-900/30' : 'border-blue-200/30'} backdrop-blur-sm`}>
      <Link href="/" className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
        <ArrowLeft className="w-5 h-5" />
        Back Home
      </Link>
      <h1 className="text-2xl font-semibold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
        3D Component Viewer
      </h1>
      <button
        onClick={handleThemeToggle}
        className={`relative p-2 rounded-lg ${isDark ? 'bg-blue-900/20 hover:bg-blue-900/30' : 'bg-blue-100 hover:bg-blue-200'} transition-all duration-300`}
      >
        {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-blue-600" />}
      </button>
    </header>
  );
}

// ==================== BACKGROUND ====================
function AnimatedBackground({ isDark }: { isDark: boolean }) {
  return (
    <>
      <div className={`absolute inset-0 bg-[linear-gradient(rgba(30,58,138,${isDark ? 0.1 : 0.05})_1px,transparent_1px),linear-gradient(90deg,rgba(30,58,138,${isDark ? 0.1 : 0.05})_1px,transparent_1px)] bg-[size:50px_50px]`} />
      <div className={`absolute top-1/4 right-1/4 w-96 h-96 ${isDark ? 'bg-blue-900/20' : 'bg-blue-300/20'} rounded-full blur-3xl`} />
      <div className={`absolute bottom-1/4 left-1/4 w-96 h-96 ${isDark ? 'bg-blue-800/10' : 'bg-indigo-200/10'} rounded-full blur-3xl`} />
    </>
  );
}

// ==================== CONTROL PANEL ====================
function CameraControlPanel({
  isDark,
  controlMode,
  setControlMode,
  onFrameView,
}: {
  isDark: boolean;
  controlMode: 'orbit' | 'pan';
  setControlMode: (mode: 'orbit' | 'pan') => void;
  onFrameView: () => void;
}) {
  return (
    <div className={`absolute top-4 left-4 z-20 flex flex-col gap-1 rounded-lg border ${isDark ? 'bg-blue-950/40 border-blue-900/30' : 'bg-white/80 border-blue-200/30'} backdrop-blur-sm p-1`}>
      <button
        onClick={() => setControlMode('orbit')}
        className={`p-2 rounded-md transition-all duration-200 ${
          controlMode === 'orbit'
            ? isDark ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'
            : isDark ? 'hover:bg-blue-900/30' : 'hover:bg-blue-100'
        }`}
        title="Orbit Mode"
      >
        <Orbit className="w-4 h-4" />
      </button>

      <button
        onClick={() => setControlMode('pan')}
        className={`p-2 rounded-md transition-all duration-200 ${
          controlMode === 'pan'
            ? isDark ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'
            : isDark ? 'hover:bg-blue-900/30' : 'hover:bg-blue-100'
        }`}
        title="Pan Mode"
      >
        <Hand className="w-4 h-4" />
      </button>

      <div className={`w-full h-px ${isDark ? 'bg-blue-900/30' : 'bg-blue-200/30'} my-1`} />

      <button
        onClick={onFrameView}
        className={`p-2 rounded-md transition-all duration-200 ${isDark ? 'hover:bg-blue-900/30' : 'hover:bg-blue-100'}`}
        title="Frame View"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
          <line x1="4" y1="10" x2="20" y2="10"></line>
          <line x1="4" y1="14" x2="20" y2="14"></line>
          <line x1="10" y1="4" x2="10" y2="20"></line>
          <line x1="14" y1="4" x2="14" y2="20"></line>
        </svg>
      </button>
    </div>
  );
}

// ==================== VIEW CONFIG ====================
const getModelViewConfig = (url: string): { position: [number, number, number]; target: [number, number, number] } => {
  if (url.includes('Breadboard63R10C')) return { position: [40, 60, 90], target: [0, 12, 0] };
  if (url.includes('BreadboardSmall')) return { position: [38, 55, 80], target: [0, 11, 0] };
  if (url.includes('BreadboardMini')) return { position: [35, 50, 75], target: [0, 10, 0] };
  if (url.includes('7SegmentClock')) return { position: [30, 45, 65], target: [0, 8, 0] };
  if (url.includes('7SegmentDisplay')) return { position: [28, 42, 60], target: [0, 7, 0] };
  if (url.includes('LCD16x2_I2C')) return { position: [34, 50, 70], target: [0, 9, 0] };
  if (url.includes('LCD16x2')) return { position: [32, 48, 68], target: [0, 8, 0] };
  if (url.includes('Capacitor') && !url.includes('Polarized')) return { position: [0, 120, 150], target: [0, 12, 0] };
  if (url.includes('PolarizedCapacitor')) return { position: [0, 130, 160], target: [0, 14, 0] };
  if (url.includes('Resistor')) return { position: [0, 100, 130], target: [0, 10, 0] };
  if (url.includes('Diode') && !url.includes('Zener')) return { position: [0, 110, 140], target: [0, 11, 0] };
  if (url.includes('ZenerDiode')) return { position: [0, 110, 140], target: [0, 11, 0] };
  if (url.includes('Inductor')) return { position: [0, 125, 155], target: [0, 13, 0] };
  if (url.includes('4x4Keypad')) return { position: [30, 45, 65], target: [0, 8, 0] };
  if (url.includes('AmbientLightSensor')) return { position: [28, 42, 60], target: [0, 7, 0] };
  if (url.includes('DipSwitch')) return { position: [28, 42, 60], target: [0, 7, 0] };
  if (url.includes('FlexSensor')) return { position: [30, 45, 65], target: [0, 8, 0] };
  if (url.includes('ForceSensor')) return { position: [28, 42, 60], target: [0, 7, 0] };
  if (url.includes('GasSensor')) return { position: [30, 45, 65], target: [0, 8, 0] };
  if (url.includes('IRSensor')) return { position: [30, 45, 65], target: [0, 8, 0] };
  if (url.includes('Photodiode')) return { position: [28, 42, 60], target: [0, 7, 0] };
  if (url.includes('Photoresistor')) return { position: [28, 42, 60], target: [0, 7, 0] };
  if (url.includes('PIRSensor')) return { position: [32, 48, 68], target: [0, 9, 0] };
  if (url.includes('Potentiometer')) return { position: [30, 45, 65], target: [0, 8, 0] };
  if (url.includes('PushButton')) return { position: [28, 42, 60], target: [0, 7, 0] };
  if (url.includes('SlideSwitch')) return { position: [28, 42, 60], target: [0, 7, 0] };
  if (url.includes('SoilMoistureSensor')) return { position: [32, 48, 68], target: [0, 9, 0] };
  if (url.includes('TemperatureSensor')) return { position: [28, 42, 60], target: [0, 7, 0] };
  if (url.includes('TiltSensor')) return { position: [30, 45, 65], target: [0, 8, 0] };
  if (url.includes('UltrasonicDistanceSensor4Pins')) return { position: [34, 50, 70], target: [0, 9, 0] };
  if (url.includes('UltrasonicDistanceSensor')) return { position: [34, 50, 70], target: [0, 9, 0] };
  if (url.includes('DCMotor')) return { position: [30, 45, 65], target: [0, 8, 0] };
  if (url.includes('DCMotorWithEncoder')) return { position: [28, 42, 60], target: [0, 7, 0] };
  if (url.includes('HobbyGearMotor')) return { position: [34, 50, 70], target: [0, 9, 0] };
  if (url.includes('MicroServo')) return { position: [32, 48, 68], target: [0, 8, 0] };
  if (url.includes('VibrationMotor')) return { position: [32, 48, 68], target: [0, 8, 0] };
  if (url.includes('LED')) return { position: [30, 45, 65], target: [0, 8, 0] };
  if (url.includes('RGBLED')) return { position: [28, 42, 60], target: [0, 7, 0] };
  if (url.includes('LightBulb')) return { position: [34, 50, 70], target: [0, 9, 0] };
  if (url.includes('NeoPixel')) return { position: [32, 48, 68], target: [0, 8, 0] };
  if (url.includes('PiezoBuzzer')) return { position: [32, 48, 68], target: [0, 8, 0] };
  if (url.includes('15Battery')) return { position: [30, 45, 65], target: [0, 8, 0] };
  if (url.includes('9Battery')) return { position: [28, 42, 60], target: [0, 7, 0] };
  if (url.includes('CoinCell')) return { position: [34, 50, 70], target: [0, 9, 0] };
  if (url.includes('SolarCell')) return { position: [32, 48, 68], target: [0, 8, 0] };
  if (url.includes('nMOSMOSFET')) return { position: [30, 45, 65], target: [0, 8, 0] };
  if (url.includes('pMOSMOSFET')) return { position: [28, 42, 60], target: [0, 7, 0] };
  if (url.includes('NPNTransistor')) return { position: [34, 50, 70], target: [0, 9, 0] };
  if (url.includes('PNPTransistor')) return { position: [32, 48, 68], target: [0, 8, 0] };
  if (url.includes('nMOSTransistor')) return { position: [28, 42, 60], target: [0, 7, 0] };
  if (url.includes('pMOSTransistor')) return { position: [34, 50, 70], target: [0, 9, 0] };
  if (url.includes('TIP120')) return { position: [32, 48, 68], target: [0, 8, 0] };
  return { position: [30, 45, 65], target: [0, 8, 0] };
};

// ==================== MAIN PAGE ====================
export function MainPage() {
  const [isDark, setIsDark] = useState(false);
  const toggleTheme = () => setIsDark(!isDark);
  const viewerRef = useRef<HTMLDivElement>(null);

  const [selectedModel, setSelectedModel] = useState<{
    url: string;
    position: [number, number, number];
    target: [number, number, number];
    scale: number;
  } | null>(null);

  const [cameraPosition, setCameraPosition] = useState<[number, number, number]>([30, 45, 65]);
  const [cameraTarget, setCameraTarget] = useState<[number, number, number]>([0, 8, 0]);
  const [controlMode, setControlMode] = useState<'orbit' | 'pan'>('orbit');
  const [modelKey, setModelKey] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null);

  const handleModelSelect = useCallback((
    url: string,
    position: [number, number, number],
    target: [number, number, number] = [0, 8, 0],
    scale: number = 20
  ) => {
    setIsLoading(true);
    setTooltip(null);
    setSelectedModel({ url, position, target, scale });
    setCameraPosition(position);
    setCameraTarget(target);
    setModelKey(prev => prev + 1);
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  const handleFrameView = useCallback(() => {
    if (selectedModel) {
      setCameraPosition(selectedModel.position);
      setCameraTarget(selectedModel.target);
    } else {
      setCameraPosition([30, 45, 65]);
      setCameraTarget([0, 8, 0]);
    }
  }, [selectedModel]);

  return (
    <>
      <style>{`
        ::view-transition-old(root),
        ::view-transition-new(root) {
          animation: none;
          mix-blend-mode: normal;
        }
      `}</style>

      <div className={`min-h-screen ${isDark ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'} relative overflow-hidden flex flex-col`}>
        <AnimatedBackground isDark={isDark} />

        <div className="relative z-10 flex flex-col flex-grow">
          <Header isDark={isDark} toggleTheme={toggleTheme} />

          <main className="flex-grow grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 p-4">
            {/* Category Sidebar */}
            <aside className={`rounded-lg border ${isDark ? 'bg-blue-950/30 border-blue-900/30' : 'bg-white/50 border-blue-200/30'} backdrop-blur-sm p-4`}>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <LayoutGrid className="w-5 h-5 text-blue-400" />
                Categories
              </h2>
              <ul className="space-y-1">
                <BreadboardCategory onModelSelect={handleModelSelect} />
                <DisplayCategory onModelSelect={handleModelSelect} />
                <GeneralCategory onModelSelect={handleModelSelect} />
                <InputCategory onModelSelect={handleModelSelect} />
                <MotorCategory onModelSelect={handleModelSelect} />
                <OutputCategory onModelSelect={handleModelSelect} />
                <PowerCategory onModelSelect={handleModelSelect} />
                <PowerControlCategory onModelSelect={handleModelSelect} />
              </ul>
            </aside>

            {/* 3D Viewer */}
            <div
              ref={viewerRef}
              className={`rounded-lg border ${isDark ? 'bg-black/20 border-blue-900/30' : 'bg-white/20 border-blue-200/30'} backdrop-blur-sm flex items-center justify-center relative`}
            >
              <CameraControlPanel
                isDark={isDark}
                controlMode={controlMode}
                setControlMode={setControlMode}
                onFrameView={handleFrameView}
              />

              {/* Loading indicator */}
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center z-30 bg-black/20 backdrop-blur-sm">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
              )}

              <div className="w-full h-full">
                <Canvas
                  camera={{ position: [30, 45, 65], fov: 20, near: 0.1, far: 1000 }}
                  onCreated={({ gl }) => {
                    gl.domElement.addEventListener('webglcontextlost', (e) => {
                      e.preventDefault();
                    });
                  }}
                >
                  <ambientLight intensity={5} />
                  <directionalLight position={[30, 60, 30]} intensity={3} />
                  <directionalLight position={[-30, 50, 20]} intensity={2.5} />
                  <directionalLight position={[0, 80, -30]} intensity={2} />
                  <pointLight position={[0, 50, 0]} intensity={1.5} />

                  <Grid
                    cellSize={2}
                    sectionSize={10}
                    cellThickness={1}
                    sectionThickness={1.5}
                    infiniteGrid
                    fadeDistance={400}
                    fadeStrength={5}
                    sectionColor={isDark ? '#c7d4e4' : '#a0b8d0'}
                    cellColor={isDark ? '#adb8c4' : '#ffffff'}
                  />

                  <OrbitControls
                    enablePan={true}
                    enableZoom={true}
                    enableRotate={true}
                    autoRotate={false}
                    maxDistance={300}
                    minDistance={30}
                    maxPolarAngle={Math.PI}
                    minPolarAngle={0}
                    mouseButtons={{
                      LEFT: controlMode === 'orbit' ? THREE.MOUSE.ROTATE : THREE.MOUSE.PAN,
                      MIDDLE: THREE.MOUSE.DOLLY,
                      RIGHT: controlMode === 'orbit' ? THREE.MOUSE.PAN : THREE.MOUSE.ROTATE,
                    }}
                  />

                  {selectedModel && (
                    <Suspense fallback={null}>
                      <ComponentModel
                        key={`model-${modelKey}`}
                        url={selectedModel.url}
                        isActive={true}
                        scale={selectedModel.scale}
                        onTooltipChange={setTooltip}
                      />
                    </Suspense>
                  )}

                  <CameraReset position={cameraPosition} target={cameraTarget} />
                </Canvas>
              </div>

              <div className="absolute bottom-4 left-4 text-xs text-gray-500">
                <p>{selectedModel ? 'Hover over parts to learn more • 360° rotate • Zoom' : 'Select a component to begin'}</p>
              </div>

              {/* Tooltip — positioned relative to viewer container */}
              {tooltip && (
                <div
                  className="absolute z-50 pointer-events-none"
                  style={{ left: tooltip.x + 12, top: tooltip.y }}
                >
                  <div className={`text-sm px-3 py-2 rounded-lg shadow-lg max-w-xs border ${
                    isDark
                      ? 'bg-gray-900 border-blue-500/40 text-white'
                      : 'bg-white border-blue-300/40 text-gray-900'
                  }`}>
                    {tooltip.text}
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}