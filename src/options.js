// Options that can be switched from the address bar while a design is being
// reviewed. One entry today; the table exists so the next trial is a line here
// rather than another pass over the whole app.
//
// Each option becomes a data attribute on <html> — `theme` sets `data-theme` —
// which is what styles.css keys its variants off. Values not in the list fall
// back to the default rather than erroring, so ?theme=blue simply gives dark.
//
// WHERE THE VALUE LIVES IN THE ADDRESS is the whole design, and it is BEFORE
// THE HASH: marketbuzzr.com/4aug_v5/?theme=light#/how-it-works. Hash routing
// never touches that part of a URL, so an option cannot be dropped by anything
// that navigates. That is not a hypothetical tidiness argument — the previous
// version kept it inside the hash, which meant every <Link> had to be wrapped to
// copy it across, and the one <Navigate> in App.jsx was missed and silently
// reverted the page to dark. There is nothing left to remember to wrap.
//
// The form inside the hash — #/how-it-works?theme=light — is still ACCEPTED, and
// rewritten into the prefix on arrival. Links in that form have already been
// sent out and have to keep working.
//
// This is review scaffolding. When the light design is settled, this file, the
// hook beside it and the [data-theme] blocks in styles.css come out together.
export const OPTIONS = {
  theme: { values: ["dark", "light"], default: "dark" },
};

export const OPTION_NAMES = Object.keys(OPTIONS);
