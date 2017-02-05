import React from 'react';
import { connect } from 'react-redux';
import { addListItem, removeAddFormInput, updateAddFormInput } from '../actions/';
import { getIngButtonState, getStepsButtonState } from '../reducers'
import Header from '../components/Header';
import AddHeader from '../components/AddHeader';
import InputListForm from '../components/InputListForm';
import DurationsForm from '../components/DurationsForm';
import PriceForm from '../components/PriceForm';

class Add extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.removeInput = this.removeInput.bind(this);
    this.addIng = this.addIng.bind(this);
    this.addStep = this.addStep.bind(this);
  }
  handleInputChange(e) {
    const target = e.target;
    const value = target.type === 'radio' ? target.checked : target.value;
    const name = target.name;
    const index = target.getAttribute('data-index') || 0;
    this.props.dispatchUpdateAddFormInput({ name, index, value });
  }
  addIng() {
    this.props.dispatchAddListItem({ type: 'INGREDIENT' });
  }
  removeInput(e) {
    const target = e.target;
    const name = target.getAttribute('name');
    const index = target.getAttribute('data-index') || 0;
    this.props.dispatchRemoveAddFormInput({ name, index });
  }
  addStep() {
    this.props.dispatchAddListItem({ type: 'STEP' });
  }
  render() {
    return (
      <main className="add">
        <Header background={'add'}>
          <AddHeader />
        </Header>
        <div className="container add-form">
          <div className="add-form__block">
            Description de la recette <em>(optionnel)</em> :
            <input
              className="add-form-textfield"
              type="text"
              name="desc"
              value={this.props.desc}
              onChange={this.handleInputChange}
            />
          </div>
          <hr />
          <InputListForm
            listItems={this.props.ingredients}
            addListItem={this.addIng}
            removeListItem={this.removeInput}
            updateListItem={this.handleInputChange}
            buttonDisabled={this.props.ingButtonDisabled}
            name="ing"
            listLabels={["Ingrédients", "Ajouter un ingrédient"]}
          />
          <hr />
          <DurationsForm
            prepTime={this.props.prep}
            cookingTime={this.props.cooking}
            updatePrepTime={this.handleInputChange}
            updateCookingTime={this.handleInputChange}
          />
          <hr />
          <PriceForm
            selectedPrice={this.props.price}
            updateSelectedPrice={this.handleInputChange}
          />
          <hr />
          <div className="add-form__block">
            (TEMP) nombre d'assiettes  :
            <input className="add-form-numberfield" type="number" maxLength="2" />
          </div>
          <hr />
          <div className="add-form__block">(TEMP) type de plat :
              <label><input type="radio" name="type" /> entrée</label>
            <label><input type="radio" name="type" /> plat principal</label>
            <label><input type="radio" name="type" /> dessert</label>
          </div>
          <hr />
          <InputListForm
            listItems={this.props.steps}
            addListItem={this.addStep}
            removeListItem={this.removeInput}
            updateListItem={this.handleInputChange}
            buttonDisabled={this.props.stepsButtonDisabled}
            name="step"
            listLabels={["Etapes", "Ajouter une étape"]}
          />
          <hr />
          <div className="add-form__block">image (add later)</div>
          <hr />
          <div className="add-form__block">
            Notes complémentaires <em>(optionnel)</em> :
            <input className="add-form-textfield" type="text" />
          </div>
          <div className="add-form__block">
            <button className="button-large button-centered">Ajouter ma recette !</button>
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
    dispatchAddListItem: addListItem,
    dispatchRemoveAddFormInput: removeAddFormInput,
    dispatchUpdateAddFormInput: updateAddFormInput
  }
)(Add);
