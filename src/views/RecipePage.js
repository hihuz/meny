import React from 'react';
import { connect } from 'react-redux';
import { updateFormInput, updateRecipe, editRecipeField, changeCurRecipe } from '../actions/';
import {
  getEditableStatus,
  getCurRecipeValidState,
  getRecipeEditing,
  getCurRecipe,
  getMatchingRecipe
} from '../reducers';
import InputListForm from '../components/InputListForm';
import RecipeItemList from '../components/RecipeItemList';
import Header from '../components/Header';
import RecipeHeader from '../components/RecipeHeader';
import EditHeader from '../components/EditHeader';
import LeftRecipeDetails from '../components/LeftRecipeDetails';
import RightRecipeDetails from '../components/RightRecipeDetails';
import RecipeNotes from '../components/RecipeNotes';
import '../styles/recipe-page.css';

class RecipePage extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.switchToEdit = this.switchToEdit.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.cancelChanges = this.cancelChanges.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    // This is most likely temporary, the idea of the below is to dispatch
    // an action updating "curRecipe" when the recipe page is accessed directly
    // and when the recipes have been fetched from firebase
    if (!this.props.hasRecipesData && nextProps.hasRecipesData) {
      this.props.dispatchChangeCurRecipe(this.props.storedRecipe);
    }
  }
  handleInputChange(e) {
    const target = e.target;
    const value = target.type === 'radio' ? target.checked : target.value;
    const name = target.name;
    const index = target.getAttribute('data-index') || value;
    const type = 'edit';
    this.props.dispatchUpdateFormInput({ name, index, value, type });
  }
  switchToEdit(e) {
    this.props.dispatchEditRecipeField(e.currentTarget.name);
  }
  saveChanges() {
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
      authorId,
      authorName,
      index,
      id,
      created
    } = this.props;
    this.props.dispatchUpdateRecipe({
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
      created,
      authorId,
      authorName
    }, { index, id });
  }
  cancelChanges() {
    // when the user cancels the changes he is making, we call changeCurRecipe
    // with the "storedRecipe" props which gives us the recipe as it is in the
    // store currently. This is the same action creator that we call when we
    // change routes, seems cleaner this way
    // The other option was to not have "storedRecipe" as props
    // and access the store from the action creators but I didn't like that too much
    this.props.dispatchChangeCurRecipe(this.props.storedRecipe);
  }
  render() {
    const {
      id,
      img,
      name,
      desc,
      authorName,
      prepTime,
      cookingTime,
      servings,
      ingredients,
      price,
      type,
      season,
      steps,
      note,
      editable,
      validState,
      editing,
      hasRecipesData
    } = this.props;
    return (
      <main className="recipe">
        {hasRecipesData ?
          <Header page="recipe" id={id} img={img}>
            {editing.main && editable ?
              <EditHeader
                updateInput={this.handleInputChange}
                name={name}
                desc={desc}
                author={authorName}
                showError={!validState.name}
                cancelChanges={this.cancelChanges}
                saveChanges={this.saveChanges}
              /> :
              <RecipeHeader
                name={name}
                desc={desc}
                author={authorName}
                editable={editable}
                switchToEdit={this.switchToEdit}
              />
            }
          </Header> : null
        }
        {hasRecipesData ?
          <div className="container">
            <section className="recipe-details">
              <LeftRecipeDetails
                prepTime={prepTime}
                cookingTime={cookingTime}
                servings={servings}
                editable={editable}
                editing={editing.leftDetails}
                showError={
                  !validState.prepTime ||
                  !validState.cookingTime ||
                  !validState.servings
                }
                cancelChanges={this.cancelChanges}
                saveChanges={this.saveChanges}
                updateInput={this.handleInputChange}
                switchToEdit={this.switchToEdit}
              />
              <RightRecipeDetails
                price={price}
                type={type}
                season={season}
                editable={editable}
                editing={editing.rightDetails}
                showError={!validState.price || !validState.type || !validState.season}
                cancelChanges={this.cancelChanges}
                saveChanges={this.saveChanges}
                updateInput={this.handleInputChange}
                switchToEdit={this.switchToEdit}
              />
            </section>
            <hr />
            {
              editing.ingredients && editable ?
                <InputListForm
                  listItems={ingredients}
                  updateListItem={this.handleInputChange}
                  buttonDisabled={!validState.ingredients}
                  showError={!validState.ingredients}
                  name="ingredients"
                  listLabels={[
                    'Ingrédients :',
                    'Ajouter un ingrédient',
                    'Vérifiez votre liste d\'ingrédients'
                  ]}
                  type="edit"
                  cancelChanges={this.cancelChanges}
                  saveChanges={this.saveChanges}
                /> :
                <RecipeItemList
                  listItems={ingredients}
                  listTitle={'Ingrédients :'}
                  editable={editable}
                  switchToEdit={this.switchToEdit}
                  name="ingredients"
                />
            }
            <hr />
            {
              editing.steps && editable ?
                <InputListForm
                  listItems={steps}
                  updateListItem={this.handleInputChange}
                  buttonDisabled={!validState.steps}
                  showError={!validState.steps}
                  name="steps"
                  listLabels={[
                    'Préparation :',
                    'Ajouter une étape',
                    'Vérifiez votre liste d\'étapes'
                  ]}
                  textarea
                  type="edit"
                  cancelChanges={this.cancelChanges}
                  saveChanges={this.saveChanges}
                /> :
                <RecipeItemList
                  listItems={steps}
                  listTitle={'Préparation :'}
                  editable={editable}
                  switchToEdit={this.switchToEdit}
                  name="steps"
                />
            }
            {note ? <hr /> : null }
            {note ? <RecipeNotes
              note={note}
              updateInput={this.handleInputChange}
              switchToEdit={this.switchToEdit}
              editable={editable}
              editing={editing.note}
              cancelChanges={this.cancelChanges}
              saveChanges={this.saveChanges}
            /> : null }
          </div> :
          <div className="loader-container" style={{ paddingTop: '8rem', marginTop: '8rem' }}>
            <div className="loader">
              Chargement...
            </div>
          </div>}
      </main>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const curRecipe = getCurRecipe(state);
  const validState = getCurRecipeValidState(state);
  const editable = getEditableStatus(state, ownProps.match.params.id);
  const storedRecipe = getMatchingRecipe(state, ownProps.match.params.id);
  const editing = getRecipeEditing(state);
  const hasRecipesData = state.hasRecipesData;
  return Object.assign(
    {},
    { editable, editing, validState, storedRecipe, hasRecipesData },
    curRecipe
  );
};

export default connect(
  mapStateToProps,
  {
    dispatchEditRecipeField: editRecipeField,
    dispatchChangeCurRecipe: changeCurRecipe,
    dispatchUpdateFormInput: updateFormInput,
    dispatchUpdateRecipe: updateRecipe
  }
)(RecipePage);
