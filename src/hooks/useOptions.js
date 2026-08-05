import { useSearchParams } from "react-router-dom";
import { OPTIONS, OPTION_NAMES } from "../options";

// The current value of every option in the registry, resolved from the address.
//
// Two places are read, in this order:
//
//   1. INSIDE THE HASH — #/how-it-works?theme=light. This is what
//      useSearchParams returns under HashRouter, and it wins, so following a
//      link that names an option beats whatever the prefix happened to carry.
//   2. BEFORE THE HASH — /?theme=light#/how-it-works. This is where an option
//      lives once canonicalised, and where it survives navigation.
//
// Anything unrecognised falls back to the option's default rather than being an
// error, so a typo shows the normal site instead of a broken one.
//
// Reading is separate from writing on purpose: this hook is a pure read, and
// canonicaliseOptions below is the only thing that touches the address.
export const useOptions = () => {
  const [inHash] = useSearchParams();
  // The prefix query can only change by loading the page, which remounts this.
  const beforeHash = new URLSearchParams(window.location.search);

  return Object.fromEntries(
    OPTION_NAMES.map((name) => {
      const { values, default: fallback } = OPTIONS[name];
      const asked = inHash.get(name) ?? beforeHash.get(name);
      return [name, values.includes(asked) ? asked : fallback];
    })
  );
};

// Move every option into the prefix, and take it back out of the hash.
//
// Called after the options have been resolved, so it writes what the page is
// actually showing rather than what the address asked for — an address that
// said ?theme=blue ends up saying ?theme=dark, which is what you are looking at.
//
// Unrelated query parameters are preserved on both sides of the #; only the
// registered names are moved. Uses replaceState rather than pushState so the
// tidy-up does not become a step in the back button, and so it does not count as
// a navigation: the hash is left byte-identical apart from the options being
// removed, which is why the router does not react to it.
//
// Returns nothing and does nothing at all when the address is already correct,
// which is the case on every navigation after the first.
export const canonicaliseOptions = (resolved) => {
  const url = new URL(window.location.href);
  const prefix = url.searchParams;
  const [hashPath, hashQuery = ""] = url.hash.split("?");
  const inHash = new URLSearchParams(hashQuery);

  let changed = false;
  for (const name of OPTION_NAMES) {
    if (inHash.has(name)) {
      inHash.delete(name);
      changed = true;
    }
    if (prefix.get(name) !== resolved[name]) {
      prefix.set(name, resolved[name]);
      changed = true;
    }
  }
  if (!changed) return;

  const leftover = inHash.toString();
  window.history.replaceState(
    null,
    "",
    `${url.pathname}?${prefix}${hashPath}${leftover ? `?${leftover}` : ""}`
  );
};
