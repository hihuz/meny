import React from 'react';
import Link from 'react-router/Link';

const LandingCard = props => (
  <Link to={`/${props.path}`} onClick={props.clickHandler}>
    <div className="card wide">
      <div
        className="card__title"
        style={{ backgroundImage: `url(/public/${props.background}.jpg)` }}
      >
        <h4 className="card__title-text">
          {props.title}
        </h4>
      </div>
      <div className="card__text">
        {props.text}
      </div>
    </div>
  </Link>
);

export default LandingCard;
