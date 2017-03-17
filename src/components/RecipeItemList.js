import React from 'react';

const RecipeItemList = ({
  listItems,
  listTitle,
  editable,
  switchToEdit,
  name
}) => (
  <section className="section">
    {editable ?
      <div className="section__edit-actions">
        <button
          className="icon-button edit-actions__button"
          onClick={switchToEdit}
          name={name}
        >
          <i className="icon-pencil" />
        </button>
      </div> : null}
    <p className="section__title">{listTitle}</p>
    {listItems.map((item, i) => (
      <div className="flex-container" key={i}>
        <p className="recipe-list__index">
          <span>
            {i + 1}
          </span>
        </p>
        <p className="recipe-list__label">
          {item}
        </p>
      </div>
    ))}
  </section>
);

export default RecipeItemList;
