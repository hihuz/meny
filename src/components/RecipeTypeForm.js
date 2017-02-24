import React from 'react';

const RecipeTypeForm = ({
  selectedType,
  updateSelectedType
}) => (
  <div className="add-form__block">
    De quel type de plat s{"'"}agit-il ?
    <div className="flex-container">
      <input
        id="type1"
        className="hidden-input"
        type="radio"
        name="type"
        data-index="1"
        onChange={updateSelectedType}
        checked={selectedType === '1'}
      />
      <label className="add-form__radio-group" htmlFor="type1">
        <span className="icon-background-container">
          <i className="icon-starter icon-background" />
        </span>
        Entrée
      </label>
      <input
        id="type2"
        className="hidden-input"
        type="radio"
        name="type"
        data-index="2"
        onChange={updateSelectedType}
        checked={selectedType === '2'}
      />
      <label className="add-form__radio-group" htmlFor="type2">
        <span className="icon-background-container">
          <i className="icon-main-course icon-background" />
        </span>
        Plat principal
      </label>
      <input
        id="type3"
        className="hidden-input"
        type="radio"
        name="type"
        data-index="3"
        onChange={updateSelectedType}
        checked={selectedType === '3'}
      />
      <label className="add-form__radio-group" htmlFor="type3">
        <span className="icon-background-container">
          <i className="icon-accomp icon-background" />
        </span>
        Accompagnement
      </label>
      <input
        id="type4"
        className="hidden-input"
        type="radio"
        name="type"
        data-index="4"
        onChange={updateSelectedType}
        checked={selectedType === '4'}
      />
      <label className="add-form__radio-group" htmlFor="type4">
        <span className="icon-background-container">
          <i className="icon-dessert icon-background" />
        </span>
        Dessert
      </label>
    </div>
  </div>
);

export default RecipeTypeForm;
