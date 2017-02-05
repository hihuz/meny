import React from 'react';

const RecipeTypeForm = ({
  selectedType,
  updateSelectedType
}) => (
  <div className="add-form__block">
    Type de plat :
    <div className="flex-container">
      <input
        id="type0"
        className="hidden-input"
        type="radio"
        name="type"
        data-index="0"
        onChange={updateSelectedType}
        checked={selectedType===0}
      />
      <label className="add-form__radio-group" htmlFor="type0">
        <span>
          <i className="icon-vcheap"></i>
        </span>
        Entrée
      </label>
      <input
        id="type1"
        className="hidden-input"
        type="radio"
        name="type"
        data-index="1"
        onChange={updateSelectedType}
        checked={selectedType===1}
      />
      <label className="add-form__radio-group" htmlFor="type1">
        <span>
          <i className="icon-cheap"></i>
        </span>
        Plat principal
      </label>
      <input
        id="type2"
        className="hidden-input"
        type="radio"
        name="type"
        data-index="2"
        onChange={updateSelectedType}
        checked={selectedType===2}
      />
      <label className="add-form__radio-group" htmlFor="type2">
        <span>
          <i className="icon-exp"></i>
        </span>
        Dessert
      </label>
    </div>
  </div>
);

export default RecipeTypeForm;


