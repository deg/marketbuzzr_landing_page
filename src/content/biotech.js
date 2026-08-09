// Biotechnology industry page, rebuilt from Manu's drop_05 sketch — the first
// handoff delivered as HTML rather than artwork (drop_05 in the design repo).
//
// The sketch is a drawing by an artist agent, not a page to drop in. What is
// taken from it is the copy and the *idea* of a worked insight example; its
// palette (light), its iconography (emoji) and its hero layout (seven
// absolutely-positioned boxes that already overlap in its own rendering) are
// not. See mbz-et8e.38.
//
// THIS PAGE IS A PILOT. If the native-HTML approach works, the homepage and How
// It Works lose their text-rich PNGs the same way, so the blocks below are
// shaped as reusable content contracts rather than biotech-specific markup:
// `sources` feeds the same component that would replace How It Works step 01,
// `insight` the homepage's insight artwork, `roles` How It Works step 02.
//
// Icon names are keys in components/CategoryIcon.jsx. The sketch's emoji are
// deliberately not carried over — the site draws its own icons so they take the
// page's stroke and colour and render the same everywhere.
export const biotech = {
  slug: "biotech",
  title: "Market Intelligence for Biotech Teams — MarketBuzzr",

  hero: {
    kicker: "MARKETBUZZR FOR BIOTECHNOLOGY",
    title: "Always know what's happening around your pipeline",
    // ONE PARAGRAPH, his revised dark page's, verbatim. It replaces the two
    // this page shipped and folds them into one — the August handover's rule
    // for every industry page: "Hero copy is one concise paragraph under the
    // headline." Note his own wording drops the hyphens from "indication and
    // molecule specific", which is the same no-dashes rule (mbz-et8e.52.10).
    sub: [
      "MarketBuzzr brings together what patients, caregivers, KOLs, competitors and the broader market are saying about your therapy and turns these fragmented external signals into indication and molecule specific intelligence your team can act on.",
    ],
  },

  // The hero visual: the outside conversations that form around a therapy.
  // `items` are where they happen; the mark at the centre is unlabelled, and so
  // is the arrangement as a whole. Both the eyebrow and the two paragraphs
  // beside it already say what this is.
  //
  // LABELS ARE SHORTER THAN THE SKETCH'S, deliberately. Its wording — "Patient &
  // caregiver communities", "Conferences & event coverage" — wraps to two lines
  // in a ring chip, and four of the seven did, leaving the rows uneven. Nothing
  // is lost: the full phrasing is in the section below, which names patient and
  // caregiver communities, KOL discussions, conference commentary, biotech
  // media, YouTube, Reddit, advocacy groups and competitor communications. A
  // chip is a label, not a sentence.
  // No caption. An earlier version carried "The conversations forming around
  // your therapy, across the places they actually happen." -- invented here, not
  // in the sketch, and a restatement of the two paragraphs sitting beside it.
  sources: {
    items: [
      { icon: "people", label: "Patients & caregivers" },
      { icon: "message", label: "KOLs & experts" },
      { icon: "calendar", label: "Conferences & events" },
      { icon: "article", label: "Biotech media & blogs" },
      { icon: "video", label: "YouTube & video" },
      { icon: "threads", label: "Reddit & forums" },
      { icon: "building", label: "Competitor updates" },
    ],
  },

  intro: {
    heading: "See what's happening beyond the clinical data",
    // ONE PARAGRAPH, and this is the page where that cost something. "Clinical
    // data tells only part of the story." was his, and stood above the
    // paragraph as its own emphasised line -- the only `emphasis` on any of the
    // nine. drop_10 §7 asks this block for "ONE paragraph, not broken into
    // separate lines/paragraph fragments", so the line opens the paragraph
    // instead of standing over it. No copy is lost, and nothing else on the
    // template renders an emphasis line any more (mbz-et8e.55.6).
    paragraphs: [
      "Clinical data tells only part of the story. MarketBuzzr brings together patient and caregiver communities, KOL discussions, conference commentary, biotech media, YouTube, Reddit, advocacy groups and competitor communications to show how your therapy is being perceived, discussed and positioned across the ecosystem.",
    ],
  },

  // A worked example of what the product produces. The copy is Manu's, from the
  // sketch; the timestamp is ours.
  //
  // `detected` is absolute rather than relative, and each of the six industry
  // pages sets its own — a different weekday, a different time inside working
  // hours, so the set does not read as one string pasted six times. Both
  // properties are deliberate (mbz-et8e.53) and both need keeping. An absolute
  // date needs refreshing every so often; the card is meant to show the product
  // surfacing things as they happen.
  insight: {
    tag: "Emerging patient signal",
    detected: "Jun 8, 2026 • 10:17 AM",
    impact: "High impact",
    headline:
      "Caregiver discussions point to growing concern around treatment burden",
    summary:
      "Recent conversations across patient communities and caregiver discussions show increasing attention to administration frequency and its impact on day-to-day treatment routines.",
    actions: {
      items: [
        "Assess whether treatment burden is emerging as a meaningful perception driver",
        "Compare how competing therapies are being discussed around convenience and administration",
        "Incorporate recurring caregiver questions into upcoming patient engagement",
      ],
    },
    implication: {
      text: "The conversation suggests that treatment burden may be becoming a more important part of how patients and caregivers evaluate therapies in the indication, even where clinical efficacy remains the primary point of differentiation.",
    },
    sources: {
      items: [
        { icon: "people", name: "Patient community", kind: "External discussion" },
        { icon: "heart", name: "Caregiver forum", kind: "Community signal" },
        { icon: "message", name: "KOL discussion", kind: "Expert commentary" },
        { icon: "calendar", name: "Conference commentary", kind: "Event coverage" },
      ],
    },
    drafts: {
      items: [
        "Draft Executive Brief",
        "Draft Competitive Brief",
        "Draft Board Talking Points",
        "Draft Action Plan",
      ],
    },
  },

  // Who acts on that same insight, and what they get. No heading: the sketch's
  // role bar carries none, and "One signal, read three ways" was invented here.
  roles: {
    items: [
      { name: "Executive", outputs: "Executive Brief · Board Talking Points" },
      { name: "Marketing", outputs: "Blog Post · LinkedIn Post" },
      { name: "Sales", outputs: "Battlecard · Talk Track" },
    ],
  },

  features: {
    heading: "Real-world intelligence around your molecule",
    items: [
      {
        icon: "people",
        heading: "Treatment perception",
        description:
          "Understand how patients, caregivers and the broader ecosystem perceive your therapy beyond clinical endpoints, including outcomes, treatment burden and real-world experience.",
      },
      {
        icon: "shield",
        heading: "Early signals & blind spots",
        description:
          "Surface emerging discussions around safety, tolerability and treatment approach that may indicate perception shifts or concerns worth understanding earlier.",
      },
      {
        icon: "heart",
        heading: "Patient & caregiver insights",
        description:
          "Identify recurring needs, practical challenges and questions being discussed across patient and caregiver communities.",
      },
      {
        icon: "target",
        heading: "Competitor & conference intelligence",
        description:
          "Understand how competing therapies, mechanisms and companies are being discussed across biotech media, conferences, KOL commentary and patient communities.",
      },
    ],
    closer:
      "MarketBuzzr gives lean biotech teams a continuously updated view of the conversations shaping their therapy and indication, without adding operational overhead or replacing existing clinical, regulatory or commercial workflows.",
  },

  closing: {
    heading: "Stay closer to the conversations shaping your therapy",
    paragraphs: [
      "See emerging signals earlier, understand how your molecule is being perceived, and stay aligned with how your indication is evolving.",
    ],
  },
};
