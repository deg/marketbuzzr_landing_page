import React from 'react';

const FeatureCard = ({ feature, index }) => (
  <div key={index} className="card">
    <div className="icon" />
    <h3>{feature.heading}</h3>
    <p>{feature.description}</p>
    <a href="#" aria-label={feature.actionText}>
      {feature.actionText}
    </a>
  </div>
);

export default FeatureCard;
