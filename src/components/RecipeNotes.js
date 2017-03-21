import React from 'react';

const RecipeNotes = ({
  note,
  updateInput,
  editing
}) => (
  <section className="section">
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
