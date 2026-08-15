# Landing page

The entry point for https://yugz29.github.io/holbertonschool-agentic_ai/ — a single static `index.html`, no framework or build step, linking to the three [`front_end-frameworks/`](../front_end-frameworks/) demos (React, Vue, Svelte).

It exists because each of those apps deploys into its own subfolder of the `gh-pages` branch; without something at the branch root, the bare site URL served nothing.

## Deploy

```bash
cd landing
npm install
npm run deploy
```

`npm run deploy` runs `gh-pages -d . -o origin --add`: `-d .` publishes this folder's contents as-is (no build step needed), no `-e` since this one is meant to sit at the branch root rather than a subfolder, and `--add` keeps the `react/`, `vue/` and `svelte/` subfolders untouched. `npm install` only exists to give `gh-pages` a `package.json` to anchor its cache directory to — this folder has no other dependency.
