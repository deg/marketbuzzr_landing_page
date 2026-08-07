// Other Industries, built from section 8 of Manu's August 2026 handover
// (drop_06_MarketBuzzr_CTO_Website_Handover_Aug2026.docx in the design repo).
//
// This is the sixth industry destination, and section 7 puts it in the list in
// place of Life Sciences. It is the one page in the set that is not about an
// industry at all: it says MarketBuzzr works for a market that has no
// predefined category, which is why his brief also asks the entry page to
// "communicate that MarketBuzzr supports highly specialized and niche markets".
//
// HE SPECIFIES MORE OF THIS PAGE THAN OF ANY OTHER. Verbatim from the docx: the
// eyebrow, the headline, the hero paragraph, the "See What Matters" paragraph,
// the section headline, all six category names, the closing headline and the
// closing paragraph. Casing is the site's rather than his, for the reason set
// out in publicSafety.js.
//
// WHAT IS NOT IN THE DOCX, and had to be written here, is the worked insight
// example — and the reason there is none is presumably that an insight for "your
// industry" cannot be about any particular industry. The template needs one, so
// this page carries the most general form of the thing the product does: a
// competitor moving onto ground you already occupy. It names no company, for the
// same reason the Public Safety example names no agency, and here the omission
// is also the point — the page is about *your* market, so a made-up company from
// somebody else's would be the wrong illustration.
//
// Also written here: the seven source chips, the six category descriptions and
// the closing line under them. All listed as invented in updates_from_claude.md.
export const otherIndustries = {
  slug: "other-industries",
  // NOT "for Your Industry", which is the /industries entry page's title. Two
  // pages sharing a browser-tab title is confusing in a tab strip and worse in
  // search results, and "Your Industry" is the phrase that page has.
  title: "Market Intelligence for Niche and Specialized Markets — MarketBuzzr",

  hero: {
    kicker: "MARKETBUZZR FOR YOUR INDUSTRY",
    title: "Your market is unique. Your intelligence should be too.",
    sub: [
      "MarketBuzzr adapts to your specific industry, niche and competitive landscape by tracking the sources, companies, conversations and developments that matter to your business.",
    ],
  },

  // Deliberately the most generic set of chips on any industry page: these are
  // the kinds of place a signal comes from rather than the topics of one market,
  // which is what "the sources, companies, conversations and developments" in
  // his hero paragraph describes.
  sources: {
    mark: "target",
    items: [
      { icon: "building", label: "Your competitors" },
      { icon: "article", label: "Industry media" },
      { icon: "threads", label: "Forums & communities" },
      { icon: "video", label: "YouTube & webinars" },
      { icon: "calendar", label: "Conferences & events" },
      { icon: "release", label: "Company announcements" },
      { icon: "bank", label: "Regulation & policy" },
    ],
  },

  intro: {
    // No heading is given for this section on this page. Using the one his
    // MedTech and FinTech pages both carry rather than inventing a sixth
    // variation.
    heading: "See what matters. Understand what it means.",
    paragraphs: [
      "MarketBuzzr learns your company, market, competitors, goals and priorities, then evaluates developments across your ecosystem to show you what deserves attention and what to do next.",
    ],
  },

  insight: {
    tag: "Competitor positioning",
    detected: "Jul 14, 2026 • 3:41 PM",
    impact: "High impact",
    headline:
      "A competitor repositions around a segment you already sell to and begins publishing against it.",
    summary:
      "A company in your category rewrote its site around a customer type you already serve and started producing content and events aimed at the same buyers.",
    implication: {
      text: "A competitor moving onto your ground changes which comparisons buyers make. If their language becomes the way the segment gets described, differentiating later costs more than answering now.",
    },
    actions: {
      items: [
        "Assess how far their new positioning overlaps the accounts we already serve",
        "Compare the claims they lead with against the ones our own material leads with",
        "Decide what to say to buyers who will now be hearing both",
      ],
    },
    sources: {
      items: [
        { icon: "release", name: "Company announcement", kind: "Official communication" },
        { icon: "article", name: "Industry publication", kind: "Market coverage" },
        { icon: "threads", name: "Community discussion", kind: "Practitioner signal" },
        { icon: "video", name: "Webinar coverage", kind: "Event content" },
      ],
    },
    drafts: {
      items: ["Blog Post", "LinkedIn Post", "Battlecard", "Talk Track"],
    },
  },

  roles: {
    items: [
      { name: "Executive", outputs: "Executive Brief · Board Talking Points" },
      { name: "Marketing", outputs: "Blog Post · LinkedIn Post" },
      { name: "Sales", outputs: "Battlecard · Talk Track" },
    ],
  },

  features: {
    // His section headline, sentence case and without the full stop the other
    // five section headings also do without.
    heading: "Built around your market",
    // His six category names. The descriptions are not his.
    items: [
      {
        icon: "building",
        heading: "Your competitors",
        description:
          "Follow the companies you actually compete with, whether or not the category has a name yet, and what they are telling the buyers you share.",
      },
      {
        icon: "article",
        heading: "Your industry sources",
        description:
          "Track the publications, analysts, communities and events your market pays attention to, including the small ones a general tool would never reach.",
      },
      {
        icon: "trend",
        heading: "Your market dynamics",
        description:
          "Understand what is changing in pricing, demand, regulation, technology and the expectations of the people who buy from you.",
      },
      {
        icon: "target",
        heading: "Your opportunities",
        description:
          "Spot the segments, partnerships, use cases and openings worth pursuing before they become obvious to everyone else.",
      },
      {
        icon: "shield",
        heading: "Your risks",
        description:
          "See the shifts, new entrants and changes in sentiment that could affect your position, early enough to decide what to do about them.",
      },
      {
        icon: "compass",
        heading: "Your priorities",
        description:
          "Every development is judged against your company, products, goals and role, so what reaches you is what bears on the decisions you make.",
      },
    ],
    closer:
      "MarketBuzzr works from your definition of your market rather than a predefined category, which is what lets it fit a specialized or niche business as readily as a large one.",
  },

  closing: {
    heading: "Whatever your market, start with what matters",
    paragraphs: [
      "See what MarketBuzzr finds for your company and turn the developments shaping your market into intelligence you can act on.",
    ],
  },
};
