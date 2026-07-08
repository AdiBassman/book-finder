import type { ReactNode } from 'react';

import styles from './EmptyState.module.scss';

type EmptyStateProps = {
  icon?: string;
  title: string;
  /** Optional supporting text or action (e.g. a link). */
  children?: ReactNode;
};

/** Friendly placeholder for empty lists and no-result views. */
function EmptyState({ icon = '📚', title, children }: EmptyStateProps) {
  return (
    <div className={styles.empty}>
      <span className={styles.icon} aria-hidden="true">
        {icon}
      </span>
      <p className={styles.title}>{title}</p>
      {children && <div className={styles.body}>{children}</div>}
    </div>
  );
}

export default EmptyState;
