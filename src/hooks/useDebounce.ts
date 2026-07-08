import { useEffect, useState } from 'react';

/**
 * Return a debounced copy of a value that only updates after `delay`
 * milliseconds without changes. Used to avoid firing an API call on every
 * keystroke.
 */
export function useDebounce<T>(value: T, delay = 400): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
