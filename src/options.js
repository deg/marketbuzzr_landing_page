// Options that can be switched from the address bar while a design is being
// reviewed.
//
// THE TABLE IS EMPTY, AND THE MECHANISM AROUND IT IS DELIBERATELY KEPT. It was
// built for ?theme=light|dark, that trial is over and dark won (mbz-et8e.49),
// and the next question about an unfinished design will want exactly the same
// thing. Registering one is the line below and nothing else:
//
//   export const OPTIONS = {
//     layout: { values: ["stacked", "split"], default: "stacked" },
//   };
//
// That alone gets it read from the address, validated, defaulted, canonicalised
// into the prefix, and written to <html data-layout="..."> for CSS to key off.
// Nothing else in the app has to know it exists.
//
// Two things to know before adding one:
//
//   THE DEFAULT SHOULD BE THE UNSCOPED CSS. Write the default's rules as plain
//   selectors and every other value as an override scoped to [data-<name>].
//   Retiring the trial is then a deletion, which is what made mbz-et8e.49 a
//   139-line subtraction with no specificity to untangle. The reverse — the
//   default scoped, the base belonging to a variant — is the arrangement that
//   made 648943f a careful piece of work rather than a delete.
//
//   VALUES ARE WRITTEN OUT EVEN WHEN THEY ARE THE DEFAULT, so an address always
//   says which way round the page is. That was a deliberate call for a
//   debugging switch and would be wrong for a real user preference.
//
// Since nothing is registered, nothing runs: no attribute is set and no address
// is rewritten. It stays that way until this table has an entry.
export const OPTIONS = {};

export const OPTION_NAMES = Object.keys(OPTIONS);
