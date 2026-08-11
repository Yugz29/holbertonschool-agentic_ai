# holbertonschool-agentic_ai

Front-end coursework for the [Holberton School — Front-end Frameworks](https://github.com/fchavonet/curriculum-holbertonschool-front_end-frameworks) curriculum: the same **Agentic AI** landing page built twice, once with **React** and once with **Vue**, to compare component-driven architectures across two frameworks.

Both apps are built with **Vite** + **Tailwind CSS** and deployed to a single GitHub Pages site, each under its own subfolder.

## Live demos

| Project | Status | URL |
|---------|--------|-----|
| **React** | Complete | https://yugz29.github.io/holbertonschool-agentic_ai/react/ |
| **Vue** | In progress | https://yugz29.github.io/holbertonschool-agentic_ai/vue/ |

## Repository structure

```
holbertonschool-agentic_ai/
└── front_end-frameworks/
    ├── react/    # Agentic AI landing page — React 19 + Vite + Tailwind (see its README)
    └── vue/      # Agentic AI landing page — Vue 3 + Vite + Tailwind (port in progress)
```

Each project is self-contained with its own `package.json`, dependencies, and README. Start there for project-specific details, scripts, and structure:

- [`front_end-frameworks/react/README.md`](front_end-frameworks/react/README.md)
- [`front_end-frameworks/vue/README.md`](front_end-frameworks/vue/README.md)

## Getting started

Each project is installed and run independently. For example, the React app:

```bash
git clone https://github.com/Yugz29/holbertonschool-agentic_ai.git
cd holbertonschool-agentic_ai/front_end-frameworks/react
npm install
npm run dev
```

Swap `react` for `vue` to work on the Vue app.

## Deployment — how both apps share one GitHub Pages site

Both apps publish to the **`gh-pages`** branch of this repository, but into **separate subfolders** so neither overwrites the other:

| Project | Vite `base` | `deploy` script |
|---------|-------------|-----------------|
| React | `/holbertonschool-agentic_ai/react/` | `gh-pages -d dist -e react --add` |
| Vue | `/holbertonschool-agentic_ai/vue/` | `gh-pages -d dist -e vue --add` |

Two `gh-pages` options make the coexistence work:

- **`-e <folder>`** (alias of `--dest`) publishes `dist/` into a subfolder of the `gh-pages` branch (`react/` or `vue/`) instead of the branch root, so their asset URLs never collide.
- **`--add`** disables `gh-pages`' default behavior of wiping the destination before publishing. Without it, deploying one app would erase the other. With it, each deploy only adds/updates its own subfolder and leaves the sibling untouched.

The Vite `base` of each app must match its subfolder path so the built `index.html` references its JS/CSS from the right location.

> **Note:** because `--add` never removes files, previous content-hashed assets accumulate in each subfolder over time. This is harmless (each build's `index.html` points to the current hashes) — just occasional stale files.

## Author

**Yann Duzelier** — [@Yugz29](https://github.com/Yugz29)

## Acknowledgements

Built for the [Holberton School — Front-end Frameworks](https://github.com/fchavonet/curriculum-holbertonschool-front_end-frameworks) curriculum. Reference mockup by [@fchavonet](https://github.com/fchavonet).
