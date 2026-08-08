// Financial Services & FinTech industry page, from Manu's drop_05 sketch
// (drop_05_marketbuzzr-fintech-landing.html in the design repo).
//
// Second page on the IndustryPage template. Copy is his, verbatim, including
// the em dashes. The one exception is the insight card's timestamp — see the
// note in biotech.js for why the six pages carry six different dates.
//
// Two things this page needed that biotech did not, both handled in the shared
// components rather than here: SIX capabilities where biotech has four, and a
// draft list whose labels carry no "Draft" verb.
//
// Icon names are keys in components/CategoryIcon.jsx.
export const fintech = {
  slug: "fintech",
  title: "Market Intelligence for Financial Services & FinTech — MarketBuzzr",

  hero: {
    kicker: "MARKETBUZZR FOR FINANCIAL SERVICES & FINTECH",
    title: "Stay ahead of the changes shaping financial services",
    sub: [
      "Regulatory shifts. Competitor moves. New technologies. Partnerships. Funding. Changing customer expectations.",
      "MarketBuzzr monitors the developments shaping your market, identifies what matters to your business, and turns them into intelligence you can act on.",
    ],
  },

  sources: {
    // A payment card, as his sketch has at the centre of this ring.
    mark: "card",
    items: [
      { icon: "bank", label: "Regulation & policy" },
      { icon: "rocket", label: "Competitor launches" },
      { icon: "bolt", label: "Payments innovation" },
      { icon: "chip", label: "AI & financial tech" },
      { icon: "trend", label: "Market & customer trends" },
      { icon: "handshake", label: "Partnerships & M&A" },
      { icon: "coins", label: "Funding & investment" },
    ],
  },

  intro: {
    heading: "See what matters. Understand what it means.",
    paragraphs: [
      "In financial services, a regulatory change, new product launch or emerging technology can quickly shift customer expectations and the competitive landscape.",
      "MarketBuzzr brings together signals from across your industry and evaluates them in the context of your company, products, competitors and priorities, so you can see what deserves attention and what to do next.",
    ],
  },

  insight: {
    tag: "Competitor launch",
    detected: "Jul 2, 2026 • 11:26 AM",
    impact: "High impact",
    headline:
      "PayNova launches real-time B2B payments platform across Europe.",
    summary:
      "PayNova announced the launch of its real-time B2B payments platform in 31 European countries, enabling instant cross-border payments for businesses.",
    actions: {
      items: [
        "Analyze how this impacts our competitive positioning and differentiation",
        "Assess potential changes in enterprise requirements and expectations",
        "Identify opportunities to strengthen partnerships and integrations",
      ],
    },
    implication: {
      text: "This move strengthens PayNova's position with enterprise customers and raises the bar for speed and transparency in B2B payments. Expect increased competitive pressure and potential shifts in partner relationships and customer expectations.",
    },
    sources: {
      items: [
        { icon: "article", name: "Industry publication", kind: "Market coverage" },
        { icon: "release", name: "Company press release", kind: "Official announcement" },
        { icon: "globe", name: "Financial news", kind: "Industry reporting" },
        { icon: "message", name: "Analyst report", kind: "Expert analysis" },
      ],
    },
    drafts: {
      items: ["Blog Post", "LinkedIn Post", "Battlecard", "Talk Track"],
    },
  },

  roles: {
    items: [
      { name: "Executive", outputs: "Action Plan · Board Talking Points" },
      { name: "Marketing", outputs: "Blog Post · LinkedIn Post" },
      { name: "Sales", outputs: "Battlecard · Talk Track" },
    ],
  },

  features: {
    heading: "Stay ahead across the financial services landscape",
    items: [
      {
        icon: "bank",
        heading: "Regulation & compliance",
        description:
          "Track regulatory changes, payment rules, data requirements and evolving financial-services frameworks.",
      },
      {
        icon: "rocket",
        heading: "Competitors & products",
        description:
          "Follow product launches, pricing changes, positioning shifts and moves from established players and emerging challengers.",
      },
      {
        icon: "bolt",
        heading: "Payments & financial technology",
        description:
          "Stay ahead of developments in real-time payments, embedded finance, open banking, digital assets, AI and financial infrastructure.",
      },
      {
        icon: "trend",
        heading: "Market & customer trends",
        description:
          "Understand changing expectations among businesses and consumers and how new financial products are being adopted.",
      },
      {
        icon: "handshake",
        heading: "Funding, M&A & partnerships",
        description:
          "Track investments, acquisitions and strategic partnerships reshaping the competitive landscape.",
      },
      {
        icon: "target",
        heading: "Growth & strategic opportunities",
        description:
          "Identify emerging segments, new use cases, geographic opportunities and potential areas for expansion.",
      },
    ],
    closer:
      "MarketBuzzr helps your team stay on top of the developments that could\nshape your strategy, products and growth.",
  },

  closing: {
    heading: "Stay ahead of what's shaping your market",
    paragraphs: [
      "See what matters sooner, understand what it means for your business, and act while it still matters.",
    ],
  },
};
