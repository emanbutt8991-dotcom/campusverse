const PREFIX = 'campusverse:';

export const storageKeys = {
  selected: `${PREFIX}selected-university`,
  custom: `${PREFIX}custom-university`,
  demo: (universityId: string) => `${PREFIX}demo:${universityId}`,
};

export function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeJSON(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable (private mode) — app keeps working in memory */
  }
}

export function removeKey(key: string) {
  try {
    localStorage.removeItem(key);
  } catch {
    /* ignore */
  }
}

/** Remove every demo interaction key for every university. */
export function clearAllDemoState() {
  try {
    Object.keys(localStorage)
      .filter((k) => k.startsWith(`${PREFIX}demo:`))
      .forEach((k) => localStorage.removeItem(k));
  } catch {
    /* ignore */
  }
}
