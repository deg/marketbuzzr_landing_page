import React from "react";

// The same signal, read by three roles, each getting different work out of it.
// Sits directly under the insight card, inside the same rounded surface, exactly
// as the sketch draws it: it only means anything next to a concrete example. It
// carries no heading of its own — "One signal, read three ways" was invented
// here and is gone.
//
// A candidate to replace How It Works step 02's PNG, which makes this exact
// point with four role panels baked into an image.
const RoleBar = ({ items }) => (
  <section className="role-bar" aria-label="Who acts on this insight">
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
