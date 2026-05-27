import React from "react";
import SignalMark from "./SignalMark";

const Card = ({ heading, description, note }) => (
  <div className="card">
    <SignalMark />
    <h3>{heading}</h3>
    <p>{description}</p>
    {note && <p className="card-note">{note}</p>}
  </div>
);

export default Card;
