import React from 'react';

const SectionTitle = ({ title, lead }) => (
  <>
    <h2>{title}</h2>
    {lead && <p className="lead">{lead}</p>}
  </>
);

export default SectionTitle;
