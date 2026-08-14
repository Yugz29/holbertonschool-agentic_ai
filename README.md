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

## Repository structure

```
holbertonschool-agentic_ai/
├── landing/                # Entry-point page for the GitHub Pages site (see its README)
└── front_end-frameworks/   # The three framework implementations (see its README)
    ├── react/
    ├── vue/
    ├── svelte/
    └── movie-night/        # Separate one-off Vue.js exercise, not part of the framework sequence
```

## Getting started

Each project is installed and run independently. For example, the React app:

```bash
git clone https://github.com/Yugz29/holbertonschool-agentic_ai.git
cd holbertonschool-agentic_ai/front_end-frameworks/react
npm install
npm run dev
```

Swap `react` for `vue`, `svelte` or `movie-night`.

## Deployment

The landing page, React, Vue and Svelte all publish to the same `gh-pages` branch — the landing page at the branch root, each app into its own subfolder — without overwriting one another. Each has its own `deploy` script; see that project's README (or [`landing/README.md`](landing/README.md) for the landing page) for the exact command and how the coexistence works.

## Author

**Yann Duzelier** — [@Yugz29](https://github.com/Yugz29)

## Acknowledgements

Built for the [Holberton School — Front-end Frameworks](https://github.com/fchavonet/curriculum-holbertonschool-front_end-frameworks) curriculum. Reference mockup by [@fchavonet](https://github.com/fchavonet).
