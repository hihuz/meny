import React from 'react';

const EditHeader = ({
  name,
  desc,
  author,
  updateInput,
  cancelChanges,
  saveChanges,
  showError
}) => (
  <section className="recipe-main">
    <div className="recipe-main__infos">
      <div className="recipe-main__edit-actions">
        {!showError ?
          <button
            className="icon-button edit-actions__button"
            onClick={saveChanges}
            name="main"
          >
            <i className="icon-floppy-o" />
          </button> : null
        }
        <button
          className="icon-button edit-actions__button"
          onClick={cancelChanges}
          name="main"
        >
          <i className="icon-undo" />
        </button>
      </div>
      <h1 className="recipe-name">
        <input
          value={name}
          onChange={updateInput}
          name="name"
          type="text"
          className="main-search-bar"
        />
      </h1>
      <h4 className="recipe-desc">
        <textarea value={desc} onChange={updateInput} name="desc" className="recipe-desc__edit" />
      </h4>
      <p className="recipe-author">Une recette de {author}</p>
    </div>
    <div className="recipe-main__media">
      share
      <br />
      rating
      <br />
      print
    </div>
  </section>
);

export default EditHeader;
