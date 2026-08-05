// Site navigation, from Manu's August 2026 handover, section 2 and the
// acceptance checklist — drop_06_MarketBuzzr_CTO_Website_Handover_Aug2026.docx
// in the design repo.
//
// Wordmark left, two links centre, two CTAs right. The checklist is explicit
// that this is the whole of it: "Top navigation contains only MarketBuzzr, How
// It Works, Industries, Try for Free and Book a Demo."
//
// WHAT THAT REMOVED, so nobody restores it by accident. Product (which held How
// It Works), Solutions, Resources and Pricing — the last three pointed at pages
// that have never existed and were three of the five links gated by
// mbz-et8e.18. The Industries dropdown went too: /industries is a real page now
// (mbz-et8e.47) and is the entry point his brief intends, so the six industries
// are reachable from there rather than from a menu.
//
// LOGIN WENT WITH THEM, and that one is worth a second look. It was the only
// route from the marketing site into the product, and "only" in his checklist
// leaves no room for it. Removing it is what the brief says; whether he meant
// to strand returning customers is a question for him, raised in the
// outstanding-items memo. Restoring it is a three-line change if he says so.
export const nav = {
  items: [
    { label: "How It Works", to: "/how-it-works" },
    { label: "Industries", to: "/industries" },
  ],
  // Both, in his order, and the fills are set by the shared CTA rules: Try for
  // Free filled, Book a Demo outlined (mbz-et8e.52.4).
  ctaPrimary: "Try for Free",
  ctaSecondary: "Book a Demo",
};
