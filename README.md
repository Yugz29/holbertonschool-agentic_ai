# holbertonschool-agentic_ai

Front-end coursework for the [Holberton School — Front-end Frameworks](https://github.com/fchavonet/curriculum-holbertonschool-front_end-frameworks) curriculum: the same **Agentic AI** landing page built three times, with **React**, **Vue** and **Svelte**, to compare component-driven architectures across three frameworks.

All three apps are built with **Vite** + **Tailwind CSS** and deployed to a single GitHub Pages site, each under its own subfolder.

## Live demos

| Project | Status | URL |
|---------|--------|-----|
| **React** | Complete | https://yugz29.github.io/holbertonschool-agentic_ai/react/ |
| **Vue** | Complete | https://yugz29.github.io/holbertonschool-agentic_ai/vue/ |
| **Svelte** | Complete | https://yugz29.github.io/holbertonschool-agentic_ai/svelte/ |

## Repository structure

```
holbertonschool-agentic_ai/
└── front_end-frameworks/
    ├── react/    # Agentic AI landing page — React 19 + Vite + Tailwind (see its README)
    ├── vue/      # Agentic AI landing page — Vue 3 + Vite + Tailwind (see its README)
    └── svelte/   # Agentic AI landing page — Svelte 5 + Vite + Tailwind (see its README)
```

Each project is self-contained with its own `package.json`, dependencies, and README. Start there for project-specific details, scripts, and structure:

- [`front_end-frameworks/react/README.md`](front_end-frameworks/react/README.md)
- [`front_end-frameworks/vue/README.md`](front_end-frameworks/vue/README.md)
- [`front_end-frameworks/svelte/README.md`](front_end-frameworks/svelte/README.md)

## Getting started

Each project is installed and run independently. For example, the React app:

```bash
git clone https://github.com/Yugz29/holbertonschool-agentic_ai.git
cd holbertonschool-agentic_ai/front_end-frameworks/react
npm install
npm run dev
```

Swap `react` for `vue` or `svelte` to work on the other apps.

## Deployment — how all three apps share one GitHub Pages site

All three apps publish to the **`gh-pages`** branch of this repository, but into **separate subfolders** so none of them overwrites the others:

| Project | Vite `base` | `deploy` script |
|---------|-------------|-----------------|
| React | `/holbertonschool-agentic_ai/react/` | `gh-pages -d dist -e react --add` |
| Vue | `/holbertonschool-agentic_ai/vue/` | `gh-pages -d dist -e vue --add` |
| Svelte | `/holbertonschool-agentic_ai/svelte/` | `gh-pages -d dist -e svelte --add` |

Two `gh-pages` options make the coexistence work:

- **`-e <folder>`** (alias of `--dest`) publishes `dist/` into a subfolder of the `gh-pages` branch (`react/`, `vue/` or `svelte/`) instead of the branch root, so their asset URLs never collide.
- **`--add`** disables `gh-pages`' default behavior of wiping the destination before publishing. Without it, deploying one app would erase the others. With it, each deploy only adds/updates its own subfolder and leaves its siblings untouched.

The Vite `base` of each app must match its subfolder path so the built `index.html` references its JS/CSS from the right location.

> **Note:** because `--add` never removes files, previous content-hashed assets accumulate in each subfolder over time. This is harmless (each build's `index.html` points to the current hashes) — just occasional stale files.

## Author

**Yann Duzelier** — [@Yugz29](https://github.com/Yugz29)

## Acknowledgements

Built for the [Holberton School — Front-end Frameworks](https://github.com/fchavonet/curriculum-holbertonschool-front_end-frameworks) curriculum. Reference mockup by [@fchavonet](https://github.com/fchavonet).
