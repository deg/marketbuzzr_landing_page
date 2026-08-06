import React, { useCallback, useEffect, useState } from "react";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://mvp.marketbuzzr.com";
const CONVERSION_ENDPOINT = `${API_BASE_URL}/api/landing/conversion`;

// `source` is which CTA opened this — "try-free" or "book-demo" — and is a prop
// rather than form state because the user never sees or edits it. It goes into
// the payload so sales can tell the two intents apart (mbz-et8e.15); the
// backend accepts unknown values rather than rejecting them.
const EmailCaptureModal = ({ open, onClose, source = "" }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  const resetForm = useCallback(() => {
    setEmail("");
    setName("");
    setPhone("");
    setComment("");
    setWebsite("");
    setStatus("idle");
  }, []);

  const handleClose = useCallback(() => {
    onClose();
    // Defer reset until after the close animation so the success message
    // doesn't flash back to the form during fade-out.
    window.setTimeout(resetForm, 200);
  }, [onClose, resetForm]);

  const handleEscape = useCallback(
    (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    },
    [handleClose]
  );

  const handleOverlayClick = useCallback(
    (e) => {
      if (e.target === e.currentTarget) {
        handleClose();
      }
    },
    [handleClose]
  );

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

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (status === "submitting") return;
      setStatus("submitting");
      try {
        const response = await fetch(CONVERSION_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, name, phone, comment, website, source }),
        });
        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }
        setStatus("success");
      } catch {
        setStatus("error");
      }
    },
    [email, name, phone, comment, website, source, status]
  );

  if (!open) return null;

  const isSuccess = status === "success";
  const isSubmitting = status === "submitting";
  const isError = status === "error";

  return (
    <div
      className="modal-overlay"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal" onClick={handleModalClick}>
        {isSuccess ? (
          <>
            <h3 id="modal-title">Thank you!</h3>
            <p>
              Thank you for your interest in MarketBuzzr! Our team will reach
              out to you shortly!
            </p>
            <div className="modal-actions">
              <button
                className="btn"
                onClick={handleClose}
                aria-label="Close modal"
              >
                Close
              </button>
            </div>
          </>
        ) : (
          <>
            <h3 id="modal-title">Thanks for your interest!</h3>
            {/* His words, from the August handover section 4. It used to say
                "for a product demo", which had stopped being true: every CTA on
                the site now leads here and the primary one offers a free trial
                (mbz-et8e.52.4). */}
            <p>
              Please let us know your email and we will contact you to set up
              your free trial shortly.
            </p>
            <form className="modal-form" onSubmit={handleSubmit} noValidate>
              <label className="modal-label" htmlFor="modal-email">
                Enter your email address
              </label>
              <input
                id="modal-email"
                type="email"
                className="modal-input"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                required
                autoComplete="email"
              />
              <label className="modal-label" htmlFor="modal-name">
                Your name (optional)
              </label>
              <input
                id="modal-name"
                type="text"
                className="modal-input"
                placeholder="Your name (optional)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isSubmitting}
                autoComplete="name"
                maxLength={200}
              />
              {/* His section 4 asks for email required with name, phone and
                  comment optional, in that order. type="tel" for the phone
                  keypad on mobile; no pattern, because international formats
                  vary enough that any pattern worth writing rejects real
                  numbers. The 50-char cap matches the backend's. */}
              <label className="modal-label" htmlFor="modal-phone">
                Your phone number (optional)
              </label>
              <input
                id="modal-phone"
                type="tel"
                className="modal-input"
                placeholder="Your phone number (optional)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={isSubmitting}
                autoComplete="tel"
                maxLength={50}
              />
              <label className="modal-label" htmlFor="modal-comment">
                Comment or question (optional)
              </label>
              <textarea
                id="modal-comment"
                className="modal-input modal-textarea"
                placeholder="Comment or question (optional)"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                disabled={isSubmitting}
                rows={3}
                maxLength={2000}
              />
              {/* Honeypot: hidden from humans via CSS, visible to bots. */}
              <div className="honeypot" aria-hidden="true">
                <label htmlFor="modal-website">Website</label>
                <input
                  id="modal-website"
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>
              {isError && (
                <p className="modal-error" role="alert">
                  Something went wrong. Please try again, or email{" "}
                  <a href="mailto:contact@marketbuzzr.com">
                    contact@marketbuzzr.com
                  </a>
                  .
                </p>
              )}
              <div className="modal-actions">
                <button
                  type="button"
                  className="btn"
                  onClick={handleClose}
                  disabled={isSubmitting}
                  aria-label="Close modal"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn primary"
                  disabled={isSubmitting || !email}
                >
                  {isSubmitting ? "Sending…" : "Confirm"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default EmailCaptureModal;
