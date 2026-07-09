// Shared color palette for the in-VR uikit panels, mirroring the 2D learn
// page's dark (bg-blue-950/30) and light (bg-white/50) card styling.

export interface VRColors {
  panelBg: string;
  panelOpacity: number;
  panelBorder: string;
  text: string;
  textMuted: string;
  accent: string;
  rowHoverBg: string;
  selectedBg: string;
  selectedText: string;
  tipText: string;
  warnText: string;
  divider: string;
}

// The uikit MSDF font has a narrow charset — characters like − ± × and emoji
// render as boxes ("Missing glyph" warnings). The guide/part-info/trivia
// strings are shared with the 2D page, so map or strip them here instead of
// editing the content.
const CHAR_MAP: Record<string, string> = {
  '−': '-', // minus sign
  '–': '-', // en dash
  '—': '-', // em dash
  '±': '+/-',
  '×': 'x',
  '÷': '/',
  '…': '...',
  '‘': "'",
  '’': "'",
  '“': '"',
  '”': '"',
  'Ω': ' ohm',
  'µ': 'u',
  'μ': 'u',
  '°': ' deg',
};

export function sanitizeVRText(text: string): string {
  return text
    .replace(/[−–—±×÷…‘’“”Ωµμ°]/g, (ch) => CHAR_MAP[ch] ?? '')
    .replace(/[\u{1F000}-\u{1FFFF}\u{2190}-\u{2BFF}\u{FE0F}\u{200D}]/gu, '')
    .trim();
}

export function getVRColors(isDark: boolean): VRColors {
  if (isDark) {
    return {
      panelBg: '#0b1220',
      panelOpacity: 0.92,
      panelBorder: '#1e3a8a',
      text: '#e5e7eb',
      textMuted: '#94a3b8',
      accent: '#60a5fa',
      rowHoverBg: '#1e293b',
      selectedBg: '#1d4ed8',
      selectedText: '#ffffff',
      tipText: '#4ade80',
      warnText: '#facc15',
      divider: '#1e3a8a',
    };
  }
  return {
    panelBg: '#ffffff',
    panelOpacity: 0.95,
    panelBorder: '#bfdbfe',
    text: '#111827',
    textMuted: '#6b7280',
    accent: '#2563eb',
    rowHoverBg: '#eff6ff',
    selectedBg: '#dbeafe',
    selectedText: '#1e3a8a',
    tipText: '#16a34a',
    warnText: '#b45309',
    divider: '#bfdbfe',
  };
}
