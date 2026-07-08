import type { MouseEvent } from 'react';

import { useFavorites } from '../hooks/useLibrary';
import type { Book } from '../lib/types';
import styles from './FavoriteButton.module.scss';

type FavoriteButtonProps = {
  book: Book;
  /** Adds a solid background — useful when overlaid on a cover image. */
  overlay?: boolean;
};

/** Heart toggle for favoriting a book. Safe to place inside a link. */
function FavoriteButton({ book, overlay = false }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(book.id);

  const handleClick = (event: MouseEvent) => {
    // Prevent navigating when the button sits inside a card link.
    event.preventDefault();
    event.stopPropagation();
    toggleFavorite(book);
  };

  return (
    <button
      type="button"
      className={`${styles.button} ${overlay ? styles.overlay : ''} ${
        active ? styles.active : ''
      }`}
      onClick={handleClick}
      aria-pressed={active}
      aria-label={active ? 'Remove from favorites' : 'Add to favorites'}
      title={active ? 'Remove from favorites' : 'Add to favorites'}
    >
      {active ? '❤️' : '🤍'}
    </button>
  );
}

export default FavoriteButton;
