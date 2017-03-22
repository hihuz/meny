import React from 'react';
import { connect } from 'react-redux';
import { updateFormInput, updateRecipe, changeCurRecipe } from '../actions/';
import {
  getEditableStatus,
  getCurRecipeValidState,
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
import FloatingActions from '../components/FloatingActions';
import '../styles/recipe-page.css';

class RecipePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.switchMode = this.switchMode.bind(this);
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
  switchMode() {
    this.setState(prevState => ({ editing: !prevState.editing }));
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
    this.switchMode();
  }
  cancelChanges() {
    // when the user cancels the changes he is making, we call changeCurRecipe
    // with the "storedRecipe" props which gives us the recipe as it is in the
    // store currently. This is the same action creator that we call when we
    // change routes, seems cleaner this way
    // The other option was to not have "storedRecipe" as props
    // and access the store from the action creators but I didn't like that too much
    this.props.dispatchChangeCurRecipe(this.props.storedRecipe);
    this.switchMode();
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
      hasRecipesData
    } = this.props;
    const editing = this.state.editing;
    return (
      <main className="recipe">
        {hasRecipesData ?
          <Header page="recipe" id={id} img={img}>
            {editing ?
              <EditHeader
                updateInput={this.handleInputChange}
                name={name}
                desc={desc}
                author={authorName}
              /> :
              <RecipeHeader
                name={name}
                desc={desc}
                author={authorName}
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
                editing={editing}
                updateInput={this.handleInputChange}
              />
              <RightRecipeDetails
                price={price}
                type={type}
                season={season}
                editing={editing}
                updateInput={this.handleInputChange}
              />
            </section>
            <hr />
            {editing ?
              <InputListForm
                listItems={ingredients}
                updateListItem={this.handleInputChange}
                buttonDisabled={!validState.ingredients}
                name="ingredients"
                listLabels={[
                  'Ingrédients :',
                  'Ajouter un ingrédient',
                  'Vérifiez votre liste d\'ingrédients'
                ]}
                type="edit"
              /> :
              <RecipeItemList
                listItems={ingredients}
                listTitle="Ingrédients :"
                name="ingredients"
              />}
            <hr />
            {editing ?
              <InputListForm
                listItems={steps}
                updateListItem={this.handleInputChange}
                buttonDisabled={!validState.steps}
                name="steps"
                listLabels={[
                  'Préparation :',
                  'Ajouter une étape',
                  'Vérifiez votre liste d\'étapes'
                ]}
                textarea
                type="edit"
              /> :
              <RecipeItemList
                listItems={steps}
                listTitle="Préparation :"
                name="steps"
              />}
            {note || editing ? <hr /> : null }
            {note || editing ? <RecipeNotes
              note={note}
              updateInput={this.handleInputChange}
              editing={editing}
              cancelChanges={this.cancelChanges}
              saveChanges={this.saveChanges}
            /> : null }
            {editable ?
              <FloatingActions
                editing={editing}
                switchMode={this.switchMode}
                saveChanges={this.saveChanges}
                cancelChanges={this.cancelChanges}
              /> : null}
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
  const hasRecipesData = state.hasRecipesData;
  return Object.assign(
    {},
    { editable, validState, storedRecipe, hasRecipesData },
    curRecipe
  );
};

export default connect(
  mapStateToProps,
  {
    dispatchChangeCurRecipe: changeCurRecipe,
    dispatchUpdateFormInput: updateFormInput,
    dispatchUpdateRecipe: updateRecipe
  }
)(RecipePage);
