import React, { useEffect, useCallback } from "react";

const ComingSoonModal = ({ open, onClose }) => {
  // Handle escape key
  const handleEscape = useCallback(
    (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  // Handle overlay click
  const handleOverlayClick = useCallback(
    (e) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  // Handle modal content click
  const handleModalClick = useCallback((e) => {
    e.stopPropagation();
  }, []);

  useEffect(() => {
    if (open) {
      window.addEventListener("keydown", handleEscape);
      return () => window.removeEventListener("keydown", handleEscape);
    }
  }, [open, handleEscape]);

  // Lock page scroll while modal is open
  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="modal-overlay"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal" onClick={handleModalClick}>
        <h3 id="modal-title">Coming soon</h3>
        <p>Thanks for your interest! We will be open for business very soon.</p>
        <p className="muted">
          Want to talk now? Email{" "}
          <a href="mailto:contact@marketbuzzr.com">contact@marketbuzzr.com</a>.
        </p>
        <div className="modal-actions">
          <button className="btn" onClick={onClose} aria-label="Close modal">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonModal;
