// Thin, typed wrapper around LocalStorage. All persistence goes through here
// so reads/writes are consistent and JSON errors never crash the app.

/** Read and parse a value, returning `fallback` if missing or invalid. */
export function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

/** Serialize and store a value. Silently ignores storage errors. */
export function writeJSON<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage full or unavailable — nothing we can do, so ignore.
  }
}

/** LocalStorage keys used by the app. */
export const STORAGE_KEYS = {
  shelf: 'booknook-shelf',
  favorites: 'booknook-favorites',
} as const;
