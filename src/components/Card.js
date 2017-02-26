import React from 'react';
import Link from 'react-router/Link';

const Card = ({ path, background, title, text, infos }) => (
  <Link className="card" to={path}>
    <div
      className="card__image"
      style={{ backgroundImage: `url(/public/${background}.jpg)` }}
    />
    <div className="card__content">
      <h3 className="card__title">
        {title}
      </h3>
      <div className="card__infos">
        <div><i className="icon-clock-o" /> {`${infos.prepTime}'`}</div>
        <div><img src="/public/pan.svg" alt="pan" /> {`${infos.cookingTime}'`}</div>
        <div><i className="icon-group" /> {infos.servings}</div>
      </div>
      <div className="card__text">
        {text}
      </div>
    </div>
  </Link>
);

export default Card;
