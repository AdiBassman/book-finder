import { describe, it, expect } from 'vitest';

import { normalizeBook } from './api';
import type { RawVolume } from './types';

describe('normalizeBook', () => {
  it('maps all fields from a fully populated volume', () => {
    const raw: RawVolume = {
      id: 'abc123',
      volumeInfo: {
        title: 'The Hobbit',
        authors: ['J.R.R. Tolkien'],
        description: 'A hobbit goes on an adventure.',
        publishedDate: '1937',
        pageCount: 310,
        categories: ['Fiction', 'Fantasy'],
        averageRating: 4.7,
        publisher: 'Allen & Unwin',
        previewLink: 'https://books.google.com/preview',
        imageLinks: { thumbnail: 'https://example.com/cover.jpg' },
      },
    };

    expect(normalizeBook(raw)).toEqual({
      id: 'abc123',
      title: 'The Hobbit',
      authors: ['J.R.R. Tolkien'],
      thumbnail: 'https://example.com/cover.jpg',
      description: 'A hobbit goes on an adventure.',
      publishedDate: '1937',
      pageCount: 310,
      categories: ['Fiction', 'Fantasy'],
      averageRating: 4.7,
      publisher: 'Allen & Unwin',
      previewLink: 'https://books.google.com/preview',
    });
  });

  it('applies defaults when volumeInfo is missing', () => {
    const raw: RawVolume = { id: 'empty' };
    const book = normalizeBook(raw);

    expect(book.id).toBe('empty');
    expect(book.title).toBe('Untitled');
    expect(book.authors).toEqual([]);
    expect(book.categories).toEqual([]);
    expect(book.thumbnail).toBeUndefined();
  });

  it('upgrades http cover URLs to https', () => {
    const raw: RawVolume = {
      id: 'http-cover',
      volumeInfo: {
        title: 'Book',
        imageLinks: { thumbnail: 'http://example.com/cover.jpg' },
      },
    };

    expect(normalizeBook(raw).thumbnail).toBe('https://example.com/cover.jpg');
  });

  it('leaves missing optional fields undefined', () => {
    const raw: RawVolume = {
      id: 'partial',
      volumeInfo: { title: 'Partial Book', authors: ['Someone'] },
    };
    const book = normalizeBook(raw);

    expect(book.description).toBeUndefined();
    expect(book.pageCount).toBeUndefined();
    expect(book.averageRating).toBeUndefined();
    expect(book.publisher).toBeUndefined();
    expect(book.previewLink).toBeUndefined();
  });
});
