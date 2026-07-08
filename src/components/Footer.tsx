import styles from './Footer.module.scss';

/** Simple site footer. */
function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        BookNook — powered by the{' '}
        <a
          href="https://developers.google.com/books"
          target="_blank"
          rel="noreferrer"
        >
          Google Books API
        </a>
        .
      </p>
    </footer>
  );
}

export default Footer;
