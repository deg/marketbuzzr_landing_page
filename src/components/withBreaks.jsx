import React from "react";

// Renders a content string, turning embedded "\n" into <br/> hard breaks.
// Content modules insert "\n" where Manu's deck asks for a line break at a
// specific point. These breaks are tuned to the desktop layout; on narrow
// screens they simply become centered short lines, which reads fine.
export function withBreaks(text) {
  return String(text)
    .split("\n")
    .map((part, i) => (
      <React.Fragment key={i}>
        {i > 0 && <br />}
        {part}
      </React.Fragment>
    ));
}
