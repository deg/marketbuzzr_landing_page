// Publishes one of two sites to the single `gh-pages` branch:
//
//   live  -> branch root -> https://marketbuzzr.com
//   new   -> branch new/ -> https://marketbuzzr.com/new/
//
// Both live on one branch because GitHub Pages keeps its custom domain in a
// single CNAME file at the branch root, so one repo serves exactly one domain.
// A real new.marketbuzzr.com would need a second repo; a subdirectory needs no
// DNS or GitHub settings changes at all. The app uses HashRouter, so routes
// under the subdirectory are /new/#/how-it-works and need no SPA rewrite rules.
//
// Usage: node scripts/deploy.mjs <live|new>

import { execFileSync } from "node:child_process";
import { rmSync } from "node:fs";
import ghpages from "gh-pages";

const SANDBOX_DIR = "new";

const TARGETS = {
  live: {
    outDir: "dist",
    base: "/",
    dest: ".",
    // gh-pages roots `remove` at `dest`, so the default of "." expands to every
    // file at the branch root -- including the sandbox. Keep new/ out of it.
    // This must stay an array: a "!(new)" string is read by globby as a bare
    // negation with no positive pattern, which matches nothing and would leave
    // every stale file in place.
    remove: ["**/*", `!${SANDBOX_DIR}/**`],
    requireBranch: "main",
    url: "https://marketbuzzr.com",
  },
  [SANDBOX_DIR]: {
    outDir: `dist-${SANDBOX_DIR}`,
    base: `/${SANDBOX_DIR}/`,
    dest: SANDBOX_DIR,
    // Rooted at dest, so this can only ever clear the sandbox subtree.
    remove: ["**/*"],
    requireBranch: null,
    url: `https://marketbuzzr.com/${SANDBOX_DIR}/`,
  },
};

const name = process.argv[2];
const target = TARGETS[name];
if (!target) {
  console.error(
    `Usage: node scripts/deploy.mjs <${Object.keys(TARGETS).join("|")}>`,
  );
  process.exit(1);
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

execFileSync(
  "node_modules/.bin/vite",
  ["build", "--base", target.base, "--outDir", target.outDir],
  { stdio: "inherit" },
);

// CNAME belongs only at the branch root, where GitHub Pages reads it. Shipping a
// copy inside new/ would be inert but misleading.
if (target.dest !== ".") {
  rmSync(`${target.outDir}/CNAME`, { force: true });
}

console.log(`Publishing ${target.outDir}/ to gh-pages:${target.dest}`);
await ghpages.publish(target.outDir, {
  dest: target.dest,
  remove: target.remove,
  message: `Deploy ${name} from ${branch}`,
});
console.log(`Deployed: ${target.url}`);
