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
// THE SIX ARE NOT LISTED HERE. They come from home.js, which is the one list
// the nav also reads, so the three surfaces cannot drift. His card copy lives
// beside each name there for the same reason.
//
// NO EYEBROW, unlike every other page on the site. His page structure lists
// nav, headline, one paragraph, the supporting line, the section heading and
// subtitle, six boxes, the closing section, its CTAs, and the footer — and a
// kicker is not among them.
//
// CTA LABELS are the homepage's pair. His brief writes "Try It Free" and
// "Request a Demo"; the second is a typo for "Book a Demo" rather than a third
// variant of the label, confirmed with the user. Order follows the homepage.
export const industries = {
  title: "Market Intelligence for Your Industry — MarketBuzzr",

  hero: {
    title: "Market Intelligence for Your Industry",
    sub: [
      "Every market is different. MarketBuzzr adapts to yours by tracking the competitors, sources, conversations and developments that shape your specific industry and niche.",
    ],
    emphasis: "Focused intelligence around your world.",
  },

  picker: {
    title: "Explore MarketBuzzr by Industry",
    lead: "See how MarketBuzzr can help teams stay ahead of the developments shaping their market.",
  },

  finalCta: {
    title: "Don't See Your Industry?",
    paragraphs: [
      "MarketBuzzr isn't limited to predefined categories. We can build focused market intelligence around almost any industry, niche or market definition.",
    ],
    ctaPrimary: "Book a Demo",
    ctaSecondary: "Try It Free",
  },

  items: home.industries.items,
};
