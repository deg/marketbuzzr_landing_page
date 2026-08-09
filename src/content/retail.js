// Retail industry page, from drop_07 §11 in the design repo
// (~/Documents/marketbuzzr/marketbuzzr_landing_page_design/).
//
// Ninth page on the IndustryPage template, and the last of the three drop_07
// adds. Copy is his, with the same house convention as its siblings: headings in
// sentence case with no trailing full stop. See cybersecurity.js for the notes
// that apply to all three.
//
// RetailCorp is his own mock name -- §11: "use an obviously fictional company
// name in the insight example; RetailCorp is acceptable as a mock name."
//
// The hero mark is `card`, shared with Financial Technology.
//
// Icon names are keys in components/CategoryIcon.jsx.
export const retail = {
  slug: "retail",
  title: "Market Intelligence for Retail — MarketBuzzr",

  hero: {
    kicker: "MARKETBUZZR FOR RETAIL",
    title: "Stay ahead of the changes shaping retail",
    sub: [
      "MarketBuzzr monitors competitors, consumer trends, channel shifts, new technologies, partnerships and changing market dynamics to identify what matters to your business and turn it into intelligence you can act on.",
    ],
  },

  sources: {
    mark: "card",
    items: [
      { icon: "rocket", label: "Competitor moves" },
      { icon: "people", label: "Consumer trends" },
      { icon: "globe", label: "Commerce & channels" },
      { icon: "chip", label: "Technology & innovation" },
      { icon: "handshake", label: "Partnerships & M&A" },
      { icon: "trend", label: "Growth opportunities" },
      { icon: "target", label: "Emerging segments" },
    ],
  },

  intro: {
    heading: "See what matters. Understand what it means.",
    paragraphs: [
      "MarketBuzzr brings together signals from across the retail ecosystem and evaluates them in the context of your company, products, competitors and priorities, so you can quickly understand what deserves attention and what to do next.",
    ],
  },

  insight: {
    tag: "Channel shift",
    detected: "Aug 6, 2026 • 11:48 AM",
    impact: "High impact",
    headline:
      "RetailCorp moves its loyalty programme into a social commerce partnership.",
    summary:
      "A competitor has tied its loyalty scheme to checkout inside a social platform, putting rewards and discovery in the same place rather than sending shoppers back to its own storefront.",
    actions: {
      items: [
        "Review where our own loyalty scheme sits relative to discovery",
        "Assess which categories are most exposed to in-platform checkout",
        "Prepare a view on partnership options for the next planning cycle",
      ],
    },
    implication: {
      text: "Loyalty has been a reason to return to a storefront. If rewards start living where discovery happens, the storefront stops being the destination and becomes fulfilment, which changes what our own programme is competing on.",
    },
    sources: {
      items: [
        { icon: "release", name: "Partnership announcement", kind: "Company release" },
        { icon: "article", name: "Retail publication", kind: "Sector coverage" },
        { icon: "threads", name: "Shopper discussion", kind: "Consumer sentiment" },
        { icon: "message", name: "Analyst commentary", kind: "Channel analysis" },
      ],
    },
    drafts: {
      items: [
        "Draft Executive Brief",
        "Draft Category Note",
        "Draft Talk Track",
        "Draft Board Talking Points",
      ],
    },
  },

  roles: {
    items: [
      { name: "Executive", outputs: "Executive Brief · Board Talking Points" },
      { name: "Marketing", outputs: "Category Note · Blog Post" },
      { name: "Sales", outputs: "Account Brief · Talk Track" },
    ],
  },

  features: {
    heading: "Stay ahead across the retail landscape",
    items: [
      {
        icon: "rocket",
        heading: "Competitors & market moves",
        description:
          "Follow store concepts, product launches, pricing changes, positioning shifts and strategic moves across competitors and new entrants.",
      },
      {
        icon: "people",
        heading: "Consumer trends",
        description:
          "Understand changing customer preferences, expectations, behaviors and the trends influencing purchasing decisions.",
      },
      {
        icon: "globe",
        heading: "Commerce & channel shifts",
        description:
          "Track changes across physical retail, ecommerce, marketplaces, social commerce and omnichannel experiences.",
      },
      {
        icon: "chip",
        heading: "Technology & innovation",
        description:
          "Stay informed about AI, automation, personalization, retail technology and new tools changing customer and operating models.",
      },
      {
        icon: "handshake",
        heading: "Partnerships & M&A",
        description:
          "Track partnerships, acquisitions, investments and ecosystem relationships reshaping the competitive landscape.",
      },
      {
        icon: "trend",
        heading: "Growth & market opportunities",
        description:
          "Identify emerging segments, new formats, geographic opportunities and areas of changing demand.",
      },
    ],
  },

  closing: {
    heading: "Stay ahead of what's shaping your market",
    paragraphs: [
      "See what matters sooner, understand what it means for your business, and act while it still matters.",
    ],
  },
};
