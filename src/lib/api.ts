import { API_BASE, API_KEY, DEFAULT_MAX_RESULTS } from './constants';
import type {
  Book,
  RawVolume,
  RawVolumeListResponse,
  SortOption,
} from './types';

/**
 * Convert a raw Google Books volume into our clean `Book` type.
 * All optional fields are guarded so the UI never crashes on missing data.
 */
export function normalizeBook(raw: RawVolume): Book {
  const info = raw.volumeInfo ?? {};

  // Google often returns http image URLs; upgrade to https to avoid
  // mixed-content warnings when the app is served over https.
  const thumbnail = info.imageLinks?.thumbnail?.replace(/^http:/, 'https:');

  return {
    id: raw.id,
    title: info.title ?? 'Untitled',
    authors: info.authors ?? [],
    thumbnail,
    description: info.description,
    publishedDate: info.publishedDate,
    pageCount: info.pageCount,
    categories: info.categories ?? [],
    averageRating: info.averageRating,
    publisher: info.publisher,
    previewLink: info.previewLink,
  };
}

export type SearchOptions = {
  /** Sort order. Only 'relevance' and 'newest' are supported server-side;
   *  'title' is applied client-side by the caller. */
  sort?: SortOption;
  maxResults?: number;
};

/** Search the Google Books catalog and return normalized books. */
export async function searchBooks(
  query: string,
  { sort = 'relevance', maxResults = DEFAULT_MAX_RESULTS }: SearchOptions = {},
): Promise<Book[]> {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const params = new URLSearchParams({
    q: trimmed,
    maxResults: String(maxResults),
    // The API understands 'newest' and 'relevance' for orderBy.
    orderBy: sort === 'newest' ? 'newest' : 'relevance',
  });
  if (API_KEY) params.set('key', API_KEY);

  const res = await fetch(`${API_BASE}/volumes?${params.toString()}`);
  if (!res.ok) {
    throw new Error(`Failed to search books (status ${res.status})`);
  }

  const data: RawVolumeListResponse = await res.json();
  return (data.items ?? []).map(normalizeBook);
}

/** Fetch a single book by its Google Books volume id. */
export async function getBook(id: string): Promise<Book> {
  const url = new URL(`${API_BASE}/volumes/${encodeURIComponent(id)}`);
  if (API_KEY) url.searchParams.set('key', API_KEY);

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to load book (status ${res.status})`);
  }

  const raw: RawVolume = await res.json();
  return normalizeBook(raw);
}
