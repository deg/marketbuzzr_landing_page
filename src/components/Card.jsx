import React from "react";

const Card = ({ heading, description, note }) => (
  <div className="card">
    <div className="icon" />
    <h3>{heading}</h3>
    <p>{description}</p>
    {note && <p className="card-note">{note}</p>}
  </div>
);

export default Card;
