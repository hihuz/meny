import React from 'react';
import RecipeMetaActions from './RecipeMetaActions';

const EditHeader = ({
  name,
  desc,
  author,
  updateInput,
  storedRecipe
}) => (
  <section className="recipe-main">
    <div className="recipe-main__infos">
      <h1 className="recipe-name">
        <input
          value={name}
          onChange={updateInput}
          name="name"
          type="text"
          className="main-search-bar"
        />
      </h1>
      <h4 className="recipe-desc">
        <textarea value={desc} onChange={updateInput} name="desc" className="recipe-desc__edit" />
      </h4>
      <p className="recipe-author">Une recette de {author}</p>
    </div>
    <RecipeMetaActions storedRecipe={storedRecipe} />
  </section>
);

export default EditHeader;
