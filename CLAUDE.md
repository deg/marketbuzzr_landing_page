# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

The public marketing site for MarketBuzzr — a small React SPA deployed to GitHub Pages
and served at **marketbuzzr.com**. It is a separate repo from the `nutshell-mvp` product
app, but it depends on that app's backend for one thing: the email-capture / "Book a
Demo" form (see below).

Despite the package name `marketbuzzr-landing-purecss`, there is no CSS framework here —
all styling is hand-written in a single `src/styles.css`.

## Commands

```bash
yarn dev         # Vite dev server on http://localhost:5173
yarn build       # Production bundle to dist/
yarn preview     # Serve the built dist/ locally
yarn deploy      # Build + publish the LIVE site to marketbuzzr.com (main branch only)
yarn deploy:new  # Build + publish the SANDBOX to marketbuzzr.com/new/ (any branch)
```

There is **no test suite and no linter** configured. `make`, `vitest`, `eslint`, etc. do
not apply here.

Package manager is **yarn** (Yarn 1, pinned via `packageManager`). Never use npm.

## Architecture

Entry: `src/main.jsx` mounts `App` into `#root` inside a **`HashRouter`**. Routes are
therefore hash fragments — `marketbuzzr.com/#/how-it-works`. This is deliberate and
load-bearing: it means GitHub Pages needs no SPA fallback (`404.html`) and no rewrite
rules, and it is what makes the `/new/` sandbox deploy cheap. Don't switch to
`BrowserRouter` without also solving the static-hosting fallback.

`App.jsx` declares the routes and owns the only piece of app state — whether the
email-capture modal is open:

| Route | Page |
|---|---|
| `/` | `pages/Home.jsx` |
| `/use-cases/biotech` | `pages/UseCasePage.jsx` with `content/biotech.js` |
| `/use-cases/tech` | `pages/UseCasePage.jsx` with `content/tech.js` |
| `/use-cases` | redirect → `/use-cases/biotech` |
| `/how-it-works` | `pages/HowItWorks.jsx` |
| anything else | redirect → `/` |

```
ErrorBoundary > ModalContext.Provider > Nav, <Routes>, Footer, EmailCaptureModal
```

Rather than threading an `onOpenModal` prop through `<Routes>`, `openModal` is published
via `ModalContext` (`src/ModalContext.js`) and consumed by `DemoButton`, which is the
single component behind **every** CTA on the site. Add a CTA by rendering `DemoButton`,
not by wiring up a new handler.

### Copy lives in `src/content/`, not in components

`content/{home,biotech,tech,howItWorks}.js` each export one plain object holding all of
that page's marketing copy (headings, leads, card arrays, CTA text). The page components
are presentational and map over those arrays via shared components — `Card`,
`ProblemList`, `CtaPanel`, `PageHero`, `SectionTitle`, `SignalDivider`.

**To change marketing copy, edit the content module — never the components.** The two
Use Case pages are literally the same component with different content objects, so copy
edits must not introduce structural differences.

`withBreaks.jsx` turns `\n` inside a content string into `<br/>`, used where the source
deck asks for a break at a specific point.

### Layout variants (`?version=`)

`src/main.jsx` reads a `version` query parameter and sets `data-version` on `<html>`;
`styles.css` keys overrides off `[data-version="..."]`. Valid values are **`simple`
(default), `mixed`, `center`, `left`**. `center` is the unscoped base; `mixed`, `center`,
and `left` are **frozen reference variants** and `simple` is the one that gets evolved.

This matters more than it looks: a CSS change made without checking the
`[data-version]` blocks near the end of `styles.css` can silently break the three frozen
variants. Read those blocks before restyling anything shared.

The parameter is read from the query string *before* the hash (`?version=left#/how-it-works`),
with the hash query accepted as a fallback, so it survives hash navigation.

### The one backend dependency: the email-capture form

`src/components/EmailCaptureModal.jsx` is the only component that talks to a server. On
submit it POSTs `{ email, name, comment, website }` to:

```
${VITE_API_BASE_URL}/api/landing/conversion
```

This endpoint lives in the `nutshell-mvp` backend. `website` is a **honeypot** field
(hidden from humans via the `.honeypot` CSS rule, filled only by bots) — keep it in any
form refactor. To exercise this form against a real backend in dev, the nutshell-mvp
stack must be running.

