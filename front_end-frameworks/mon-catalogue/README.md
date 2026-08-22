# Mon Catalogue

A personal film & series catalog — own rating, watch date and notes, with a "coup de cœur" hero carousel — built with **React 19**, **Vite** and **Tailwind CSS**.

It started as a copy of [`movie-night/`](../movie-night/) and diverged into its own thing: the shared catalog schema was replaced by a personal one (`personalRating`, `watchedOn`, `personalNote`, `coupDeCoeur`), the visual identity was redone around a design-token theme, and the entries are imported from [TMDB](https://www.themoviedb.org/) rather than hand-written. Like `movie-night`, it sits outside the React → Vue → Svelte curriculum sequence in this directory.

---

## Features

- **Coup de cœur hero** — a full-bleed carousel over the entries flagged `coupDeCoeur`, auto-rotating every 6s, tinted per entry with its own `themeColor` over the TMDB backdrop, showing the title, category, year and personal note.
- **Personal data schema** — each entry carries a personal rating out of 10, the date it was watched, a free-form note, and coup-de-cœur / favorite flags — not TMDB's public ratings.
- **Sorted by watch date** — the catalog is ordered by `watchedOn`, most recent first, so the grid reads as a viewing timeline. Cards show the date as a dashed "ticket stub" stamp.
- **Search + favorites** — title search with an empty state and a reset action, a heart toggle with a live counter in the header, and a dedicated Favorites view. Favorites live in React state only (they reset on reload — no persistence).
- **Detail modal** — poster, personal rating, year, duration, category, synopsis, watch date and personal note, closable with **Escape**, a backdrop click or the close button, with body scroll locked while open.
- **Async loading states** — the catalog is fetched from `public/data/movies.json` behind a deliberate 2s delay, with a spinner, an error state and a **Retry** button.
- **TMDB import scripts** — posters, backdrops, synopses, durations and genres are pulled from the TMDB API by the scripts in `scripts/` rather than typed by hand.

## Tech stack

| Tool | Version |
|------|---------|
| [React](https://react.dev/) | 19 |
| [Vite](https://vite.dev/) | 8 |
| [Tailwind CSS](https://tailwindcss.com/) | 4 (via `@tailwindcss/vite`) |
| [ESLint](https://eslint.org/) | 10 |
| [gh-pages](https://github.com/tschaub/gh-pages) | deployment |

Fonts are [Bebas Neue](https://fonts.google.com/specimen/Bebas+Neue) (display) and [Inter](https://fonts.google.com/specimen/Inter) (body), loaded from Google Fonts in `index.html`.

### Theme

The palette and fonts are declared once as Tailwind v4 design tokens in `src/index.css` (`@theme`), so components use semantic classes (`bg-bg`, `bg-surface`, `text-accent`, `text-gold`, `text-muted`, `font-display`) instead of raw color values:

| Token | Value | Role |
|-------|-------|------|
| `--color-bg` | `#0b0b0d` | Page background |
| `--color-surface` | `#18181b` | Cards, panels |
| `--color-accent` | `#e0263c` | Primary actions, active state, favorites |
| `--color-text` | `#f5f5f1` | Body text |
| `--color-muted` | `#9c9c9f` | Secondary text |
| `--color-gold` | `#d4af37` | Ratings, ticket stamps |

## Project structure

```
├── public/
│   └── data/
│       └── movies.json         # The catalog — personal schema (see below)
├── scripts/                    # One-off Node scripts, run manually (not npm scripts)
│   ├── import-tmdb.mjs         #   fetch a hardcoded target list from TMDB and merge it into movies.json
│   └── fix-backdrops.mjs       #   refresh the backdrop URLs of entries that predate the hero
└── src/
    ├── App.jsx                 # State, data loading, sorting, search, favorites, view switching
    ├── main.jsx                # React entry point
    ├── index.css               # Tailwind import + @theme design tokens
    └── components/
        ├── AppHeader.jsx       # Sticky header, Films / Favorites nav, favorites counter
        ├── AppFooter.jsx
        ├── Hero.jsx            # Coup de cœur carousel (auto-rotating, themeColor-tinted)
        ├── MovieCard.jsx       # Poster, ticket-stub watch date, personal rating, note
        └── MovieDetails.jsx    # Modal (Escape to close, body scroll lock)
```

### Data schema

Each entry in `public/data/movies.json`:

| Field | Example | Notes |
|-------|---------|-------|
| `id` | `1` | Unique, assigned by the import script |
| `title` | `"Interstellar"` | French title from TMDB |
| `category` | `"Science-fiction"` | First TMDB genre |
| `mediaType` | `"Film"` | `Film`, `Série` or `Anime` — stored but not surfaced in the UI yet |
| `year` | `2014` | |
| `duration` | `"2h49"` | Runtime for films, `"x min/ép."` or a season count for series |
| `personalRating` | `9.5` | Out of 10 — mine, not TMDB's |
| `watchedOn` | `"2025-11-08"` | Drives the sort order and the ticket stamp |
| `personalNote` | `"..."` | Shown on the card, in the modal and in the hero |
| `coupDeCoeur` | `true` | Feeds the hero carousel |
| `favorite` | `false` | Initial state of the heart toggle |
| `posterImage` / `backdropImage` | TMDB URLs | `w500` poster, `w1280` backdrop |
| `themeColor` | `"#1b2a4a"` | Hero gradient tint for this entry |

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) 20+ and npm

### Installation

```bash
git clone https://github.com/Yugz29/holbertonschool-agentic_ai.git
cd holbertonschool-agentic_ai/front_end-frameworks/mon-catalogue
npm install
```

The app itself needs no API key — it reads the committed `movies.json`. A key is only needed to re-run the import scripts below.

### Available scripts

| Command | Description | URL |
|---------|-------------|-----|
| `npm run dev` | Start the dev server (HMR) | http://localhost:3000/holbertonschool-agentic_ai/mon-catalogue/ |
| `npm run build` | Build for production into `dist/` | — |
| `npm run preview` | Serve the production build locally | http://localhost:4173/holbertonschool-agentic_ai/mon-catalogue/ |
| `npm run lint` | Run ESLint | — |
| `npm run deploy` | Build and publish to the `/mon-catalogue/` subfolder of GitHub Pages | — |

## Updating the catalog

The two scripts in `scripts/` are one-off maintenance tools, run by hand with `node`. Both read a TMDB API key from a `.env` file at the project root (git-ignored):

```
VITE_TMDB_API_KEY=your_tmdb_api_key
```

```bash
node scripts/import-tmdb.mjs     # add the titles listed in TARGETS, merged into movies.json
node scripts/fix-backdrops.mjs   # refresh backdrop URLs for the titles listed in TARGETS
```

`import-tmdb.mjs` searches TMDB for each entry of its hardcoded `TARGETS` list, disambiguates by year, exact-title match and popularity (it refuses to guess and reports the title as unresolved when two candidates are too close), then writes the merged catalog back. It fills the TMDB-derived fields only — `personalRating`, `watchedOn`, `personalNote` and `coupDeCoeur` are written with placeholder values and meant to be edited by hand afterwards.

To add a title: append an entry to `TARGETS` (query, type, year, `mediaType`, `themeColor`), run the script, then fill in the personal fields in `movies.json`.

## Deployment

```bash
npm run deploy
```

The Vite `base` is set to `/holbertonschool-agentic_ai/mon-catalogue/` in `vite.config.js` to match the GitHub Pages sub-path. The `deploy` script runs `gh-pages -d dist -e mon-catalogue --add` — `-e mon-catalogue` isolates this app in its own subfolder and `--add` prevents it from wiping the sibling deployments. As of now this app has not been published yet; the sibling apps are live under the same pattern.

## Acknowledgements

Posters, backdrops, synopses and metadata come from [The Movie Database (TMDB)](https://www.themoviedb.org/). This product uses the TMDB API but is not endorsed or certified by TMDB.
