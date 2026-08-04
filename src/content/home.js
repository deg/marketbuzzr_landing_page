// Homepage copy, from Manu's "Marketbuzzr Homepage — Final CTO / Claude
// Handoff" — drop_03 in the design repo
// (~/Documents/marketbuzzr/marketbuzzr_landing_page_design/).
// That is the third brief and supersedes both earlier ones: it reorders the page
// again, restores the LESS NOISE transition and replaces all three assets. Keys
// appear in its section order so copy edits trace back to it.
//
// Brand is "MarketBuzzr" throughout — the brief's "Marketbuzzr" is deliberately
// not adopted (mbz-et8e.2).
//
// Emphasis is structural, not markup: where the brief bolds a line it lives in
// its own key (`emphasis`, `closer`) and the component decides how to render it.
// Do not put ** or HTML into these strings.
//
// Sections 1, 3 and 4 show the handoff artwork. Section 5 is built natively
// (FlowSteps). The artwork is unframed and blends into the page, so `visualAlt`
// is doing real work — it is the only textual form of what those images say.
export const home = {
  title: "MarketBuzzr — Market Intelligence, Clarified",

  // §1 Hero
  hero: {
    eyebrow: "STRATEGIC INTELLIGENCE FOR TEAMS IN DYNAMIC MARKETS",
    title: "Stay Ahead of the Signals That Shape Your Market",
    sub: [
      "MarketBuzzr continuously monitors your competitors, industry, regulation and market conversations—surfacing what matters, what it means for your business, and what to do next.",
    ],
    emphasis:
      "Clear insights. Actionable recommendations. Ready-to-use drafts.",
    ctaPrimary: "Book a Demo",
    ctaSecondary: "Try It Free",
    // The hero artwork is now drawn rather than photographed — Manu's drop_05
    // animation — so these two strings become its <title> and <desc> rather
    // than an <img alt>. Same job: they are the only textual form of what the
    // picture says, since the labels inside it are a diagram rather than prose
    // and a screen reader is told to skip them.
    visualTitle: "How MarketBuzzr turns market noise into decisions",
    // The brief deletes the visible line that used to name the context
    // dimensions, and says not to replace it. Agreed — but the artwork is the
    // only place that concept now exists, so this carries it instead. Note it
    // draws five dimensions, not the six the deleted sentence named: "products"
    // is no longer depicted.
    //
    // Kept in step with what is actually on screen: the twelve source types are
    // the twelve chips, and the impact ratings the previous artwork showed are
    // gone from this one, so the claim went with them.
    visualAlt:
      "MarketBuzzr draws market signals from press releases, industry news and reports, webinars, earnings calls, blog posts, newsletters, YouTube and Reddit discussions, research papers, podcasts and regulatory updates into a central engine, evaluates each one against your company, competitors, role, markets and goals, and surfaces only the developments that matter — a competitor launch, a regulatory change, a growth opportunity, a consumer trend — each with ready-to-use drafts to act on it.",
  },

  // §2 Hero transition. A compact bridge under the hero image — explicitly not
  // three cards and not a full section. Removed in mbz-et8e.25 on the previous
  // brief's instruction and reinstated here on this one's.
  divider: ["LESS NOISE.", "MORE SIGNAL.", "BETTER DECISIONS."],

  // §3 Problem
  problem: {
    title: "Your Market Moves Faster Than Anyone Can Follow",
    paragraphs: [
      "Competitors move. Regulations change. Customer priorities shift. New technologies and market trends emerge.",
      "The signals are everywhere—but fragmented across sources and rarely interpreted with your business in mind.",
      "Most of it doesn't matter to you.",
      "Some of it could change your strategy.",
    ],
    closer: "MarketBuzzr helps you know the difference.",
    visualAlt:
      "Many market signals compete for attention, while a smaller set of important developments is highlighted as worth attention.",
  },

  // §4 Product Proof / Insight
  insight: {
    title: "Every Insight. Clear. Actionable. Ready to Use.",
    lead: "MarketBuzzr doesn't just tell you what happened. It shows what it could mean for your business—and what you can do next.",
    emphasis:
      "Discover what you didn't know. Pressure-test what you think you already know.",
    visualAlt:
      "MarketBuzzr competitor-launch insight showing the market signal, strategic implication, recommended actions, transparent sources and draft actions.",
  },

  // §5 The five-step flow. Named `flow` rather than `howItWorks` because
  // content/howItWorks.js is the separate /how-it-works page this section links
  // to, and one name for both was ambiguous. The revision replaced the large
  // diagram that used to sit here with these five native steps, and is explicit
  // that no paragraph belongs under the heading.
  flow: {
    title: "From Market Signals to Strategic Action",
    steps: [
      { verb: "MONITOR", label: "Signals from everywhere" },
      { verb: "FILTER", label: "Through your context" },
      { verb: "INTERPRET", label: "What it means for you" },
      { verb: "RECOMMEND", label: "What to do next" },
      { verb: "CREATE", label: "Ready-to-use drafts" },
    ],
    linkLabel: "Explore How It Works",
    linkTo: "/how-it-works",
  },

  // §6 Industries. Moved up to §3 by the previous brief and back down to here
  // by this one, which puts the product proof and the process ahead of it.
  industries: {
    title: "Built for Teams in Dynamic Markets",
    lead: "For teams operating in markets where regulation, competition, technology and customer behavior can quickly change the direction of the business.",
    // FIX-BEFORE-RELEASE (mbz-et8e.18): TWO of these still point at placeholder
    // pages — Life Sciences and Public Safety & Defense Technology. Build them,
    // or drop the `to` and render those tiles non-interactive.
    //
    // Was four. Medical Technology and Financial Technology now reach real
    // industry pages built from Manu's drop_05 sketches (mbz-et8e.39), and
    // Biotechnology and Enterprise Technology already did.
    items: [
      {
        name: "Medical Technology",
        to: "/industries/medical-technology",
        featured: true,
      },
      { name: "Biotechnology", to: "/use-cases/biotech" },
      { name: "Life Sciences", to: "/industries/life-sciences" },
      { name: "Financial Technology", to: "/industries/financial-technology" },
      {
        name: "Public Safety & Defense Technology",
        to: "/industries/public-safety-defense-technology",
      },
      { name: "Enterprise Technology", to: "/use-cases/tech" },
    ],
    exploreLabel: "Explore all industries",
    exploreTo: "/industries",
  },

  // §7 Intelligence areas
  categories: {
    title: "Intelligence Across What Matters to Your Business",
    lead: "One intelligence layer across the market developments strategic teams need to understand.",
    // Four short lines each — the brief is explicit that these are not
    // paragraphs. Each item gets its own icon (mbz-et8e.8).
    items: [
      {
        heading: "Competitive Intelligence",
        icon: "target",
        lines: [
          "Product launches",
          "Repositioning",
          "Messaging shifts",
          "Strategic moves",
        ],
      },
      {
        heading: "Market & Industry",
        icon: "trend",
        lines: [
          "Industry trends",
          "Consumer behavior",
          "Emerging technologies",
          "Market shifts",
        ],
      },
      {
        heading: "Regulation & Risk",
        icon: "shield",
        lines: [
          "Regulatory changes",
          "Policy direction",
          "Compliance implications",
          "Emerging risks",
        ],
      },
      {
        heading: "Growth & Opportunities",
        icon: "growth",
        lines: [
          "White-space opportunities",
          "New markets",
          "Go-to-market opportunities",
          "Partnership opportunities",
        ],
      },
      {
        heading: "Content & Communication",
        icon: "message",
        lines: [
          "Thought leadership",
          "Content ideas",
          "Campaigns",
          "Market-backed messaging",
        ],
      },
      {
        heading: "Strategy & Executive",
        icon: "compass",
        lines: [
          "Strategic Pulse",
          "Opportunities & threats",
          "Validate assumptions",
          "Board preparation",
        ],
      },
    ],
  },

  // §8 Final CTA
  finalCta: {
    title: "Know What Changed. Understand What It Means. Know What to Do Next.",
    paragraphs: [
      "Let MarketBuzzr continuously monitor your market and deliver the intelligence your team needs to stay ahead.",
    ],
    ctaPrimary: "Book a Demo",
    ctaSecondary: "Try It Free",
  },
};
