import React from "react";

// A handoff image, framed. The artwork is light-themed while the site is dark,
// so it sits on a deliberate plate with a border and shadow: presented as a
// picture of the product rather than looking like it failed to load a
// background.
//
// AVIF first with a WebP fallback — between them every browser we care about is
// covered, and the source PNGs (4.2 MB for the set) are not shipped at all.
//
// Deliberately not clickable. A tap-to-pan viewer was tried and dropped: phone
// browsers already zoom the whole page, panning is barely reachable with a
// mouse, and if an image is unreadable at the size it is shown then that is a
// layout problem rather than something a viewer should paper over.
//
// width/height are the intrinsic pixel dimensions and are always passed, so the
// browser reserves the right box before the image arrives and the page does not
// shift as it loads.
const ProductImage = ({
  avif,
  webp,
  alt,
  width,
  height,
  priority = false,
  className = "",
}) => (
  <figure className={["product-frame", className].filter(Boolean).join(" ")}>
    <picture>
      <source srcSet={avif} type="image/avif" />
      <source srcSet={webp} type="image/webp" />
      <img
        src={webp}
        alt={alt}
        width={width}
        height={height}
        // The hero image is the LCP element, so it must never be lazy and
        // should outrank everything else in the queue. Anything below the fold
        // waits until it is nearly on screen.
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding={priority ? "sync" : "async"}
      />
    </picture>
  </figure>
);

export default ProductImage;
