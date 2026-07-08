import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import BookCard from '../components/BookCard';
import { useDebounce } from '../hooks/useDebounce';
import { useBookSearch } from '../hooks/useBookSearch';
import type { Book, SortOption } from '../lib/types';
import styles from './SearchResults.module.scss';

/** Build the Google Books query from the free-text input and category. */
function buildQuery(text: string, category: string): string {
  const parts: string[] = [];
  if (text.trim()) parts.push(text.trim());
  if (category) parts.push(`subject:${category}`);
  return parts.join(' ');
}

/** Search page: live (debounced) search with category filter and sorting. */
function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [input, setInput] = useState(searchParams.get('q') ?? '');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState<SortOption>('relevance');

  const debouncedInput = useDebounce(input, 400);

  // Keep the URL's ?q= in sync with the debounced text so results are shareable.
  useEffect(() => {
    setSearchParams(debouncedInput ? { q: debouncedInput } : {}, {
      replace: true,
    });
  }, [debouncedInput, setSearchParams]);

  const query = buildQuery(debouncedInput, category);
  const { books, loading, error } = useBookSearch(query, sort);

  // 'relevance' and 'newest' are handled by the API; 'title' is sorted here.
  const displayBooks = useMemo<Book[]>(() => {
    if (sort !== 'title') return books;
    return [...books].sort((a, b) => a.title.localeCompare(b.title));
  }, [books, sort]);

  const hasQuery = query.length > 0;

  return (
    <div>
      <div className={styles.searchRow}>
        <SearchBar value={input} onChange={setInput} autoFocus />
      </div>

      <FilterBar
        category={category}
        onCategoryChange={setCategory}
        sort={sort}
        onSortChange={setSort}
      />

      {!hasQuery && (
        <p className={styles.state}>Search for a book to get started.</p>
      )}

      {hasQuery && loading && <p className={styles.state}>Searching…</p>}

      {hasQuery && error && (
        <p className={styles.state}>
          Something went wrong. Please try again in a moment.
        </p>
      )}

      {hasQuery && !loading && !error && displayBooks.length === 0 && (
        <p className={styles.state}>No results found.</p>
      )}

      {hasQuery && !loading && !error && displayBooks.length > 0 && (
        <>
          <p className={styles.count}>
            {displayBooks.length} result{displayBooks.length === 1 ? '' : 's'}
          </p>
          <div className={styles.grid}>
            {displayBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default SearchResults;