### Styling

All CSS is in `src/styles.css` (~1270 lines). Design tokens (colors, spacing, radii,
shadows, transitions, fonts, `--lead-measure`) are CSS custom properties in `:root` —
reuse them (`var(--brand)`, `var(--spacing-lg)`, …) rather than introducing new literals.
Dark theme throughout. Class names are plain (`.modal`, `.cta-panel`, `.grid`); no CSS
modules or utility framework.

## Environment / API URL

The backend URL is injected at build time via `VITE_API_BASE_URL`:

| File | Used by | Value |
|------|---------|-------|
| `.env.development` | `yarn dev` | `http://localhost:9004` (nutshell-mvp **nginx**, not the backend directly) |
| `.env.production` | `yarn build`, both deploys | `https://mvp.marketbuzzr.com` |
| `.env.local` (git-ignored) | overrides dev | copy from `.env.local.example` to point elsewhere |

Dev deliberately routes through nginx (`:9004`), not the backend (`:5004`), so the dev
request path mirrors prod: nginx strips `/api/*` to bare paths before proxying. Hitting
the backend directly bypasses that and masks 404s (this was the bug fixed in `mbz-r53x`).

Note that the `/new/` sandbox is a production build and therefore posts to the **real**
backend, same as the live site.

## Deployment

Two sites are published from the single `gh-pages` branch:

| Command | Publishes to | URL | Allowed from |
|---|---|---|---|
| `yarn deploy` | branch root | https://marketbuzzr.com | `main` only |
| `yarn deploy:new` | branch `new/` | https://marketbuzzr.com/new/ | any branch |

Both are driven by `scripts/deploy.mjs`. Two invariants in it are load-bearing and easy
to break:

- The live deploy passes `remove: ["**/*", "!new/**"]`. `gh-pages` roots its `remove`
  glob at `dest`, so the default `"."` would delete the sandbox along with everything
  else. This **must stay an array** — the string form `"!(new)"` is read as a bare
  negation with no positive pattern, matches nothing, and silently leaves stale files.
- The live deploy is refused from any branch but `main` (override:
  `ALLOW_ANY_BRANCH=1`), because the redesign branch stays checked out for weeks and
  `yarn deploy` is muscle memory.

The sandbox build gets a `noindex` meta tag from the `noindexSandbox` plugin in
`vite.config.js`. `public/CNAME` holds `marketbuzzr.com` and belongs only at the branch
root; the deploy script strips it from the sandbox build.

`DEPLOYMENT.md` has the full rationale (including why this is a subdirectory rather than
`new.marketbuzzr.com`) and troubleshooting. `CUSTOM_DOMAIN_SETUP.md` covers the original
GoDaddy DNS setup.

## Conventions

This repo sits under the user's home directory, so the user-level `~/CLAUDE.md` applies —
in particular:

- **Do not modify code until explicitly asked.** Questions and descriptions are
  context-setting; wait for "implement", "fix", "go ahead", etc.
- **CSS/layout changes**: propose the approach and explain tradeoffs before writing code.
  Don't trial-and-error through CSS strategies — pick one, justify it, get approval.
- **Exact dependency versions** (no `^`/`~`/ranges) in `package.json`.

Commit messages end with a beads ticket ref in parens, e.g.
`Add favicon to landing page (mbz-1v6p)` — see Task Tracking below.

## Task Tracking (beads)

Work on this repo is tracked in **beads** (`bd`), but **this repo intentionally has no
`.beads` database of its own**. By design, the landing page is treated as a conceptual
part of the `mbz` (nutshell-mvp) project, so its issues live in the **nutshell-mvp beads
database** under the shared `mbz-` prefix. For example, `mbz-r53x` ("Landing inquiry
endpoint 404s through nginx") is a landing-page bug stored there.

Consequences:

- Running `bd` from this directory fails ("no beads database found") — there is nothing
  to initialize, and you should **not** `bd init` here.
- To create/list/update issues or use the `/start-task` and `/finalize` workflow for
  landing-page work, operate from the `nutshell-mvp` checkout (or point `BEADS_DIR` at
  `~/Documents/marketbuzzr/nutshell-mvp/.beads`).
- Never use markdown TODOs — use beads, same as the main project.
