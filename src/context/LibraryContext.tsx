import {
  createContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import { readJSON, writeJSON, STORAGE_KEYS } from '../lib/storage';
import type { Book, ShelfEntry, ShelfStatus } from '../lib/types';

type LibraryContextValue = {
  shelf: ShelfEntry[];
  favorites: Book[];
  /** Add a book to a shelf, or move it if already present. */
  addToShelf: (book: Book, status: ShelfStatus) => void;
  removeFromShelf: (id: string) => void;
  getShelfStatus: (id: string) => ShelfStatus | undefined;
  toggleFavorite: (book: Book) => void;
  isFavorite: (id: string) => boolean;
};

// eslint-disable-next-line react-refresh/only-export-components
export const LibraryContext = createContext<LibraryContextValue | null>(null);

/** Provides the user's shelves and favorites, persisted to LocalStorage. */
export function LibraryProvider({ children }: { children: ReactNode }) {
  const [shelf, setShelf] = useState<ShelfEntry[]>(() =>
    readJSON<ShelfEntry[]>(STORAGE_KEYS.shelf, []),
  );
  const [favorites, setFavorites] = useState<Book[]>(() =>
    readJSON<Book[]>(STORAGE_KEYS.favorites, []),
  );

  useEffect(() => {
    writeJSON(STORAGE_KEYS.shelf, shelf);
  }, [shelf]);

  useEffect(() => {
    writeJSON(STORAGE_KEYS.favorites, favorites);
  }, [favorites]);

  const value = useMemo<LibraryContextValue>(() => {
    const addToShelf = (book: Book, status: ShelfStatus) => {
      setShelf((current) => {
        const existing = current.find((entry) => entry.book.id === book.id);
        if (existing) {
          // Move to the new status, keep everything else.
          return current.map((entry) =>
            entry.book.id === book.id ? { ...entry, status } : entry,
          );
        }
        // addedAt is set from user interaction time, which is fine in the browser.
        return [...current, { book, status, addedAt: new Date().toISOString() }];
      });
    };

    const removeFromShelf = (id: string) => {
      setShelf((current) => current.filter((entry) => entry.book.id !== id));
    };

    const getShelfStatus = (id: string) =>
      shelf.find((entry) => entry.book.id === id)?.status;

    const toggleFavorite = (book: Book) => {
      setFavorites((current) =>
        current.some((fav) => fav.id === book.id)
          ? current.filter((fav) => fav.id !== book.id)
          : [...current, book],
      );
    };

    const isFavorite = (id: string) => favorites.some((fav) => fav.id === id);

    return {
      shelf,
      favorites,
      addToShelf,
      removeFromShelf,
      getShelfStatus,
      toggleFavorite,
      isFavorite,
    };
  }, [shelf, favorites]);

  return (
    <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>
  );
}
