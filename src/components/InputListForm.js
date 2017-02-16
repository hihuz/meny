import React from 'react';

const InputListForm = ({
  listItems,
  addListItem,
  removeListItem,
  updateListItem,
  buttonDisabled,
  name,
  listLabels,
  handleBlur,
  handleFocus,
  showError
}) => (
  <div className="add-form__block">
    {showError ?
      <div className={`tooltip-container add-form__${name}-error`}>
        <div className="tooltip error-msg">
          <i className="icon-ban" />
          {listLabels[2]}
        </div>
      </div> : ''
    }
    <p className="add-form__title">{listLabels[0]}</p>
    {listItems.map((item, i) => {
      const inputClasses = `add-form-textfield${
        showError && item.length === 0 ?
        ' input--invalid' : ''
      }`;
      return (
        <div
          className="flex-container"
          key={i}
        >
          <label className="input-list__label" htmlFor={name + i}>
            {i + 1}
          </label>
          <input
            className={inputClasses}
            type="text"
            value={item}
            onChange={updateListItem}
            autoFocus={listItems.length === i + 1 && i !== 0}
            onFocus={handleFocus}
            onBlur={handleBlur}
            name={name}
            data-index={i}
            id={name + i}
          />
          { i !== 0 ?
            <button
              className="input-list__remove"
              data-index={i}
              name={name}
              onClick={removeListItem}
            >
              <i className="icon-remove" />
            </button> :
            <button
              className="input-list__remove"
              style={{ visibility: 'hidden' }}
            >
              <i className="icon-remove" />
            </button>
          }
        </div>
      );
    })}
    <button
      className="button-outline button-centered"
      onClick={addListItem}
      disabled={buttonDisabled}
      name={name}
    >
      <i className="icon-plus" style={{ paddingRight: '0.5rem' }} /> {listLabels[1]}
    </button>
  </div>
);

export default InputListForm;
