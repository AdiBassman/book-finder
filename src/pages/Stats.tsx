import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { useLibrary } from '../hooks/useLibrary';
import { computeStats, type RankedItem } from '../lib/stats';
import { SHELF_LABELS } from '../lib/constants';
import styles from './Stats.module.scss';

function RankList({ title, items }: { title: string; items: RankedItem[] }) {
  return (
    <div className={styles.rankCard}>
      <h2 className={styles.rankTitle}>{title}</h2>
      {items.length === 0 ? (
        <p className={styles.muted}>No data yet.</p>
      ) : (
        <ol className={styles.rankList}>
          {items.map((item) => (
            <li key={item.name}>
              <span className={styles.rankName}>{item.name}</span>
              <span className={styles.rankCount}>{item.count}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

/** Dashboard summarizing the user's library. */
function Stats() {
  const { shelf, favorites } = useLibrary();
  const stats = useMemo(
    () => computeStats(shelf, favorites),
    [shelf, favorites],
  );

  if (stats.total === 0 && stats.favorites === 0) {
    return (
      <div className={styles.empty}>
        <h1>Stats</h1>
        <p>Add some books to see your reading stats.</p>
        <Link to="/search">Find books →</Link>
      </div>
    );
  }

  const tiles = [
    { label: 'Total books', value: stats.total },
    { label: SHELF_LABELS.want, value: stats.byStatus.want },
    { label: SHELF_LABELS.reading, value: stats.byStatus.reading },
    { label: SHELF_LABELS.read, value: stats.byStatus.read },
    { label: 'Favorites', value: stats.favorites },
  ];

  return (
    <div>
      <h1 className={styles.heading}>Stats</h1>

      <div className={styles.tiles}>
        {tiles.map((tile) => (
          <div key={tile.label} className={styles.tile}>
            <span className={styles.tileValue}>{tile.value}</span>
            <span className={styles.tileLabel}>{tile.label}</span>
          </div>
        ))}
      </div>

      <div className={styles.ranks}>
        <RankList title="Top authors" items={stats.topAuthors} />
        <RankList title="Top categories" items={stats.topCategories} />
      </div>
    </div>
  );
}

export default Stats;
