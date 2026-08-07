// Enterprise Technology, rebuilt on the shared IndustryPage template from
// section 8 of Manu's August 2026 handover
// (drop_06_MarketBuzzr_CTO_Website_Handover_Aug2026.docx in the design repo).
//
// THIS REPLACES content/tech.js, which was the last page on UseCasePage.jsx —
// a second page template that shipped a different hero, four descriptive cards
// and a six-question "are you struggling with..." list. None of that structure
// survives, because the handover is explicit: "All six industry destinations
// must use the same page structure and styling." UseCasePage.jsx goes with it.
//
// THE COPY IS ALL NEW TOO. tech.js carried Manu's much earlier "Market
// Intelligence for Tech Companies" section, written before the industry-page
// system existed; section 8 supersedes it outright with a fresh headline, hero
// paragraph, "See What Matters" paragraph and six category names.
//
// THE ROUTE DOES NOT MOVE. It stays /use-cases/tech for the same reason
// Biotechnology stayed at /use-cases/biotech when it moved templates: renaming
// breaks the homepage list and any external link for no reader benefit, and the
// standing decision recorded in IndustryPage.jsx is that pages already at
// /use-cases/* stay there while new pages take /industries/*.
//
// WHAT IS HIS, VERBATIM: the hero paragraph, the "See What Matters" paragraph,
// the six category names, and the insight headline, which section 8 gives word
// for word along with the instruction to use TechCorp as the deliberately
// obvious mock competitor. WHAT WAS WRITTEN HERE: the eyebrow, the headline's
// casing, the source chips, the rest of the insight card, the six category
// descriptions, the closer and the closing block. Listed as invented in
// updates_from_claude.md.
export const enterpriseTech = {
  slug: "enterprise-tech",
  title: "Market Intelligence for Enterprise Technology — MarketBuzzr",

  hero: {
    kicker: "MARKETBUZZR FOR ENTERPRISE TECHNOLOGY",
    // Sentence case, as on all four other industry pages. His docx writes it
    // title case with a full stop; see publicSafety.js for why the words are
    // kept and the capitals are not.
    title: "Stay ahead of the changes shaping enterprise technology",
    sub: [
      "MarketBuzzr monitors competitors, product launches, technology shifts, customer trends, partnerships, funding and changing market needs to identify what matters to your business and turn it into intelligence you can act on.",
    ],
  },

  // The seven chips are the seven things his hero paragraph names, in his order.
  // `mark` is set because HeroMark falls back to the DNA helix otherwise; the
  // stacked cube is drawn for this page in components/HeroMark.jsx.
  sources: {
    mark: "cube",
    items: [
      { icon: "building", label: "Competitor moves" },
      { icon: "rocket", label: "Product launches" },
      { icon: "chip", label: "Technology shifts" },
      { icon: "people", label: "Customer trends" },
      { icon: "handshake", label: "Partnerships & M&A" },
      { icon: "coins", label: "Funding & investment" },
      { icon: "trend", label: "Changing market needs" },
    ],
  },

  intro: {
    heading: "See what matters. Understand what it means.",
    paragraphs: [
      "MarketBuzzr brings together signals from across your technology ecosystem and evaluates them in the context of your company, products, competitors and priorities, so you can quickly understand what deserves attention and what to do next.",
    ],
  },

  insight: {
    tag: "Competitor launch",
    detected: "Jun 19, 2026 • 2:38 PM",
    impact: "High impact",
    // His headline, word for word, including the full stop — section 8 supplies
    // it and names TechCorp as the mock competitor, which is the same device
    // FinTech uses with PayNova.
    headline:
      "TechCorp introduces AI automation capabilities and shifts positioning toward enterprise teams.",
    summary:
      "TechCorp announced automation features built on its own models and repositioned its messaging around large teams, shifting away from the smaller buyers it has led with until now.",
    implication: {
      text: "The move puts TechCorp in front of the buyers you sell to and reframes automation as a platform capability rather than an extra. Expect evaluations to start asking what your equivalent is, and expect the language of the category to follow their framing if nobody answers it.",
    },
    actions: {
      items: [
        "Assess how our automation story compares with what TechCorp now claims",
        "Analyze what the repositioning changes about which deals we meet them in",
        "Identify the messaging we need before the next enterprise buying cycle",
      ],
    },
    sources: {
      items: [
        { icon: "release", name: "Company press release", kind: "Official announcement" },
        { icon: "article", name: "Industry publication", kind: "Market coverage" },
        { icon: "message", name: "Analyst report", kind: "Expert analysis" },
        { icon: "threads", name: "Community discussion", kind: "Practitioner signal" },
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
    heading: "Stay ahead across the enterprise technology landscape",
    // His six category names, lowercased to the house style the other industry
    // pages use. The descriptions are not his and are not in the docx.
    items: [
      {
        icon: "building",
        heading: "Competitors & products",
        description:
          "Follow product launches, pricing changes, positioning shifts and roadmap signals from established players and newer entrants in your category.",
      },
      {
        icon: "chip",
        heading: "AI & emerging technology",
        description:
          "Spot developments in AI, automation, data infrastructure and the other technologies changing what buyers expect a platform to do.",
      },
      {
        icon: "trend",
        heading: "Market & customer trends",
        description:
          "Understand how buying committees, adoption patterns and customer expectations are shifting across the segments you sell into.",
      },
      {
        icon: "message",
        heading: "Positioning & messaging",
        description:
          "See how competitors describe themselves, which claims they lead with and where the language of your category is moving.",
      },
      {
        icon: "handshake",
        heading: "Partnerships & M&A",
        description:
          "Track integrations, alliances, acquisitions and investments that could change who you compete with and who you build alongside.",
      },
      {
        icon: "target",
        heading: "Growth & market opportunities",
        description:
          "Identify emerging segments, new use cases, geographic openings and unmet needs worth building or selling into.",
      },
    ],
    closer:
      "MarketBuzzr helps your team stay on top of the developments that could shape your strategy, products and growth.",
  },

  closing: {
    heading: "Stay ahead of what's shaping your market",
    paragraphs: [
      "See what matters sooner, understand what it means for your business, and act while it still matters.",
    ],
  },
};
