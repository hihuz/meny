import React from 'react';
import RecipeMetaActions from './RecipeMetaActions';

const RecipeHeader = ({ name, desc, author, storedRecipe }) => (
  <section className="recipe-main">
    <div className="recipe-main__infos">
      <h1 className="recipe-name">
        {name}
      </h1>
      {desc ? <h4 className="recipe-desc">{desc}</h4> : ''}
      <p className="recipe-author">Une recette de {author}</p>
    </div>
    <RecipeMetaActions storedRecipe={storedRecipe} />
  </section>
);

export default RecipeHeader;
