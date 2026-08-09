import { home } from "./home";

// The /industries entry page, from Manu's drop_06 Industries handover in the
// design repo (~/Documents/marketbuzzr/marketbuzzr_landing_page_design/).
//
// The page exists to say one thing — MarketBuzzr works for a broad industry and
// for a narrow niche — and then get out of the way. His brief is emphatic about
// keeping it short, and about it feeling like a page of this site rather than a
// new landing page: reuse the navigation, footer, typography, spacing, buttons,
// radii, card treatment, hover behaviour and breakpoints. No image, no
// animation, no new sections.
//
// So there is nothing here but copy. The page is PageHero + SectionTitle +
// IndustryTile + CtaPanel, all of which already existed.
//
// THE NINE ARE NOT LISTED HERE. They come from home.js, which is the one list
// the nav also reads, so the three surfaces cannot drift. His card copy lives
// beside each name there for the same reason.
//
// IT HAS AN EYEBROW AGAIN. drop_06's page structure listed the headline, one
// paragraph, the supporting line, the section heading, the boxes and the
// closing panel, with no kicker among them, so this page shipped as the only
// one on the site without one. drop_07 §6.1 opens with "Eyebrow: INDUSTRIES",
// which settles it the other way and brings the page into line with the rest.
//
// CTA LABELS are now the site's, set by the August handover: "Try for Free"
// filled, "Book a Demo" outlined, those exact words everywhere (mbz-et8e.52.4).
// This page's own brief wrote "Try It Free" and "Request a Demo" — the latter a
// typo for "Book a Demo" — and both are superseded.
export const industries = {
  title: "Market Intelligence for Your Industry — MarketBuzzr",

  // All of drop_07 §6.1. The headline moves here from the Other Industries page,
  // which used it as its own hero and which §12 gives a different one.
  hero: {
    kicker: "INDUSTRIES",
    title: "Your market is unique. Your intelligence should be too.",
    sub: [
      "Every industry moves differently. Different competitors, regulations, technologies, customer expectations and market dynamics shape what matters. MarketBuzzr is built around your niche, your company and your priorities, so you can stay ahead of the developments that could impact your business.",
    ],
  },

  // NO `emphasis` AND NO `picker`. drop_10 §6 deletes three pieces of copy from
  // this page by quoting each one: the hero's closing line "Focused
  // intelligence around your world.", the section heading "Explore MarketBuzzr
  // by Industry" and its supporting line "See how MarketBuzzr can help teams
  // stay ahead of the developments shaping their market." — then asks the grid
  // to sit "directly below the hero copy with normal section spacing" with no
  // large empty gap. That empties the picker block entirely, so the nine tiles
  // are the whole section (mbz-et8e.55.5).
  //
  // The nine and their card copy are unchanged, and §6 says so twice.

  // §6.4, replacing drop_06's wording for the same panel.
  finalCta: {
    title: "Don't see your industry?",
    paragraphs: [
      "MarketBuzzr isn't limited to the industries above. We build your market intelligence around your company, your ecosystem and the developments that matter to your team.",
    ],
    ctaPrimary: "Try for Free",
    ctaSecondary: "Book a Demo",
  },

  items: home.industries.items,
};
