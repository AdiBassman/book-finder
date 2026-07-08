import styles from './ErrorMessage.module.scss';

type ErrorMessageProps = {
  message?: string;
  /** When provided, shows a retry button. */
  onRetry?: () => void;
};

/** Inline error notice with an optional retry action. */
function ErrorMessage({
  message = 'Something went wrong. Please try again.',
  onRetry,
}: ErrorMessageProps) {
  return (
    <div className={styles.error} role="alert">
      <span className={styles.icon} aria-hidden="true">
        ⚠️
      </span>
      <p className={styles.message}>{message}</p>
      {onRetry && (
        <button type="button" className={styles.retry} onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
