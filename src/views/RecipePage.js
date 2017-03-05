import React from 'react';
import { connect } from 'react-redux';
import { addFormUpdateInput, updateRecipe } from '../actions/';
import { getEditableStatus } from '../reducers';
import InputListForm from '../components/InputListForm';
import RecipeItemList from '../components/RecipeItemList';
import Header from '../components/Header';
import RecipeHeader from '../components/RecipeHeader';
import '../styles/recipe-page.css';

class RecipePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: {
        name: false,
        desc: false,
        prepTime: false,
        cookingTime: false,
        servings: false,
        ingredients: false,
        steps: false,
        note: false
      }
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputBlur = this.handleInputBlur.bind(this);
    this.handleInputFocus = this.handleInputFocus.bind(this);
    this.switchToEdit = this.switchToEdit.bind(this);
  }
  handleInputChange(e) {
    const target = e.target;
    const value = target.type === 'radio' ? target.checked : target.value;
    const name = target.name;
    const index = target.getAttribute('data-index') || 0;
    this.props.dispatchAddFormUpdateInput({ name, index, value });
  }
  switchToEdit(e) {
    // use function with prev state ?
    // or better create a reducer for this
    // this.setState({ [`${e.target.name}`]: true })
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
      editable
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
            this.state.editing.ingredients &&
            editable ?
              <InputListForm
                updateListItem={this.handleInputChange}
                buttonDisabled={!this.props.validState.steps}
                showError={!this.props.validState.ingredients}
                name="ingredients"
                listLabels={[
                  'Ingrédients :',
                  'Ajouter un ingrédient',
                  'Vérifiez votre liste d\'ingrédients'
                ]}
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
          <RecipeItemList
            listItems={steps}
            listTitle={'Préparation :'}
            editable={editable}
            name="steps"
          />
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

const mapStateToProps = (state) => {
  const validState = getAddFormValidState(state);
  const editable = getEditableStatus(state);
  return { editable, validState };
};

export default connect(
  mapStateToProps,
  {
    dispatchAddFormUpdateInput: addFormUpdateInput,
    dispatchUpdateRecipe: updateRecipe
  }
)(RecipePage);
