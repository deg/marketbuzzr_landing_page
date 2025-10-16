import React from "react";

const ProblemCard = ({ problem, index }) => (
  <div key={index} className="card">
    <div className="icon" />
    <h3>{problem.heading}</h3>
    <a href="#" aria-label={problem.actionText}>
      {problem.actionText}
    </a>
  </div>
);

export default ProblemCard;
