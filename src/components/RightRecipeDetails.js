import React from 'react';

const RightRecipeDetails = ({
  season,
  type,
  price,
  editable,
  editing,
  cancelChanges,
  saveChanges,
  updateInput,
  switchToEdit,
  showError
}) => (
  <div className="recipe-details__part recipe-details__right">
    {editable && !editing ?
      <div className="section__edit-actions" style={{ left: '20rem', right: 'auto' }}>
        <button
          className="icon-button edit-actions__button"
          onClick={switchToEdit}
          name={'rightDetails'}
        >
          <i className="icon-pencil" />
        </button>
      </div> : null}
    {editable && editing ?
      <div className="section__edit-actions" style={{ left: '20rem', right: 'auto' }}>
        {!showError ?
          <button
            className="icon-button edit-actions__button"
            onClick={saveChanges}
            name={'rightDetails'}
          >
            <i className="icon-floppy-o" />
          </button> : null
        }
        <button
          className="icon-button edit-actions__button"
          onClick={cancelChanges}
          name={'rightDetails'}
        >
          <i className="icon-undo" />
        </button>
      </div> : null}
    <div>
      {editing ?
        <input
          className="edit-number-input"
          type="number"
          pattern="[0-9]*"
          step="5"
          name="price"
          value={price}
          onChange={updateInput}
        /> : ` ${price}`} xxx
      <i className="icon-clock-o" />
    </div>
    <div>
      {editing ?
        <input
          className="edit-number-input"
          type="number"
          pattern="[0-9]*"
          step="5"
          name="type"
          value={type}
          onChange={updateInput}
        /> : ` ${type}`} xxx
      <img src="/public/pan.svg" alt="pan" />
    </div>
    <div>
      {editing ?
        <input
          className="edit-number-input"
          type="number"
          pattern="[0-9]*"
          step="1"
          name="season"
          value={season}
          onChange={updateInput}
        /> : ` ${season}`}
      <i className="icon-group" />
    </div>
  </div>
);

export default RightRecipeDetails;
