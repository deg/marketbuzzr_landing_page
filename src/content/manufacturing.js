// Manufacturing industry page, from drop_07 §10 in the design repo
// (~/Documents/marketbuzzr/marketbuzzr_landing_page_design/).
//
// Eighth page on the IndustryPage template. Copy is his, with the same house
// convention as its siblings: headings in sentence case with no trailing full
// stop. See cybersecurity.js for the notes that apply to all three of the pages
// drop_07 adds.
//
// ManuCorp is his own mock name -- §10: "use an obviously fictional company name
// in the insight example; ManuCorp is acceptable as a mock name."
//
// The hero mark is `cube`, shared with Enterprise Technology.
//
// Icon names are keys in components/CategoryIcon.jsx.
export const manufacturing = {
  slug: "manufacturing",
  title: "Market Intelligence for Manufacturing — MarketBuzzr",

  hero: {
    kicker: "MARKETBUZZR FOR MANUFACTURING",
    title: "Stay ahead of the changes shaping manufacturing",
    sub: [
      "MarketBuzzr monitors competitors, automation, supply chain developments, emerging technologies, regulation, partnerships and changing demand to identify what matters to your business and turn it into intelligence you can act on.",
    ],
  },

  sources: {
    mark: "cube",
    items: [
      { icon: "chip", label: "Automation & industrial tech" },
      { icon: "rocket", label: "Competitor launches" },
      { icon: "globe", label: "Supply chain & operations" },
      { icon: "bank", label: "Regulation & policy" },
      { icon: "handshake", label: "Partnerships & M&A" },
      { icon: "trend", label: "Market & customer demand" },
      { icon: "target", label: "Growth opportunities" },
    ],
  },

  intro: {
    heading: "See what matters. Understand what it means",
    paragraphs: [
      "MarketBuzzr brings together signals from across the manufacturing ecosystem and evaluates them in the context of your company, products, competitors and priorities, so you can quickly understand what deserves attention and what to do next.",
    ],
  },

  insight: {
    tag: "Competitor capacity",
    detected: "Aug 5, 2026 • 2:37 PM",
    impact: "High impact",
    headline:
      "ManuCorp commits to a second automated line at its regional plant.",
    summary:
      "A competitor has announced additional automated capacity close to shared customers, alongside a stated target of shorter lead times on its mid-volume range.",
    actions: {
      items: [
        "Compare our quoted lead times on the ranges this overlaps",
        "Review which accounts are most exposed to a lead-time comparison",
        "Assess whether our own automation roadmap needs resequencing",
      ],
    },
    implication: {
      text: "Capacity close to a shared customer changes what that customer treats as normal. If shorter lead times become the expectation in this segment, the comparison moves from price to responsiveness, where our current schedule is the weaker argument.",
    },
    sources: {
      items: [
        { icon: "release", name: "Company announcement", kind: "Capacity plans" },
        { icon: "article", name: "Trade publication", kind: "Sector coverage" },
        { icon: "bank", name: "Permit filing", kind: "Public record" },
        { icon: "message", name: "Analyst commentary", kind: "Market analysis" },
      ],
    },
    drafts: {
      items: [
        "Draft Account Brief",
        "Draft Talk Track",
        "Draft Internal Update",
        "Draft Board Talking Points",
      ],
    },
  },

  roles: {
    items: [
      { name: "Executive", outputs: "Executive Brief · Board Talking Points" },
      { name: "Marketing", outputs: "Positioning Note · Blog Post" },
      { name: "Sales", outputs: "Account Brief · Talk Track" },
    ],
  },

  features: {
    heading: "Stay ahead across the manufacturing landscape",
    items: [
      {
        icon: "chip",
        heading: "Automation & industrial technology",
        description:
          "Track robotics, industrial automation, AI, software and new technologies changing how products are designed, produced and operated.",
      },
      {
        icon: "rocket",
        heading: "Competitors & products",
        description:
          "Follow product launches, capacity moves, positioning changes and strategic developments across competitors and new entrants.",
      },
      {
        icon: "globe",
        heading: "Supply chain & operations",
        description:
          "Stay informed about supply chain shifts, sourcing changes, logistics developments and operational trends that could affect your market.",
      },
      {
        icon: "bank",
        heading: "Regulation & policy",
        description:
          "Follow regulatory, trade, sustainability and policy developments affecting products, production and target markets.",
      },
      {
        icon: "handshake",
        heading: "Partnerships & M&A",
        description:
          "Track acquisitions, investments, joint ventures and strategic partnerships reshaping the manufacturing ecosystem.",
      },
      {
        icon: "trend",
        heading: "Market & customer demand",
        description:
          "Understand changing customer requirements, demand patterns, new use cases and emerging market opportunities.",
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
