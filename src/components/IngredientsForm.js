import React from 'react';

const IngredientsForm = ({
  ingredients,
  addIngredient,
  removeIngredient,
  changeIngredient
}) => {
  console.log(ingredients);

  return   (<div className="add-form-block">
    Ingrédients :
    {ingredients.map((ingredient, i) => (
      <div
        className="ingredient-field"
        key={i}
      >
          <label className="ingredient-field__label">
            {i + 1}
          </label>
          <input
            className="add-form-textfield ingredient-field__input"
            type="text"
            value={ingredient}
            onChange={changeIngredient}
            autoFocus={ingredients.length === i + 1 && i !== 0}
            data-index={i}
          />
          { i !== 0 ?
            <i
              className="icon-remove ingredient-field__remove"
              data-index={i}
              onClick={removeIngredient}
            >
            </i> :
            <i
              className="icon-remove ingredient-field__remove"
              style={{ opacity: 0 }}
            >
            </i>
          }
      </div>
    ))}
    <button className="button-outline add-ingredient-button" onClick={addIngredient}>
      <i className="icon-plus" style={{ paddingRight: '0.5rem' }}></i> Ajouter un ingrédient
    </button>
  </div>
);
}


export default IngredientsForm;


