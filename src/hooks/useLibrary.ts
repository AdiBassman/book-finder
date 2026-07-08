import { useContext } from 'react';

import { LibraryContext } from '../context/LibraryContext';

/** Access the library context, erroring if used outside the provider. */
export function useLibrary() {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error('useLibrary must be used within a LibraryProvider');
  }
  return context;
}

/** Shelf-related actions and state. */
export function useShelf() {
  const { shelf, addToShelf, removeFromShelf, getShelfStatus } = useLibrary();
  return { shelf, addToShelf, removeFromShelf, getShelfStatus };
}

/** Favorites-related actions and state. */
export function useFavorites() {
  const { favorites, toggleFavorite, isFavorite } = useLibrary();
  return { favorites, toggleFavorite, isFavorite };
}
