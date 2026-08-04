// How It Works copy, from Manu's "MarketBuzzr — How It Works Page, Final CTO /
// Claude Implementation Handoff"
// (~/Documents/marketbuzzr/Marketbuzzr_How_It_Works_revised/).
//
// The page is deliberately Hero -> 01 -> 02 -> 03 -> CTA and nothing else. The
// brief is explicit that the simplicity is the point: no fourth step, no
// sources grid, no separate weekly-report section, no feature grid, no FAQ. If
// a later round wants to add a section here, check that document first.
//
// Brand is "MarketBuzzr" throughout — the brief's "Marketbuzzr" is deliberately
// not adopted (mbz-et8e.2), same call as the homepage.
//
// Emphasis is structural, not markup: the brief bolds each step's closing line,
// and that line lives in its own `closer` key rather than carrying ** or HTML.
//
// CTA labels follow THIS brief — primary "Try for Free", secondary "Book a
// Demo". That is the reverse of the homepage's order and wording ("Try It
// Free"), because the two pages were specified by different briefs. The
// divergence is a question for Manu (mbz-et8e.28 item 10), not something to
// settle by quietly editing one page to match the other.
export const howItWorks = {
  title: "How It Works — MarketBuzzr",

  hero: {
    eyebrow: "HOW IT WORKS",
    title: "From Market Signals to Strategic Action",
    sub: [
      "MarketBuzzr monitors your market, identifies what matters to your business, and turns relevant developments into personalized intelligence you can act on.",
    ],
    ctaPrimary: "Try for Free",
    ctaSecondary: "Book a Demo",
  },

  // One entry per step. `id` is the anchor the brief names in its suggested
  // markup; `number` is copy rather than derived from the index, because it is
  // the label the brief specifies and not an incidental position.
  //
  // `visualAlt` is shorter here than the homepage's. There the artwork carried
  // meaning that existed nowhere else, so its alt text had to reconstruct it.
  // This brief puts every important message in HTML and asks specifically not
  // to restate the text visible inside the image.
  steps: [
    {
      id: "monitor-filter",
      number: "01",
      title: "Monitor Your Market. Filter the Noise.",
      lead: "Stay on top of what's changing—without tracking it all yourself.",
      paragraphs: [
        "MarketBuzzr continuously monitors the sources that shape your market—from competitors, industry news and regulation to research, podcasts, webinars and online discussions.",
        "Every signal is evaluated against your business context—your company, products, competitors, goals, role and markets—so you see what deserves your attention, not everything that happened.",
      ],
      visualAlt:
        "Market activity from competitors, industry news, regulation, podcasts, webinars and research is filtered through the reader's company, products, competitors, goals, role and markets to surface only relevant developments.",
      closer: "Less noise. More signal. More time for what matters.",
    },
    {
      id: "role-based-intelligence",
      number: "02",
      title: "Intelligence Shaped Around Your Role",
      lead: "Different roles need different intelligence—and different ways to act on it.",
      paragraphs: [
        "MarketBuzzr turns relevant developments into personalized insights, opportunities and recommendations based on each reader's priorities.",
        "Executives can focus on strategic priorities, growth opportunities and board-level implications. Marketing, Sales, Customer Success and other teams receive intelligence relevant to the decisions they make and the work they do.",
      ],
      visualAlt:
        "Example role-based MarketBuzzr weekly intelligence showing tailored outputs for executives, marketing, sales and customer success, including strategic priorities, growth opportunities, board discussion points, content ideas, battlecards, talk tracks and client updates.",
      closer:
        "One market. Different priorities. Intelligence built around each reader.",
    },
    {
      id: "turn-intelligence-into-action",
      number: "03",
      title: "Turn Intelligence Into Action",
      lead: "Don't just know what happened. Know what to do next.",
      paragraphs: [
        "MarketBuzzr goes beyond summarizing the market. It identifies what developments mean for your business, recommends next steps, and helps you turn intelligence into work your team can use.",
        "Create action plans, executive communications, board talking points, battlecards, outreach, campaigns, thought-leadership content and more—directly from the opportunities and insights MarketBuzzr identifies.",
      ],
      visualAlt:
        "MarketBuzzr workflow showing a growth opportunity being turned into an action plan by selecting a draft format and generating a context-aware ready-to-use draft.",
      closer:
        "No blank page. No generic prompt. Your draft starts with the market intelligence and business context already behind the insight.",
    },
  ],

  finalCta: {
    title: "Stop Following the Market Manually.",
    paragraphs: [
      "Let MarketBuzzr monitor what's changing, surface what deserves your attention, and help you turn intelligence into action.",
    ],
    ctaPrimary: "Try for Free",
    ctaSecondary: "Book a Demo",
  },
};
