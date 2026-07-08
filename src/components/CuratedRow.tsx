import { useEffect, useState } from 'react';

import { searchBooks } from '../lib/api';
import type { Book } from '../lib/types';
import BookCard from './BookCard';
import styles from './CuratedRow.module.scss';

type CuratedRowProps = {
  /** Category name, e.g. "Fiction". Used both as the heading and the query. */
  category: string;
};

/** A horizontally scrolling row of books for a single category. */
function CuratedRow({ category }: CuratedRowProps) {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(false);

    searchBooks(`subject:${category}`, { maxResults: 12 })
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
  }, [category]);

  return (
    <section className={styles.row}>
      <h2 className={styles.heading}>{category}</h2>

      {loading && <p className={styles.state}>Loading {category} books…</p>}
      {error && (
        <p className={styles.state}>Couldn't load {category} books right now.</p>
      )}
      {!loading && !error && books.length === 0 && (
        <p className={styles.state}>No books found.</p>
      )}

      {!loading && !error && books.length > 0 && (
        <div className={styles.track}>
          {books.map((book) => (
            <div key={book.id} className={styles.item}>
              <BookCard book={book} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default CuratedRow;
