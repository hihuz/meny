import React from "react";
import { Link } from "react-router-dom";

const LandingCard = ({ path, clickHandler, background, title, text }) => (
  <Link to={path} onClick={clickHandler} className="card wide-card">
    <div className="card__image" style={{ backgroundImage: `url(/public/${background}.jpg)` }}>
      <h4 className="card__image-text">{title}</h4>
    </div>
    <div className="card__text">{text}</div>
  </Link>
);

export default LandingCard;
