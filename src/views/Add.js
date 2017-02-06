import React from 'react';
import { connect } from 'react-redux';
import { addFormAddInput, addFormRemoveInput, addFormUpdateInput } from '../actions/';
import { getIngButtonState, getStepsButtonState } from '../reducers'
import Header from '../components/Header';
import AddHeader from '../components/AddHeader';
import InputListForm from '../components/InputListForm';
import DurationsForm from '../components/DurationsForm';
import RecipePriceForm from '../components/RecipePriceForm';
import RecipeTypeForm from '../components/RecipeTypeForm';
import RecipeSeasonForm from '../components/RecipeSeasonForm';

class Add extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.removeInput = this.removeInput.bind(this);
    this.addInput = this.addInput.bind(this);
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
  render() {
    return (
      <main className="add">
        <Header background={'add'}>
          <AddHeader
            value={this.props.name}
            updateName={this.handleInputChange}
          />
        </Header>
        <div className="container add-form">
          <div className="add-form__block">
            Voulez-vous la décrire un peu plus ? <em>(optionnel)</em>
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
            buttonDisabled={this.props.ingButtonDisabled}
            name="ingredients"
            listLabels={["Quels ingrédients faut-il pour la préparer ?", "Ajouter un ingrédient"]}
          />
          <hr />
          <div className="add-form__block">
              Pour combien de personnes ?
            <div className="text-centered">
              <input
                className="add-form-numberfield"
                id="servings"
                type="number"
                pattern="[0-9]*"
                step="1"
                name="servings"
                value={this.props.servings}
                onChange={this.handleInputChange}
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
            buttonDisabled={this.props.stepsButtonDisabled}
            name="steps"
            listLabels={["Quelles sont les étapes à suivre pour la préparer ?", "Ajouter une étape"]}
          />
          <hr />
          <DurationsForm
            prepTime={this.props.prepTime}
            cookingTime={this.props.cookingTime}
            updateTime={this.handleInputChange}
          />
          <hr />
          <div className="add-form__block">image (add later)</div>
          <hr />
          <div className="add-form__block">
            Quelques notes complémentaires ? <em>(optionnel)</em>
            <input
              className="add-form-textfield"
              type="text"
              name="note"
              value={this.props.note}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="add-form__block">
            <button className="button-large button-centered" disabled>Ajouter ma recette !</button>
          </div>
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => Object.assign({}, state.addForm, {
  ingButtonDisabled: getIngButtonState(state),
  stepsButtonDisabled: getStepsButtonState(state)
});

export default connect(
  mapStateToProps,
  {
    dispatchAddFormAddInput: addFormAddInput,
    dispatchAddFormRemoveInput: addFormRemoveInput,
    dispatchAddFormUpdateInput: addFormUpdateInput
  }
)(Add);
