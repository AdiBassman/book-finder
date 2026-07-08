// Small response cache to cut down on API calls. Identical requests within the
// TTL are served from memory / sessionStorage instead of hitting the network.
// This softens rate-limit (429) and transient (503) issues, especially for the
// home page's repeated curated-row requests.

const MEMORY = new Map<string, unknown>();
const PREFIX = 'booknook-cache:';
const DEFAULT_TTL = 60 * 60 * 1000; // 1 hour

type CacheRecord = { ts: number; data: unknown };

/** Build a stable cache key from a URL, ignoring the API key param. */
function cacheKeyFor(url: string): string {
  try {
    const parsed = new URL(url);
    parsed.searchParams.delete('key');
    return PREFIX + parsed.pathname + '?' + parsed.searchParams.toString();
  } catch {
    return PREFIX + url;
  }
}

function readSession(key: string, ttl: number): unknown | undefined {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return undefined;
    const record = JSON.parse(raw) as CacheRecord;
    if (Date.now() - record.ts > ttl) {
      sessionStorage.removeItem(key);
      return undefined;
    }
    return record.data;
  } catch {
    return undefined;
  }
}

function writeSession(key: string, data: unknown): void {
  try {
    const record: CacheRecord = { ts: Date.now(), data };
    sessionStorage.setItem(key, JSON.stringify(record));
  } catch {
    // Storage full or unavailable — caching is best-effort, so ignore.
  }
}

/**
 * Fetch JSON with caching. Returns cached data when available and fresh;
 * otherwise fetches, caches, and returns. Throws on a non-OK response.
 */
export async function cachedFetchJson<T>(
  url: string,
  ttl: number = DEFAULT_TTL,
): Promise<T> {
  const key = cacheKeyFor(url);

  if (MEMORY.has(key)) return MEMORY.get(key) as T;

  const stored = readSession(key, ttl);
  if (stored !== undefined) {
    MEMORY.set(key, stored);
    return stored as T;
  }

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Request failed (status ${res.status})`);
  }

  const data = (await res.json()) as T;
  MEMORY.set(key, data);
  writeSession(key, data);
  return data;
}
