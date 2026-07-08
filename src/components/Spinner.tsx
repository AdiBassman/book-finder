import styles from './Spinner.module.scss';

type SpinnerProps = {
  label?: string;
};

/** Accessible loading indicator. */
function Spinner({ label = 'Loading…' }: SpinnerProps) {
  return (
    <div className={styles.wrap} role="status" aria-live="polite">
      <span className={styles.spinner} aria-hidden="true" />
      <span className={styles.label}>{label}</span>
    </div>
  );
}

export default Spinner;
