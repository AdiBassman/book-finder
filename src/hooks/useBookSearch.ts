import { useEffect, useState } from 'react';

import { searchBooks } from '../lib/api';
import type { Book, SortOption } from '../lib/types';

type UseBookSearchResult = {
  books: Book[];
  loading: boolean;
  error: boolean;
};

/**
 * Fetch books for a query. Re-runs when the query or sort changes and
 * ignores stale responses if the inputs change mid-flight.
 */
export function useBookSearch(
  query: string,
  sort: SortOption = 'relevance',
): UseBookSearchResult {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!query) {
      setBooks([]);
      setLoading(false);
      setError(false);
      return;
    }

    let active = true;
    setLoading(true);
    setError(false);

    searchBooks(query, { sort })
      .then((results) => {
        if (active) setBooks(results);
      })
      .catch(() => {
        if (active) setError(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [query, sort]);

  return { books, loading, error };
}
