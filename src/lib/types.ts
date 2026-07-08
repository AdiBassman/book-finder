// Core domain types used across the app.

/** A book after normalization from the Google Books API. */
export type Book = {
  id: string;
  title: string;
  authors: string[];
  thumbnail?: string;
  description?: string;
  publishedDate?: string;
  pageCount?: number;
  categories: string[];
  averageRating?: number;
  publisher?: string;
  previewLink?: string;
};

/** The three reading shelves a book can live on. */
export type ShelfStatus = 'want' | 'reading' | 'read';

/** A book saved to a shelf, with its status and when it was added. */
export type ShelfEntry = {
  book: Book;
  status: ShelfStatus;
  addedAt: string; // ISO timestamp
};

/** Available sort orders for search results. */
export type SortOption = 'relevance' | 'newest' | 'title';

// --- Raw Google Books API shapes (only the fields we consume) ---

export type RawVolume = {
  id: string;
  volumeInfo?: {
    title?: string;
    authors?: string[];
    description?: string;
    publishedDate?: string;
    pageCount?: number;
    categories?: string[];
    averageRating?: number;
    publisher?: string;
    previewLink?: string;
    imageLinks?: {
      smallThumbnail?: string;
      thumbnail?: string;
    };
  };
};

export type RawVolumeListResponse = {
  items?: RawVolume[];
  totalItems?: number;
};
