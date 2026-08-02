import React from "react";
import CategoryIcon from "./CategoryIcon";

// An intelligence category: icon, heading, and up to four short lines. The
// brief is explicit that these are lines and not paragraphs, so they are a real
// list rather than a run of text — which also gives screen readers the count.
//
// Takes the shared .card surface (gradient, border, hover) and adds only what
// is specific to this shape, rather than forking the card styling.
const CategoryCard = ({ heading, icon, lines }) => (
  <div className="card category-card">
    <CategoryIcon name={icon} />
    <h3>{heading}</h3>
    <ul className="category-lines">
      {lines.map((line) => (
        <li key={line}>{line}</li>
      ))}
    </ul>
  </div>
);

export default CategoryCard;
