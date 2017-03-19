import React from 'react';

const LeftRecipeDetails = ({
  prepTime,
  cookingTime,
  servings,
  editable,
  editing,
  cancelChanges,
  saveChanges,
  updateInput,
  switchToEdit,
  showError
}) => (
  <div className="recipe-details__part recipe-details__left">
    {editable && !editing ?
      <div className="section__edit-actions" style={{ right: '10rem' }}>
        <button
          className="icon-button edit-actions__button"
          onClick={switchToEdit}
          name="leftDetails"
        >
          <i className="icon-pencil" />
        </button>
      </div> : null}
    {editable && editing ?
      <div className="section__edit-actions" style={{ right: '10rem' }}>
        {!showError ?
          <button
            className="icon-button edit-actions__button"
            onClick={saveChanges}
            name="leftDetails"
          >
            <i className="icon-floppy-o" />
          </button> : null
        }
        <button
          className="icon-button edit-actions__button"
          onClick={cancelChanges}
          name="leftDetails"
        >
          <i className="icon-undo" />
        </button>
      </div> : null}
    <div><i className="icon-clock-o" />
      {editing ? <input
        className="edit-number-input"
        type="number"
        pattern="[0-9]*"
        step="5"
        name="prepTime"
        value={prepTime}
        onChange={updateInput}
      /> : ` ${prepTime}`} minutes de préparation
    </div>
    <div><img src="/public/pan.svg" alt="pan" />
      {editing ?
        <input
          className="edit-number-input"
          type="number"
          pattern="[0-9]*"
          step="5"
          name="cookingTime"
          value={cookingTime}
          onChange={updateInput}
        /> : ` ${cookingTime}`} minutes de cuisson
    </div>
    <div>
      <i className="icon-group" />&nbsp;Les quantités indiquées sont pour
      {editing ?
        <input
          className="edit-number-input"
          type="number"
          pattern="[0-9]*"
          step="1"
          name="servings"
          value={servings}
          onChange={updateInput}
        /> : ` ${servings}`} personnes
    </div>
  </div>
);

export default LeftRecipeDetails;
