import React from 'react';
import TextWithLineBreaks from '../components/TextWithLineBreaks';

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
      <TextWithLineBreaks className="recipe-notes" text={note} />
    }
  </section>
);

export default RecipeNotes;
