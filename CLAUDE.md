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

`make help` is the front door and lists everything. The targets are thin wrappers over
the yarn scripts, which remain the underlying interface:

| make | yarn |
|---|---|
| `make dev` | `yarn dev` — Vite dev server on http://localhost:5173 |
| `make build` | `yarn build` — production bundle to `dist/` |
| `make preview` | build, then `yarn preview` |
| `make deploy-sandbox` | `yarn deploy:new` — SANDBOX to marketbuzzr.com/new/ (any branch) |
| `make deploy-snapshot TAG=<tag>` | `yarn deploy:snapshot <tag>` — frozen build of a git tag |
| `make deploy-live` | `yarn deploy` — the LIVE site (main branch only) |
| `make snapshots` | — reads `PRESERVED_DIRS` and prints what a live deploy will not delete |
| `make scaffolding` | — lists the `FIX-BEFORE-RELEASE` markers that block a live deploy |

**The Makefile deliberately does not re-check what the deploy script already
enforces** (branch, preserved directories, release tags). Two copies of a safety check
are two places to forget one. The only thing it validates is that `TAG` was passed,
which is a make-level concern.

There is **no test suite and no linter** configured — `vitest`, `eslint`, etc. do not
apply here, and there is no `make lint` or `make test`.

Package manager is **yarn** (Yarn 1, pinned via `packageManager`). Never use npm.

## Where the briefs live

Every design instruction for this site comes from Manu as a numbered handoff
package, and they live in a **separate repo**,
`~/Documents/marketbuzzr/marketbuzzr_landing_page_design/`. Nothing in this repo
is the source of truth for what a page should say — the drops are, and the memos
back to him live beside them.

| Drop | Covers | Unzips to |
|---|---|---|
| `drop_01_Marketbuzzr_Homepage_CTO_Handoff_MD.zip` | homepage, 1st | `marketbuzzr_homepage_handoff_md/` |
| `drop_02_Marketbuzzr_Homepage_Revised_CTO_Handoff.zip` | homepage, 2nd | `Marketbuzzr_Homepage_Revised_CTO_Handoff/` |
| `drop_03_Marketbuzzr_Homepage_CTO_Handoff_file_aug3.zip` | homepage, 3rd — **current** | `Marketbuzzr_Final_Homepage_CTO_Handoff_Cropped_Problem/` |
| `drop_04_Marketbuzzr_How_It_Works_CTO_Handoff_Updated.zip` | How It Works — **current** | *(flat, no wrapper)* |
| `drop_05_marketbuzzr-biotech-landing.html` | Biotechnology — **current** | *(a single HTML file)* |

`drop_05` is the first handoff delivered as **HTML rather than artwork** — a sketch by
an artist agent, not a page to drop in. Its copy and structure are the deliverable; its
palette, iconography and hero layout are not. That format is a large improvement and the
direction we want: text stays text.

**Code comments and beads cite drops by number**, not by path. They used to point
at loose unversioned folders under `~/Documents/marketbuzzr/`, which have since
been consolidated here; the folder names survive as the directories inside drops
01–03, so an old reference still resolves once you unzip.

`MarketBuzzr-Website-Outstanding-Items.docx` in that repo is the running list of
what we are waiting on from Manu, and is the outward-facing twin of `mbz-et8e.28`.
Keep the two in step. It supersedes the earlier `-Homepage-` titled file, which is
kept only for history.

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
| `/use-cases/biotech` | `pages/IndustryPage.jsx` with `content/biotech.js` |
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

`content/nav.js` carries structure that looks like styling but is not: the nav's
shape, including the two judgement calls it records — How It Works lives under
Product, and Industries replaced the old Use Cases dropdown. It imports the
industry list from `home.js` so the nav and §6 cannot drift apart.

Emphasis in `home.js` is structural rather than markup. Where the brief bolds a
line it gets its own key (`emphasis`, `closer`) and the component
decides how to render it — **do not put `**` or HTML into those strings**.

**To change marketing copy, edit the content module — never the components.**

The two Use Case pages used to be the same component with different content objects.
**They are not any more**: biotech moved to `IndustryPage.jsx` as the pilot for a new
structure, tech is still on `UseCasePage.jsx`. That split is deliberate and meant to be
temporary — see The industry pages below before adding a third.

`withBreaks.jsx` turns `\n` inside a content string into `<br/>`, used where the source
deck asks for a break at a specific point.

### The homepage (2026-08 redesign)

`pages/Home.jsx` renders eight sections in the order set by Manu's **final**
handoff brief — **`drop_03`** in the design repo (see Where the briefs live).
That is the **third** brief and supersedes both earlier drops — read it, not
them. It reads Promise → Problem → Product Proof → How It Works → Who It's For →
What You Track → CTA. Each section has its own component; none of them is
generic, so read the component before changing a section:

