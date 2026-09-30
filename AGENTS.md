# AGENTS.md

## Cursor Cloud specific instructions

### What this repo is
This is a documentation repository for **ROC (Remote Operations Center)** at Marine Technologies. Most content is Markdown under `docs/`, `templates/`, and `presentations/`. New agents should read `docs/FOR_NEXT_AGENT.md` first for goals, boundaries, and layout.

### The only runnable application: the employee document portal (`web/`)
`web/` is a **static site** (`index.html` + vanilla JS `app.js`/`documents.js` + `styles.css`) that fetches Markdown files from the repo and renders them client-side. There is **no package manager, build step, lint, or automated test suite** — the only runtime dependency is Python 3 (already installed) for the static file server. Mermaid is loaded from a CDN (`cdn.jsdelivr.net`), so diagram rendering needs outbound network access; the rest of the portal works offline.

### Running the portal (dev)
- The Windows helper `web/start-portal.ps1` is PowerShell-only. On this Linux VM, start the server directly from the **repository root** (not from `web/`) so relative `../` fetches to `docs/`, `templates/`, and `presentations/` resolve:
  - `python3 -m http.server 8000`
- Then open `http://localhost:8000/web/`.
- Serving from the repo root is required: `app.js` fetches documents via `../<path>` relative to `/web/`. Starting the server inside `web/` breaks document loading.

### Lint / test / build
There are none. Changes to `web/*` are verified by loading the portal in a browser and confirming documents render (headings, tables, lists, links, Mermaid diagrams, and `roc-visual` code blocks). `app.js` bumps `?v=` query strings on `documents.js`/`app.js` in `index.html` for cache-busting when those files change.
