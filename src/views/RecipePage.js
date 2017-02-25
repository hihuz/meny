import React from 'react';
import RecipeItemList from '../components/RecipeItemList';
import Header from '../components/Header';
import RecipeHeader from '../components/RecipeHeader';
import '../styles/recipe-page.css';

// these props will be used later:
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
  author,
  id
}) => (
  <main className="recipe">
    <Header page="recipe" id={id} img={img}>
      <RecipeHeader name={name} desc={desc} author={author} />
    </Header>
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
