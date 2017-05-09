import React from 'react';
import TextWithLineBreaks from '../components/TextWithLineBreaks';

const RecipeItemList = ({
  listItems,
  listTitle
}) => (
  <section className="section">
    <p className="section__title">{listTitle}</p>
    {listItems.map((item, i) => (
      <div className="flex-container" key={i}>
        <p className="recipe-list__index">
          <span>
            {i + 1}
          </span>
        </p>
        <TextWithLineBreaks className="recipe-list__label" text={item} />
      </div>
    ))}
  </section>
);

export default RecipeItemList;
