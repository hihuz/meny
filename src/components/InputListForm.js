import React from 'react';
import { connect } from 'react-redux';
import {
  addFormInput,
  removeFormInput,
  moveFormInput
} from '../actions/';

class InputListForm extends React.Component {
  constructor(props) {
    super(props);

    this.removeInput = this.removeInput.bind(this);
    this.addInput = this.addInput.bind(this);
    this.moveInputUp = this.moveInputUp.bind(this);
    this.moveInputDown = this.moveInputDown.bind(this);
  }
  addInput(e) {
    const field = e.target.getAttribute('name');
    const type = this.props.type;
    this.props.dispatchAddFormInput({ field, type });
  }
  removeInput(e) {
    const target = e.currentTarget;
    const field = target.name;
    const index = target.getAttribute('data-index') || 0;
    const type = this.props.type;
    this.props.dispatchRemoveFormInput({ field, index, type });
  }
  moveInputUp(e) {
    const dir = 'up';
    const target = e.currentTarget;
    const field = target.name;
    const index = target.getAttribute('data-index') || 0;
    const type = this.props.type;
    this.props.dispatchMoveFormInput({ field, index, dir, type });
  }
  moveInputDown(e) {
    const dir = 'down';
    const target = e.currentTarget;
    const field = target.name;
    const index = target.getAttribute('data-index') || 0;
    const type = this.props.type;
    this.props.dispatchMoveFormInput({ field, index, dir, type });
  }
  render() {
    const {
      showError,
      listLabels,
      listItems,
      field,
      textarea,
      updateListItem,
      buttonDisabled,
      handleFocus,
      handleBlur,
      type
    } = this.props;

    return (
      <section className="section">
        {showError && type === 'add' ?
          <div className={`tooltip-container ${type}-form__error`}>
            <div className="tooltip error-msg">
              <i className="icon-ban" />
              {listLabels[2]}
            </div>
          </div> : null
        }
        <p className="section__title">{listLabels[0]}</p>
        {listItems.map((item, i) => {
          const inputClasses = `add-form-textfield${
            showError && item.length === 0 && type === 'add' ?
            ' input--invalid' : ''
          }`;
          return (
            <div
              className="flex-container"
              key={`${type}_${field}_${i}`}
            >
              <label className="input-list__label" htmlFor={field + i}>
                {i + 1}
              </label>
              <div className="input-list__controls">
                <button
                  className="input-list__button button-icon input-list__control"
                  onClick={this.moveInputUp}
                  data-index={i}
                  name={field}
                  disabled={i === 0}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                >
                  <i className="icon-caret-up" />
                </button>
                <button
                  className="input-list__button button-icon input-list__control"
                  onClick={this.moveInputDown}
                  data-index={i}
                  name={field}
                  disabled={listItems.length === i + 1}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                >
                  <i className="icon-caret-down" />
                </button>
              </div>
              {textarea ?
                <textarea
                  className={inputClasses}
                  type="text"
                  value={item}
                  onChange={updateListItem}
                  autoFocus={listItems.length === i + 1 && i !== 0 && item.length === 0}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  name={field}
                  data-index={i}
                  id={field + i}
                /> :
                <input
                  className={inputClasses}
                  type="text"
                  value={item}
                  onChange={updateListItem}
                  autoFocus={listItems.length === i + 1 && i !== 0 && item.length === 0}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  name={field}
                  data-index={i}
                  id={field + i}
                />
              }
              {i !== 0 ?
                <button
                  className="input-list__button button-icon input-list__remove"
                  data-index={i}
                  name={field}
                  onClick={this.removeInput}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                >
                  <i className="icon-remove" />
                </button> :
                <button
                  className="input-list__button button-icon input-list__remove"
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
          onClick={this.addInput}
          disabled={buttonDisabled}
          name={field}
        >
          <i className="icon-plus" style={{ paddingRight: '0.5rem' }} /> {listLabels[1]}
        </button>
      </section>
    );
  }
}

export default connect(
  null,
  {
    dispatchAddFormInput: addFormInput,
    dispatchRemoveFormInput: removeFormInput,
    dispatchMoveFormInput: moveFormInput
  }
)(InputListForm);
