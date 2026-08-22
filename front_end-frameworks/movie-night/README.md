# Movie Night

A responsive, dark-themed movie-browsing app — search, category filters, favorites and a detail modal — built with **React 19**, **Vite** and **Tailwind CSS**.

This is a standalone PLD exercise (a short group session) done alongside the [Holberton School — Front-end Frameworks](https://github.com/fchavonet/curriculum-holbertonschool-front_end-frameworks) curriculum. It is **not** part of the React → Vue → Svelte landing-page sequence in this directory — it is its own small app, with its own data and its own deployment. It was scaffolded as a Vue project during the session and rebuilt in React shortly after.

🔗 **Live demo:** https://yugz29.github.io/holbertonschool-agentic_ai/movie-night/

---

## Features

- **Async catalog loading** — movies are fetched from `public/data/movies.json` (behind a deliberate 2s delay, to make the states visible) with a spinner, an error state and a **Retry** button.
- **Search + category filter** — combined title search and category pills (`Tous`, `Action`, `Comédie`, `Science-fiction`, `Animation`), with an empty state and a **Reset filters** action when nothing matches.
- **Favorites** — a heart toggle on each card, a live counter in the header, and a dedicated Favorites view with its own empty state. Favorites live in React state only (they reset on reload — no persistence).
- **Detail modal** — poster, rating, year, duration, category and synopsis, closable with **Escape**, a backdrop click or the close button, with body scroll locked while open.
- **Accessible interactions** — `aria-pressed` on the favorite toggle, `role="dialog"` / `aria-modal` on the modal, labelled icon buttons, lazy-loaded posters.
- **Two-view navigation** — Films / Favorites switching handled by local state, no router.

## Tech stack

| Tool | Version |
|------|---------|
| [React](https://react.dev/) | 19 |
| [Vite](https://vite.dev/) | 8 |
| [Tailwind CSS](https://tailwindcss.com/) | 4 (via `@tailwindcss/vite`) |
| [ESLint](https://eslint.org/) | 10 |
| [gh-pages](https://github.com/tschaub/gh-pages) | deployment |

No icon library — the star, heart and search glyphs are HTML entities.

## Project structure

```
├── public/
│   └── data/
│       └── movies.json         # The catalog (id, title, category, rating, year, duration, favorite, image, description)
└── src/
    ├── App.jsx                 # State, data loading, filtering, favorites, view switching
    ├── main.jsx                # React entry point
    ├── index.css               # Tailwind import
    └── components/
        ├── AppHeader.jsx       # Sticky header, Films / Favorites nav, favorites counter
        ├── AppFooter.jsx
        ├── MovieCard.jsx       # Poster, rating badge, favorite toggle, "Voir le détail"
        └── MovieDetails.jsx    # Modal (Escape to close, body scroll lock)
```

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) 20+ and npm

### Installation

```bash
git clone https://github.com/Yugz29/holbertonschool-agentic_ai.git
cd holbertonschool-agentic_ai/front_end-frameworks/movie-night
npm install
```

### Available scripts

| Command | Description | URL |
|---------|-------------|-----|
| `npm run dev` | Start the dev server (HMR) | http://localhost:3000/holbertonschool-agentic_ai/movie-night/ |
| `npm run build` | Build for production into `dist/` | — |
| `npm run preview` | Serve the production build locally | http://localhost:4173/holbertonschool-agentic_ai/movie-night/ |
| `npm run lint` | Run ESLint | — |
| `npm run deploy` | Build and publish to the `/movie-night/` subfolder of GitHub Pages | — |

## Deployment

```bash
npm run deploy
```

The Vite `base` is set to `/holbertonschool-agentic_ai/movie-night/` in `vite.config.js` to match the GitHub Pages sub-path. The `deploy` script runs `gh-pages -d dist -e movie-night --add` — `-e movie-night` isolates this app in its own subfolder and `--add` prevents it from wiping the sibling `react/`, `vue/` and `svelte/` deployments. Update the `base` and the `-e` target if you fork the repository under a different name.

## Related

[`mon-catalogue/`](../mon-catalogue/) is a personal fork of this app — same architecture, but a personal-catalog data schema (own rating, watch date, notes) and a different visual identity.
