import type { Book, ShelfEntry, ShelfStatus } from './types';

export type RankedItem = { name: string; count: number };

export type LibraryStats = {
  total: number;
  byStatus: Record<ShelfStatus, number>;
  favorites: number;
  topAuthors: RankedItem[];
  topCategories: RankedItem[];
};

/** Tally a list of strings and return the top N by count (ties: A–Z). */
function topN(values: string[], n: number): RankedItem[] {
  const counts = new Map<string, number>();
  for (const value of values) {
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }

  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
    .slice(0, n);
}

/**
 * Aggregate shelf and favorite data into display-ready stats:
 * per-shelf counts, favorites count, and top authors/categories.
 */
export function computeStats(
  shelf: ShelfEntry[],
  favorites: Book[],
  topCount = 5,
): LibraryStats {
  const byStatus: Record<ShelfStatus, number> = {
    want: 0,
    reading: 0,
    read: 0,
  };

  const authors: string[] = [];
  const categories: string[] = [];

  for (const entry of shelf) {
    byStatus[entry.status] += 1;
    authors.push(...entry.book.authors);
    categories.push(...entry.book.categories);
  }

  return {
    total: shelf.length,
    byStatus,
    favorites: favorites.length,
    topAuthors: topN(authors, topCount),
    topCategories: topN(categories, topCount),
  };
}
