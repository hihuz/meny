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
import ServingsForm from '../components/ServingsForm';
import RecipePriceForm from '../components/RecipePriceForm';
import RecipeTypeForm from '../components/RecipeTypeForm';
import RecipeSeasonForm from '../components/RecipeSeasonForm';

const noop = () => {}

class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameHasFocus: true,
      ingredientsHasFocus: true,
      stepsHasFocus: true,
      servingsHasFocus: true,
      prepTimeHasFocus: true,
      cookingTimeHasFocus: true
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
    this.setState({ [`${e.target.name}HasFocus`]: false });
  }
  handleInputFocus(e) {
    this.setState({ [`${e.target.name}HasFocus`]: true });
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
            showError={!this.state.nameHasFocus && !this.props.validState.name}
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
            showError={!this.state.ingredientsHasFocus && !this.props.validState.ingredients}
          />
          <hr />
          <ServingsForm
            value={this.props.servings}
            updateServings={this.handleInputChange}
            handleBlur={this.handleInputBlur}
            handleFocus={this.handleInputFocus}
            showError={!this.state.servingsHasFocus && !this.props.validState.servings}
          />
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
            showError={!this.state.stepsHasFocus && !this.props.validState.steps}
          />
          <hr />
          <DurationsForm
            prepTime={this.props.prepTime}
            cookingTime={this.props.cookingTime}
            updateTime={this.handleInputChange}
            handleBlur={this.handleInputBlur}
            handleFocus={this.handleInputFocus}
            showPrepError={!this.state.prepTimeHasFocus && !this.props.validState.prepTime}
            showCookingError={!this.state.cookingTimeHasFocus && !this.props.validState.cookingTime}
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
