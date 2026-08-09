// Publishes to the single `gh-pages` branch:
//
//   live            -> branch root  -> https://marketbuzzr.com
//   new             -> branch new/  -> https://marketbuzzr.com/new/
//   snapshot <tag>  -> branch <tag>/ -> https://marketbuzzr.com/<tag>/
//
// All of them live on one branch because GitHub Pages keeps its custom domain in
// a single CNAME file at the branch root, so one repo serves exactly one domain.
// A real new.marketbuzzr.com would need a second repo; a subdirectory needs no
// DNS or GitHub settings changes at all. The app uses HashRouter, so routes
// under the subdirectory are /new/#/how-it-works and need no SPA rewrite rules.
//
// `new` rolls forward with whatever is checked out. A snapshot is frozen: it is
// built from a git tag, so a specific review point stays reachable after the
// branch has moved on.
//
// Usage: node scripts/deploy.mjs <live|new>
//        node scripts/deploy.mjs snapshot <tag>

import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, readdirSync, rmSync, symlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import ghpages from "gh-pages";

const SANDBOX_DIR = "new";

// Top-level directories on gh-pages that the LIVE deploy must never delete:
// the rolling sandbox, plus every frozen snapshot. `assets` is excluded from
// this list on purpose — that one the live build owns and should replace.
//
// Adding a snapshot without adding it here would let the next live deploy wipe
// it silently, so the live deploy reads gh-pages and checks it against this
// list rather than trusting anyone to remember. Publishing a snapshot whose
// name is missing here is refused outright.
const PRESERVED_DIRS = [
  SANDBOX_DIR,
  "3aug_v1",
  "3aug_v2",
  "3aug_v3",
  "4aug_v4",
  "4aug_v5",
  "7aug_v6",
  "9aug_v7",
  "9aug_v10",
];

// Directories the live build produces and is entitled to overwrite.
const LIVE_OWNED_DIRS = ["assets"];

const TARGETS = {
  live: {
    outDir: "dist",
    base: "/",
    dest: ".",
    // gh-pages roots `remove` at `dest`, so the default of "." expands to every
    // file at the branch root -- including the sandbox and every snapshot.
    // This must stay an array: a "!(new)" string is read by globby as a bare
    // negation with no positive pattern, which matches nothing and would leave
    // every stale file in place.
    remove: ["**/*", ...PRESERVED_DIRS.map((dir) => `!${dir}/**`)],
    requireBranch: "main",
    requireNoReleaseTags: true,
    url: "https://marketbuzzr.com",
  },
  [SANDBOX_DIR]: {
    outDir: `dist-${SANDBOX_DIR}`,
    base: `/${SANDBOX_DIR}/`,
    dest: SANDBOX_DIR,
    // Rooted at dest, so this can only ever clear the sandbox subtree.
    remove: ["**/*"],
    requireBranch: null,
    // The sandbox is exactly where dev scaffolding is meant to be visible.
    requireNoReleaseTags: false,
    url: `https://marketbuzzr.com/${SANDBOX_DIR}/`,
  },
};

const name = process.argv[2];
const tagArg = process.argv[3];

const usage = () => {
  console.error(
    `Usage: node scripts/deploy.mjs <${Object.keys(TARGETS).join("|")}>\n` +
      `       node scripts/deploy.mjs snapshot <tag>`,
  );
  process.exit(1);
};

const tagExists = (tag) => {
  try {
    execFileSync("git", ["rev-parse", "--verify", `refs/tags/${tag}`], {
      stdio: "ignore",
    });
    return true;
  } catch {
    return false;
  }
};

// A snapshot's target is derived from the tag rather than declared, since the
// whole point is that new ones get added over time.
const snapshotTarget = (tag) => ({
  outDir: `dist-${tag}`,
  base: `/${tag}/`,
  dest: tag,
  // Rooted at dest, so this can only ever clear this snapshot's own subtree.
  remove: ["**/*"],
  requireBranch: null,
  // A snapshot preserves a point in the design cycle, scaffolding and all.
  requireNoReleaseTags: false,
  url: `https://marketbuzzr.com/${tag}/`,
  fromTag: tag,
});

