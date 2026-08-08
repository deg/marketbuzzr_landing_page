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
| `drop_03_Marketbuzzr_Homepage_CTO_Handoff_file_aug3.zip` | homepage, 3rd — section order | `Marketbuzzr_Final_Homepage_CTO_Handoff_Cropped_Problem/` |
| `drop_04_Marketbuzzr_How_It_Works_CTO_Handoff_Updated.zip` | How It Works, 1st — page shape only | *(flat, no wrapper)* |
| `drop_05_marketbuzzr-biotech-landing.html` | Biotechnology, FinTech, MedTech + the hero animation | *(single HTML files)* |
| `drop_06_marketbuzzr-homepage-cto-handoff.zip` | homepage, 4th — **current** | `marketbuzzr-homepage-cto-handoff/` |
| `drop_06_marketbuzzr-how-it-works-cto-handoff.zip` | How It Works, 2nd — **current** | `marketbuzzr-how-it-works-cto-handoff/` |
| `drop_06_MarketBuzzr_Industries_Page_CTO_Handover.docx` | the `/industries` page — not built (`mbz-et8e.47`) | *(a single docx)* |

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
Keep the two in step. It is the only such list; earlier homepage-only versions are
in that repo's history if anything needs recovering.

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
| `/use-cases/tech` | `pages/IndustryPage.jsx` with `content/enterpriseTech.js` |
| `/industries/financial-technology` | `pages/IndustryPage.jsx` with `content/fintech.js` |
| `/industries/medical-technology` | `pages/IndustryPage.jsx` with `content/medtech.js` |
| `/industries/public-safety-defense-technology` | `pages/IndustryPage.jsx` with `content/publicSafety.js` |
| `/industries/other-industries` | `pages/IndustryPage.jsx` with `content/otherIndustries.js` |
| `/use-cases` | redirect → `/use-cases/biotech` |
| `/industries` | `pages/Industries.jsx` — the entry page, `drop_06` |
| `/how-it-works` | `pages/HowItWorks.jsx` |
| anything else | `pages/NotImplemented.jsx` |

The two `/use-cases/*` paths are history, not a category: both are industry pages
on the same template and keep those URLs only because they predate the industry-page
system. New pages take `/industries/*`.

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

Each module in `src/content/` exports one plain object holding all of that page's
marketing copy (headings, leads, card arrays, CTA text). The page components are
presentational and map over those arrays. There are eleven: `home`, `howItWorks`,
`industries` and `nav` for the shared pages, `industryChrome` for what every industry
page has in common, and one per industry — `biotech`, `fintech`, `medtech`,
`publicSafety`, `enterpriseTech`, `otherIndustries`.

`content/nav.js` carries structure that looks like styling but is not: the nav's
shape, including the two judgement calls it records — How It Works lives under
Product, and Industries replaced the old Use Cases dropdown. It imports the
industry list from `home.js` so the nav and §6 cannot drift apart.

Emphasis in `home.js` is structural rather than markup. Where the brief bolds a
line it gets its own key (`emphasis`, `closer`) and the component
decides how to render it — **do not put `**` or HTML into those strings**.

**To change marketing copy, edit the content module — never the components.**

All six industry pages are the same component with different content objects — see
The industry pages below before adding a seventh.

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
| 1 | Hero | `PageHero` + `HeroAnimation` (drawn, not photographed) |
| 2 | Transition | `BrandDivider` — one line, deliberately not a section |
| 3 | Problem | copy above `WorthYourAttention`, full width |
| 4 | Insight | `ProductImage` alone — the last raster on this page |
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

**Only §4 is still a picture.** The hero became `HeroAnimation` in `mbz-et8e.40`
and §3 became `WorthYourAttention` in `.44`, both from Manu's own HTML/SVG files,
so the homepage carries one raster where it used to carry four. What is left is
the one blocked on a decision (`mbz-et8e.12`).

Images live in `src/assets/` as AVIF with a WebP fallback, encoded from the final
handoff artwork at `avifenc -q 58`. The
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
nothing else, from Manu's How It Works briefs — **`drop_04`** in the design repo
for the page's shape and **`drop_06`** for its copy and two of its three visuals. That brief forbids additions by name: no fourth step, no sources
grid, no separate weekly-report section, no feature grid, no FAQ. **Read it
before adding a section here.**

The three steps are stacked full-width sections, not a three-column layout and
not alternating 50/50 splits — both were ruled out because they shrink the
artwork below the size its embedded text needs. That also means `.product-frame`'s
breakout works normally here, because the section spans the page. The homepage
reached the same conclusion for its own §3 in `drop_06` and dropped its split.

