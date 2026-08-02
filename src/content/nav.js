import { home } from "./home";

// Site navigation, following the brief's "Recommended Navigation".
//
// Two judgement calls worth knowing about:
//
// 1. HOW IT WORKS sits under Product. The brief's list omits it, but it is a
//    real page with real content, and dropping it from the nav would leave it
//    reachable only from one link on the homepage. The brief was written
//    assuming a larger site where it would live under something; Product is
//    where it fits.
//
// 2. INDUSTRIES REPLACES THE OLD "USE CASES" DROPDOWN rather than sitting
//    beside it. They would have overlapped almost entirely — both lead to the
//    biotech and tech pages — and the brief names Industries, not Use Cases.
//    The industry list is imported rather than restated so the nav and section
//    7 cannot drift apart.
//
// FIX-BEFORE-RELEASE (mbz-et8e.18): Solutions, Resources and Pricing point at
// pages that do not exist, as do four of the six industries. Build them, or drop
// the items.
export const nav = {
  items: [
    {
      label: "Product",
      items: [{ label: "How It Works", to: "/how-it-works" }],
    },
    { label: "Solutions", to: "/solutions" },
    {
      label: "Industries",
      items: home.industries.items.map(({ name, to }) => ({
        label: name,
        to,
      })),
    },
    { label: "Resources", to: "/resources" },
    { label: "Pricing", to: "/pricing" },
  ],
  // The app root, NOT /login — there is no login page. The product's root route
  // is wrapped in ProtectedRoute, which raises the login modal for anyone not
  // signed in, so this is where "Login" should land.
  //   /login      -> 200 but only the SPA shell; no such route exists
  //   /api/login  -> 405, it is a POST-only backend endpoint (nginx.conf)
  // The one nav destination that genuinely exists today, and currently the only
  // route from the marketing site into the product.
  login: { label: "Login", href: "https://mvp.marketbuzzr.com/" },
  cta: "Book a Demo",
};
