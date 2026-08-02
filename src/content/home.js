// Homepage copy, from Manu's "Marketbuzzr Homepage — Final Implementation
// Brief" (~/Documents/marketbuzzr/marketbuzzr_homepage_handoff_md/). Keys are
// grouped by that brief's section numbers so copy edits trace back to it.
//
// Brand is "MarketBuzzr" throughout — the brief's "Marketbuzzr" is deliberately
// not adopted (mbz-et8e.2).
//
// Emphasis is structural, not markup: where the brief bolds a line it lives in
// its own key (`emphasis`, `footnote`, `closer`) and the component decides how
// to render it. Do not put ** or HTML into these strings.
//
// The four PNGs shipped with the brief were set aside as aspirational mockups
// (mbz-et8e.1), so everything is built natively. `visualNote` describes what
// belongs in a visual slot and is shown as placeholder text until it exists.
export const home = {
  title: "MarketBuzzr — Market Intelligence, Clarified",

  // §1 Hero
  hero: {
    eyebrow: "ALWAYS-ON STRATEGIC INTELLIGENCE",
    title: "Never Miss the Signals That Shape Your Market",
    sub: [
      "MarketBuzzr continuously monitors your competitors, industry, regulation and market conversations—filtering out the noise and interpreting what matters through the context of your company, role and goals.",
    ],
    emphasis:
      "Clear insights. Actionable recommendations. Ready-to-use drafts.",
    ctaPrimary: "Book a Demo",
    ctaSecondary: "Try It Free",
    footnote:
      "No endless searching. No information overload. Just what matters.",
    visualNote:
      "Product screenshot: the MarketBuzzr overview — a weekly market intelligence report showing top strategic insights, impact labels and the reader profile it was written for. Dominates the section at 85–95% of the container width.",
  },

  // §2 Problem
  problem: {
    title: "Your Market Moves Faster Than Anyone Can Follow",
    paragraphs: [
      "Competitors launch products. Regulations change. Customer priorities shift. New technologies emerge. Important conversations happen across webinars, podcasts, research, industry news and online communities.",
      "The information is everywhere. But it's fragmented across sources and written without your business context in mind.",
      "Most of it doesn't matter to you.",
      "Some of it could change your strategy.",
    ],
    closer: "MarketBuzzr helps you know the difference.",
    // ORDER IS LOAD-BEARING. These eight fill the cells around a 3x3 grid whose
    // centre is the `relevant` card, in array order:
    //   0 1 2
    //   3 . 4      <- index 3 sits left of the card, index 4 right of it
    //   5 6 7
    // The three marked `relevant` are the ones touching the card, so the
    // composition reads as converging. Reordering this array moves them.
    signals: [
      { label: "Industry Webinar" },
      { label: "Competitor Launch", relevant: true },
      { label: "Customer Discussion" },
      { label: "Regulatory Update", relevant: true },
      { label: "Clinical Study", relevant: true },
      { label: "Market Shift" },
      { label: "Funding & M&A" },
      { label: "New Technology" },
    ],
    relevant: "Relevant to You",
    visualNote:
      "Signal cloud: the eight signals above scattered and dimmed, with two or three converging on a brighter “Relevant to You” card.",
  },

  // Brand divider, immediately after §2
  divider: ["LESS NOISE.", "MORE SIGNAL.", "BETTER DECISIONS."],

  // §3 How It Works — a summary here; the full story lives at /how-it-works
  howItWorks: {
    title: "From Market Signals to Strategic Action",
    lead: "MarketBuzzr continuously scans the market, evaluates every signal against your business context and turns the most relevant developments into intelligence your team can act on.",
    steps: [
      "Signals from everywhere",
      "Analysis",
      "Strategic Insights",
      "Recommendations",
      "Ready-to-use Drafts",
    ],
    emphasis: "We monitor everything. You focus on what matters.",
    linkLabel: "See how it works in detail",
    linkTo: "/how-it-works",
    visualNote:
      "Flow diagram: the five steps above connected left-to-right on desktop, stacking vertically on mobile.",
  },

  // §4 Product Output / Insight
  insight: {
    title: "Every Insight. Clear. Actionable. Ready to Use.",
    lead: "MarketBuzzr doesn't just summarize what happened. Each relevant signal is translated into what it means for your business and what your team can do next.",
    callouts: [
      {
        heading: "Market Signal",
        description: "Quick summary of what happened.",
      },
      {
        heading: "Strategic Implication",
        description: "The potential impact on your business.",
      },
      {
        heading: "Recommended Actions",
        description: "Clear next steps your team can take.",
      },
      {
        heading: "Transparent Sources",
        description:
          "See exactly where every insight came from—no black box, no guessing.",
      },
    ],
    emphasis:
      "Discover what you didn't know—and pressure-test what you think you already know.",
    paragraphs: [
      "When an insight requires action, turn it into an action plan, executive summary, campaign, blog post or other ready-to-use draft.",
    ],
    visualNote:
      "Product screenshot: a single insight showing the market signal, its strategic implication, the recommended actions and the sources it was drawn from.",
  },

  // §5 What MarketBuzzr Helps You Track
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
        heading: "Executive Intelligence",
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

  // §6 Personalization
  personalization: {
    eyebrow: "BUILT AROUND YOU",
    title: "See the Market Through Your Strategic Lens",
    paragraphs: [
      "MarketBuzzr learns your company, products, positioning, competitors, markets, role and strategic priorities.",
      "Every signal is then evaluated through that context—helping determine what's relevant, what it could mean for your business and whether it deserves your attention.",
    ],
    emphasis:
      "The result: intelligence interpreted for you, not another generic market feed.",
    closer:
      "Because a MedTech CEO and a FinTech marketing leader should not receive the same intelligence.",
    inputs: [
      "Your Company",
      "Your Products",
      "Your Competitors",
      "Your Goals",
      "Your Role",
      "Your Markets",
    ],
    output: "Only what matters reaches you",
    visualNote:
      "Personalization diagram: the six inputs above converging through MarketBuzzr into a single filtered output.",
  },

  // §7 Industries
  industries: {
    title: "Built for Teams in Dynamic Markets",
    lead: "MarketBuzzr supports strategic teams operating in markets where competitive moves, regulation, technology and customer behavior can quickly change the direction of the business.",
    // `to` is set only where a page actually exists. App.jsx redirects unknown
    // paths to "/" silently, so linking a missing page reads as a broken site
    // rather than a 404 — the remaining open question in mbz-et8e.2.
    items: [
      { name: "Medical Technology", featured: true },
      { name: "Biotechnology", to: "/use-cases/biotech" },
      { name: "Life Sciences" },
      { name: "Financial Technology" },
      { name: "Public Safety & Defense Technology" },
      { name: "Enterprise Technology", to: "/use-cases/tech" },
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
