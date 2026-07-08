import { CATEGORIES, SORT_OPTIONS } from '../lib/constants';
import type { SortOption } from '../lib/types';
import styles from './FilterBar.module.scss';

type FilterBarProps = {
  category: string;
  onCategoryChange: (category: string) => void;
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
};

/** Category filter + sort controls for the search page. */
function FilterBar({
  category,
  onCategoryChange,
  sort,
  onSortChange,
}: FilterBarProps) {
  return (
    <div className={styles.bar}>
      <label className={styles.field}>
        <span className={styles.label}>Category</span>
        <select
          className={styles.select}
          value={category}
          onChange={(event) => onCategoryChange(event.target.value)}
        >
          <option value="">All categories</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </label>

      <label className={styles.field}>
        <span className={styles.label}>Sort by</span>
        <select
          className={styles.select}
          value={sort}
          onChange={(event) => onSortChange(event.target.value as SortOption)}
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default FilterBar;