let target;
if (name === "snapshot") {
  if (!tagArg) usage();
  if (!tagExists(tagArg)) {
    console.error(
      `No such tag: '${tagArg}'.\n` +
        `Snapshots are built from tags so they stay frozen. Existing tags:\n` +
        execFileSync("git", ["tag", "-l"], { encoding: "utf8" })
          .trim()
          .split("\n")
          .map((t) => `  ${t}`)
          .join("\n"),
    );
    process.exit(1);
  }
  if (!PRESERVED_DIRS.includes(tagArg)) {
    console.error(
      `Refusing to publish snapshot '${tagArg}': it is not in PRESERVED_DIRS.\n` +
        `Without that entry the next live deploy would delete it, because the\n` +
        `live remove glob clears everything at the branch root that is not\n` +
        `explicitly held back. Add '${tagArg}' to PRESERVED_DIRS in this file.`,
    );
    process.exit(1);
  }
  target = snapshotTarget(tagArg);
} else {
  target = TARGETS[name];
  if (!target) usage();
}

// Source marked FIX-BEFORE-RELEASE is dev/design-cycle scaffolding: visible
// placeholders for unbuilt pages, notes about known problems in the artwork.
// Correct on the sandbox, wrong on the live site. Checked before the branch
// guard so it is reachable from any branch -- it is a property of the tree, not
// of where you are standing.
const RELEASE_TAG = "FIX-BEFORE-RELEASE";

const taggedFiles = (dir, found = []) => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = `${dir}/${entry.name}`;
    if (entry.isDirectory()) taggedFiles(path, found);
    else if (
      /\.(jsx?|css|html)$/.test(entry.name) &&
      readFileSync(path, "utf8").includes(RELEASE_TAG)
    ) {
      found.push(path);
    }
  }
  return found;
};

if (target.requireNoReleaseTags) {
  const tagged = taggedFiles("src");
  if (tagged.length > 0 && !process.env.ALLOW_UNRESOLVED_TAGS) {
    console.error(
      `Refusing to deploy '${name}' (${target.url}): ${tagged.length} file(s) still carry ${RELEASE_TAG}.\n` +
        tagged.map((f) => `  ${f}`).join("\n") +
        `\n\nEach tag says what to do -- and not all of them mean delete.\n` +
        `  grep -rn "${RELEASE_TAG}" src\n` +
        `To override: ALLOW_UNRESOLVED_TAGS=1 yarn deploy`,
    );
    process.exit(1);
  }
}

const branch = execFileSync("git", ["rev-parse", "--abbrev-ref", "HEAD"], {
  encoding: "utf8",
}).trim();

// The redesign lives on its own branch for weeks, so the easy mistake is
// publishing it to the apex domain out of habit. Only main reaches the live site.
if (target.requireBranch && branch !== target.requireBranch) {
  if (!process.env.ALLOW_ANY_BRANCH) {
    console.error(
      `Refusing to deploy '${name}' (${target.url}) from branch '${branch}'.\n` +
        `The live site is published from '${target.requireBranch}'.\n` +
        `Did you mean: yarn deploy:${SANDBOX_DIR}\n` +
        `To override: ALLOW_ANY_BRANCH=1 yarn deploy`,
    );
    process.exit(1);
  }
  console.warn(`ALLOW_ANY_BRANCH set -- deploying '${name}' from '${branch}'.`);
}

