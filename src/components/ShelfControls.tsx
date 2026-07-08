import { SHELF_LABELS, SHELF_ORDER } from '../lib/constants';
import { useShelf } from '../hooks/useLibrary';
import type { Book } from '../lib/types';
import styles from './ShelfControls.module.scss';

type ShelfControlsProps = {
  book: Book;
};

/** Buttons to add/move a book across shelves, or remove it. */
function ShelfControls({ book }: ShelfControlsProps) {
  const { getShelfStatus, addToShelf, removeFromShelf } = useShelf();
  const current = getShelfStatus(book.id);

  return (
    <div className={styles.controls}>
      <div className={styles.buttons}>
        {SHELF_ORDER.map((status) => {
          const isActive = current === status;
          return (
            <button
              key={status}
              type="button"
              className={`${styles.button} ${isActive ? styles.active : ''}`}
              onClick={() => addToShelf(book, status)}
              aria-pressed={isActive}
            >
              {SHELF_LABELS[status]}
            </button>
          );
        })}
      </div>

      {current && (
        <button
          type="button"
          className={styles.remove}
          onClick={() => removeFromShelf(book.id)}
        >
          Remove from shelf
        </button>
      )}
    </div>
  );
}

export default ShelfControls;
