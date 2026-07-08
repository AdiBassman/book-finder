import type { ShelfStatus, SortOption } from './types';

/** Base URL for the Google Books API (public, no key required). */
export const API_BASE = 'https://www.googleapis.com/books/v1';

/**
 * Optional Google Books API key. Not required for basic search, but a key
 * gives a private per-key daily quota (helpful on shared networks where the
 * anonymous quota may already be used up). Set it in a `.env` file as
 * `VITE_GOOGLE_BOOKS_KEY=...`. Empty string when unset.
 */
export const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_KEY ?? '';

/** Default number of results to request per search. */
export const DEFAULT_MAX_RESULTS = 24;

/** Categories offered in the search filter and home page rows. */
export const CATEGORIES = [
  'Fiction',
  'Science',
  'History',
  'Technology',
  'Fantasy',
  'Biography',
  'Business',
  'Cooking',
] as const;

/** Sort options shown in the search UI, with human-readable labels. */
export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'newest', label: 'Newest' },
  { value: 'title', label: 'Title (A–Z)' },
];

/** Human-readable labels for each shelf status. */
export const SHELF_LABELS: Record<ShelfStatus, string> = {
  want: 'Want to Read',
  reading: 'Reading',
  read: 'Read',
};

/** Order shelves are displayed in (also the natural reading progression). */
export const SHELF_ORDER: ShelfStatus[] = ['want', 'reading', 'read'];

/** Placeholder shown when a book has no cover image. */
export const COVER_PLACEHOLDER = '/book.svg';
