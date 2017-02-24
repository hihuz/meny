import React from 'react';
import RecipeItemList from '../components/RecipeItemList';

// these props will be used later:
// img,
// editable,
const RecipePage = ({
  name,
  ingredients,
  steps,
  desc,
  note,
  servings,
  prepTime,
  cookingTime,
  img,
  author
}) => (
  <main className="recipe">
    <header className="header">
      <div className="recipe-image">
        {img}
      </div>
      <div className="recipe-title">
        <h3 className="recipe-name">{name}</h3>
        {desc ? <p className="recipe-desc">{desc}</p> : ''}
        <p>Une recette de {author}</p>
      </div>
      <div className="recipe-media-infos">
        share / rating / print ?
      </div>
    </header>
    <div className="container">
      <section className="recipe-infos">
        prep: {prepTime}, cook: {cookingTime}, servings: {servings}
      </section>
      <hr />
      <RecipeItemList
        listItems={ingredients}
        listTitle={'Ingrédients :'}
      />
      <hr />
      <RecipeItemList
        listItems={steps}
        listTitle={'Préparation :'}
      />
      {note ?
        <section>
          {note}
        </section> :
        ''
      }
    </div>
  </main>
);

export default RecipePage;