| § | Section | Built from |
|---|---|---|
| 1 | Hero | `PageHero` + `ProductImage` |
| 2 | Transition | `BrandDivider` — one line, deliberately not a section |
| 3 | Problem | copy beside `ProductImage`, in `.problem-grid`, at the wide measure |
| 4 | Insight | `ProductImage` alone |
| 5 | Five-step flow | `FlowSteps` (native HTML, no artwork) |
| 6 | Industries | `IndustryTile` |
| 7 | Intelligence areas | `CategoryCard` + `CategoryIcon` (six line icons) |
| 8 | Final CTA | `CtaPanel` with a secondary label |

**The order has now changed three times, and so has the divider.** `BrandDivider`
was deleted in `mbz-et8e.25` on the second brief's instruction and restored in
`.29` on the third's. `SignalCloud` and `PersonalizationDiagram` were deleted
alongside it and have not come back. While the brief is still iterating, prefer
parking a component over deleting it.

**The hero has no context line, deliberately.** An earlier round added one
naming the personalization dimensions, because the hero is a flat image. The
final brief deletes it and says not to replace it; the meaning now lives in the
hero image's `visualAlt` instead, so it survives for assistive technology
without visible copy. Note the current artwork draws **five** dimensions, not
the six that sentence named — "products" is no longer depicted, and the alt text
follows the artwork.

Images live in `src/assets/` as AVIF with a WebP fallback, encoded from the final
handoff artwork at `avifenc -q 58` (3.5 MB of source → 189 KB of AVIF). The
setting is re-derived each round rather than carried over, by comparing against
source at 2× zoom on the smallest type and on the hero's gradients, where
banding shows first. The source files are not in this repo.

**The artwork is unframed and bleeds into the page.** `.product-frame` carries
sizing only — the plate is gone, because the brief wants the visuals to blend
with no visible card. Each instance sets `--artwork-ground` to its own
background colour, which `.product-frame` bleeds outward as a large soft shadow;
without that the darker artwork reads as a borderless dark rectangle. Do not
replace this with a `mask-image` fade: content sits 1.3% from the hero's left
edge and the insight card starts 2.7% from its top, so a fade deep enough to
work clips real content.

`ProductImage` handles `<picture>`, sizing and loading priority — the hero is
eager with `fetchPriority="high"` because it is the LCP element, everything else
is lazy.

`vite.config.js` also emits a `<link rel="preload">` for the hero, and finds it
by matching the filename against `HERO_BASENAME`. **Rename the hero asset and
you must update that constant**; a miss now warns at build time rather than
silently dropping the hint. Note the hint goes into the one shared `index.html`,
so it fires on **every** route, including ones that never render the hero — 81 KB
of waste off the homepage, tracked as `mbz-et8e.34`.

### The How It Works page (2026-08)

`pages/HowItWorks.jsx` is Hero → 01 → 02 → 03 → Final CTA and deliberately
nothing else, from Manu's separate How It Works brief — **`drop_04`** in the
design repo. That brief forbids additions by name: no fourth step, no sources
grid, no separate weekly-report section, no feature grid, no FAQ. **Read it
before adding a section here.**

The three steps are stacked full-width sections, not a three-column layout and
not alternating 50/50 splits — both were ruled out because they shrink the
artwork below the size its embedded text needs. That also means `.product-frame`'s
breakout works normally here; the `.problem-grid .product-frame` suppression is a
homepage-only rule and must not be copied over.

**This page's artwork is light, and that inverts the bleed.** All three PNGs are
drawn on white (`#FEFEFE`) against the navy page, so `.how-visual` sets a
`box-shadow` directly instead of taking `--artwork-ground`. Its blur is 24px with
no spread, against the homepage's 80px/30px, and **the difference is load-bearing
rather than taste**: a dark bleed that overshoots on a dark page is invisible, a
light one is not. Measured contrast of `--muted` body copy against the ground
immediately above a figure was 1.70:1 at 80/30 and 9.57:1 at 24/0. Do not
harmonise the two. Dark-ground re-renders are on the ask list (`mbz-et8e.28`
item 9) and would delete this whole special case.

Mobile held widths for the 820px scroller are re-derived per artwork, same method
as the homepage: 1200 / 1100 / 1000px. The middle one is held to its report-card
copy rather than its smallest text — clearing the 9px tab row and the 8px bottom
strip would mean showing it at native 1604px, four screens of panning.

**CTA labels differ from the homepage on purpose.** This brief specifies primary
"Try for Free" and secondary "Book a Demo"; the homepage ships the reverse order
and "Try It Free". Two briefs, two answers — the conflict is a question for Manu
(`mbz-et8e.28` item 10), not something to settle by editing one page to match the
other.

