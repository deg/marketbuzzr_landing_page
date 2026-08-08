// Medical Technology industry page, from Manu's drop_05 sketch
// (drop_05_marketbuzzr-medtech-landing.html in the design repo).
//
// Third page on the IndustryPage template. Copy is his, verbatim. The one
// exception is the insight card's timestamp — see the note in biotech.js for
// why the six pages carry six different dates.
//
// NOTE FOR REVIEW: his draft options list "Draft Internal Update" twice, in
// second and fourth position, where the other two industries have four distinct
// options. Kept as written rather than guessed at, and raised with him. The
// components key list items by index precisely so that a repeated label is
// content rather than a bug.
//
// Icon names are keys in components/CategoryIcon.jsx.
export const medtech = {
  slug: "medtech",
  title: "Market Intelligence for Medical Technology — MarketBuzzr",

  hero: {
    kicker: "MARKETBUZZR FOR MEDICAL TECHNOLOGY",
    title: "Stay ahead of the changes shaping MedTech",
    // ONE PARAGRAPH, his revised dark page's. It replaces the two this page
    // shipped -- a staccato list line and then a sentence -- and folds the list
    // into the sentence. His August handover generalises it to every industry
    // page: "Hero copy is one concise paragraph under the headline."
    sub: [
      "MarketBuzzr monitors regulatory shifts, competitor launches, new technologies, clinical developments, funding, partnerships and changing customer needs to identify what matters to your business and turn it into intelligence you can act on.",
    ],
  },

  sources: {
    // His MedTech sketch reuses the biotech helix at the centre. That looks
    // like a copy-paste rather than a choice -- MedTech is devices, not
    // genetics -- but it is what he drew, so it is what is here. Raised with
    // him rather than swapped for a guess.
    mark: "dna",
    items: [
      { icon: "bank", label: "Regulatory updates" },
      { icon: "rocket", label: "Competitor launches" },
      { icon: "chip", label: "AI & emerging tech" },
      { icon: "clinical", label: "Clinical developments" },
      { icon: "trend", label: "Market & customer trends" },
      { icon: "handshake", label: "Partnerships & M&A" },
      { icon: "coins", label: "Funding & investment" },
    ],
  },

  intro: {
    heading: "See what matters. Understand what it means.",
    paragraphs: [
      "In MedTech, a regulatory update, competitor launch or emerging technology can quickly change the market.",
      // Comma, not an em dash. His revised page drops the dash here, and his
      // August handover makes it a rule for the whole site: "No dashes in
      // marketing copy. Rewrite naturally instead."
      "MarketBuzzr brings together signals from across your industry and evaluates them in the context of your company, products, competitors and priorities, so you can see what deserves attention and what to do next.",
    ],
  },

  insight: {
    tag: "Regulatory change",
    detected: "Jun 24, 2026 • 8:54 AM",
    impact: "High impact",
    headline: "FDA updates guidance for AI-enabled medical devices.",
    summary:
      "New guidance introduces additional expectations for lifecycle management and oversight of AI-enabled medical devices, with implications for product strategy and market readiness.",
    actions: {
      items: [
        "Assess impact on our product roadmap and planned launches",
        "Analyze how the new requirements could shift our competitive position",
        "Identify potential risks and opportunities across our product portfolio",
      ],
    },
    implication: {
      text: "The change could affect development timelines and competitive positioning across AI-enabled device categories. Companies that adapt earlier may gain an advantage in product readiness, messaging and market confidence.",
    },
    sources: {
      items: [
        { icon: "bank", name: "Regulatory update", kind: "Official guidance" },
        { icon: "article", name: "Industry publication", kind: "Market coverage" },
        { icon: "message", name: "Expert commentary", kind: "Industry analysis" },
        { icon: "release", name: "Industry brief", kind: "Sector perspective" },
      ],
    },
    drafts: {
      items: [
        "Draft Executive Brief",
        "Draft Internal Update",
        "Draft Board Talking Points",
        "Draft Internal Update",
      ],
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
    heading: "Stay ahead across the MedTech landscape",
    items: [
      {
        icon: "bank",
        heading: "Regulatory & compliance",
        description:
          "Track FDA, EU MDR, AI regulation, standards and other changes affecting your products and markets.",
      },
      {
        icon: "rocket",
        heading: "Competitors & products",
        description:
          "Follow product launches, clinical milestones, positioning changes and competitive moves.",
      },
      {
        icon: "chip",
        heading: "Technology & innovation",
        description:
          "Spot developments in AI, diagnostics, digital health, robotics, imaging and emerging medical technologies.",
      },
      {
        icon: "trend",
        heading: "Market & customer trends",
        description:
          "Understand changing provider needs, adoption patterns and shifts across your target markets.",
      },
      {
        icon: "handshake",
        heading: "Funding, M&A & partnerships",
        description:
          "Stay informed about investments, acquisitions and partnerships that could reshape your competitive landscape.",
      },
      {
        icon: "target",
        heading: "Growth & strategic opportunities",
        description:
          "Identify emerging segments, geographic opportunities, unmet needs and potential areas for expansion.",
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
