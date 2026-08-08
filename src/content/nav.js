import { home } from "./home";

// Site navigation, from drop_07 §2 in the design repo
// (~/Documents/marketbuzzr/marketbuzzr_landing_page_design/).
//
// Wordmark, then How It Works, What You Get and Industries, then the two CTAs.
// §2 asks for those three links to sit "closer to the logo than in the current
// implementation so they read as one navigation group", which is a reversal:
// the August handover centred them and this brief pulls them back left.
//
// THE INDUSTRIES DROPDOWN IS BACK. drop_06's checklist said the bar contained
// "only MarketBuzzr, How It Works, Industries, Try for Free and Book a Demo",
// and the menu machinery was deleted on that reading (mbz-et8e.52.5). §2 says
// "Industries uses a dropdown. Use the industry order in Section 6", so it
// returns, recovered from that commit rather than rewritten.
//
// THE ENTRY PAGE IS THE FIRST ITEM IN THE PANEL. /industries is a real page and
// the dropdown toggle is a button, not a link, so without this the page his own
// §6 specifies would be unreachable from the bar. Not something §2 asks for; it
// is what keeps §2 and §6 from contradicting each other.
//
// The industry list is imported rather than restated. content/home.js is the
// only list of industries on the site and this and content/industries.js both
// read it, so the bar cannot drift from the grid.
export const nav = {
  items: [
    { label: "How It Works", to: "/how-it-works" },
    { label: "What You Get", to: "/what-you-get" },
    {
      label: "Industries",
      items: [
        { label: "All Industries", to: "/industries" },
        ...home.industries.items.map(({ name, to }) => ({ label: name, to })),
      ],
    },
  ],
  // Both, in his order, and the fills are set by the shared CTA rules: Try for
  // Free filled, Book a Demo outlined (mbz-et8e.52.4).
  ctaPrimary: "Try for Free",
  ctaSecondary: "Book a Demo",
};
