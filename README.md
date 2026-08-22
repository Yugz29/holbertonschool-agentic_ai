# holbertonschool-agentic_ai

Front-end coursework for the [Holberton School — Front-end Frameworks](https://github.com/fchavonet/curriculum-holbertonschool-front_end-frameworks) curriculum: the same **Agentic AI** landing page built three times — **React**, **Vue** and **Svelte** — to compare component-driven architectures across three frameworks.

See [`front_end-frameworks/README.md`](front_end-frameworks/README.md) for the full picture of the sequence, and each project's own README for its stack, structure and scripts.

## Live demo

🔗 **https://yugz29.github.io/holbertonschool-agentic_ai/**

| Project | URL |
|---------|-----|
| React | https://yugz29.github.io/holbertonschool-agentic_ai/react/ |
| Vue | https://yugz29.github.io/holbertonschool-agentic_ai/vue/ |
| Svelte | https://yugz29.github.io/holbertonschool-agentic_ai/svelte/ |
| Movie Night *(side project)* | https://yugz29.github.io/holbertonschool-agentic_ai/movie-night/ |

## Repository structure

```
holbertonschool-agentic_ai/
├── landing/                # Entry-point page for the GitHub Pages site (see its README)
└── front_end-frameworks/   # The three framework implementations (see its README)
    ├── react/
    ├── vue/
    ├── svelte/
    ├── movie-night/        # Standalone React exercise (PLD), not part of the framework sequence
    └── mon-catalogue/      # Personal fork of movie-night, also outside the sequence
```

## Getting started

Each project is installed and run independently. For example, the React app:

```bash
git clone https://github.com/Yugz29/holbertonschool-agentic_ai.git
cd holbertonschool-agentic_ai/front_end-frameworks/react
npm install
npm run dev
```

Swap `react` for `vue`, `svelte`, `movie-night` or `mon-catalogue`.

## Deployment

The landing page and every app (React, Vue, Svelte, Movie Night) publish to the same `gh-pages` branch — the landing page at the branch root, each app into its own subfolder — without overwriting one another. Each has its own `deploy` script; see that project's README (or [`landing/README.md`](landing/README.md) for the landing page) for the exact command and how the coexistence works.
