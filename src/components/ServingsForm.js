import React from 'react';

const ServingsForm = ({
  value,
  updateServings,
  handleBlur,
  handleFocus,
  showError
}) => (
  <div className="add-form__block">
    {showError ?
      <div className="tooltip-container add-form__servings-error">
        <div className="tooltip error-msg">
          <i className="icon-ban" />
          Vérifiez le nombre de persones indiqué
        </div>
      </div> : ''
    }
    <p className="add-form__title">Pour combien de personnes ?</p>
    <div className="text-centered">
      <input
        className={`add-form-numberfield${
         showError ?
          ' input--invalid' : ''
        }`}
        id="servings"
        type="number"
        pattern="[0-9]*"
        step="1"
        name="servings"
        value={value}
        onChange={updateServings}
        onBlur={handleBlur}
        onFocus={handleFocus}
      />
      <label htmlFor="servings" className="add-form-numberlabel">
        personnes
      </label>
    </div>
  </div>
);

export default ServingsForm;
