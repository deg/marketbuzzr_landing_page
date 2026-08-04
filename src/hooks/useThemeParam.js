import { useSearchParams } from "react-router-dom";

// Which theme the current address asks for. The URL is the only source of
// truth: nothing is remembered in storage, so what you see is always what the
// address says, and a link can be pasted to someone else and arrive the same
// way round.
//
// BOTH PLACES THE QUERY CAN GO ARE ACCEPTED. Under HashRouter, useSearchParams
// reads the query INSIDE the hash, so .../#/use-cases/biotech?theme=light
// worked and .../?theme=light#/use-cases/biotech -- the form anyone would
// actually type -- was ignored in silence: no error, no hint, just a dark page.
// The hash wins when both are present, so following a link always beats
// whatever the address bar happened to be carrying when the page loaded.
//
// Anything that is not a known theme is ignored rather than treated as an
// error, so ?theme=blue simply gives the default.
export const THEMES = ["dark", "light"];

export const useThemeParam = () => {
  const [params] = useSearchParams();
  // The hash query is reactive and changes as you navigate; the one before the
  // hash can only change by loading the page, which remounts this anyway.
  const beforeHash = new URLSearchParams(window.location.search).get("theme");
  const requested = params.get("theme") ?? beforeHash;
  return THEMES.includes(requested) ? requested : THEMES[0];
};
