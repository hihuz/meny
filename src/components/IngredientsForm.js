import React from 'react';

const IngredientsForm = ({
  ingredients,
  addIngredient,
  removeIngredient,
  changeIngredient,
  buttonDisabled
}) => {

  return   (<div className="add-form-block">
    Ingrédients :
    {ingredients.map((ingredient, i) => {
      const inputClasses = `add-form-textfield ingredient-field__input${
        ingredient.length === 0 &&
        i != ingredients.length - 1 &&
        ingredients.length > 1 ?
        ' input--invalid' : ''
      }`;
      return (
        <div
          className="ingredient-field"
          key={i}
        >
            <label className="ingredient-field__label">
              {i + 1}
            </label>
            <input
              className={inputClasses}
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
      );
    })}
    <button
      className="button-outline add-ingredient-button"
      onClick={addIngredient}
      disabled={buttonDisabled}
    >
      <i className="icon-plus" style={{ paddingRight: '0.5rem' }}></i> Ajouter un ingrédient
    </button>
  </div>
);
}


export default IngredientsForm;


