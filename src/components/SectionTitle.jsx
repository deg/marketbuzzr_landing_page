import React from 'react';
import { withBreaks } from './withBreaks';

// The title takes withBreaks as well as the lead. drop_07 §3.3 asks for a
// forced desktop break inside one section heading, and a heading is exactly the
// place a brief asks for one — a no-op for every title with no "\n" in it.
const SectionTitle = ({ title, lead }) => (
  <>
    <h2>{withBreaks(title)}</h2>
    {lead && <p className="lead">{withBreaks(lead)}</p>}
  </>
);

export default SectionTitle;