**Only step 01 is still a picture.** `drop_06` replaced steps 02 and 03 with HTML
animations, built as `RoleDashboard` and `DraftFromIdea` (`mbz-et8e.46`). Step 01
came back from him unchanged, and the AVIF already in the repo is encoded from
that same PNG — verified pixel-wise, mean channel difference 0.60/255 — so it
needed no asset work at all.

**Those two components are not SVG transcriptions.** His files are HTML and CSS,
so unlike `HeroAnimation` and `WorthYourAttention` there are no coordinates to
preserve, no ids to prefix and no SMIL to convert. Each is a panel, a timer and
an index. What did carry over from that work: emoji become `CategoryIcon` line
icons, his outer wrapper box is dropped, and nothing renders as a control. His
step 03 ships a real `<button>`, five radio-styled options and a close control,
none of which do anything; all of it is presentational, with no `<button>`, no
`role`, no `tabindex`. The four new icons — `idea`, `mail`, `checklist`,
`summary` — went into the shared `CategoryIcon`, so they are available site-wide.

**`useCycle` is where the timing and the pause live**, shared by both. It stops
while the pointer or focus is inside, which is the WCAG 2.2.2 mechanism, and
stops entirely under `prefers-reduced-motion`, pinned to the first item. A
visible pause button was considered and rejected: it would be chrome no other
part of this site has, on a page whose brief says not to redesign it. The
residual gap — a keyboard-only visitor gets no pause, because nothing here is
focusable — is site-wide rather than specific to this page, and is recorded on
`mbz-et8e.46`.

**The role colours are the site's, not his.** He gives the four roles four hues
and that device is real: the badge, profile name, card borders, tags and progress
dot all change together. His literals are `#7d58f6` / `#2f7ee8` / `#6aaf4b` /
`#3ba9b4`; `--brand-3`, `--brand-2`, `--positive` and `--brand` sit in the same
hue order and are used instead, so this adds no new colour. `--role` is set once
per role and everything inside reads it.

**Step 01's artwork is light, and that inverts the bleed.** It is drawn on white
(`#FEFEFE`) against the navy page, so `.how-visual` sets a `box-shadow` directly
instead of taking `--artwork-ground`. Its blur is 24px with no spread, against
the homepage's 80px/30px, and **the difference is load-bearing rather than
taste**: a dark bleed that overshoots on a dark page is invisible, a light one is
not. Measured contrast of `--muted` body copy against the ground immediately
above a figure was 1.70:1 at 80/30 and 9.57:1 at 24/0. Do not harmonise the two.
This used to apply to all three visuals and is now one special case; a dark-ground
re-render, or a sketch we can rebuild it from, deletes it (`mbz-et8e.28`, memo §2).

One mobile held width is left where there were three — 1200px for step 01. The
other two need none: they are markup, so they reflow, and their type stays 17px
and 12px from 1440px right down to 390px instead of being scaled into a
horizontal scroller.

**CTA labels differ from the homepage on purpose.** This brief specifies primary
"Try for Free" and secondary "Book a Demo"; the homepage ships the reverse order
and "Try It Free". Two briefs, two answers — the conflict is a question for Manu
(`mbz-et8e.28` item 10), not something to settle by editing one page to match the
other.

The page this replaced was a numbered `<ol>` plus a value-bullet summary. Its
rules (`.steps`, `.step`, `.step-number`, `.step-body`, `.summary-block`,
`.value-grid`, `.value-box`, `.summary-footnote`) are gone, and so are their
halves of the selectors they shared with `.card` and `.cta-panel`.

Page weight with everything scrolled in is **133.8 KB** and LCP is 396ms,
measured at 1440px against the preview build. That is about 147 KB lighter than
before `drop_06`: the two AVIFs it retired were 146.7 KB between them and the
components replacing them add roughly 2.3 KB gzipped. Step 01's image is not the
LCP element and stays `loading="lazy"`, which is what the brief conditions on.
Re-measure rather than trusting this line.

### The `/industries` entry page (2026-08)

`pages/Industries.jsx` is the shortest page component here and is meant to stay
that way. From `drop_06`'s Industries handover, which asks for one thing over and
over: that it not look like a new landing page. "Reuse existing components
wherever possible", "do not create a separate visual style for these cards", "do
not guess or substitute fonts, navigation styles, CTA styles, colors, or
spacing". So it is `PageHero` + `SectionTitle` + `IndustryTile` + `CtaPanel` and
nothing else — no artwork, because "no image or animation is required".

**The six industries live in `content/home.js`, and that is the only list.**
`content/nav.js` reads it for the Industries dropdown and `content/industries.js`
reads it for this page, so all three move together. Each item's `blurb` is this
page's card copy and sits beside the name for the same reason — a second list
keyed by industry name is a list that drifts.

**Pass named props to `IndustryTile`, not `{...item}`.** The homepage did spread,
and adding `blurb` to the shared list silently put a paragraph on all six
homepage tiles — measured, 74px tall to 197px. §6 is a list of names.

