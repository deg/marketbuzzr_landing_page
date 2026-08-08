// Cybersecurity industry page, from drop_07 §9 in the design repo
// (~/Documents/marketbuzzr/marketbuzzr_landing_page_design/).
//
// Seventh page on the IndustryPage template, and the first of three that brief
// adds. Copy is his, with one house convention applied: headings are sentence
// case without a trailing full stop, matching the six pages already shipped.
// His §8 writes Enterprise Technology's hero the same way, so the convention is
// his too by now.
//
// THE ONE THING THIS PAGE MUST NOT BE. §9: "do not lead with threats or
// vulnerabilities and do not position MarketBuzzr as a cyber threat monitoring
// or vulnerability intelligence product." Everything below is about the market
// -- competitors, positioning, regulation, partnerships, demand -- and the
// insight example is a competitor repositioning rather than an incident. That
// constraint is why the hero's seven topic boxes carry no threat feed, no CVE
// and no breach.
//
// CyberCorp is deliberately, obviously fictional, in the same family as the
// ManuCorp and RetailCorp his own §10 and §11 supply. §9 asks for "an obviously
// fictional company/product name only", and the gate on real-company strings in
// mockups is mbz-et8e.18.
//
// The hero mark is `shield`, shared with Public Safety. Six industries have five
// marks between them already -- Biotechnology and Medical Technology share the
// helix -- so a shared core is the existing pattern rather than a shortcut.
//
// Icon names are keys in components/CategoryIcon.jsx.
export const cybersecurity = {
  slug: "cybersecurity",
  title: "Market Intelligence for Cybersecurity — MarketBuzzr",

  hero: {
    kicker: "MARKETBUZZR FOR CYBERSECURITY",
    title: "Stay ahead of the changes shaping cybersecurity",
    sub: [
      "MarketBuzzr monitors competitors, product launches, positioning changes, partnerships, regulation, emerging technologies and changing customer priorities to identify what matters to your business and turn it into intelligence you can act on.",
    ],
  },

  sources: {
    mark: "shield",
    items: [
      { icon: "rocket", label: "Competitor launches" },
      { icon: "message", label: "Positioning & messaging" },
      { icon: "chip", label: "AI & emerging tech" },
      { icon: "bank", label: "Regulation & policy" },
      { icon: "handshake", label: "Partnerships & M&A" },
      { icon: "trend", label: "Market & customer trends" },
      { icon: "target", label: "Category shifts" },
    ],
  },

  // ONE PARAGRAPH, which is what §9 gives. The six earlier pages run two here --
  // an industry-specific opening line and then this generic one -- and the brief
  // supplies only the generic one for all three new pages. Left as written
  // rather than padded to match; whether the older six should lose their first
  // line is a question for him (mbz-et8e.28).
  intro: {
    heading: "See what matters. Understand what it means.",
    paragraphs: [
      "MarketBuzzr brings together signals from across the cybersecurity ecosystem and evaluates them in the context of your company, products, competitors and priorities, so you can quickly understand what deserves attention and what to do next.",
    ],
  },

  insight: {
    tag: "Competitor positioning",
    detected: "Aug 4, 2026 • 10:12 AM",
    impact: "High impact",
    headline:
      "CyberCorp repositions from endpoint protection to platform consolidation.",
    summary:
      "A competitor has rewritten its category story around consolidating several security tools into one platform, and has taken that message into its pricing, its partner programme and its analyst briefings.",
    actions: {
      items: [
        "Review how our own platform story compares on breadth and on proof",
        "Prepare sales guidance for consolidation questions in live deals",
        "Assess which adjacent capabilities buyers now expect in the category",
      ],
    },
    implication: {
      text: "If consolidation becomes the way buyers describe this category, point products get compared on a checklist rather than on depth. Answering while the narrative is still forming costs less than repositioning against it later.",
    },
    sources: {
      items: [
        { icon: "release", name: "Product announcement", kind: "Vendor release" },
        { icon: "article", name: "Industry publication", kind: "Market coverage" },
        { icon: "message", name: "Analyst commentary", kind: "Category analysis" },
        { icon: "threads", name: "Practitioner discussion", kind: "Buyer sentiment" },
      ],
    },
    drafts: {
      items: [
        "Draft Battlecard",
        "Draft Positioning Note",
        "Draft Talk Track",
        "Draft Executive Brief",
      ],
    },
  },

  roles: {
    items: [
      { name: "Executive", outputs: "Executive Brief · Board Talking Points" },
      { name: "Marketing", outputs: "Positioning Note · Blog Post" },
      { name: "Sales", outputs: "Battlecard · Talk Track" },
    ],
  },

  features: {
    heading: "Stay ahead across the cybersecurity landscape",
    items: [
      {
        icon: "rocket",
        heading: "Competitors & products",
        description:
          "Follow product launches, platform changes, pricing moves and competitive developments across established vendors and emerging challengers.",
      },
      {
        icon: "message",
        heading: "Positioning & messaging",
        description:
          "Track how competitors describe their products, categories and differentiation as market narratives evolve.",
      },
      {
        icon: "chip",
        heading: "AI & emerging technology",
        description:
          "Stay informed about new security technologies, AI capabilities, automation and shifts in the technology stack.",
      },
      {
        icon: "bank",
        heading: "Regulation & policy",
        description:
          "Follow regulation, policy direction and compliance developments that influence customer priorities and market demand.",
      },
      {
        icon: "handshake",
        heading: "Partnerships & M&A",
        description:
          "Track strategic partnerships, acquisitions, investments and ecosystem moves reshaping the competitive landscape.",
      },
      {
        icon: "trend",
        heading: "Market & customer trends",
        description:
          "Understand changing customer priorities, buying criteria, category expectations and the trends influencing cybersecurity demand.",
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
