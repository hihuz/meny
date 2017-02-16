import React from 'react';

const AddHeader = ({
  value,
  updateName,
  handleBlur,
  handleFocus,
  showError
}) => (
  <section className="main-add">
    <h3 className="add-main__title">
      Quel est le nom de votre recette ?
    </h3>
    <input
      type="text"
      className={`main-search-bar${showError ? ' input--invalid' : ''}`}
      value={value}
      onChange={updateName}
      onFocus={handleFocus}
      onBlur={handleBlur}
      name="name"
    />
    {showError ?
      <div className="add-form__name-error tooltip-container">
        <div className="tooltip error-msg arrow-top">
          <i className="icon-ban" />
          Renseignez un nom pour votre recette
        </div>
      </div> : ''
    }
  </section>
);

export default AddHeader;
