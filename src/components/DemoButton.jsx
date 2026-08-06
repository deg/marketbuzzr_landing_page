import React from "react";
import { useModal } from "../ModalContext";

// Every call-to-action on the site opens the email-capture modal. Centralizing
// it here keeps the modal wiring in one place; callers pass the visual class.
//
// `source` says which CTA this is, and reaches the backend so a trial request
// can be told from a demo request (mbz-et8e.15). The two in use are "try-free"
// and "book-demo". It is passed explicitly rather than derived from `label` or
// `className`: labels are copy and have already been rewritten once
// (mbz-et8e.52.4 renamed "Get your MarketBuzzr"), and deriving data from a
// style class would start lying the moment a filled Book a Demo appeared.
// An unrecognised value is carried through rather than rejected, so a typo
// arrives visible instead of silently becoming the wrong intent.
const DemoButton = ({
  label = "Try for Free",
  className = "primary",
  source = "",
}) => {
  const openModal = useModal();
  return (
    <button
      type="button"
      className={className}
      // Wrapped rather than passed as `onClick={openModal}` — that hands React's
      // click event in as the source argument.
      onClick={() => openModal(source)}
      aria-label={label}
    >
      {label}
    </button>
  );
};

export default DemoButton;
