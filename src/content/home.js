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
    // drop_06 replaces this line verbatim, and says why: no em dash or hyphen
    // as punctuation. That is the second brief running to name dash punctuation
    // as the problem, so treat it as a standing rule rather than a one-off.
    sub: [
      "MarketBuzzr continuously tracks your competitors, industry, and market conversations to surface what matters most for your business, your role, and your goals.",
    ],
    emphasis:
      "Clear insights. Actionable recommendations. Ready-to-use drafts.",
    ctaPrimary: "Try for Free",
    ctaSecondary: "Book a Demo",
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
      "MarketBuzzr draws market signals from press releases, industry news and reports, webinars, earnings calls, blog posts, newsletters, YouTube and Reddit discussions, research papers, podcasts and regulatory updates into a central engine, evaluates each one against your company, competitors, role, markets and goals, and surfaces only the developments that matter: a competitor launch, a regulatory change, a growth opportunity or a consumer trend, each with ready-to-use drafts to act on it.",
  },

  // §2 Hero transition. A compact bridge under the hero image — explicitly not
  // three cards and not a full section. Removed in mbz-et8e.25 on the previous
  // brief's instruction and reinstated here on this one's.
  divider: ["LESS NOISE.", "MORE SIGNAL.", "BETTER DECISIONS."],

  // §3 Problem
  problem: {
    // The break is drop_07 §3.3's: "force the desktop line break after
    // 'faster'". SectionTitle runs the title through withBreaks, so this is a
    // hard <br/> on desktop and a plain wrap once the heading is narrower than
    // the break anyway.
    title: "Your Market Moves Faster\nThan Anyone Can Follow",
    // ONE PARAGRAPH, NOT FOUR. drop_07 §3.3: "the paragraph below it beginning
    // with competitors moving, regulations changing, etc. must be one concise
    // paragraph." This was four stacked short ones. His sentences are kept
    // word for word and only the paragraph breaks between them go — the
    // instruction is about the shape of the block, and rewriting approved copy
    // to make it shorter would be answering a question he did not ask.
    //
    // drop_06's edit to the second sentence survives inside it. His quoted
    // string ("Signals are everywhere—but fragmented.") truncated the sentence
    // at the em dash rather than reproducing it, so "replace with exactly"
    // governed the wording and not how much of the line went.
    paragraphs: [
      "Competitors move. Regulations change. Customer priorities shift. New technologies and market trends emerge. Signals are everywhere. They’re just fragmented across sources and rarely interpreted with your business in mind. Most of it doesn't matter to you. Some of it could change your strategy.",
    ],
    closer: "MarketBuzzr helps you know the difference.",
    // Now drawn rather than photographed — Manu's drop_06 "Worth Your
    // Attention" animation, which replaced the AVIF that said the same thing.
    // Like the hero's pair, these become the SVG's <title> and <desc> rather
    // than an <img alt>: the picture is a diagram, its labels are told to a
    // screen reader as one thing, and this is the only prose form of it.
    visualTitle: "How MarketBuzzr separates what matters from the noise",
    // Kept in step with what is actually drawn: the ten developments named below
    // are the ten cards, and the endpoint they converge on is the animation's
    // own words. It said nine until drop_07's v11 added Competitor
    // Repositioning, which is the kind of drift only a reader of the alt text
    // would ever have seen.
    visualAlt:
      "A field of market activity moves continuously in the background. Ten developments light up in turn: a competitor launch, a competitor repositioning, an FDA update, a new market entrant, an industry trend, a shift in customer sentiment, a funding round, a new partnership, a technology shift and a regulatory change. Each streams down to converge on a single point marked Worth Your Attention.",
  },

  // §4 Product Proof / Insight
  insight: {
    title: "Every Insight. Clear. Actionable. Ready to Use.",
    // The em dash before "and what you can do next" is gone, which is drop_07
    // §3.3 naming this line specifically and §1's site-wide rule doing the same
    // thing generally.
    lead: "MarketBuzzr doesn't just tell you what happened. It shows what it could mean for your business, and what you can do next.",
    // NO `emphasis` HERE, DELIBERATELY. It read "Discover what you didn't know.
    // Pressure-test what you think you already know." drop_07 §3.3 removes it
    // outright: "do not replace it with another sentence."
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
    // THE NINE INDUSTRIES, AND THIS IS THE ONLY LIST OF THEM. content/nav.js
    // imports it for the Industries dropdown and content/industries.js imports
    // it for the /industries page, so all three surfaces move together. Adding
    // an industry here adds it everywhere; that is the point.
    //
    // SIX BECAME NINE in drop_07 §6.2, and that lands on this page as well as on
    // /industries — a stated consequence rather than a side effect. §6.2 asks
    // for a 3x3 grid there, and three rows of three is what §6 renders here too.
    //
    // `blurb` is §6.3's card copy, and every one of the nine was replaced by it.
    // It lives beside the name rather than in that page's own module for the
    // same reason as before: a second list keyed by name is a list that drifts.
    // §6 does not render it. §6.3 also says "do not add taglines or a second
    // marketing sentence above these descriptions", so there is one line each.
    //
    // NOTHING IS FEATURED ANY MORE. Medical Technology carried `featured: true`
    // and a brighter border; §6.2 rules that out — "do NOT visually highlight
    // the top row or any single industry with turquoise" — and §3.3 wants every
    // box on this page the same size, which a highlight is halfway to breaking.
    //
    // ROUTES ARE HISTORY, NOT A CATEGORY, and two of these keep older paths.
    // Public Safety also keeps its longer URL while its LABEL shortens to §6.2's
    // "Public Safety"; renaming the route would break external links for no
    // reader benefit, and §6.3's copy for it still covers defense technology.
    //
    // THE ORDER IS HIS, read across the rows of §6.2's table.
    items: [
      {
        name: "Medical Technology",
        to: "/industries/medical-technology",
        blurb:
          "Track regulatory developments, competitor moves, emerging technologies, clinical trends and market shifts shaping the medical technology landscape.",
      },
      {
        name: "Financial Technology",
        to: "/industries/financial-technology",
        blurb:
          "Track competitor moves, regulation, partnerships, product launches, customer trends and technologies changing how financial services are built and delivered.",
      },
      {
        name: "Cybersecurity",
        to: "/industries/cybersecurity",
        blurb:
          "Follow competitor positioning, product launches, partnerships, regulation, emerging technologies and changing customer priorities across the cybersecurity market.",
      },
      {
        name: "Biotechnology",
        to: "/use-cases/biotech",
        blurb:
          "Follow clinical developments, funding, partnerships, regulatory changes, emerging technologies and competitor activity across the biotech landscape.",
      },
      {
        name: "Enterprise Technology",
        to: "/use-cases/tech",
        blurb:
          "Follow competitor moves, AI and technology shifts, product launches, partnerships, changing customer needs and the trends reshaping enterprise technology.",
      },
      {
        name: "Manufacturing",
        to: "/industries/manufacturing",
        blurb:
          "Track automation, emerging technologies, supply chain developments, competitor activity, regulation and changing demand across manufacturing markets.",
      },
      {
        name: "Public Safety",
        to: "/industries/public-safety-defense-technology",
        blurb:
          "Track procurement trends, policy and regulation, competitor activity, new technologies, partnerships and evolving priorities across public safety and defense technology.",
      },
      {
        name: "Retail",
        to: "/industries/retail",
        blurb:
          "Follow consumer trends, competitor moves, new technologies, partnerships, channel shifts and changing market dynamics across the retail landscape.",
      },
      {
        name: "Other Industries",
        to: "/industries/other-industries",
        blurb:
          "MarketBuzzr can be configured around the competitors, developments, sources and priorities that matter to your business, even when your industry does not fit neatly into a box.",
      },
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
    ctaPrimary: "Try for Free",
    ctaSecondary: "Book a Demo",
  },
};
