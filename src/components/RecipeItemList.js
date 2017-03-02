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
      <button
        className="section__edit icon-button"
        onClick={switchToEdit}
        name={name}
      >
        <i className="icon-pencil" />
      </button> : ''
    }
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
