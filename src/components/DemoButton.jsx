import React from "react";
import { useModal } from "../ModalContext";

// Every call-to-action on the site opens the email-capture modal. Centralizing
// it here keeps the modal wiring in one place; callers pass the visual class.
const DemoButton = ({ label = "Book a Demo", className = "primary" }) => {
  const openModal = useModal();
  return (
    <button
      type="button"
      className={className}
      onClick={openModal}
      aria-label={label}
    >
      {label}
    </button>
  );
};

export default DemoButton;
