import React from 'react';
import { withBreaks } from './withBreaks';

const SectionTitle = ({ title, lead }) => (
  <>
    <h2>{title}</h2>
    {lead && <p className="lead">{withBreaks(lead)}</p>}
  </>
);

export default SectionTitle;
