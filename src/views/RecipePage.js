import React from 'react';
import { connect } from 'react-redux';
import { updateFormInput, updateRecipe, editRecipeField } from '../actions/';
import { getEditableStatus, getCurRecipeValidState, getRecipeEditing } from '../reducers';
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
  handleInputChange(e) {
    const target = e.target;
    const value = target.type === 'radio' ? target.checked : target.value;
    const name = target.name;
    const index = target.getAttribute('data-index') || 0;
    this.props.dispatchUpdateFormInput({ name, index, value });
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
      editing
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
  const validState = getCurRecipeValidState(state, ownProps.id);
  const editable = getEditableStatus(state);
  const editing = getRecipeEditing(state);
  return { editable, editing, validState };
};

export default connect(
  mapStateToProps,
  {
    dispatchEditRecipeField: editRecipeField,
    dispatchUpdateFormInput: updateFormInput,
    dispatchUpdateRecipe: updateRecipe
  }
)(RecipePage);
