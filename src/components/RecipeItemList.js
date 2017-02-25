import React from 'react';

const RecipeItemList = ({
  listItems,
  listTitle
}) => (
  <section className="add-form__block">
    <p className="add-form__title">{listTitle}</p>
    {listItems.map((item, i) => (
      <div className="flex-container" key={i}>
        <span>
          {i + 1}
        </span>
        <p>
          {item}
        </p>
      </div>
    ))}
  </section>
);

export default RecipeItemList;
