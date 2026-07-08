import type { ReactNode } from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';

import { LibraryProvider } from './LibraryContext';
import { useLibrary } from '../hooks/useLibrary';
import { STORAGE_KEYS } from '../lib/storage';
import type { Book } from '../lib/types';

function makeBook(id: string, overrides: Partial<Book> = {}): Book {
  return {
    id,
    title: `Book ${id}`,
    authors: ['Author'],
    categories: ['Fiction'],
    ...overrides,
  };
}

const wrapper = ({ children }: { children: ReactNode }) => (
  <LibraryProvider>{children}</LibraryProvider>
);

function setup() {
  return renderHook(() => useLibrary(), { wrapper });
}

beforeEach(() => {
  localStorage.clear();
});

describe('shelf state machine', () => {
  it('adds a book to a shelf', () => {
    const { result } = setup();

    act(() => result.current.addToShelf(makeBook('1'), 'want'));

    expect(result.current.shelf).toHaveLength(1);
    expect(result.current.getShelfStatus('1')).toBe('want');
  });

  it('moves a book to a new status without duplicating it', () => {
    const { result } = setup();

    act(() => result.current.addToShelf(makeBook('1'), 'want'));
    act(() => result.current.addToShelf(makeBook('1'), 'reading'));

    expect(result.current.shelf).toHaveLength(1);
    expect(result.current.getShelfStatus('1')).toBe('reading');
  });

  it('removes a book from the shelf', () => {
    const { result } = setup();

    act(() => result.current.addToShelf(makeBook('1'), 'want'));
    act(() => result.current.removeFromShelf('1'));

    expect(result.current.shelf).toHaveLength(0);
    expect(result.current.getShelfStatus('1')).toBeUndefined();
  });

  it('persists the shelf to LocalStorage', () => {
    const { result } = setup();

    act(() => result.current.addToShelf(makeBook('1'), 'read'));

    const stored = JSON.parse(localStorage.getItem(STORAGE_KEYS.shelf) ?? '[]');
    expect(stored).toHaveLength(1);
    expect(stored[0].status).toBe('read');
    expect(stored[0].book.id).toBe('1');
  });
});

describe('favorites', () => {
  it('toggles a favorite on and off', () => {
    const { result } = setup();
    const book = makeBook('9');

    act(() => result.current.toggleFavorite(book));
    expect(result.current.isFavorite('9')).toBe(true);
    expect(result.current.favorites).toHaveLength(1);

    act(() => result.current.toggleFavorite(book));
    expect(result.current.isFavorite('9')).toBe(false);
    expect(result.current.favorites).toHaveLength(0);
  });

  it('persists favorites to LocalStorage', () => {
    const { result } = setup();

    act(() => result.current.toggleFavorite(makeBook('9')));

    const stored = JSON.parse(
      localStorage.getItem(STORAGE_KEYS.favorites) ?? '[]',
    );
    expect(stored).toHaveLength(1);
    expect(stored[0].id).toBe('9');
  });
});
