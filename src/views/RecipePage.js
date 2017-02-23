import React from 'react';

const RecipePage = ({
  name,
  ingredients,
  steps,
  desc,
  note,
  editable
}) => (
  <main className="recipe">
    <header className="header">
      {name}
    </header>
    <div className="container">
      {desc ?
        <div>
          {desc}
        </div> :
        ''
      }
      <RecipeItemList

      />
      <hr />
      <RecipeItemList

      />
      {note ?
        <div>
          {note}
        </div> :
        ''
      }
    </div>
  </main>
);

export default RecipePage;
