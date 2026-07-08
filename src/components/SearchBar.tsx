import { useState, type FormEvent } from 'react';

import styles from './SearchBar.module.scss';

type SearchBarProps = {
  /** Initial text when uncontrolled. */
  initialValue?: string;
  /** Controlled value. When provided, the parent owns the input state. */
  value?: string;
  /** Called on every keystroke (used for debounced live search). */
  onChange?: (value: string) => void;
  /** Called with the trimmed query on submit. */
  onSubmit?: (query: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
};

/**
 * Reusable search input. Works uncontrolled (home page: submit to navigate)
 * or controlled (search page: live-typing via `value` + `onChange`).
 */
function SearchBar({
  initialValue = '',
  value,
  onChange,
  onSubmit,
  placeholder = 'Search by title, author, or keyword…',
  autoFocus = false,
}: SearchBarProps) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(initialValue);
  const current = isControlled ? value : internal;

  const setCurrent = (next: string) => {
    if (!isControlled) setInternal(next);
    onChange?.(next);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const trimmed = current.trim();
    if (trimmed) onSubmit?.(trimmed);
  };

  return (
    <form className={styles.bar} onSubmit={handleSubmit} role="search">
      <input
        type="search"
        className={styles.input}
        value={current}
        onChange={(event) => setCurrent(event.target.value)}
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
