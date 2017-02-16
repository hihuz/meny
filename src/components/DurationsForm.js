import React from 'react';

const DurationsForm = ({
  prepTime,
  cookingTime,
  updateTime,
  handleBlur,
  handleFocus,
  showPrepError,
  showCookingError
}) => (
  <div className="add-form__block">
    {showPrepError || showCookingError ?
      <div className="tooltip-container add-form__time-error">
        <div className="tooltip error-msg">
          <i className="icon-ban" />
          Vérifiez les durées indiquées
        </div>
      </div> : ''
    }
    <p className="add-form__title">Combien de temps faut-il ...</p>
    <div className="flex-container">
      <div className="add-form-image">
        <img src="/public/cooking.png" alt="preparation" />
      </div>
      <div className="add-form-col">
        <div className="add-form-input-title">Pour la préparation ?</div>
        <input
          className={`add-form-numberfield${
            showPrepError ? ' input--invalid' : ''
          }`}
          id="prep-time"
          type="number"
          pattern="[0-9]*"
          step="5"
          name="prepTime"
          value={prepTime}
          onChange={updateTime}
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
        <label htmlFor="prep-time" className="add-form-numberlabel">
          minutes
        </label>
      </div>
      <div className="add-form-col">
        <div className="add-form-input-title">Pour la cuisson ?</div>
        <input
          id="cooking-time"
          className={`add-form-numberfield${
            showCookingError ? ' input--invalid' : ''
          }`}
          type="number"
          pattern="[0-9]*"
          step="5"
          name="cookingTime"
          value={cookingTime}
          onChange={updateTime}
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
        <label htmlFor="cooking-time" className="add-form-numberlabel">
          minutes
        </label>
      </div>
      <div className="add-form-image">
        <img src="/public/pan.png" alt="cooking" />
      </div>
    </div>
  </div>
);

export default DurationsForm;
