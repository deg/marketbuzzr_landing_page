# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

The public marketing landing page for MarketBuzzr — a static single-page React site
deployed to GitHub Pages and served at **marketbuzzr.com**. It is a separate repo from
the `nutshell-mvp` product app, but it depends on that app's backend for one thing: the
email-capture / "Book a Demo" form (see below).

Despite the package name `marketbuzzr-landing-purecss`, there is no CSS framework here —
all styling is hand-written in a single `src/styles.css`.

## Commands

```bash
yarn dev        # Vite dev server on http://localhost:5173
yarn build      # Production bundle to dist/
yarn preview    # Serve the built dist/ locally
yarn deploy     # Build, then publish dist/ to the gh-pages branch (predeploy runs build)
```

There is **no test suite and no linter** configured. `make`, `vitest`, `eslint`, etc. do
not apply here.

Package manager is **yarn** (Yarn 1, pinned via `packageManager`). Never use npm — an
untracked `package-lock.json` in the tree is an accidental artifact, not the source of
truth; `yarn.lock` is.

## Architecture

Single page, no router. Entry: `src/main.jsx` mounts `App` into `#root`.

`App.jsx` composes the whole page and owns the only piece of app state — whether the
email-capture modal is open. It passes an `onOpenModal` callback down to the components
that have call-to-action buttons (`Nav`, `Hero`, `ProblemCards`):

```
ErrorBoundary > Nav, Hero, Features, ProblemCards, Footer, EmailCaptureModal
```

Page content is **data-driven**: section cards are defined as arrays of plain objects at
the top of their section component and mapped into presentational children —
`FEATURES_DATA` in `Features.jsx` → `FeatureCard`, `PROBLEMS_DATA` in `ProblemCards.jsx`
→ `ProblemCard`. To change marketing copy, edit these arrays, not the card components.

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

All CSS is in `src/styles.css` (~784 lines). Design tokens (colors, spacing, radii,
shadows, transitions) are CSS custom properties in `:root` — reuse them
(`var(--brand)`, `var(--spacing-lg)`, …) rather than introducing new literals. Dark theme
throughout. Class names are plain (`.modal`, `.cta-panel`, `.grid`); no CSS modules or
utility framework.

## Environment / API URL

The backend URL is injected at build time via `VITE_API_BASE_URL`:

| File | Used by | Value |
|------|---------|-------|
| `.env.development` | `yarn dev` | `http://localhost:9004` (nutshell-mvp **nginx**, not the backend directly) |
| `.env.production` | `yarn build` | `https://mvp.marketbuzzr.com` |
| `.env.local` (git-ignored) | overrides dev | copy from `.env.local.example` to point elsewhere |

Dev deliberately routes through nginx (`:9004`), not the backend (`:5004`), so the dev
request path mirrors prod: nginx strips `/api/*` to bare paths before proxying. Hitting
the backend directly bypasses that and masks 404s (this was the bug fixed in `mbz-r53x`).

## Deployment

GitHub Pages from the `gh-pages` branch (published by `yarn deploy` via the `gh-pages`
package). `public/CNAME` holds `marketbuzzr.com`; `vite.config.js` uses `base: '/'`
because of the custom apex domain. See `DEPLOYMENT.md` and `CUSTOM_DOMAIN_SETUP.md` for
the GitHub Pages + GoDaddy DNS setup.

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
