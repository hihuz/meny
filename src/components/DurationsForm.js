import React from 'react';

const DurationsForm = ({
  prepTime,
  cookingTime,
  updateTime
}) => (
  <div className="add-form__block">
    <p>Combien de temps faut-il ...</p>
    <div className="flex-container">
      <div className="add-form-image">
        <img src="/public/cooking.png" />
      </div>
      <div className="add-form-col">
        <div className="add-form-input-title">Pour la préparation ?</div>
        <input
          className="add-form-numberfield"
          id="prep-time"
          type="number"
          pattern="[0-9]*"
          step="5"
          name="prepTime"
          value={prepTime}
          onChange={updateTime}
        />
        <label htmlFor="prep-time" className="add-form-numberlabel">
          minutes
        </label>
        </div>
        <div className="add-form-col">
          <div className="add-form-input-title">Pour la cuisson ?</div>
          <input
            id="cooking-time"
            className="add-form-numberfield"
            type="number"
            pattern="[0-9]*"
            step="5"
            name="cookingTime"
            value={cookingTime}
            onChange={updateTime}
          />
          <label htmlFor="cooking-time" className="add-form-numberlabel">
            minutes
          </label>
        </div>
        <div className="add-form-image">
          <img src="/public/pan.png" />
        </div>
      </div>
  </div>
);


export default DurationsForm;


