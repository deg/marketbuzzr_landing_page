// Homepage copy, from Manu's "Marketbuzzr Homepage — Revised CTO / Claude
// Implementation Handoff"
// (~/Documents/marketbuzzr/Marketbuzzr_Homepage_Revised_CTO_Handoff/). That
// revision supersedes the original brief: it reorders the page, drops two whole
// sections and replaces the artwork. Keys appear in the revised brief's section
// order so copy edits trace back to it.
//
// Brand is "MarketBuzzr" throughout — the brief's "Marketbuzzr" is deliberately
// not adopted (mbz-et8e.2).
//
// Emphasis is structural, not markup: where the brief bolds a line it lives in
// its own key (`emphasis`, `closer`) and the component decides how to render it.
// Do not put ** or HTML into these strings.
//
// Sections 1, 2 and 5 show the revised handoff artwork; `visualAlt` carries the
// brief's suggested alt text, with the brand casing corrected. Section 4 is
// built natively (FlowSteps), which is what the revision asks for.
export const home = {
  title: "MarketBuzzr — Market Intelligence, Clarified",

  // §1 Hero
  hero: {
    eyebrow: "ALWAYS-ON STRATEGIC INTELLIGENCE FOR TEAMS IN DYNAMIC MARKETS",
    title: "Never Miss the Signals That Shape Your Market",
    sub: [
      "MarketBuzzr continuously monitors your competitors, industry, regulation and market conversations—surfacing what matters, what it means for your business, and what to do next.",
    ],
    emphasis:
      "Clear insights. Actionable recommendations. Ready-to-use drafts.",
    ctaPrimary: "Book a Demo",
    ctaSecondary: "Try It Free",
    // Sits below the hero visual. The revision deletes the standalone
    // personalization section on the grounds that its concept is "promoted into
    // the hero" — but the hero is artwork, so the six context dimensions would
    // otherwise exist only inside a PNG and be invisible to crawlers and screen
    // readers. This line keeps the differentiator in HTML (mbz-et8e.21).
    context:
      "Every signal is evaluated through your company, products, competitors, goals, role and markets.",
    visualAlt:
      "MarketBuzzr filters signals from competitors, industry news, regulation and market sources through a company's strategic context to deliver relevant insights, recommendations, alerts and drafts.",
  },

  // §2 Problem
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

  // §3 Industries — moved up from the end of the page by the revision, so the
  // reader learns who this is for before the process and the product output.
  industries: {
    title: "Built for Teams in Dynamic Markets",
    lead: "For teams operating in markets where regulation, competition, technology and customer behavior can quickly change the direction of the business.",
    // FIX-BEFORE-RELEASE (mbz-et8e.18): four of these point at placeholder pages. Build the pages, or
    // drop the `to` and render those tiles non-interactive. Moving this section
    // to §3 makes the dead tiles more prominent, not less.
    // Every tile links. Biotechnology and Enterprise Technology reach real
    // use-case pages; the other four reach the not-yet-implemented placeholder
    // (mbz-et8e.16), which is deliberate during the design cycle and must not
    // ship — see the gate in mbz-et8e.18.
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

  // §4 The five-step flow. Named `flow` rather than `howItWorks` because
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

  // §5 Product Output / Insight
  insight: {
    title: "Every Insight. Clear. Actionable. Ready to Use.",
    lead: "MarketBuzzr doesn't just tell you what happened. It shows what it could mean for your business—and what you can do next.",
    emphasis:
      "Discover what you didn't know. Pressure-test what you think you already know.",
    visualAlt:
      "MarketBuzzr competitor-launch insight showing the market signal, strategic implication, recommended actions, transparent sources and draft actions.",
  },

  // §6 What MarketBuzzr Helps You Track
  categories: {
    title: "Stay Ahead of What Matters to Your Business",
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

  // §7 Final CTA
  finalCta: {
    title: "Know What Changed. Understand What It Means. Know What to Do Next.",
    paragraphs: [
      "Let MarketBuzzr continuously monitor your market and deliver the intelligence your team needs to stay ahead.",
    ],
    ctaPrimary: "Book a Demo",
    ctaSecondary: "Try It Free",
  },
};
