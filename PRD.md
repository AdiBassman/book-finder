# BookNook — Product Requirements Document (PRD)

## 1. Overview

**BookNook** is a book discovery web app. Users search the Google Books catalog,
browse and filter results, open a detailed page for any book, and organize books
into personal reading shelves (*Want to Read*, *Reading*, *Read*). A stats page
summarizes their library, and a warm, book-themed UI supports a light/dark theme
toggle.

The project is a final project for a programming course. Its goal is to
demonstrate a clean, professional React + TypeScript application built through an
iterative, well-documented workflow.

## 2. Goals

- Deliver a polished, multi-page single-page application (SPA).
- Use real data from a public API (Google Books).
- Include non-trivial logic: debounced search, filtering, sorting, a shelf state
  machine, and statistics aggregation.
- Persist user data (shelves, favorites, theme) across sessions via LocalStorage.
- Keep the code readable, beginner-friendly, and well-organized.

## 3. Non-Goals

- No user accounts, authentication, or backend server.
- No writing to Google's servers (read-only public search).
- No global state library (Redux, Zustand). React Context is sufficient.
- No paid services. Everything runs on free tiers.

## 4. Target User

A reader who wants to discover books and keep a simple, private reading list
without signing up for anything. All data stays in their browser.

## 5. Tech Stack

| Concern        | Choice                                  |
| -------------- | --------------------------------------- |
| Framework      | React + Vite                            |
| Language       | TypeScript                              |
| Routing        | React Router                            |
| Styling        | SCSS Modules (`sass`)                   |
| Data source    | Google Books API (no key required)      |
| Persistence    | Browser LocalStorage                    |
| Testing (bonus)| Vitest + React Testing Library          |
| CI (bonus)     | GitHub Actions                          |
| Hosting (bonus)| Vercel                                  |

No other runtime dependencies are introduced unless strictly necessary.

## 6. Data Source

- Endpoint: `GET https://www.googleapis.com/books/v1/volumes?q={query}`
- Public, free, no API key needed for basic search.
- Raw `volumeInfo` objects are normalized into a clean internal `Book` type so
  the UI never depends on the API's raw shape.

### Core data types

```ts
type Book = {
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

type ShelfStatus = 'want' | 'reading' | 'read';

type ShelfEntry = {
  book: Book;
  status: ShelfStatus;
  addedAt: string; // ISO timestamp
};
```

## 7. Features

### 7.1 Home (`/`)
- Hero section with a prominent search bar.
- Curated rows (e.g. Fiction, Science, History) fetched from the API.
- Clear entry points into search and the user's shelf.

### 7.2 Search Results (`/search`)
- Search books by title, author, or keyword.
- **Category filter** and **sort** (relevance / newest / title A–Z).
- Debounced input to avoid excessive API calls.
- Responsive grid of book cards.

### 7.3 Book Detail (`/book/:id`)
- Cover, title, authors, description, publisher, page count, rating, published date.
- Add to a shelf, mark as favorite, and a link to the external preview.

### 7.4 My Shelf (`/shelf`)
- Tabs for *Want to Read*, *Reading*, *Read*.
- Move a book between statuses; remove a book.
- Data persists in LocalStorage.

### 7.5 Stats (`/stats`)
- Counts per shelf and total books.
- Top authors and top categories (group-by + top-N).
- Favorites count.

### 7.6 Theme
- Warm "library" palette (cream paper, brown/amber accents, serif headings).
- Light/dark toggle, persisted to LocalStorage, applied via `data-theme`.

### 7.7 Not Found (`*`)
- Friendly 404 page for unknown routes.

## 8. Non-Trivial Logic

- **Debounced search** — delays API calls until typing pauses.
- **Client-side filter + sort** — category filter and multiple sort orders.
- **Shelf state machine** — add, move (want → reading → read), and remove books,
  de-duplicated by book id.
- **Stats aggregation** — counts, group-by author/category, top-N ranking.
- **Theme persistence** — read/write theme and apply on load.

## 9. Architecture

```
src/
  components/   BookCard, SearchBar, FilterBar, ShelfTabs, ThemeToggle,
                Spinner, EmptyState, ErrorMessage, Navbar, Footer
  pages/        Home, SearchResults, BookDetail, MyShelf, Stats, NotFound
  lib/          api.ts, storage.ts, types.ts, constants.ts
  hooks/        useShelf.ts, useFavorites.ts, useTheme.ts, useBookSearch.ts
  context/      LibraryContext.tsx   (shelves + favorites)
  styles/       globals.scss, theme.scss
  App.tsx, main.tsx, router.tsx
```

- **API layer** (`lib/api.ts`) isolates all network calls and normalization.
- **Storage layer** (`lib/storage.ts`) isolates all LocalStorage access.
- **Context** provides shelves and favorites to the whole app.
- **Hooks** wrap reusable stateful logic (search, theme, shelf, favorites).
- Pages compose components; components stay presentational where possible.

## 10. Error & Edge Handling

- Loading spinners during fetches.
- Empty states ("No results", "Your shelf is empty").
- API error message with a retry action.
- Placeholder image when a book has no cover.
- All optional fields guarded before rendering.

## 11. Bonus Scope (course extra credit)

1. **Unit tests (Vitest + RTL)** for pure logic: `normalizeBook`, shelf state
   machine, stats aggregation.
2. **GitHub Actions CI** — on push/PR: install → typecheck → test → build.
3. **Vercel deployment** — `vercel.json` SPA rewrite, live URL, README badge.

## 12. Success Criteria

- App builds and runs with no type errors.
- All five main pages work and are navigable.
- Search, filter, sort, shelves, favorites, and stats all function.
- Data persists across page reloads.
- Bonus: tests pass locally and in CI; app is deployed and reachable.

## 13. Deliverables

- Working application source code.
- `PRD.md` (this document).
- `tasks.md` — ordered implementation tasks.
- `README.md` — setup, usage, and project overview.
```
