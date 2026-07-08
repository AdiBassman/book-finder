import { useState, type FormEvent } from 'react';

import styles from './SearchBar.module.scss';

type SearchBarProps = {
  /** Pre-fill the input (e.g. from the URL query). */
  initialValue?: string;
  /** Called with the trimmed query when the form is submitted. */
  onSubmit: (query: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
};

/** Reusable search input used on the home page and the search results page. */
function SearchBar({
  initialValue = '',
  onSubmit,
  placeholder = 'Search by title, author, or keyword…',
  autoFocus = false,
}: SearchBarProps) {
  const [value, setValue] = useState(initialValue);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const trimmed = value.trim();
    if (trimmed) onSubmit(trimmed);
  };

  return (
    <form className={styles.bar} onSubmit={handleSubmit} role="search">
      <input
        type="search"
        className={styles.input}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={placeholder}
        aria-label="Search books"
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus={autoFocus}
      />
      <button type="submit" className={styles.button}>
        Search
      </button>
    </form>
  );
}

export default SearchBar;
