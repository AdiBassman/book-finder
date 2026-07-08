import { SHELF_LABELS, SHELF_ORDER } from '../lib/constants';
import type { ShelfStatus } from '../lib/types';
import styles from './ShelfTabs.module.scss';

type ShelfTabsProps = {
  active: ShelfStatus;
  onChange: (status: ShelfStatus) => void;
  counts: Record<ShelfStatus, number>;
};

/** Tab switcher for the three shelves, showing a count per shelf. */
function ShelfTabs({ active, onChange, counts }: ShelfTabsProps) {
  return (
    <div className={styles.tabs} role="tablist">
      {SHELF_ORDER.map((status) => (
        <button
          key={status}
          type="button"
          role="tab"
          aria-selected={active === status}
          className={`${styles.tab} ${active === status ? styles.active : ''}`}
          onClick={() => onChange(status)}
        >
          {SHELF_LABELS[status]} <span className={styles.count}>{counts[status]}</span>
        </button>
      ))}
    </div>
  );
}

export default ShelfTabs;
