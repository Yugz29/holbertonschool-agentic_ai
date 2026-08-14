# Agentic AI — Landing Page (Svelte)

A responsive, dark-themed landing page for a fictional **Agentic AI** product, built with **Svelte 5**, **Vite** and **Tailwind CSS**.

This project is part of the [Holberton School — Front-end Frameworks](https://github.com/fchavonet/curriculum-holbertonschool-front_end-frameworks) curriculum. It is a direct migration of the [React version](../react/) of this same landing page, following the same migration workflow used for the [Vue version](../vue/), built to compare component-driven architecture, reactivity, and templating patterns across the three frameworks — visually and functionally equivalent to the original.

🔗 **Live demo:** https://yugz29.github.io/holbertonschool-agentic_ai/svelte/

---

## Features

- **Component-driven UI** — reusable primitives (`Button`, `Brand`, `SectionBadge`, `SectionTitle`) and cards (`StatCard`, `FeatureCard`, `InsightCard`, `StepItem`) composed into full sections, using Svelte components (`.svelte`).
- **Data / service separation** — section content lives in `src/data/`, fetched through a small service layer (`src/services/`) instead of being hardcoded in components.
- **Svelte 5 runes** — `$state` for local state, `$derived` for computed values (validation, dynamic classes), `$props()` for component inputs, `onMount` for data fetching.
- **Controlled contact form** — `bind:value`-driven inputs bound directly to a reactive `$state` object, derived validation via `$derived`, dynamic focus borders, and async submit feedback.
- **Async insights loading** — `Insights` fetches its cards through `getInsights()` on `onMount`, with error handling via `{#if}`/`{:else}`.
- **Custom brand SVG icons** — social icons are hand-written SVGs, declared as `{#snippet}` blocks local to `Footer.svelte` and rendered with `{@render}`; `@lucide/svelte` is used for all generic icons.
- **Layered gradient backgrounds** — the Hero and Contact sections reproduce the mockup's radial-glow + grid + vignette background.
- **Accessible & fast** — semantic landmarks, WCAG-compliant contrast, lazy-loaded and right-sized images, meta description.

## Tech stack

| Tool | Version |
|------|---------|
| [Svelte](https://svelte.dev/) | 5 (runes: `$state`, `$derived`, `$props`) |
| [Vite](https://vite.dev/) | 8 |
| [Tailwind CSS](https://tailwindcss.com/) | 4 (via `@tailwindcss/vite`) |
| [@lucide/svelte](https://lucide.dev/) | latest (generic icons only) |
| [ESLint](https://eslint.org/) | 10 (+ `eslint-plugin-svelte`) |
| [gh-pages](https://github.com/tschaub/gh-pages) | deployment |

## Project structure

```
src/
├── App.svelte                  # Page composition (Header + <main> sections + Footer)
├── main.js                     # Svelte entry point
├── global.css                  # Tailwind import
├── components/
│   ├── ui/                     # Reusable primitives
│   │   ├── Brand.svelte        #   logo (header/footer variants)
│   │   ├── Button.svelte       #   renders <a> if href, else <button>
│   │   ├── SectionBadge.svelte #   pill badge above section titles
│   │   └── SectionTitle.svelte #   dynamic <h1>/<h2> with optional accent color
│   ├── cards/                  # Content cards
│   │   ├── StatCard.svelte
│   │   └── FeatureCard.svelte
│   ├── layout/                 # Page chrome
│   │   ├── Header.svelte
│   │   └── Footer.svelte       #   local {#snippet} brand SVG icons
│   ├── sections/
│   │   └── Hero.svelte
│   ├── InsightCard.svelte
│   └── StepItem.svelte
├── sections/                   # Page sections
│   ├── About.svelte
│   ├── Features.svelte
│   ├── Insights.svelte
│   └── Contact.svelte
├── data/                       # Section content
│   ├── features.js
│   ├── insights.js
│   └── steps.js
└── services/
    └── insightsService.js      # async data access
```

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) 20+ and npm

### Installation

```bash
git clone https://github.com/Yugz29/holbertonschool-agentic_ai.git
cd holbertonschool-agentic_ai/front_end-frameworks/svelte
npm install
```

### Available scripts

| Command | Description | URL |
|---------|-------------|-----|
| `npm run dev` | Start the dev server (HMR) | http://localhost:3000/holbertonschool-agentic_ai/svelte/ |
| `npm run build` | Build for production into `dist/` | — |
| `npm run preview` | Serve the production build locally | http://localhost:4173/holbertonschool-agentic_ai/svelte/ |
| `npm run lint` | Run ESLint | — |
| `npm run fix` | Auto-fix ESLint issues | — |
| `npm run deploy` | Build and publish to the `/svelte/` subfolder of GitHub Pages | — |

> **Auditing performance:** run Lighthouse against the **preview** build (`npm run preview`), not the dev server. The dev server ships unminified code with HMR and will always score poorly — that is expected and not representative of production.

## Deployment

The app is deployed to GitHub Pages from the `dist/` folder:

```bash
npm run deploy
```

The Vite `base` is set to `/holbertonschool-agentic_ai/svelte/` in `vite.config.js` to match the GitHub Pages sub-path. The `deploy` script publishes into the `svelte/` subfolder with `gh-pages -d dist -e svelte --add` — `-e svelte` isolates this site in its own subfolder and `--add` prevents it from wiping the sibling `react/` and `vue/` deployments. Update the `base` and the `-e` target if you fork the repository under a different name.

## React → Svelte migration notes

This app was migrated from the [React version](../react/) as part of the curriculum, using AI-assisted tools. Key equivalences applied throughout:

| React | Svelte |
|-------|--------|
| `useState` | `$state` |
| `useEffect(fn, [])` | `onMount(fn)` |
| derived values (plain JS) | `$derived` |
| `className` | `class` |
| `htmlFor` | `for` |
| `.map()` rendering | `{#each}` |
| `{condition && <X/>}` | `{#if}` / `{:else}` |
| controlled inputs (`value` + `onChange`) | `bind:value` |
| `children` | `{#snippet}` / `{@render}` (via the `children` prop) |
| dynamic tag/component (`const Tag = ...`) | `<svelte:element this={Tag}>` |

### Known limitations

- **Optional props require a JSDoc type annotation.** This project is plain JavaScript with `checkJs` enabled (no TypeScript, per the curriculum requirements). A prop destructured from `$props()` without a runtime default (e.g. `let { href } = $props()`) is inferred as required; an explicit `/** @type {{ href?: string }} */` annotation is needed to mark it optional. Applied on `Brand`, `Button` and `SectionTitle`.
- **`Brand.svelte` and `StepItem.svelte` don't carry this JSDoc annotation.** Vite 8's Rolldown bundler fails to parse the JSDoc comment Svelte's compiler places in the generated output for these two specific components (a known, still-open Vite 8 + Rolldown + Svelte incompatibility, not specific to this codebase). Removing the annotation on these two files was the smallest fix that kept the build green; the trade-off is a harmless type-checking gap (an IDE hint on `Brand`'s optional `href`), not a runtime or build issue.
