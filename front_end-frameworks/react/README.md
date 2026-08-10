# Agentic AI — Landing Page

A responsive, dark-themed landing page for a fictional **Agentic AI** product, built with **React**, **Vite** and **Tailwind CSS**.

This project is part of the [Holberton School — Front-end Frameworks](https://github.com/fchavonet/curriculum-holbertonschool-front_end-frameworks). It focuses on component-driven architecture, reusable UI primitives, data/service separation, controlled forms, and an accessible, performant build.

🔗 **Live demo:** https://yugz29.github.io/holbertonschool-agentic_ai/

---

## Features

- **Component-driven UI** — reusable primitives (`Button`, `Brand`, `SectionBadge`, `SectionTitle`) and cards (`StatCard`, `FeatureCard`, `InsightCard`, `StepItem`) composed into full sections.
- **Data / service separation** — section content lives in `src/data/`, fetched through a small service layer (`src/services/`) instead of being hardcoded in components.
- **Controlled contact form** — `useState`-driven inputs, derived validation, dynamic focus borders, and async submit feedback.
- **Async insights loading** — `Insights` fetches its cards through `getInsights()` with loading and error handling.
- **Custom brand SVG icons** — social icons are hand-written SVGs (lucide-react v1 dropped brand icons); lucide is used only for generic icons.
- **Layered gradient backgrounds** — the Hero and Contact sections reproduce the mockup's radial-glow + grid + vignette background.
- **Accessible & fast** — semantic landmarks, WCAG-compliant contrast, lazy-loaded and right-sized images, meta description (targets 95+ on all Lighthouse categories in production).

## Tech stack

| Tool | Version |
|------|---------|
| [React](https://react.dev/) | 19 |
| [Vite](https://vite.dev/) | 8 |
| [Tailwind CSS](https://tailwindcss.com/) | 4 (via `@tailwindcss/vite`) |
| [lucide-react](https://lucide.dev/) | 1 (generic icons only) |
| [ESLint](https://eslint.org/) | 10 |
| [gh-pages](https://github.com/tschaub/gh-pages) | deployment |

## Project structure

```
src/
├── App.jsx                     # Page composition (Header + <main> sections + Footer)
├── main.jsx                    # React entry point
├── global.css                  # Tailwind import
├── components/
│   ├── ui/                     # Reusable primitives
│   │   ├── Brand.jsx           #   logo (header/footer variants)
│   │   ├── Button.jsx          #   renders <a> if href, else <button>
│   │   ├── SectionBadge.jsx    #   pill badge above section titles
│   │   └── SectionTitle.jsx    #   <h1>/<h2> with optional accent color
│   ├── cards/                  # Content cards
│   │   ├── StatCard.jsx
│   │   └── FeatureCard.jsx
│   ├── layout/                 # Page chrome
│   │   ├── Header.jsx
│   │   └── Footer.jsx          #   custom brand SVG icons
│   ├── sections/
│   │   └── Hero.jsx
│   ├── InsightCard.jsx
│   └── StepItem.jsx
├── sections/                   # Page sections
│   ├── About.jsx
│   ├── Features.jsx
│   ├── Insights.jsx
│   └── Contact.jsx
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
cd holbertonschool-agentic_ai/front_end-frameworks/react
npm install
```

### Available scripts

| Command | Description | URL |
|---------|-------------|-----|
| `npm run dev` | Start the dev server (HMR) | http://localhost:3000/holbertonschool-agentic_ai/ |
| `npm run build` | Build for production into `dist/` | — |
| `npm run preview` | Serve the production build locally | http://localhost:4173/holbertonschool-agentic_ai/ |
| `npm run lint` | Run ESLint | — |
| `npm run fix` | Auto-fix ESLint issues | — |
| `npm run deploy` | Build and publish to GitHub Pages | — |

> **Auditing performance:** run Lighthouse against the **preview** build (`npm run preview`), not the dev server. The dev server ships unminified code with HMR and will always score poorly — that is expected and not representative of production.

## Deployment

The app is deployed to GitHub Pages from the `dist/` folder:

```bash
npm run deploy
```

The Vite `base` is set to `/holbertonschool-agentic_ai/` in `vite.config.js` to match the GitHub Pages sub-path. Update it if you fork the repository under a different name.

## Author

**Yann Duzelier** — [@Yugz29](https://github.com/Yugz29)

## Acknowledgements

Built for the [Holberton School — Front-end Frameworks](https://github.com/fchavonet/curriculum-holbertonschool-front_end-frameworks) curriculum. Reference mockup by [@fchavonet](https://github.com/fchavonet).
