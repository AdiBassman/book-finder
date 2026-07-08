import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { getBook } from '../lib/api';
import { COVER_PLACEHOLDER } from '../lib/constants';
import type { Book } from '../lib/types';
import ShelfControls from '../components/ShelfControls';
import FavoriteButton from '../components/FavoriteButton';
import styles from './BookDetail.module.scss';

/** Strip the light HTML Google includes in descriptions down to plain text. */
function toPlainText(html?: string): string {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').trim();
}

/** Full details for a single book, loaded by its id from the URL. */
function BookDetail() {
  const { id } = useParams<{ id: string }>();

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;

    let active = true;
    setLoading(true);
    setError(false);

    getBook(id)
      .then((result) => {
        if (active) setBook(result);
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
  }, [id]);

  if (loading) return <p className={styles.state}>Loading book…</p>;

  if (error || !book) {
    return (
      <div className={styles.state}>
        <p>We couldn't load this book.</p>
        <Link to="/search">← Back to search</Link>
      </div>
    );
  }

  const authors = book.authors.length ? book.authors.join(', ') : 'Unknown author';
  const description = toPlainText(book.description);

  return (
    <article className={styles.detail}>
      <div className={styles.coverCol}>
        <img
          className={styles.cover}
          src={book.thumbnail || COVER_PLACEHOLDER}
          alt={`Cover of ${book.title}`}
        />
        {book.previewLink && (
          <a
            className={styles.preview}
            href={book.previewLink}
            target="_blank"
            rel="noreferrer"
          >
            Preview on Google Books ↗
          </a>
        )}
      </div>

      <div className={styles.info}>
        <h1 className={styles.title}>{book.title}</h1>
        <p className={styles.authors}>{authors}</p>

        <div className={styles.actions}>
          <FavoriteButton book={book} />
          <span className={styles.actionsLabel}>Add to favorites</span>
        </div>

        <ShelfControls book={book} />

        <ul className={styles.meta}>
          {book.publisher && (
            <li>
              <span>Publisher</span> {book.publisher}
            </li>
          )}
          {book.publishedDate && (
            <li>
              <span>Published</span> {book.publishedDate}
            </li>
          )}
          {book.pageCount ? (
            <li>
              <span>Pages</span> {book.pageCount}
            </li>
          ) : null}
          {book.averageRating ? (
            <li>
              <span>Rating</span> {book.averageRating} / 5
            </li>
          ) : null}
        </ul>

        {book.categories.length > 0 && (
          <div className={styles.tags}>
            {book.categories.map((category) => (
              <span key={category} className={styles.tag}>
                {category}
              </span>
            ))}
          </div>
        )}

        {description ? (
          <p className={styles.description}>{description}</p>
        ) : (
          <p className={styles.description}>No description available.</p>
        )}
      </div>
    </article>
  );
}

export default BookDetail;
