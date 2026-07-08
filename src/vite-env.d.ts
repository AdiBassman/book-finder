/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Optional Google Books API key (see README). */
  readonly VITE_GOOGLE_BOOKS_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
