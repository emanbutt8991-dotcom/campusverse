import type { CustomUniversityInput, UniversityConfig, UniversityColours } from '../types/university';
import { hashString } from './seed';
import { contrast, hslToHex, isValidHex, mix, normalizeHex, ensureContrast } from '../config/themeTokens';

export function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48);
}

const STOP = new Set(['of', 'the', 'and', 'de', 'du', 'la', 'le', 'at', 'in', 'for']);

export function makeMonogram(name: string) {
  const words = name.split(/\s+/).filter((w) => w && !STOP.has(w.toLowerCase()));
  const letters = words.map((w) => w[0].toUpperCase()).join('');
  return (letters || name.slice(0, 2).toUpperCase()).slice(0, 3);
}

export function makeShortName(name: string) {
  const stripped = name
    .replace(/^the\s+/i, '')
    .replace(/^university of\s+/i, '')
    .replace(/\s+university$/i, '')
    .replace(/^université (de |du |d')?/i, '')
    .trim();
  return stripped.length > 0 && stripped.length <= 18 ? stripped : makeMonogram(name);
}

/** Deterministic, accessible palette derived from the university name. */
export function derivePalette(name: string, primary?: string, secondary?: string): UniversityColours {
  const h = hashString(name.toLowerCase().trim()) % 360;
  let p = isValidHex(primary) ? normalizeHex(primary) : hslToHex(h, 58, 30);
  const s = isValidHex(secondary) ? normalizeHex(secondary) : hslToHex((h + 42) % 360, 82, 58);
  // Make sure the primary works as a heading/button colour on a light page.
  // Generated primaries always support white text (WCAG AA); user-picked ones are only nudged to 3:1.
  const target = isValidHex(primary) ? 3 : 4.6;
  if (contrast(p, '#ffffff') < target) p = ensureContrast(p, '#ffffff', target);
  return {
    primary: p,
    secondary: s,
    accent: mix(p, s, 0.45),
    background: mix(p, '#ffffff', 0.965),
    text: mix(p, '#0b0b12', 0.85),
  };
}

export function generateCustomUniversity(input: CustomUniversityInput): UniversityConfig {
  const name = input.name.trim();
  const city = input.city.trim();
  const shortName = makeShortName(name);
  return {
    id: `custom-${slugify(name)}`,
    name,
    shortName,
    monogram: makeMonogram(name),
    city,
    province: input.province?.trim() || '',
    country: input.country?.trim() || 'Canada',
    colours: derivePalette(name, input.primary, input.secondary),
    campusStyle: 'generic',
    mascot: 'monogram',
    athleticIdentity: `${shortName} Community`,
    welcomeMessage: `Welcome to the ${shortName} community!`,
    campusLocations: [
      `${shortName} Student Centre`,
      'Main Campus Library',
      'Campus Commons',
      'Science Building Atrium',
      `Downtown ${city}`,
      `${city} Transit Terminal`,
    ],
    sampleCourses: ['CS 101', 'MATH 110', 'BIO 120', 'ENG 105'],
    advertisementTheme: `Sample ${city} student offers`,
    campusDescription: `Your ${name} community in ${city}. Content shown is sample data generated for this prototype.`,
    vibe: 'Custom theme',
    isCustom: true,
  };
}
