import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import ShelfTabs from '../components/ShelfTabs';
import BookCard from '../components/BookCard';
import ShelfControls from '../components/ShelfControls';
import { useShelf } from '../hooks/useLibrary';
import { SHELF_LABELS } from '../lib/constants';
import type { ShelfStatus } from '../lib/types';
import styles from './MyShelf.module.scss';

/** The user's reading shelves, split into Want / Reading / Read tabs. */
function MyShelf() {
  const { shelf } = useShelf();
  const [active, setActive] = useState<ShelfStatus>('want');

  const counts = useMemo(
    () => ({
      want: shelf.filter((e) => e.status === 'want').length,
      reading: shelf.filter((e) => e.status === 'reading').length,
      read: shelf.filter((e) => e.status === 'read').length,
    }),
    [shelf],
  );

  const entries = useMemo(
    () => shelf.filter((entry) => entry.status === active),
    [shelf, active],
  );

  return (
    <div>
      <h1 className={styles.heading}>My Shelf</h1>

      <ShelfTabs active={active} onChange={setActive} counts={counts} />

      {entries.length === 0 ? (
        <div className={styles.empty}>
          <p>Nothing in “{SHELF_LABELS[active]}” yet.</p>
          <Link to="/search">Find books to add →</Link>
        </div>
      ) : (
        <div className={styles.grid}>
          {entries.map((entry) => (
            <div key={entry.book.id} className={styles.item}>
              <BookCard book={entry.book} />
              <ShelfControls book={entry.book} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyShelf;
