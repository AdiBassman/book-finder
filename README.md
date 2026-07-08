# 📚 BookNook

[![CI](https://github.com/AdiBassman/book-finder/actions/workflows/ci.yml/badge.svg)](https://github.com/AdiBassman/book-finder/actions/workflows/ci.yml)

A book discovery app built with React, TypeScript, and Vite. Search the Google
Books catalog, browse by category, view rich book details, and organize titles
into personal reading shelves — all persisted in your browser.

**Live demo:** https://book-finder-seven-sepia.vercel.app

---

## Features

- 🔍 **Search** millions of books by title, author, or keyword (debounced).
- 🎛️ **Filter & sort** by category and by relevance / newest / title.
- 📖 **Book details** — cover, description, author, publisher, page count, rating.
- 🗂️ **Reading shelves** — Want to Read / Reading / Read, with move & remove.
- ❤️ **Favorites** — mark books you love.
- 📊 **Stats** — counts per shelf plus top authors and categories.
- 🌗 **Light / dark theme** with a warm "library" palette, remembered across visits.
- 💾 **Offline-friendly persistence** — shelves, favorites, and theme live in LocalStorage.

## Tech Stack

- **React** + **Vite** + **TypeScript**
- **React Router** for multi-page navigation
- **SCSS Modules** for scoped styling
- **Google Books API** for data
- **LocalStorage** for persistence
- **Vitest** + **React Testing Library** for tests
- **GitHub Actions** for CI, **Vercel** for hosting

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. (Optional) add a Google Books API key for a private daily quota
cp .env.example .env
# then set VITE_GOOGLE_BOOKS_KEY in .env

# 3. Start the dev server
npm run dev
```

Open http://localhost:5173.

> The app works without an API key, but Google's shared anonymous quota can run
> out. A free key (Google Cloud Console → enable "Books API" → create API key)
> gives you a private quota. Restrict it to your domains for safety.

## Scripts

| Command              | Description                              |
| -------------------- | ---------------------------------------- |
| `npm run dev`        | Start the dev server                     |
| `npm run build`      | Type-check and build for production       |
| `npm run preview`    | Preview the production build              |
| `npm run typecheck`  | Type-check without emitting              |
| `npm test`           | Run the test suite once                  |
| `npm run test:watch` | Run tests in watch mode                  |

## Project Structure

```
src/
  components/   Reusable UI (BookCard, SearchBar, FilterBar, ShelfTabs,
                Spinner, EmptyState, ErrorMessage, Navbar, Footer, …)
  pages/        Home, SearchResults, BookDetail, MyShelf, Stats, NotFound
  lib/          api.ts, cache.ts, storage.ts, stats.ts, types.ts, constants.ts
  hooks/        useTheme, useDebounce, useBookSearch, useLibrary
  context/      LibraryContext (shelves + favorites)
  styles/       globals.scss, theme.scss
  test/         Vitest setup
```

## Architecture Notes

- **API layer** (`lib/api.ts`) isolates all network calls and normalizes raw
  Google Books volumes into a clean `Book` type, so the UI never depends on the
  API's shape.
- **Response caching** (`lib/cache.ts`) stores results in `sessionStorage` to cut
  repeat requests and soften rate limits.
- **Library state** lives in a single React Context, persisted to LocalStorage.
- **Pure logic** (`normalizeBook`, the shelf state machine, `computeStats`) is
  isolated and unit-tested.

## Testing

Unit tests cover the non-trivial logic:

- `normalizeBook` — API normalization and defaults
- Shelf state machine — add / move / remove / dedupe + persistence
- Favorites — toggle + persistence
- `computeStats` — counts, group-by, and top-N ranking

```bash
npm test
```

## Deployment

Deployed on **Vercel**. `vercel.json` adds an SPA rewrite so client-side routes
resolve on refresh. Every push to `main` runs CI (type-check, tests, build) and
triggers a Vercel deployment.

Set `VITE_GOOGLE_BOOKS_KEY` in the Vercel project's environment variables (Vite
inlines env vars at build time, so redeploy after changing it).

## Documentation

- [PRD.md](PRD.md) — product requirements
- [tasks.md](tasks.md) — implementation task breakdown
```
