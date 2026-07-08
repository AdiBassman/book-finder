import { Link } from 'react-router-dom';

import { COVER_PLACEHOLDER } from '../lib/constants';
import type { Book } from '../lib/types';
import styles from './BookCard.module.scss';

type BookCardProps = {
  book: Book;
};

/** Compact book cover + title card that links to the book detail page. */
function BookCard({ book }: BookCardProps) {
  const authors = book.authors.length ? book.authors.join(', ') : 'Unknown author';

  return (
    <Link to={`/book/${book.id}`} className={styles.card}>
      <div className={styles.coverWrap}>
        <img
          className={styles.cover}
          src={book.thumbnail || COVER_PLACEHOLDER}
          alt={`Cover of ${book.title}`}
          loading="lazy"
        />
      </div>
      <div className={styles.body}>
        <h3 className={styles.title} title={book.title}>
          {book.title}
        </h3>
        <p className={styles.authors} title={authors}>
          {authors}
        </p>
      </div>
    </Link>
  );
}

export default BookCard;
