import type { UniversityColours } from '../types/university';

type RGB = [number, number, number];

export function hexToRgb(hex: string): RGB {
  let h = hex.replace('#', '').trim();
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  const n = parseInt(h.slice(0, 6), 16);
  if (Number.isNaN(n)) return [0, 0, 0];
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export function rgbToHex([r, g, b]: RGB): string {
  return '#' + [r, g, b].map((v) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, '0')).join('');
}

export function isValidHex(v: string | undefined): v is string {
  return !!v && /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.test(v.trim());
}

export function normalizeHex(v: string): string {
  const h = v.trim().startsWith('#') ? v.trim() : `#${v.trim()}`;
  return rgbToHex(hexToRgb(h));
}

/** Linear blend: t=0 → a, t=1 → b */
export function mix(a: string, b: string, t: number): string {
  const A = hexToRgb(a);
  const B = hexToRgb(b);
  return rgbToHex([A[0] + (B[0] - A[0]) * t, A[1] + (B[1] - A[1]) * t, A[2] + (B[2] - A[2]) * t]);
}

function luminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex).map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrast(a: string, b: string): number {
  const la = luminance(a);
  const lb = luminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

/** Best readable text colour on top of `bg`. */
export function onColor(bg: string, dark = '#111827', light = '#ffffff'): string {
  return contrast(bg, light) >= contrast(bg, dark) ? light : dark;
}

/** Darken a colour until it reaches the requested contrast against `bg`. */
export function ensureContrast(fg: string, bg: string, target = 4.5): string {
  let c = fg;
  for (let i = 0; i < 20 && contrast(c, bg) < target; i++) c = mix(c, '#000000', 0.12);
  return c;
}

export function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return rgbToHex([f(0) * 255, f(8) * 255, f(4) * 255]);
}

const rgbStr = (hex: string) => hexToRgb(hex).join(' ');

export interface ThemeTokens {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  muted: string;
  border: string;
  onPrimary: string;
  /** A decorative colour guaranteed to be visible on light surfaces. */
  highlight: string;
  onHighlight: string;
  /** Primary-derived colour safe for text on the background. */
  ink: string;
  /** Very light primary tint for chips and hover states. */
  soft: string;
}

export function buildTokens(c: UniversityColours): ThemeTokens {
  const surface = '#ffffff';
  // White/near-white secondaries disappear on light UI, so fall back to accent for decoration.
  const highlight = contrast(c.secondary, '#ffffff') >= 1.6 ? c.secondary : c.accent;
  return {
    primary: c.primary,
    secondary: c.secondary,
    accent: c.accent,
    background: c.background,
    surface,
    text: c.text,
    muted: ensureContrast(mix(c.text, c.background, 0.42), c.background, 4.6),
    border: mix(c.primary, '#e5e7eb', 0.86),
    onPrimary: onColor(c.primary),
    highlight,
    onHighlight: onColor(highlight),
    ink: ensureContrast(c.primary, c.background, 4.6),
    soft: mix(c.primary, '#ffffff', 0.92),
  };
}

const NAME_MAP: Record<keyof ThemeTokens, string> = {
  primary: 'primary',
  secondary: 'secondary',
  accent: 'accent',
  background: 'background',
  surface: 'surface',
  text: 'text',
  muted: 'muted',
  border: 'border',
  onPrimary: 'on-primary',
  highlight: 'highlight',
  onHighlight: 'on-highlight',
  ink: 'ink',
  soft: 'soft',
};

/** Returns CSS custom properties: `--university-*` (hex) and `--uni-*-rgb` (for Tailwind alpha). */
export function tokensToCssVars(t: ThemeTokens): Record<string, string> {
  const vars: Record<string, string> = {};
  (Object.keys(NAME_MAP) as (keyof ThemeTokens)[]).forEach((k) => {
    vars[`--university-${NAME_MAP[k]}`] = t[k];
    vars[`--uni-${NAME_MAP[k]}-rgb`] = rgbStr(t[k]);
  });
  return vars;
}

export function applyTheme(colours: UniversityColours, el: HTMLElement = document.documentElement) {
  const vars = tokensToCssVars(buildTokens(colours));
  Object.entries(vars).forEach(([k, v]) => el.style.setProperty(k, v));
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', colours.primary);
}

/** Neutral CampusVerse brand palette used before a university is chosen. */
export const BRAND_COLOURS: UniversityColours = {
  primary: '#4338CA',
  secondary: '#F0ABFC',
  accent: '#C026D3',
  background: '#F7F7FB',
  text: '#16142B',
};
