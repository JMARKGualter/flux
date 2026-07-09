// ==================== SIMULATION DATA MODEL ====================

// A component instance placed on the workbench
export interface PlacedComponent {
  id: string;          // unique instance id
  modelId: string;     // key into modelRegistry
  position: [number, number, number];
  rotationY: number;   // radians
  props: ComponentProps;
}

export interface ComponentProps {
  resistance?: number; // ohms, for resistors
  closed?: boolean;    // for switches / buttons
}

// A wire between two component terminals
export interface Wire {
  id: string;
  from: TerminalRef;
  to: TerminalRef;
}

export interface TerminalRef {
  componentId: string;
  terminal: string; // 'a' | 'b' (a = +/anode for polarized parts)
}

export const terminalKey = (ref: TerminalRef) => `${ref.componentId}:${ref.terminal}`;

// ==================== ELECTRICAL SPECS ====================
// Only a starter subset of the library is electrically simulated; everything
// else can be placed as scenery. Terminal 'a' is the positive/anode side.

export type SimSpec =
  | { kind: 'battery'; voltage: number; internalR: number }
  | { kind: 'resistor'; defaultR: number }
  | { kind: 'led'; vf: number; seriesR: number; color: string }
  | { kind: 'switch'; defaultClosed: boolean }
  | { kind: 'buzzer'; r: number; minCurrent: number }
  | { kind: 'bulb'; r: number };

export const SIM_SPECS: Record<string, SimSpec> = {
  'battery-aa': { kind: 'battery', voltage: 1.5, internalR: 0.5 },
  'battery-9v': { kind: 'battery', voltage: 9, internalR: 0.5 },
  'coin-cell': { kind: 'battery', voltage: 3, internalR: 1 },
  'resistor': { kind: 'resistor', defaultR: 220 },
  'led-red': { kind: 'led', vf: 2.0, seriesR: 10, color: '#ff3333' },
  'push-button': { kind: 'switch', defaultClosed: false },
  'slide-switch': { kind: 'switch', defaultClosed: false },
  'buzzer': { kind: 'buzzer', r: 100, minCurrent: 0.002 },
  'lightbulb': { kind: 'bulb', r: 40 },
};

export const isSimulatable = (modelId: string) => modelId in SIM_SPECS;

// Human-readable terminal labels for the inspector / port tooltips
export function terminalLabels(modelId: string): { a: string; b: string } {
  const spec = SIM_SPECS[modelId];
  switch (spec?.kind) {
    case 'battery':
      return { a: 'Positive (+)', b: 'Negative (−)' };
    case 'led':
      return { a: 'Anode (+)', b: 'Cathode (−)' };
    case 'buzzer':
      return { a: 'Positive (+)', b: 'Negative (−)' };
    default:
      return { a: 'Terminal 1', b: 'Terminal 2' };
  }
}

// ==================== SOLVER RESULTS ====================

export interface ComponentResult {
  current: number;      // amps through the element (a -> b positive)
  voltage: number;      // volts across (Va - Vb)
  on: boolean;          // LED lit / buzzer sounding / bulb glowing
  brightness: number;   // 0..1 for glow intensity
  warning?: string;
}

export interface SolveResult {
  perComponent: Record<string, ComponentResult>;
  warnings: string[];
}
