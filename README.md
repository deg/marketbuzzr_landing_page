# MarketBuzzr Landing Page

The public marketing site at **marketbuzzr.com** — a small React + Vite SPA published
to GitHub Pages. Separate from the `nutshell-mvp` product app, though it posts to that
app's backend for the "Book a Demo" form.

`make` is the front door. `make help` lists every target.

## Getting started

```bash
make install     # corepack + yarn install
make dev         # dev server on http://localhost:5173
```

`make preview` builds and serves the production bundle locally, which is worth doing
before any deploy — the dev server does not exercise the hashed asset paths or the
subdirectory `base` that the sandbox and snapshot builds rely on.

## Publishing

Everything is published from the single `gh-pages` branch, driven by
`scripts/deploy.mjs`.

| Command | Publishes to | Allowed from |
|---|---|---|
| `make deploy-sandbox` | https://marketbuzzr.com/new/ | any branch |
| `make deploy-snapshot TAG=<tag>` | https://marketbuzzr.com/&lt;tag&gt;/ | any branch |
| `make deploy-live` | https://marketbuzzr.com | `main` only |

The **sandbox** rolls forward with whatever is checked out — it is the normal way to
show work in progress. A **snapshot is frozen**: it builds from a git tag, so a review
point stays reachable after the branch moves on. Neither is indexed by search engines.

Both are production builds and post to the **real** backend, so a demo request from
`/new/` is indistinguishable from one on the live site.

### Publishing a snapshot

Four steps, in this order:

```bash
git commit ...                          # 1. commit the work
git tag -a 4aug_v4 -m "what this is"    # 2. tag it
#                                         3. add "4aug_v4" to PRESERVED_DIRS
#                                            in scripts/deploy.mjs
make deploy-snapshot TAG=4aug_v4        # 4. publish
```

Step 3 is not optional and the script will refuse without it. `PRESERVED_DIRS` is what
stops a later live deploy from wiping the whole `gh-pages` root, so a tag missing from
that list would be silently deleted the next time someone runs `make deploy-live` —
discovered only when a reviewer follows a dead link.

Allow a minute or two of GitHub Pages propagation before the new URL stops 404ing.

`make snapshots` prints what is currently protected.

### Before going live

```bash
make scaffolding
```

The design cycle deliberately links unbuilt pages to placeholders and annotates known
problems in the artwork, each tagged `FIX-BEFORE-RELEASE`. **`make deploy-live` refuses
while any remain.** Each marker says what it needs, and they do not all mean delete —
read them rather than stripping them to get past the gate.

## Where the design briefs live

Page copy and layout come from Manu's numbered handoff packages, which live in a
separate repo: `~/Documents/marketbuzzr/marketbuzzr_landing_page_design/`. Nothing in
this repo is the source of truth for what a page should say. Code comments cite those
packages by drop number; `CLAUDE.md` has the drop-to-brief mapping.

## More

`CLAUDE.md` covers architecture, the content-module convention, the four traps in
`styles.css`, and the deploy-script invariants. `DEPLOYMENT.md` has the full deployment
rationale and troubleshooting; `CUSTOM_DOMAIN_SETUP.md` covers the original DNS setup.

There is no test suite and no linter configured.
