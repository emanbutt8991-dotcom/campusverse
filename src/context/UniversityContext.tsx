import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { CustomUniversityInput, UniversityConfig } from '../types/university';
import { getUniversityById } from '../config/universities';
import { applyTheme, BRAND_COLOURS, isValidHex, normalizeHex, mix } from '../config/themeTokens';
import { generateCustomUniversity } from '../utils/generateCustomUniversity';
import { readJSON, removeKey, storageKeys, writeJSON } from '../utils/storage';

interface UniversityContextValue {
  university: UniversityConfig | null;
  customUniversity: UniversityConfig | null;
  selectUniversity: (u: UniversityConfig) => void;
  saveCustomUniversity: (input: CustomUniversityInput) => UniversityConfig;
  updateCustomColours: (primary: string, secondary: string) => void;
  clearSelection: () => void;
}

export const UniversityContext = createContext<UniversityContextValue | null>(null);

function loadInitial(): { selected: UniversityConfig | null; custom: UniversityConfig | null } {
  const custom = readJSON<UniversityConfig | null>(storageKeys.custom, null);
  const id = readJSON<string | null>(storageKeys.selected, null);
  if (!id) return { selected: null, custom };
  if (custom && id === custom.id) return { selected: custom, custom };
  return { selected: getUniversityById(id) ?? null, custom };
}

export function UniversityProvider({ children }: { children: ReactNode }) {
  const [{ selected, custom }, setState] = useState(loadInitial);

  useEffect(() => {
    applyTheme(selected?.colours ?? BRAND_COLOURS);
    document.title = selected ? `CampusVerse · ${selected.shortName}` : 'CampusVerse — Your campus. Your people. Your universe.';
  }, [selected]);

  const selectUniversity = useCallback((u: UniversityConfig) => {
    writeJSON(storageKeys.selected, u.id);
    if (u.isCustom) writeJSON(storageKeys.custom, u);
    setState((s) => ({ selected: u, custom: u.isCustom ? u : s.custom }));
  }, []);

  const saveCustomUniversity = useCallback((input: CustomUniversityInput) => {
    const u = generateCustomUniversity(input);
    writeJSON(storageKeys.custom, u);
    setState((s) => ({ ...s, custom: u }));
    return u;
  }, []);

  const updateCustomColours = useCallback((primary: string, secondary: string) => {
    setState((s) => {
      if (!s.custom || !isValidHex(primary) || !isValidHex(secondary)) return s;
      const p = normalizeHex(primary);
      const sec = normalizeHex(secondary);
      const updated: UniversityConfig = {
        ...s.custom,
        colours: { ...s.custom.colours, primary: p, secondary: sec, accent: mix(p, sec, 0.45), background: mix(p, '#ffffff', 0.965), text: mix(p, '#0b0b12', 0.85) },
      };
      writeJSON(storageKeys.custom, updated);
      return { custom: updated, selected: s.selected?.id === updated.id ? updated : s.selected };
    });
  }, []);

  const clearSelection = useCallback(() => {
    removeKey(storageKeys.selected);
    setState((s) => ({ ...s, selected: null }));
  }, []);

  const value = useMemo(
    () => ({ university: selected, customUniversity: custom, selectUniversity, saveCustomUniversity, updateCustomColours, clearSelection }),
    [selected, custom, selectUniversity, saveCustomUniversity, updateCustomColours, clearSelection],
  );

  return <UniversityContext.Provider value={value}>{children}</UniversityContext.Provider>;
}
