import React from 'react';
import { connect } from 'react-redux';
import { updateFormInput, updateRecipe, editRecipeField, cancelEditRecipe } from '../actions/';
import {
  getEditableStatus,
  getCurRecipeValidState,
  getRecipeEditing,
  getMatchingRecipe
} from '../reducers';
import InputListForm from '../components/InputListForm';
import RecipeItemList from '../components/RecipeItemList';
import Header from '../components/Header';
import RecipeHeader from '../components/RecipeHeader';
import '../styles/recipe-page.css';

class RecipePage extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.switchToEdit = this.switchToEdit.bind(this);
  }
  componentDidMount() {
    // for now I am reseting "edit mode" on each page change
    // even if the same recipe is displayed
    this.props.dispatchCancelEditRecipe();
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
          <RecipeHeader name={name} desc={desc} author={author} />
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
            editing.ingredients &&
            editable ?
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
            editing.steps &&
            editable ?
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
              /> :
              <RecipeItemList
                listItems={steps}
                listTitle={'Préparation :'}
                editable={editable}
                switchToEdit={this.switchToEdit}
                name="steps"
              />
          }
          {note ? <hr /> : '' }
          {note ?
            <section className="section">
              <p className="section__title">Notes supplémentaires :</p>
              <p className="recipe-notes">{note}</p>
            </section> :
            ''
          }
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  // Fix these calls below, calculate the index once and then send it
  // to the other selectors
  const curRecipe = getMatchingRecipe(state, ownProps.match.params.id);
  const validState = getCurRecipeValidState(state, ownProps.match.params.id);
  const editable = getEditableStatus(state, ownProps.match.params.id);
  const editing = getRecipeEditing(state);
  return Object.assign({}, { editable, editing, validState }, curRecipe);
};

export default connect(
  mapStateToProps,
  {
    dispatchEditRecipeField: editRecipeField,
    dispatchCancelEditRecipe: cancelEditRecipe,
    dispatchUpdateFormInput: updateFormInput,
    dispatchUpdateRecipe: updateRecipe
  }
)(RecipePage);
