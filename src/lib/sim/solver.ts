// ==================== DC CIRCUIT SOLVER ====================
// Nodal analysis over the wired nets. Every simulated element is stamped as a
// Norton equivalent (conductance + injected current), so the system stays a
// plain G·v = I linear solve. LEDs are piecewise-linear (off, or Vf + series
// resistance when forward-biased) and settled by a few re-solve iterations.

import {
  PlacedComponent,
  Wire,
  SIM_SPECS,
  SolveResult,
  ComponentResult,
  terminalKey,
} from './types';

const LEAK = 1e-9;        // tiny conductance to ground keeps floating nets solvable
const OPEN = 1e-9;        // open switch conductance
const CLOSED_R = 0.05;    // closed switch resistance

// ---------- union-find over terminals ----------
class UnionFind {
  private parent = new Map<string, string>();

  find(x: string): string {
    if (!this.parent.has(x)) this.parent.set(x, x);
    let root = x;
    while (this.parent.get(root) !== root) root = this.parent.get(root)!;
    // path compression
    let cur = x;
    while (this.parent.get(cur) !== root) {
      const next = this.parent.get(cur)!;
      this.parent.set(cur, root);
      cur = next;
    }
    return root;
  }

  union(a: string, b: string) {
    this.parent.set(this.find(a), this.find(b));
  }
}

// ---------- gaussian elimination with partial pivoting ----------
function solveLinear(G: number[][], I: number[]): number[] | null {
  const n = I.length;
  const A = G.map((row, i) => [...row, I[i]]);

  for (let col = 0; col < n; col++) {
    let pivot = col;
    for (let r = col + 1; r < n; r++) {
      if (Math.abs(A[r][col]) > Math.abs(A[pivot][col])) pivot = r;
    }
    if (Math.abs(A[pivot][col]) < 1e-15) return null;
    [A[col], A[pivot]] = [A[pivot], A[col]];

    for (let r = col + 1; r < n; r++) {
      const f = A[r][col] / A[col][col];
      for (let c = col; c <= n; c++) A[r][c] -= f * A[col][c];
    }
  }

  const v = new Array(n).fill(0);
  for (let r = n - 1; r >= 0; r--) {
    let sum = A[r][n];
    for (let c = r + 1; c < n; c++) sum -= A[r][c] * v[c];
    v[r] = sum / A[r][r];
  }
  return v;
}

