import React from 'react';
import { connect } from 'react-redux';
import {
  addFormAddInput,
  addFormRemoveInput,
  addFormUpdateInput,
  addNewRecipe
} from '../actions/';
import { getAddFormValidState } from '../reducers'
import Header from '../components/Header';
import AddHeader from '../components/AddHeader';
import InputListForm from '../components/InputListForm';
import DurationsForm from '../components/DurationsForm';
import RecipePriceForm from '../components/RecipePriceForm';
import RecipeTypeForm from '../components/RecipeTypeForm';
import RecipeSeasonForm from '../components/RecipeSeasonForm';

const noop = () => {
  return;
}

class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameErrorDisplay: false,
      ingredientsErrorDisplay: false,
      stepsErrorDisplay: false,
      servingsErrorDisplay: false,
      prepTimeErrorDisplay: false,
      cookingTimeErrorDisplay: false
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.removeInput = this.removeInput.bind(this);
    this.addInput = this.addInput.bind(this);
    this.addNewRecipe = this.addNewRecipe.bind(this);
    this.handleInputBlur = this.handleInputBlur.bind(this);
    this.handleInputFocus = this.handleInputFocus.bind(this);
  }
  handleInputChange(e) {
    const target = e.target;
    const value = target.type === 'radio' ? target.checked : target.value;
    const name = target.name;
    const index = target.getAttribute('data-index') || 0;
    this.props.dispatchAddFormUpdateInput({ name, index, value });
  }
  addInput(e) {
    this.props.dispatchAddFormAddInput(e.target.getAttribute('name'));
  }
  removeInput(e) {
    const target = e.target;
    const name = target.getAttribute('name');
    const index = target.getAttribute('data-index') || 0;
    this.props.dispatchAddFormRemoveInput({ name, index });
  }
  handleInputBlur(e) {
    const target = e.target.name;
    this.setState({ [`${target}ErrorDisplay`]: !this.props.validState[target] });
  }
  handleInputFocus(e) {
    const target = e.target.name;
    this.setState({ [`${target}ErrorDisplay`]: false });
  }
  addNewRecipe() {
    const {
      name,
      desc,
      ingredients,
      steps,
      prepTime,
      cookingTime,
      price,
      type,
      season,
      servings,
      note,
      img,
      user
    } = this.props;
    this.props.dispatchAddNewRecipe({
      name,
      desc,
      ingredients,
      steps,
      prepTime,
      cookingTime,
      price,
      type,
      season,
      servings,
      note,
      img
    }, user);
  }
  render() {
    return (
      <main className="add">
        <Header background={'add'}>
          {this.props.user.id==='unknown' ?
            <div className="add-form__user-error tooltip-container">
            <div className="tooltip info-msg arrow-top arrow-right">
              <i className="icon-ban"></i>
              Sélectionnez un utilisateur avant d'ajouter votre recette
            </div>
          </div> : ''
          }
          <AddHeader
            value={this.props.name}
            updateName={this.handleInputChange}
            handleFocus={this.handleInputFocus}
            handleBlur={this.handleInputBlur}
            showError={this.state.nameErrorDisplay}
          />
        </Header>
        <div className="container add-form">
          <div className="add-form__block">
            <p className="add-form__title">Voulez-vous la décrire un peu plus ? <em>(optionnel)</em></p>
            <input
              className="add-form-textfield"
              type="text"
              name="desc"
              value={this.props.desc}
              onChange={this.handleInputChange}
            />
          </div>
          <hr />
          <RecipeTypeForm
            selectedType={this.props.type}
            updateSelectedType={this.handleInputChange}
          />
          <hr />
          <InputListForm
            listItems={this.props.ingredients}
            addListItem={this.addInput}
            removeListItem={this.removeInput}
            updateListItem={this.handleInputChange}
            handleBlur={this.handleInputBlur}
            handleFocus={this.handleInputFocus}
            buttonDisabled={!this.props.validState.ingredients}
            name="ingredients"
            listLabels={[
              "Quels ingrédients faut-il pour la préparer ?",
              "Ajouter un ingrédient",
              "Vérifiez votre liste d'ingrédients"
            ]}
            showError={this.state.ingredientsErrorDisplay}
          />
          <hr />
          <div className="add-form__block">
            {this.state.servingsErrorDisplay ?
              <div className={`tooltip-container add-form__servings-error`}>
                <div className="tooltip error-msg">
                  <i className="icon-ban"></i>
                  Vérifiez le nombre de persones indiqué
                </div>
              </div> : ''
            }
            <p className="add-form__title">Pour combien de personnes ?</p>
            <div className="text-centered">
              <input
                className={`add-form-numberfield${
                  this.state.servingsErrorDisplay ?
                  " input--invalid":""
                }`}
                id="servings"
                type="number"
                pattern="[0-9]*"
                step="1"
                name="servings"
                value={this.props.servings}
                onChange={this.handleInputChange}
                onBlur={this.handleInputBlur}
                onFocus={this.handleInputFocus}
              />
              <label htmlFor="servings" className="add-form-numberlabel">
                personnes
              </label>
            </div>
          </div>
          <hr />
          <RecipePriceForm
            selectedPrice={this.props.price}
            updateSelectedPrice={this.handleInputChange}
          />
          <hr />
          <RecipeSeasonForm
            selectedSeason={this.props.season}
            updateSelectedSeason={this.handleInputChange}
          />
          <hr />
          <InputListForm
            listItems={this.props.steps}
            addListItem={this.addInput}
            removeListItem={this.removeInput}
            updateListItem={this.handleInputChange}
            handleBlur={this.handleInputBlur}
            handleFocus={this.handleInputFocus}
            buttonDisabled={!this.props.validState.steps}
            name="steps"
            listLabels={[
              "Quelles sont les étapes à suivre pour la préparer ?",
              "Ajouter une étape",
              "Vérifiez votre liste d'étapes"
            ]}
            showError={this.state.stepsErrorDisplay}
          />
          <hr />
          <DurationsForm
            prepTime={this.props.prepTime}
            cookingTime={this.props.cookingTime}
            updateTime={this.handleInputChange}
            handleBlur={this.handleInputBlur}
            handleFocus={this.handleInputFocus}
            showPrepError={this.state.prepTimeErrorDisplay}
            showCookingError={this.state.cookingTimeErrorDisplay}
          />
          <hr />
          <div className="add-form__block">image (add later)</div>
          <hr />
          <div className="add-form__block">
            <p className="add-form__title">Quelques notes complémentaires ? <em>(optionnel)</em></p>
            <input
              className="add-form-textfield"
              type="text"
              name="note"
              value={this.props.note}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="add-form__block">
            <button
              className="button-large button-centered"
              disabled={!this.props.validState.isValidState}
              onClick={this.props.validState.isValidState ? this.addNewRecipe : noop}
            >
              {
                this.props.validState.isValidState  &&
                this.props.user.id !== 'unknown' ?
                "Ajouter ma recette !" : "Oops"
              }
            </button>
          </div>
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  const validState = getAddFormValidState(state);
  const user = state.curUser;
  return Object.assign({}, state.addForm, { user, validState });
};

export default connect(
  mapStateToProps,
  {
    dispatchAddFormAddInput: addFormAddInput,
    dispatchAddFormRemoveInput: addFormRemoveInput,
    dispatchAddFormUpdateInput: addFormUpdateInput,
    dispatchAddNewRecipe: addNewRecipe
  }
)(Add);
