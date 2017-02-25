import React from 'react';

const RecipeItemList = ({
  listItems,
  listTitle
}) => (
  <section className="add-form__block">
    <p className="add-form__title">{listTitle}</p>
    {listItems.map((item, i) => (
      <div className="flex-container" key={i}>
        <span className="recipe-list__number">
          {i + 1}
        </span>
        <p className="recipe-list__label">
          {item}
        </p>
      </div>
    ))}
  </section>
);

export default RecipeItemList;