The page this replaced was a numbered `<ol>` plus a value-bullet summary. Its
rules (`.steps`, `.step`, `.step-number`, `.step-body`, `.summary-block`,
`.value-grid`, `.value-box`, `.summary-footnote`) are gone, and so are their
halves of the selectors they shared with `.card` and `.cta-panel`.

Page weight with everything scrolled in is 92 KB gzipped text + 171 KB of AVIF,
plus the 79 KB hero the shared preload drags in for nothing (`mbz-et8e.34`). No
visual is the LCP element on this page — it is the H1 on desktop (344ms) and the
`.sub` paragraph on phone (260ms) — so all three stay `loading="lazy"`, which is
what the brief conditions on. Re-measure rather than trusting this line.

### The industry pages (2026-08) — and why there are two page templates

`pages/IndustryPage.jsx` renders **Biotechnology only**, from `drop_05`, the first
handoff Manu sent as HTML rather than artwork. `pages/UseCasePage.jsx` still renders
tech and is untouched. **This is a pilot, not a permanent fork** (`mbz-et8e.38`): if it
holds up, tech and the four unbuilt industry pages converge on `IndustryPage`. Add a
third page there and move tech across — do not grow `UseCasePage`.

**The point of the pilot is losing the text-rich PNGs.** The homepage and How It Works
carry their meaning inside images: invisible to search engines, unreadable on a phone
without a horizontal scroller, and uncorrectable without asking Manu to re-render. Three
components here are built as native replacements for exactly those images, which is why
they take content props rather than hardcoding biotech copy:

| Component | Replaces, if the pilot lands |
|---|---|
| `SourceCluster` | How It Works step 01 (`monitor-filter`) |
| `InsightCard` | homepage §4 (`insight-medicalcomp`) |
| `RoleBar` | How It Works step 02 (`role-based-intelligence`) |

If that happens it also retires `mbz-et8e.12` and items 1, 2, 5 and 11 of `mbz-et8e.28`
— the re-render, the 2× exports, the stale date and the mobile renders all dissolve when
the text is text.

**The drop's hero was not ported, and could not have been.** It absolutely-positioned
seven boxes at hardcoded percentage offsets, and they already overlapped *in Manu's own
rendering* — two collided at 1440px with one clipped mid-word, two more truncated by
1000px. `SourceCluster` puts the chips in a grid so they cannot collide at any width.
The one positioned element is the core, laid over a centre cell that an empty
`aria-hidden` spacer holds open; that is safe because the cell beneath is guaranteed
empty, and keeping the core outside the `<ul>` is what leaves the seven sources as one
uninterrupted list. `.source-cluster-hole`'s `min-height` is what makes the middle row
taller than a chip row, and `align-items: center` (not `stretch`) is what stops the two
chips flanking the core growing to match it.

**The insight card is labelled illustrative, and must stay labelled.** It carries a
visible "an illustrative example, not a real signal" note, and its timestamp is
deliberately **relative** ("Detected 2 days ago") — the sketch dated it "May 2, 2025",
already fifteen months stale on arrival, which is the same defect filed against the
homepage artwork as `mbz-et8e.28` item 5. An absolute date in a fabricated example rots
the day it ships. The draft options are labels, not buttons, because a real button that
does nothing is worse than a label that never claimed to be one.

Manu's emoji iconography is not carried over — the site draws its own line icons in
`CategoryIcon.jsx`, which now holds eight more, so they take the page's stroke and colour
and render identically everywhere.

The nine-question "Turn Market Buzz into Signals" `ProblemList` is **gone from biotech**
with the user's approval. `ProblemList` and tech's `problems` content both stay; tech
still renders it.

Full page weight is 281 KB (91 KB gzipped text + 189 KB of AVIF), plus ~44 KB of
Google Fonts. The pre-redesign baseline on `mbz-et8e` was 129.8 KB with no
imagery at all. Re-measure after any asset change rather than trusting this
line.

### Dev scaffolding — must not ship

The design cycle deliberately links unbuilt pages to placeholders and annotates
known problems in the artwork. Every such spot is tagged:

```bash
grep -rn "FIX-BEFORE-RELEASE" src
```

**`yarn deploy` refuses the live target while any tag remains** (`scripts/deploy.mjs`).
`yarn deploy:new` is exempt — the sandbox is where this is meant to be visible.
Each tag says what to do, and they do not all mean delete. `src/components/DevOnly.jsx`
holds all the dev-only React so removing it is a deletion rather than a hunt.
Beads issue `mbz-et8e.18` gates the merge.

There are **8 tags across 7 files**. The revision retired five of the original
thirteen — scaffolding it made moot — but none of the four that actually block:

