import { describe, it, expect } from 'vitest';

import { computeStats } from './stats';
import type { Book, ShelfEntry, ShelfStatus } from './types';

function makeBook(id: string, overrides: Partial<Book> = {}): Book {
  return {
    id,
    title: `Book ${id}`,
    authors: [],
    categories: [],
    ...overrides,
  };
}

function entry(book: Book, status: ShelfStatus): ShelfEntry {
  return { book, status, addedAt: '2026-01-01T00:00:00.000Z' };
}

describe('computeStats', () => {
  it('returns zeros for an empty library', () => {
    const stats = computeStats([], []);

    expect(stats.total).toBe(0);
    expect(stats.byStatus).toEqual({ want: 0, reading: 0, read: 0 });
    expect(stats.favorites).toBe(0);
    expect(stats.topAuthors).toEqual([]);
    expect(stats.topCategories).toEqual([]);
  });

  it('counts total and per-status', () => {
    const shelf = [
      entry(makeBook('1'), 'want'),
      entry(makeBook('2'), 'want'),
      entry(makeBook('3'), 'reading'),
      entry(makeBook('4'), 'read'),
    ];

    const stats = computeStats(shelf, []);

    expect(stats.total).toBe(4);
    expect(stats.byStatus).toEqual({ want: 2, reading: 1, read: 1 });
  });

  it('counts favorites', () => {
    const stats = computeStats([], [makeBook('1'), makeBook('2')]);
    expect(stats.favorites).toBe(2);
  });

  it('ranks top authors by count', () => {
    const shelf = [
      entry(makeBook('1', { authors: ['Tolkien'] }), 'want'),
      entry(makeBook('2', { authors: ['Tolkien'] }), 'read'),
      entry(makeBook('3', { authors: ['Rowling'] }), 'want'),
    ];

    const stats = computeStats(shelf, []);

    expect(stats.topAuthors[0]).toEqual({ name: 'Tolkien', count: 2 });
    expect(stats.topAuthors[1]).toEqual({ name: 'Rowling', count: 1 });
  });

  it('breaks count ties alphabetically', () => {
    const shelf = [
      entry(makeBook('1', { categories: ['Zebra'] }), 'want'),
      entry(makeBook('2', { categories: ['Apple'] }), 'want'),
    ];

    const stats = computeStats(shelf, []);

    expect(stats.topCategories.map((c) => c.name)).toEqual(['Apple', 'Zebra']);
  });

  it('limits results to the requested top N', () => {
    const shelf = ['a', 'b', 'c', 'd'].map((name, i) =>
      entry(makeBook(String(i), { authors: [name] }), 'want'),
    );

    const stats = computeStats(shelf, [], 2);

    expect(stats.topAuthors).toHaveLength(2);
  });
});
