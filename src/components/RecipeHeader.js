import React from 'react';

const RecipeHeader = ({ name, desc, author }) => (
  <section className="recipe-main">
    <div className="recipe-main__infos">
      <h1 className="recipe-name">{name}</h1>
      {desc ? <h4 className="recipe-desc">{desc}</h4> : ''}
      <p className="recipe-author">Une recette de {author}</p>
    </div>
    <div className="recipe-main__media">
      share
      <br />
      rating
      <br />
      print
    </div>
  </section>
);

export default RecipeHeader;