| Where | What it needs |
|---|---|
| `pages/NotImplemented.jsx` + its CSS + `App.jsx` | **Reframe, do not delete.** The route should ship: a real not-found page is strictly better than the silent redirect to `/` it replaced. Only the "not yet implemented" wording and amber styling must go. Deleting it wholesale reintroduces the original defect. |
| `content/home.js` | Four industry tiles point at pages that do not exist. Build them, or drop the `to` and render those tiles non-interactive. §3 makes them more prominent than before. |
| `content/nav.js` | Solutions, Resources and Pricing point at the same placeholder. |
| `pages/Home.jsx` | A decision, not a code change — see `mbz-et8e.12`. |

The `DevOnly.jsx` and `styles.css` dev-block tags are plain deletions once the
Home.jsx note goes.

**The risk is the merge, not the deploy.** `yarn deploy` is already refused from
any branch but `main`, so the live site cannot be reached from `redesign` by
accident. An agent that merges and then strips tags to get past the gate would
undo real fixes.

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

All CSS is in `src/styles.css` (~1900 lines). Design tokens (colors, spacing, radii,
shadows, transitions, fonts, `--lead-measure`) are CSS custom properties in `:root` —
reuse them (`var(--brand)`, `var(--spacing-lg)`, …) rather than introducing new literals.
Dark theme throughout. Class names are plain (`.modal`, `.cta-panel`, `.grid`); no CSS
modules or utility framework.

Four traps in this stylesheet, all of which have bitten:

**`padding: X 0` on an element that also carries `.container` silently destroys
the horizontal gutter.** `.hero` and `.section` both did this, so content ran
flush to the screen edge on narrow viewports. Both are fixed; treat the pattern
as suspect if you add another.

**Visuals break out of the 1100px text container** to a 1400px cap
(`.product-frame`), because the artwork is 1536px wide and would otherwise render
at ~67% and be hard to read. The breakout centres a wider child inside a narrower
parent with `left: 50%` + `translateX(-50%)`, which **only works when the parent
spans the page** — inside a split column the 50% resolves against the column and
the image overflows the window. `.problem-grid .product-frame` suppresses it, and
**§2 now depends on that rule**. It reads like leftover from the deleted
personalization split; it is not.

**A bare `1fr` grid track takes its automatic minimum from its content.** Below
820px the artwork is held at 1000–1400px inside a horizontal scroller so its
embedded text stays legible, which inflated §2's `1fr` track to 1018px and gave
the page ~630px of horizontal overflow. `minmax(0, 1fr)` is what stops it. Any
new grid that will hold one of these scrollers needs the same.

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

Note that `/new/` and the snapshots are production builds and therefore post to the
**real** backend, same as the live site — a demo request from any of them is
indistinguishable from one on marketbuzzr.com (`mbz-et8e.15`).

## Deployment

Everything is published from the single `gh-pages` branch:

| Command | Publishes to | URL | Allowed from |
|---|---|---|---|
| `yarn deploy` | branch root | https://marketbuzzr.com | `main` only |
| `yarn deploy:new` | branch `new/` | https://marketbuzzr.com/new/ | any branch |
| `yarn deploy:snapshot <tag>` | branch `<tag>/` | https://marketbuzzr.com/&lt;tag&gt;/ | any branch |

`/new/` rolls forward with whatever is checked out. A **snapshot is frozen** — built
from a git tag, so a review point stays reachable after the branch moves on. Live at
time of writing: `/3aug_v1/` (before the revised-brief round) and `/3aug_v2/` (after).

Snapshots build from a **detached git worktree**, so your working tree is never touched
and a failed build can't strand you on a detached HEAD. `node_modules` is symlinked in
rather than reinstalled, which is only valid while the tag's `package.json` and
`yarn.lock` match the current install — the script checks and refuses otherwise.

All are driven by `scripts/deploy.mjs`. Four invariants in it are load-bearing:

- The live deploy's `remove` glob clears the whole branch root except what
  `PRESERVED_DIRS` holds back. `gh-pages` roots `remove` at `dest`, so the default `"."`
  would delete the sandbox and every snapshot. This **must stay an array** — the string
  form `"!(new)"` is read as a bare negation with no positive pattern, matches nothing,
  and silently leaves stale files.
- **Publishing a snapshot whose name isn't in `PRESERVED_DIRS` is refused**, and before
  any live deploy the script reads `gh-pages` and refuses if a directory there is
  neither preserved nor live-owned (override: `ALLOW_UNTRACKED_DIRS=1`). Without these,
  forgetting to extend that list means the next live deploy silently deletes a published
  snapshot, discovered only when someone follows a dead URL.
- The live deploy is refused from any branch but `main` (override:
  `ALLOW_ANY_BRANCH=1`), because the redesign branch stays checked out for weeks and
  `yarn deploy` is muscle memory.
- `noindex` needs no per-target work: the vite plugin keys on `base !== '/'`, so any
  subdirectory build gets it. Don't narrow that condition to `/new/`.

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