export function solveCircuit(components: PlacedComponent[], wires: Wire[]): SolveResult {
  const simComponents = components.filter((c) => SIM_SPECS[c.modelId]);
  const warnings: string[] = [];
  const perComponent: Record<string, ComponentResult> = {};

  // Build nets: terminals joined by wires share a node
  const uf = new UnionFind();
  simComponents.forEach((c) => {
    uf.find(`${c.id}:a`);
    uf.find(`${c.id}:b`);
  });
  wires.forEach((w) => uf.union(terminalKey(w.from), terminalKey(w.to)));

  const netIndex = new Map<string, number>();
  const netOf = (terminal: string) => {
    const root = uf.find(terminal);
    if (!netIndex.has(root)) netIndex.set(root, netIndex.size);
    return netIndex.get(root)!;
  };
  const nets = simComponents.map((c) => ({
    id: c.id,
    a: netOf(`${c.id}:a`),
    b: netOf(`${c.id}:b`),
  }));

  const n = netIndex.size;
  if (n === 0) return { perComponent, warnings };

  // LED on/off states, settled iteratively
  const ledOn = new Map<string, boolean>();
  simComponents.forEach((c) => {
    if (SIM_SPECS[c.modelId].kind === 'led') ledOn.set(c.id, false);
  });

  let voltages: number[] = new Array(n).fill(0);

  for (let iter = 0; iter < 12; iter++) {
    const G: number[][] = Array.from({ length: n }, () => new Array(n).fill(0));
    const I: number[] = new Array(n).fill(0);
    for (let i = 0; i < n; i++) G[i][i] += LEAK;

    const stampConductance = (a: number, b: number, g: number) => {
      G[a][a] += g;
      G[b][b] += g;
      G[a][b] -= g;
      G[b][a] -= g;
    };

    simComponents.forEach((c, idx) => {
      const spec = SIM_SPECS[c.modelId];
      const { a, b } = nets[idx];

      switch (spec.kind) {
        case 'battery': {
          const g = 1 / spec.internalR;
          stampConductance(a, b, g);
          I[a] += spec.voltage * g;
          I[b] -= spec.voltage * g;
          break;
        }
        case 'resistor': {
          const r = Math.max(c.props.resistance ?? spec.defaultR, 0.01);
          stampConductance(a, b, 1 / r);
          break;
        }
        case 'led': {
          if (ledOn.get(c.id)) {
            const g = 1 / spec.seriesR;
            stampConductance(a, b, g);
            // forward drop opposes current: Norton injection pulls Vf across
            I[a] += spec.vf * g;
            I[b] -= spec.vf * g;
          } else {
            stampConductance(a, b, OPEN);
          }
          break;
        }
        case 'switch': {
          const closed = c.props.closed ?? spec.defaultClosed;
          stampConductance(a, b, closed ? 1 / CLOSED_R : OPEN);
          break;
        }
        case 'buzzer':
        case 'bulb': {
          stampConductance(a, b, 1 / spec.r);
          break;
        }
      }
    });

    const solved = solveLinear(G, I);
    if (!solved) break;
    voltages = solved;

    // Re-evaluate LED states; stop when stable
    let changed = false;
    simComponents.forEach((c, idx) => {
      const spec = SIM_SPECS[c.modelId];
      if (spec.kind !== 'led') return;
      const vAB = voltages[nets[idx].a] - voltages[nets[idx].b];
      const shouldBeOn = vAB >= spec.vf - 1e-6;
      if (shouldBeOn !== ledOn.get(c.id)) {
        ledOn.set(c.id, shouldBeOn);
        changed = true;
      }
    });
    if (!changed) break;
  }

  // ---------- extract per-element results ----------
  simComponents.forEach((c, idx) => {
    const spec = SIM_SPECS[c.modelId];
    const vA = voltages[nets[idx].a];
    const vB = voltages[nets[idx].b];
    const vAB = vA - vB;

    let current = 0;
    let on = false;
    let brightness = 0;
    let warning: string | undefined;

    switch (spec.kind) {
      case 'battery': {
        // internal branch: EMF from b to a with internalR
        current = (spec.voltage - vAB) / spec.internalR;
        if (Math.abs(current) > 1.5) {
          warning = 'Short circuit! The battery is overloaded.';
        }
        break;
      }
      case 'resistor': {
        const r = Math.max(c.props.resistance ?? spec.defaultR, 0.01);
        current = vAB / r;
        break;
      }
      case 'led': {
        if (ledOn.get(c.id)) {
          current = (vAB - spec.vf) / spec.seriesR;
          if (current > 1e-5) {
            on = true;
            brightness = Math.min(current / 0.02, 1);
            if (current > 0.03) {
              warning = 'LED overcurrent - add a series resistor!';
            }
          }
        } else if (vAB < -3) {
          warning = 'LED is reverse-biased - flip it around.';
        }
        break;
      }
      case 'switch': {
        const closed = c.props.closed ?? spec.defaultClosed;
        current = closed ? vAB / CLOSED_R : 0;
        on = closed;
        break;
      }
      case 'buzzer': {
        current = vAB / spec.r;
        on = Math.abs(current) >= spec.minCurrent;
        brightness = on ? 1 : 0;
        break;
      }
      case 'bulb': {
        current = vAB / spec.r;
        const power = vAB * current;
        on = power > 0.02;
        brightness = Math.min(power / 0.5, 1);
        break;
      }
    }

    if (warning) warnings.push(warning);
    perComponent[c.id] = { current, voltage: vAB, on, brightness, warning };
  });

  return { perComponent, warnings };
}
