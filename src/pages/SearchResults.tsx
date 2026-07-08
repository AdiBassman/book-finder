import { useSearchParams } from 'react-router-dom';

import SearchBar from '../components/SearchBar';
import BookCard from '../components/BookCard';
import { useBookSearch } from '../hooks/useBookSearch';
import styles from './SearchResults.module.scss';

/** Search page: reads `?q=` from the URL and shows a grid of results. */
function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') ?? '';

  const { books, loading, error } = useBookSearch(query);

  const handleSearch = (next: string) => {
    setSearchParams({ q: next });
  };

  return (
    <div>
      <div className={styles.searchRow}>
        <SearchBar initialValue={query} onSubmit={handleSearch} autoFocus />
      </div>

      {!query && (
        <p className={styles.state}>Search for a book to get started.</p>
      )}

      {query && loading && <p className={styles.state}>Searching…</p>}

      {query && error && (
        <p className={styles.state}>
          Something went wrong. Please try again in a moment.
        </p>
      )}

      {query && !loading && !error && books.length === 0 && (
        <p className={styles.state}>No results for “{query}”.</p>
      )}

      {query && !loading && !error && books.length > 0 && (
        <>
          <p className={styles.count}>
            {books.length} result{books.length === 1 ? '' : 's'} for “{query}”
          </p>
          <div className={styles.grid}>
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default SearchResults;
