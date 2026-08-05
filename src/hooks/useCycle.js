import { useEffect, useRef, useState } from "react";

const REDUCED = "(prefers-reduced-motion: reduce)";

// Steps an index 0..length-1 on a timer, for the two How It Works animations
// that cycle through roles and draft formats (mbz-et8e.46).
//
// IT STOPS FOR TWO REASONS, and both are the point of the hook rather than
// extras on top of a setInterval:
//
//   * WHILE THE POINTER OR FOCUS IS INSIDE. Content that updates on its own,
//     forever, with no way to stop it fails WCAG 2.2.2 (Pause, Stop, Hide).
//     Pausing on hover is the mechanism, chosen over a visible pause button
//     because that would be chrome no other part of this site has, on a page
//     whose brief says not to redesign it. Honest about the limit: a
//     keyboard-only visitor who never moves a pointer gets no pause unless
//     something focusable sits inside, and nothing here is focusable, because
//     nothing here is interactive. The residual gap is recorded on mbz-et8e.46;
//     the whole site shares it, since SignalLine and both hero animations also
//     run unattended.
//
//   * WHEN THE VISITOR ASKS FOR REDUCED MOTION, where it also pins back to the
//     first item so what is on screen is deterministic rather than wherever the
//     cycle happened to stop. The media query is watched rather than read once,
//     so toggling the system setting takes effect without a reload.
//
// Returns [index, pauseProps]. Spread pauseProps onto the element that should
// pause when the visitor is looking at it.
export const useCycle = (length, intervalMs) => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(
    () => window.matchMedia(REDUCED).matches,
  );

  useEffect(() => {
    const query = window.matchMedia(REDUCED);
    const onChange = () => setReduced(query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduced) setIndex(0);
  }, [reduced]);

  useEffect(() => {
    if (paused || reduced) return undefined;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % length),
      intervalMs,
    );
    return () => clearInterval(id);
  }, [paused, reduced, length, intervalMs]);

  // onFocus/onBlur rather than onFocusCapture: React maps these to focusin and
  // focusout, which bubble, so focus landing anywhere inside pauses the whole
  // panel.
  const pauseProps = useRef({
    onMouseEnter: () => setPaused(true),
    onMouseLeave: () => setPaused(false),
    onFocus: () => setPaused(true),
    onBlur: () => setPaused(false),
  }).current;

  return [index, pauseProps];
};
