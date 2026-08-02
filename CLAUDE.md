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
| anything else | `pages/NotImplemented.jsx` |

The catch-all used to `Navigate to="/"`, which silently returned anyone with a
typo or a stale link to the homepage with no explanation. It now renders a
visible placeholder that derives its title from the path, so linking to a page
that does not exist yet is safe. **A real not-found page should survive to
production even after the dev-cycle wording goes** — do not delete
`NotImplemented.jsx` wholesale or you reintroduce the original defect.

```
ErrorBoundary > ModalContext.Provider > Nav, <Routes>, Footer, EmailCaptureModal
```

Rather than threading an `onOpenModal` prop through `<Routes>`, `openModal` is published
via `ModalContext` (`src/ModalContext.js`) and consumed by `DemoButton`, which is the
single component behind **every** CTA on the site. Add a CTA by rendering `DemoButton`,
not by wiring up a new handler.

### Copy lives in `src/content/`, not in components

`content/{home,biotech,tech,howItWorks,nav}.js` each export one plain object holding all
of that page's marketing copy (headings, leads, card arrays, CTA text). The page
components are presentational and map over those arrays.

Two content files carry structure that looks like styling but is not:

- `home.problem.signals` — **array order places the chips** around the 3×3 signal
  cloud, and the three marked `relevant` are the ones touching the centre card.
  Reordering the array moves the composition. The cell map is commented there.
- `content/nav.js` — the nav's shape, including the two judgement calls it
  records: How It Works lives under Product, and Industries replaced the old
  Use Cases dropdown. It imports the industry list from `home.js` so the nav and
  section 7 cannot drift apart.

**To change marketing copy, edit the content module — never the components.** The two
Use Case pages are literally the same component with different content objects, so copy
edits must not introduce structural differences.

`withBreaks.jsx` turns `\n` inside a content string into `<br/>`, used where the source
deck asks for a break at a specific point.

### The homepage (2026-08 redesign)

`pages/Home.jsx` renders eight sections in the order set by Manu's implementation
brief (`~/Documents/marketbuzzr/marketbuzzr_homepage_handoff_md/`). Each has its
own component; none of them is generic, so read the component before changing a
section:

| § | Section | Built from |
|---|---|---|
| 1 | Hero | `PageHero` + `ProductImage` |
| 2 | Problem | `SignalCloud` (3×3 grid) then `BrandDivider` |
| 3 | How It Works | `ProductImage`; `FlowSteps` is the unused alternative |
| 4 | Insight | `ProductImage` + `.card` callouts |
| 5 | Categories | `CategoryCard` + `CategoryIcon` (six line icons) |
| 6 | Personalization | `ProductImage`; `PersonalizationDiagram` is the alternative |
| 7 | Industries | `IndustryTile` |
| 8 | Final CTA | `CtaPanel` with a secondary label |

`FlowSteps` and `PersonalizationDiagram` are **built and working but not shown**.
The sections use the handoff artwork instead, which carries more content; those
two stay readable at phone widths, so they are kept as candidates for a mobile
rendering. They are reachable behind the dev triggers.

Images live in `src/assets/` as AVIF with a WebP fallback, encoded from the
handoff PNGs (4.2 MB of PNG → 275 KB of AVIF). The source PNGs are not in this
repo. `ProductImage` handles `<picture>`, sizing and loading priority — the hero
is eager with `fetchPriority="high"` because it is the LCP element, everything
else is lazy.

### Dev scaffolding — must not ship

The design cycle deliberately links unbuilt pages to placeholders and annotates
known problems in the artwork. Every such spot is tagged:

```bash
grep -rn "FIX-BEFORE-RELEASE" src
```

**`yarn deploy` refuses the live target while any tag remains** (`scripts/deploy.mjs`).
`yarn deploy:new` is exempt — the sandbox is where this is meant to be visible.
Each tag says what to do, and they do not all mean delete: some unwrap, one
(`NotImplemented.jsx`) must be reframed rather than removed, and one is a design
decision for Manu. `src/components/DevOnly.jsx` holds all the dev-only React so
removing it is a deletion rather than a hunt. Beads issue `mbz-et8e.18` tracks it.

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

All CSS is in `src/styles.css` (~1200 lines). Design tokens (colors, spacing, radii,
shadows, transitions, fonts, `--lead-measure`) are CSS custom properties in `:root` —
reuse them (`var(--brand)`, `var(--spacing-lg)`, …) rather than introducing new literals.
Dark theme throughout. Class names are plain (`.modal`, `.cta-panel`, `.grid`); no CSS
modules or utility framework.

Three traps in this stylesheet, all of which have bitten:

**`padding: X 0` on an element that also carries `.container` silently destroys
the horizontal gutter.** `.hero` and `.section` both did this, so content ran
flush to the screen edge on narrow viewports. Both are fixed; treat the pattern
as suspect if you add another.

**Visuals break out of the 1100px text container** to a 1400px cap
(`.product-frame`), because the artwork is 1536px wide and would otherwise render
at ~67% and be hard to read. The breakout centres a wider child inside a narrower
parent with `left: 50%` + `translateX(-50%)`, which **only works when the parent
spans the page** — inside a split column the 50% resolves against the column and
the image overflows the window. §6 is excluded for exactly this reason.

**The "Final overrides" block at the end of the file must stay there.** Several of its
rules tie on specificity with the base rules they override (`.section p.lead`,
`.info-block p.lead`, `.signal-mark`, `.signal-mark polyline`) and win only by source
order — relocating them silently reverts the overrides with no error anywhere.

`SignalLine` and `SignalDivider` still render on every page but are hidden by
`display: none` in that block. That is deliberate: the noise→signal motif was stripped
from the current design, and deleting the one rule brings it back.

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
