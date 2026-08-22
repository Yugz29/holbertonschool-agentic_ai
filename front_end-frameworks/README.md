# Front-end Frameworks

This directory holds three implementations of the same **Agentic AI** landing page — one per framework — built progressively throughout the [Holberton School — Front-end Frameworks](https://github.com/fchavonet/curriculum-holbertonschool-front_end-frameworks) curriculum, to explore how different modern frontend frameworks solve the same problems through different syntaxes, patterns and development approaches.

## Projects

| Directory | Framework | AI-assisted | Role in the sequence |
|-----------|-----------|:---:|-----------------------|
| [`react/`](react/) | React 19 | No | Original implementation — component-based architecture without AI-assisted code generation |
| [`vue/`](vue/) | Vue 3 | Yes | First AI-assisted framework migration, from React |
| [`svelte/`](svelte/) | Svelte 5 | Yes | Reinforces the same migration workflow with a third implementation |

Each project is self-contained — see its own README for tech stack, project structure, available scripts, and framework-specific migration notes.

## Why three times

The point isn't to rank React, Vue and Svelte against each other — it's to build the same interface enough times to see past each framework's syntax to the concepts underneath: components, props, state, lifecycle, conditional and dynamic rendering, forms, events. Those concepts stay constant; only the way each framework expresses them changes. Doing the migration with AI-assisted tools (starting with Vue) adds a second layer to the exercise: understanding, reviewing and validating generated code, not just writing it from scratch.

## Comparing the frameworks

Each migrated project (Vue, Svelte) includes its own `comparison.md` at its root, analyzing its implementation against the previous framework(s) — components, templates, props, state management, lifecycle, rendering, forms, events, project organization, and the AI-assisted migration process itself:

- [`vue/comparison.md`](vue/comparison.md)
- [`svelte/comparison.md`](svelte/comparison.md)

## Also in this directory

Two standalone React apps, unrelated to the React → Vue → Svelte sequence above. Each has its own README, its own data and its own GitHub Pages subfolder:

- [`movie-night/`](movie-night/) — a one-off PLD exercise (a short group session building a small movie-browsing app: search, category filters, favorites, detail modal). Scaffolded as a Vue project during the session, rebuilt in React right after.
- [`mon-catalogue/`](mon-catalogue/) — a personal fork of `movie-night`: same architecture, but a personal-catalog schema (own rating, watch date, notes), a coup-de-cœur hero carousel, a design-token theme, and entries imported from the TMDB API.
