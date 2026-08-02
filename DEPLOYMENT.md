# Deployment

Two sites are published from this one repo, both from the `gh-pages` branch:

| Command | Publishes to | URL | Deployable from |
|---|---|---|---|
| `yarn deploy` | branch root | https://marketbuzzr.com | `main` only |
| `yarn deploy:new` | branch `new/` | https://marketbuzzr.com/new/ | any branch |

`yarn deploy:new` is the redesign sandbox: publish work-in-progress somewhere
shareable without touching the live site. Both commands build first — there is no
separate build step to remember.

DNS and GitHub Pages settings are already configured and need no changes for
either target. See `CUSTOM_DOMAIN_SETUP.md` for the original GoDaddy setup.

## Why a subdirectory and not new.marketbuzzr.com

GitHub Pages stores its custom domain in a single `CNAME` file at the root of the
published branch, so one repo serves exactly one custom domain. A real
`new.marketbuzzr.com` would need a second repo — duplicating the codebase and
turning every redesign-to-main merge into cross-repo work — plus a new GoDaddy
DNS record and a wait for HTTPS certificate provisioning. The subdirectory needs
none of that.

This is cheap here specifically because the app uses `HashRouter`, so a route
under the sandbox is `marketbuzzr.com/new/#/how-it-works`. The server only ever
serves `/new/index.html`; there is no SPA fallback or rewrite rule to configure.

If a true subdomain is ever wanted, the route is beads issue `mbz-knin` (serve
the landing page through the nutshell-mvp nginx instead of GitHub Pages).

## How the two targets stay out of each other's way

`scripts/deploy.mjs` drives both. Two things in it are load-bearing:

**The live deploy must not delete the sandbox.** `gh-pages` roots its `remove`
glob at `dest`, and the default of `"."` expands to *every* file at the branch
root — including `new/`. The live target therefore passes
`remove: ["**/*", "!new/**"]`. This has to stay an array: the natural-looking
string `--remove "!(new)"` is read by globby as a bare negation with no positive
pattern, so it matches nothing, deletes nothing, and silently leaves stale files
behind. The array form is why this uses the `gh-pages` Node API rather than its
CLI, whose `--remove` takes only a single string.

The reverse direction needs no guard: the sandbox target uses `dest: "new"`, and
because `remove` is rooted at `dest`, it cannot reach outside `new/`.

**The live deploy is refused from any branch but `main`,** because the redesign
branch will be checked out for weeks and `yarn deploy` is muscle memory. Override
with `ALLOW_ANY_BRANCH=1 yarn deploy` if you really mean it.

The sandbox build also gets `<meta name="robots" content="noindex">` (injected by
the `noindexSandbox` plugin in `vite.config.js` for any build whose base is not
`/`) so a near-duplicate of the marketing page cannot compete with the real one in
search. There is deliberately no matching `robots.txt` rule: a disallowed URL is
never fetched, so the tag would never be read, and the bare URL could still be
indexed from a link. `noindex` alone is the stronger of the two.

## Previewing a build locally

```bash
yarn dev                                         # normal development, port 5173
yarn preview                                     # serve the live build from dist/
yarn vite preview --outDir dist-new --base /new/ # serve the sandbox build
```

## Troubleshooting

- **Sandbox assets 404 with paths missing `/new/`** — the build was made without
  `--base /new/`. Use `yarn deploy:new`, not `yarn build`.
- **`/new/` disappeared after a live deploy** — the `remove` array in
  `scripts/deploy.mjs` was changed or flattened to a string. Re-run
  `yarn deploy:new`; nothing is lost permanently.
- **Deploy refused with "Refusing to deploy 'live'"** — you are not on `main`.
  That is the guard working; you probably wanted `yarn deploy:new`.
- **Changes not visible** — GitHub Pages can take a minute, and the browser caches
  `index.html`. Hard-reload before debugging anything else.

## Retiring the sandbox

Nothing removes `/new/` automatically — that is the whole point of the `remove` guard, so
once the redesign ships to the root the sandbox will keep serving a stale copy forever.
Take it down by hand on the published branch:

```bash
git fetch origin gh-pages
git checkout gh-pages
git rm -r new/ && git commit -m "Retire the /new/ sandbox" && git push origin gh-pages
git checkout main
```

