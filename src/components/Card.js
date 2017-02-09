import React from 'react';
import Link from 'react-router/Link';

const Card = ({ name, desc, img, id }) => (
  <Link className="card" to={`/recipes/${id}`}>
    <div className="card__title">
      <h4 className="card__title-text">
        {name}
      </h4>
    </div>
    <div className="card__text">
      {desc}
    </div>
  </Link>
);

export default Card;
