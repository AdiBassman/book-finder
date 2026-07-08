# BookNook — Implementation Tasks

Each task is small enough to map to a single meaningful Git commit. Tasks are
ordered so the app stays runnable after every step. Complete one task, review,
commit, then continue.

Legend: `[ ]` todo · `[~]` in progress · `[x]` done

---

## MVP

### Task 1 — Project scaffold & tooling
- [ ] Create Vite + React + TypeScript project.
- [ ] Add React Router and `sass`.
- [ ] Create folder structure (`components`, `pages`, `lib`, `hooks`, `context`, `styles`).
- [ ] Set up base SCSS (`globals.scss`) and app entry (`main.tsx`, `App.tsx`).
- [ ] App runs with a placeholder home route.
- **Commit:** `chore: scaffold Vite + React + TS + Router project`

### Task 2 — Types, constants & API layer
- [ ] Define `lib/types.ts` (`Book`, `ShelfStatus`, `ShelfEntry`).
- [ ] Add `lib/constants.ts` (API base URL, categories, sort options).
- [ ] Implement `lib/api.ts`: `searchBooks(query)`, `getBook(id)`, `normalizeBook(raw)`.
- **Commit:** `feat: add Book types and Google Books API layer`

### Task 3 — Layout, navigation & theme toggle
- [ ] Build `Navbar` and `Footer`.
- [ ] Implement `useTheme` hook + `ThemeToggle` (light/dark, persisted).
- [ ] Add `theme.scss` with warm-library palette (light + dark variables).
- [ ] Wire routes in `router.tsx`.
- **Commit:** `feat: add layout, navigation, and theme toggle`

### Task 4 — Home page
- [ ] Hero section with search bar that routes to `/search`.
- [ ] Curated rows (e.g. Fiction, Science) fetched from the API.
- [ ] Loading and error handling for the rows.
- **Commit:** `feat: build home page with hero and curated shelves`

### Task 5 — Search results page
- [ ] `SearchBar` + `BookCard` components.
- [ ] `useBookSearch` hook fetching from the API.
- [ ] Results grid with loading, empty, and error states.
- **Commit:** `feat: add search results page with book grid`

### Task 6 — Filter, sort & debounce
- [ ] `FilterBar` (category filter + sort select).
- [ ] Debounced search input.
- [ ] Client-side sort (relevance / newest / title A–Z).
- **Commit:** `feat: add filtering, sorting, and debounced search`

### Task 7 — Book detail page
- [ ] `/book/:id` route fetching a single book.
- [ ] Full metadata layout, cover placeholder fallback, preview link.
- **Commit:** `feat: add book detail page`

### Task 8 — Library context & storage
- [ ] `lib/storage.ts` (typed LocalStorage read/write).
- [ ] `LibraryContext` holding shelves + favorites.
- [ ] `useShelf` and `useFavorites` hooks (add / move / remove / toggle, dedupe).
- [ ] Add-to-shelf and favorite actions wired into Book Detail and Book Card.
- **Commit:** `feat: add library context with LocalStorage persistence`

### Task 9 — My Shelf page
- [ ] `ShelfTabs` (Want / Reading / Read).
- [ ] Move book between statuses; remove book.
- [ ] Empty state per tab.
- **Commit:** `feat: add My Shelf page with status management`

### Task 10 — Stats page
- [ ] Counts per shelf + total.
- [ ] Top authors and top categories (group-by + top-N).
- [ ] Favorites count.
- **Commit:** `feat: add stats page with aggregated library insights`

### Task 11 — Polish & shared states
- [ ] Reusable `Spinner`, `EmptyState`, `ErrorMessage` components used everywhere.
- [ ] Responsive checks, cover placeholders, accessible labels.
- **Commit:** `style: polish UI and unify loading/empty/error states`

---

## Bonus (extra credit)

### Task 12 — Testing setup
- [ ] Add Vitest + React Testing Library + config.
- [ ] Add `test` script; one smoke test passes.
- **Commit:** `test: set up Vitest and React Testing Library`

### Task 13 — Unit tests: API normalization
- [ ] Tests for `normalizeBook` (missing fields, arrays, defaults).
- **Commit:** `test: cover Book normalization logic`

### Task 14 — Unit tests: shelf & favorites logic
- [ ] Tests for add / move / remove / dedupe and favorite toggle.
- **Commit:** `test: cover shelf state machine and favorites`

### Task 15 — Unit tests: stats aggregation
- [ ] Tests for counts, group-by, and top-N ranking.
- **Commit:** `test: cover stats aggregation logic`

### Task 16 — GitHub Actions CI
- [ ] `.github/workflows/ci.yml`: install → typecheck → test → build.
- **Commit:** `ci: add GitHub Actions pipeline`

### Task 17 — Vercel deployment
- [ ] Add `vercel.json` SPA rewrite.
- [ ] Deploy, verify live URL and client-side routing.
- **Commit:** `chore: add Vercel config for deployment`

### Task 18 — Documentation finalize
- [ ] Write `README.md` (overview, setup, scripts, features, live link, badges).
- [ ] Update `tasks.md` statuses.
- **Commit:** `docs: add README and finalize project documentation`
```