**No featured tile here**, unlike the homepage: the brief asks for "all six
industries as equal navigation boxes". And no eyebrow, which every other page
has — his page structure lists one paragraph, a supporting line, the section
heading, the boxes and the closing panel, and a kicker is not among them.

All six cards now reach a real page. Two did not when this page was built —
Life Sciences, which `drop_06` replaced with Other Industries, and Public Safety
& Defense Technology, which was built in `mbz-et8e.52.11`. That matters here
because this page gives each industry a full card, so a dead link is more
prominent on it than on the homepage: check this page, not just §6, before
adding a seventh industry to the shared list.

### The industry pages (2026-08) — one template, six pages

`pages/IndustryPage.jsx` renders **all six industry destinations**, each from its own
module in `src/content/`: `biotech`, `fintech`, `medtech`, `publicSafety`,
`enterpriseTech`, `otherIndustries`. It began as a pilot on Biotechnology alone
(`mbz-et8e.38`, from `drop_05`, the first handoff Manu sent as HTML rather than
artwork). The pilot held, and the August handover settled it outright — "all six
industry destinations must use the same page structure and styling" — so a second
template, `pages/UseCasePage.jsx`, was deleted along with the `content/tech.js` it
rendered (`mbz-et8e.52.12`). A seventh industry is a new content module and a route,
nothing more.

**The point of the template is losing the text-rich PNGs.** The homepage and How It Works
carry their meaning inside images: invisible to search engines, unreadable on a phone
without a horizontal scroller, and uncorrectable without asking Manu to re-render. Three
components here are built as native replacements for exactly those images, which is why
they take content props rather than hardcoding biotech copy:

| Component | Was to replace | What happened |
|---|---|---|
| `SourceCluster` | How It Works step 01 (`monitor-filter`) | still the standing offer |
| `InsightCard` | homepage §4 (`insight-medicalcomp`) | still the standing offer, blocked on `mbz-et8e.12` |
| `RoleBar` | How It Works step 02 (`role-based-intelligence`) | **overtaken** — see below |

**The argument was won, and Manu is now sending the replacements himself.**
`drop_06` supplied HTML animations for How It Works steps 02 and 03 and an SVG for
homepage §3, so three of the four rasters this table was written to displace are gone
already, and by his hand rather than ours.

`RoleBar`'s row is dead specifically: it puts three roles side by side, and his brief
for step 02 rules that out by name — "do not show multiple profiles or dashboards side
by side". Step 02 is `RoleDashboard`, which shows one at a time. `RoleBar` renders on
all six industry pages via `IndustryPage.jsx` and is unaffected there.

What is left of the original claim is the last raster on each page. Closing those two
retires `mbz-et8e.12` and items 1, 2, 5 and 11 of `mbz-et8e.28` — the re-render, the 2×
exports, the stale date and the mobile renders all dissolve when the text is text.

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

**Whether the insight card needs an illustrative marker is still open, and the
card currently has none.** A visible "an illustrative example, not a real signal"
line was invented here rather than taken from the sketch, and came out in
`mbz-et8e.38` when the page was matched to what Manu actually drew. Whether a
fabricated example needs a marker at all is his call, not ours (`mbz-et8e.12`) —
do not reinstate it without reading that bead.

**The card's timestamp is deliberately ours, and the six pages carry six
different ones.** His sketch set it to "May 2, 2025 • 9:42 AM" and every page
copied that one string, so by 2026-08 all six shipped the same fifteen-month-old
date. `mbz-et8e.53` resolved it by moving the dates forward rather than switching
back to a relative "Detected 2 days ago" — the absolute form is what he drew, and
rot in a year is accepted because the site describes where the product is today.
Six different weekdays and business-hours times, so the set does not read as one
string pasted six times. Keep both properties in any refresh.

**The homepage's `insight-medicalcomp` artwork carries the same date five times
over** — the card header plus all four source chips — and there it is pixels, not
text. `scripts/redate-insight-card.py` paints them, and is the only thing that
should: it starts from the lossless master in the design repo's `drop_03` rather
than from `src/assets`, because editing a lossy WEBP re-encodes all 1536×1024 to
move eleven characters. Run it to move the dates again, or after any re-render
from Manu. Its docstring records how each render parameter was measured; the one
worth knowing here is that the text colour must be solved by matching total ink,
because at 12px no pixel reaches full coverage and the darkest-pixel estimate
comes out three shades too dark.

Source dates in that artwork must stay on weekdays inside the week before the
card's own date. A source that postdates the insight it feeds is exactly the kind
of detail that makes a mockup read as a mistake rather than an illustration.

The draft options are labels, not buttons, because a real button that does nothing
is worse than a label that never claimed to be one.

