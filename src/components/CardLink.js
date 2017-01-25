import React from 'react';
import Link from 'react-router/Link';

// change this (it is the regular card so far)
const CardLink = props => (
  <Link to={`/${props.path}`}>
    <div className='card wide'>
      <div className='card__title'>
        <h4 className='card__title-text'>
          name
        </h4>
      </div>
      <div className='card__text'>
        desc
      </div>
      <div className='card__actions'>
        <button>Voir la recette</button>
      </div>
    </div>
  </Link>
);

export default CardLink;