// The live remove glob clears the whole branch root except what PRESERVED_DIRS
// holds back, so a snapshot published without a matching entry there would be
// deleted by the next live deploy -- silently, and only noticed when someone
// followed a dead URL. Rather than trusting that list to be maintained, read
// what is actually on the branch and refuse if anything is unaccounted for.
if (target.dest === ".") {
  try {
    execFileSync("git", ["fetch", "--quiet", "origin", "gh-pages"], {
      stdio: "ignore",
    });
    const published = execFileSync(
      "git",
      ["ls-tree", "-d", "--name-only", "origin/gh-pages"],
      { encoding: "utf8" },
    )
      .trim()
      .split("\n")
      .filter(Boolean)
      // Dotted entries are not matched by the "**/*" remove glob, so they are
      // not at risk and not this guard's business.
      .filter((dir) => !dir.startsWith("."));

    const unaccounted = published.filter(
      (dir) => !PRESERVED_DIRS.includes(dir) && !LIVE_OWNED_DIRS.includes(dir),
    );

    if (unaccounted.length > 0 && !process.env.ALLOW_UNTRACKED_DIRS) {
      console.error(
        `Refusing to deploy 'live': gh-pages holds ${unaccounted.length} ` +
          `directory(ies) this deploy would delete:\n` +
          unaccounted.map((d) => `  ${d}/`).join("\n") +
          `\n\nIf these are snapshots or sandboxes to keep, add them to ` +
          `PRESERVED_DIRS in this file.\nIf they are genuinely stale, ` +
          `override once: ALLOW_UNTRACKED_DIRS=1 yarn deploy`,
      );
      process.exit(1);
    }
  } catch (err) {
    // A missing remote gh-pages branch means nothing is published yet, so
    // there is nothing to protect. Anything else should not pass unnoticed.
    console.warn(
      `Could not read origin/gh-pages to check for directories at risk ` +
        `(${err.message.trim()}). Proceeding.`,
    );
  }
}

// A snapshot builds from a detached worktree rather than checking the tag out
// in place: the working tree stays on whatever branch you are on, and a failed
// build cannot leave anyone stranded on a detached HEAD. node_modules is
// symlinked in rather than reinstalled -- safe only while the tag's
// package.json and yarn.lock match the current install, which is checked here.
const buildFromTag = (tag, base, outDir) => {
  const lockMatches = ["package.json", "yarn.lock"].every((file) => {
    try {
      execFileSync("git", ["diff", "--quiet", tag, "HEAD", "--", file], {
        stdio: "ignore",
      });
      return true;
    } catch {
      return false;
    }
  });
  if (!lockMatches) {
    console.error(
      `Refusing to build snapshot '${tag}': its package.json or yarn.lock ` +
        `differs from the current checkout.\nThe snapshot build reuses this ` +
        `checkout's node_modules, which would give '${tag}' dependencies it ` +
        `never had.\nInstall that tag's dependencies in a separate clone ` +
        `instead.`,
    );
    process.exit(1);
  }

  const worktree = mkdtempSync(join(tmpdir(), `mbz-snapshot-${tag}-`));
  rmSync(worktree, { recursive: true, force: true });
  execFileSync("git", ["worktree", "add", "--detach", worktree, tag], {
    stdio: "inherit",
  });
  try {
    symlinkSync(resolve("node_modules"), join(worktree, "node_modules"), "dir");
    execFileSync(
      resolve("node_modules/.bin/vite"),
      ["build", "--base", base, "--outDir", resolve(outDir), "--emptyOutDir"],
      { cwd: worktree, stdio: "inherit" },
    );
  } finally {
    execFileSync("git", ["worktree", "remove", "--force", worktree], {
      stdio: "inherit",
    });
  }
};

if (target.fromTag) {
  buildFromTag(target.fromTag, target.base, target.outDir);
} else {
  execFileSync(
    "node_modules/.bin/vite",
    ["build", "--base", target.base, "--outDir", target.outDir],
    { stdio: "inherit" },
  );
}

// CNAME belongs only at the branch root, where GitHub Pages reads it. Shipping a
// copy inside new/ or a snapshot would be inert but misleading.
if (target.dest !== ".") {
  rmSync(`${target.outDir}/CNAME`, { force: true });
}

const source = target.fromTag ? `tag ${target.fromTag}` : `${branch}`;
console.log(`Publishing ${target.outDir}/ to gh-pages:${target.dest}`);
await ghpages.publish(target.outDir, {
  dest: target.dest,
  remove: target.remove,
  message: `Deploy ${name} from ${source}`,
});
console.log(`Deployed: ${target.url}`);
