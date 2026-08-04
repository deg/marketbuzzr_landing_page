// Labels shared by every industry page.
//
// These are the page's FURNITURE, not its copy: the four headings inside the
// insight card, the assistive-technology name for the card, and the two CTAs.
// They were identical in all three content modules, and identical by definition
// rather than by coincidence — the card has a "Recommended Actions" block on
// every industry because that is what the card is, not because three sketches
// happened to agree.
//
// WHAT IS DELIBERATELY NOT HERE is anything editorial. Manu writes one deck per
// industry, and several of his paragraphs are word-for-word identical across
// FinTech and MedTech; folding those into one string would mean an edit to one
// page silently changing another, which is exactly the coupling a marketing site
// should not have. The impact badge, the timestamp and the role rows are also
// per page: they read as constants today because all three examples happen to be
// high-impact, but a different insight would say something different.
//
// Any page can override a value simply by setting it — IndustryPage merges this
// underneath the page's own content, not over it.
export const industryChrome = {
  insight: {
    label: "Example insight",
    actions: { heading: "Recommended Actions" },
    implication: { heading: "Strategic Implication" },
    sources: { heading: "Sources" },
    drafts: { heading: "Turn Insight Into Action" },
  },
  ctaPrimary: "Try for Free",
  ctaSecondary: "Book a Demo",
};