Manu's emoji iconography is not carried over — the site draws its own line icons in
`CategoryIcon.jsx`, which now holds eight more, so they take the page's stroke and colour
and render identically everywhere.

The nine-question "Turn Market Buzz into Signals" `ProblemList` is **gone**. It came
off biotech with the user's approval, and its last caller was `UseCasePage.jsx`, so
the component and `content/tech.js`'s `problems` block went with that template
(`mbz-et8e.52.12`).

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

There are **9 tags across 8 files**:

| Where | What it needs |
|---|---|
| `pages/NotImplemented.jsx` + its CSS + `App.jsx` | **Reframe, do not delete.** The route should ship: a real not-found page is strictly better than the silent redirect to `/` it replaced. Only the "not yet implemented" wording and amber styling must go. Deleting it wholesale reintroduces the original defect. |
| `content/home.js` | Two industry tiles point at pages that do not exist — Life Sciences and Public Safety & Defense Technology. Build them, or drop the `to` and render those tiles non-interactive. |
| `content/nav.js` | Solutions, Resources and Pricing point at the same placeholder. |
| `pages/Home.jsx` | A decision, not a code change — see `mbz-et8e.12`. |
| `pages/HowItWorks.jsx` | A `<DevFlag>` under each step's lead line, asking Manu whether it should stay. `drop_06`'s page structure reads as deleting all three; it never says so. One-line edit either way once he answers. |

**`Home.jsx`'s tag is now the only thing holding back the fabricated product
announcement in the insight artwork.** A visible `<DevNote>` used to sit under
that visual saying so, and was removed on the user's instruction in
`mbz-et8e.48`. The memo's §1 was updated to match, because it had told Manu the
page carried a visible note. The tag is all that is left, and it says so itself.

**Removing that note is not a reason to remove `DevOnly.jsx`.** It briefly was —
`.48` deleted the component and its CSS too, because that note was the only
`<DevNote>` on the site and both files carry tags reading "delete this". They
were restored in `mbz-et8e.50`: the request was to take down one note, not to
retire the mechanism for having notes, and How It Works uses it again
immediately. **Those two tags come off when the design cycle ends, not when the
last note happens to go.**

**The risk is the merge, not the deploy.** `yarn deploy` is already refused from
any branch but `main`, so the live site cannot be reached from `redesign` by
accident. An agent that merges and then strips tags to get past the gate would
undo real fixes.

### The one backend dependency: the email-capture form

`src/components/EmailCaptureModal.jsx` is the only component that talks to a server. On
submit it POSTs `{ email, name, phone, comment, website, source }` to:

```
${VITE_API_BASE_URL}/api/landing/conversion
```

This endpoint lives in the `nutshell-mvp` backend. `website` is a **honeypot** field
(hidden from humans via the `.honeypot` CSS rule, filled only by bots) — keep it in any
form refactor. `source` is which CTA was clicked (`"try-free"` or `"book-demo"`), passed
as a `source` prop on `DemoButton` and carried through `openModal(source)`; every CTA
opens this one modal, so without it the two intents arrive indistinguishable. To
exercise this form against a real backend in dev, the nutshell-mvp stack must be running.

**Adding a field to this payload requires a backend change first.** The endpoint's
Pydantic model is *permissive* about unknown keys — Pydantic's default is
`extra='ignore'` — so an unrecognised key is silently dropped and the request still
returns 204. The value is lost with nothing anywhere reporting it. Land and deploy the
backend side, then send it from here (mbz-et8e.15).

Do not "fix" that by setting `extra='forbid'`. Dropping unknown keys is what lets this
separately-deployed site ship a new field without waiting on a backend release; forbidding
them would turn every such deploy into a hard 422 instead.

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
the image overflows the window, measured at 315px past the right edge. No layout
puts a `.product-frame` in a column any more, so the rule that used to suppress
it is gone; a comment where it stood records what a new split layout would need.

**A bare `1fr` grid track takes its automatic minimum from its content.** An
artwork held at 1000–1400px inside a horizontal scroller inflates the track that
holds it, `.product-frame`'s `width: 100%` then resolves against the inflated
track, and the page gains horizontal overflow — measured at ~630px before this
was fixed. `minmax(0, 1fr)` is what stops it. Any new grid that will hold one of
these scrollers needs the same.

**Drawn visuals need none of the above.** `HeroAnimation`, `WorthYourAttention`,
`RoleDashboard` and `DraftFromIdea` are markup, so they reflow instead of
scaling, and their type holds its size at every width. Only two rasters are left
on the whole site — the homepage insight card and How It Works step 01.

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
from a git tag, so a review point stays reachable after the branch moves on. Run
`make snapshots` for the list — it is generated from `PRESERVED_DIRS`, so it cannot
drift. This line used to enumerate them instead and sat three snapshots out of date
before anyone noticed.

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
