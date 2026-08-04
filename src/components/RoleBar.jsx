import React from "react";

// The same signal, read by three roles, each getting different work out of it.
// Sits directly under the insight card because it only means anything next to a
// concrete example — on its own it is an abstract claim about personalization,
// which the site already makes twice elsewhere.
//
// A candidate to replace How It Works step 02's PNG, which makes this exact
// point with four role panels baked into an image.
const RoleBar = ({ heading, items }) => (
  <section className="role-bar" aria-label={heading}>
    <h3 className="role-bar-heading">{heading}</h3>
    <ul className="role-bar-items">
      {items.map((role) => (
        <li key={role.name}>
          <strong>{role.name}</strong>
          <span>{role.outputs}</span>
        </li>
      ))}
    </ul>
  </section>
);

export default RoleBar;
