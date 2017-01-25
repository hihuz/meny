import React from 'react';

const Card = ({ name, description, image, id }) => (
  <div className='card'>
    <div className='card__title'>
      <h4 className='card__title-text'>
        {name}
      </h4>
    </div>
    <div className='card__text'>
      {description}
    </div>
    <div className='card__actions'>
      <button>Voir la recette</button>
    </div>
  </div>
);

export default Card;
