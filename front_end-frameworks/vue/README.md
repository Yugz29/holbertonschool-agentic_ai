# Agentic AI — Landing Page (Vue.js)

A responsive, dark-themed landing page for a fictional **Agentic AI** product, built with **Vue 3**, **Vite** and **Tailwind CSS**.

This project is part of the [Holberton School — Front-end Frameworks](https://github.com/fchavonet/curriculum-holbertonschool-front_end-frameworks) curriculum. It is a direct migration of the [React version](../react/) of this same landing page, built to compare component-driven architecture, reactivity, and templating patterns between the two frameworks — visually and functionally equivalent to the original.

🔗 **Live demo:** https://yugz29.github.io/holbertonschool-agentic_ai/vue/

---

## Features

- **Component-driven UI** — reusable primitives (`Button`, `Brand`, `SectionBadge`, `SectionTitle`) and cards (`StatCard`, `FeatureCard`, `InsightCard`, `StepItem`) composed into full sections, using Vue Single File Components (`.vue`).
- **Data / service separation** — section content lives in `src/data/`, fetched through a small service layer (`src/services/`) instead of being hardcoded in components.
- **Composition API** — `ref` and `reactive` for local state, `computed` for derived values (validation, dynamic classes), `onMounted` for data fetching.
- **Controlled contact form** — `v-model`-driven inputs, derived validation via `computed`, dynamic focus borders, and async submit feedback.
- **Async insights loading** — `Insights` fetches its cards through `getInsights()` on `onMounted`, with error handling via `v-if`/`v-else`.
- **Custom brand SVG icons** — social icons are hand-written SVGs, inlined directly in `Footer.vue`; `lucide-vue-next` is used for all generic icons.
- **Layered gradient backgrounds** — the Hero and Contact sections reproduce the mockup's radial-glow + grid + vignette background.
- **Accessible & fast** — semantic landmarks, WCAG-compliant contrast, lazy-loaded and right-sized images, meta description.

## Tech stack

| Tool | Version |
|------|---------|
| [Vue.js](https://vuejs.org/) | 3 (Composition API, `<script setup>`) |
| [Vite](https://vite.dev/) | 8 |
| [Tailwind CSS](https://tailwindcss.com/) | 4 (via `@tailwindcss/vite`) |
| [lucide-vue-next](https://lucide.dev/) | latest (generic icons only) |
| [ESLint](https://eslint.org/) | 10 (+ `eslint-plugin-vue`) |
| [gh-pages](https://github.com/tschaub/gh-pages) | deployment |

## Project structure

```
src/
├── App.vue                     # Page composition (Header + <main> sections + Footer)
├── main.js                     # Vue entry point
├── global.css                  # Tailwind import
├── components/
│   ├── ui/                     # Reusable primitives
│   │   ├── Brand.vue           #   logo (header/footer variants)
│   │   ├── Button.vue          #   renders <a> if href, else <button>
│   │   ├── SectionBadge.vue    #   pill badge above section titles
│   │   └── SectionTitle.vue    #   dynamic <h1>/<h2> with optional accent color
│   ├── cards/                  # Content cards
│   │   ├── StatCard.vue
│   │   └── FeatureCard.vue
│   ├── layout/                 # Page chrome
│   │   ├── Header.vue
│   │   └── Footer.vue          #   inline custom brand SVG icons
│   ├── sections/
│   │   └── Hero.vue
│   ├── InsightCard.vue
│   └── StepItem.vue
├── sections/                   # Page sections
│   ├── About.vue
│   ├── Features.vue
│   ├── Insights.vue
│   └── Contact.vue
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
cd holbertonschool-agentic_ai/front_end-frameworks/vue
npm install
```

### Available scripts

| Command | Description | URL |
|---------|-------------|-----|
| `npm run dev` | Start the dev server (HMR) | http://localhost:3000/holbertonschool-agentic_ai/vue/ |
| `npm run build` | Build for production into `dist/` | — |
| `npm run preview` | Serve the production build locally | http://localhost:4173/holbertonschool-agentic_ai/vue/ |
| `npm run lint` | Run ESLint | — |
| `npm run fix` | Auto-fix ESLint issues | — |
| `npm run deploy` | Build and publish to the `/vue/` subfolder of GitHub Pages | — |

> **Auditing performance:** run Lighthouse against the **preview** build (`npm run preview`), not the dev server. The dev server ships unminified code with HMR and will always score poorly — that is expected and not representative of production.

## Deployment

The app is deployed to GitHub Pages from the `dist/` folder:

```bash
npm run deploy
```

The Vite `base` is set to `/holbertonschool-agentic_ai/vue/` in `vite.config.js` to match the GitHub Pages sub-path. The `deploy` script publishes into the `vue/` subfolder with `gh-pages -d dist -e vue --add` — `-e vue` isolates this site in its own subfolder and `--add` prevents it from wiping the sibling `react/` and `svelte/` deployments. Update the `base` and the `-e` target if you fork the repository under a different name.

## React → Vue migration notes

This app was migrated from the [React version](../react/) as part of the curriculum, using AI-assisted tools. Key equivalences applied throughout:

| React | Vue |
|-------|-----|
| `useState` | `ref` / `reactive` |
| `useEffect(fn, [])` | `onMounted(fn)` |
| derived values (plain JS) | `computed` |
| `className` | `class` |
| `htmlFor` | `for` |
| `.map()` rendering | `v-for` |
| `{condition && <X/>}` | `v-if` / `v-else` |
| controlled inputs (`value` + `onChange`) | `v-model` |
| `children` | `<slot />` |
| dynamic tag/component (`const Tag = ...`) | `<component :is="...">` |

## Author

**Yann Duzelier** — [@Yugz29](https://github.com/Yugz29)

## Acknowledgements

Built for the [Holberton School — Front-end Frameworks](https://github.com/fchavonet/curriculum-holbertonschool-front_end-frameworks) curriculum. Reference mockup by [@fchavonet](https://github.com/fchavonet). React version migrated with AI-assisted development tools.
