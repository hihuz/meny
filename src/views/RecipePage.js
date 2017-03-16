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
import '../styles/recipe-page.css';

class RecipePage extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.switchToEdit = this.switchToEdit.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.cancelChanges = this.cancelChanges.bind(this);
  }
  componentDidMount() {
    // for now I am reseting "edit mode" on each page change
    // even if the same recipe is displayed
    // this.props.dispatchCancelEditRecipe(this.props.index);
  }
  handleInputChange(e) {
    const target = e.target;
    const value = target.type === 'radio' ? target.checked : target.value;
    const name = target.name;
    const index = target.getAttribute('data-index') || 0;
    const type = 'edit';
    const recipeIndex = this.props.index;
    this.props.dispatchUpdateFormInput({ name, index, value, type, recipeIndex });
  }
  switchToEdit(e) {
    this.props.dispatchEditRecipeField(e.currentTarget.name);
  }
  saveChanges() {
    // const name = e.currentTarget.name;
    // const value = this.props[name];
    // const recipeIndex = this.props.index;
    // const id = this.props.id;
    // this.props.dispatchUpdateRecipe({ name, value, recipeIndex, id });
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
      author,
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
      created
    }, { index, id, userid: author });
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
      author,
      prepTime,
      cookingTime,
      servings,
      ingredients,
      steps,
      note,
      editable,
      validState,
      editing,
      index
    } = this.props;
    return (
      <main className="recipe">
        <Header page="recipe" id={id} img={img}>
          {editing.main && editable ?
            <EditHeader
              updateInput={this.handleInputChange}
              name={name}
              desc={desc}
              author={author}
              showError={!validState.name}
              cancelChanges={this.cancelChanges}
              saveChanges={this.saveChanges}
            /> :
            <RecipeHeader
              name={name}
              desc={desc}
              author={author}
              editable={editable}
              switchToEdit={this.switchToEdit}
            />
          }
        </Header>
        <div className="container">
          <section className="recipe-details">
            <div><i className="icon-clock-o" /> {prepTime} minutes de préparation</div>
            <div><img src="/public/pan.svg" alt="pan" /> {cookingTime} minutes de cuisson</div>
            <div>
              <i className="icon-group" /> Les quantités indiquées sont pour {servings} personnes
            </div>
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
                recipeIndex={index}
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
                recipeIndex={index}
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
          {note ?
            <section className="section">
              <p className="section__title">Notes supplémentaires :</p>
              <p className="recipe-notes">{note}</p>
            </section> :
            null
          }
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  const curRecipe = getCurRecipe(state);
  const validState = getCurRecipeValidState(state);
  const editable = getEditableStatus(state, curRecipe.id);
  const storedRecipe = getMatchingRecipe(state, curRecipe.id);
  const editing = getRecipeEditing(state);
  return Object.assign({}, { editable, editing, validState, storedRecipe }, curRecipe);
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
