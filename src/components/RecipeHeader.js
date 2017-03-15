import React from 'react';

const RecipeHeader = ({ name, desc, author, editable, switchToEdit }) => (
  <section className="recipe-main">
    <div className="recipe-main__infos">
      {editable ?
        <div className="recipe-main__edit-actions">
          <button
            className="icon-button"
            onClick={switchToEdit}
            name="main"
          >
            <i className="icon-pencil" />
          </button>
        </div> : null
      }
      <h1 className="recipe-name">
        {name}
      </h1>
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
