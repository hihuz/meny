import React from 'react';

const RecipeNotes = ({
  note,
  updateInput,
  switchToEdit,
  editable,
  editing,
  cancelChanges,
  saveChanges,
  showError
}) => (
  <section className="section">
    {editable && !editing ?
      <div className="section__edit-actions">
        <button
          className="icon-button edit-actions__button"
          onClick={switchToEdit}
          name="note"
        >
          <i className="icon-pencil" />
        </button>
      </div> : null}
    {editable && editing ?
      <div className="section__edit-actions">
        {!showError ?
          <button
            className="icon-button edit-actions__button"
            onClick={saveChanges}
            name="note"
          >
            <i className="icon-floppy-o" />
          </button> : null
        }
        <button
          className="icon-button edit-actions__button"
          onClick={cancelChanges}
          name="note"
        >
          <i className="icon-undo" />
        </button>
      </div> : null}
    <p className="section__title">Notes supplémentaires :</p>
    {editing ?
      <textarea
        className="add-form-textfield"
        name="note"
        value={note}
        onChange={updateInput}
      /> :
      <p className="recipe-notes">{note}</p>
    }
  </section>
);

export default RecipeNotes;
