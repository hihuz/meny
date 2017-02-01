import React from 'react';

const IngredientsForm = ({
  ingredients,
  addIngredient,
  removeIngredient,
  updateIngredient
}) => (
  <div className="add-form-block">
    Ingrédients :
    {ingredients.map((ingredient, i) => (
      <div
        className="ingredient-field"
        key={i}
      >
          <label className="ingredient-field__label">
            {i + 1} :
          </label>
          <input
            className="add-form-textfield ingredient-field__input"
            type="text"
            value={ingredient}
            onChange={updateIngredient}
          />
          { i !== 0 ?
            <i
              className="icon-remove ingredient-field__remove"
              data-index={i}
              onClick={removeIngredient}
            >
            </i> :
            <i className="ingredient-field__remove"></i>
          }
      </div>
    ))}
    <button className="add-ingredient-button" onClick={addIngredient}>
      <i className="icon-plus"></i> Ajouter un ingrédient
    </button>
  </div>
);

export default IngredientsForm;


