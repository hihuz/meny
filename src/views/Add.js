import React from 'react';
import { connect } from 'react-redux';
import {
  updateDesc,
  addListItem,
  updateListItem,
  removeListItem,
  updatePrepTime,
  updateCookingTime,
  updatePrice
} from '../actions/';
import { getIngButtonState, getStepsButtonState } from '../reducers'
import Header from '../components/Header';
import AddHeader from '../components/AddHeader';
import InputListForm from '../components/InputListForm';
import DurationsForm from '../components/DurationsForm';
import PriceForm from '../components/PriceForm';

class Add extends React.Component {
  constructor(props) {
    super(props);
    this.updateDesc = this.updateDesc.bind(this);
    this.updateIng = this.updateIng.bind(this);
    this.removeIng = this.removeIng.bind(this);
    this.addIng = this.addIng.bind(this);
    this.updateStep = this.updateStep.bind(this);
    this.removeStep = this.removeStep.bind(this);
    this.addStep = this.addStep.bind(this);
    this.updatePrepTime = this.updatePrepTime.bind(this);
    this.updateCookingTime = this.updateCookingTime.bind(this);
    this.updatePrice = this.updatePrice.bind(this);
  }
  updateDesc(e) {
    const  value = e.target.value;
    this.props.dispatchUpdateDesc(value);
  }
  updateIng(e) {
    const config = {
      index: e.target.getAttribute('data-index'),
      value: e.target.value,
      type: 'INGREDIENT'
    }
    this.props.dispatchUpdateListItem(config);
  }
  addIng() {
    this.props.dispatchAddListItem({ type: 'INGREDIENT' });
  }
  removeIng(e) {
    const config = {
      index: e.target.getAttribute('data-index'),
      type: 'INGREDIENT'
    }
    this.props.dispatchRemoveListItem(config);
  }
  updateStep(e) {
    const config = {
      index: e.target.getAttribute('data-index'),
      value: e.target.value,
      type: 'STEP'
    }
    this.props.dispatchUpdateListItem(config);
  }
  addStep() {
    this.props.dispatchAddListItem({ type: 'STEP' });
  }
  removeStep(e) {
    const config = {
      index: e.target.getAttribute('data-index'),
      type: 'STEP'
    }
    this.props.dispatchRemoveListItem(config);
  }
  updatePrepTime(e) {
    const value = e.target.value;
    if (!isNaN(value) && value.length <= 3) {
      this.props.dispatchUpdatePrepTime(value);
    }
  }
  updateCookingTime(e) {
    const value = e.target.value;
    if (!isNaN(value) && value.length <= 3) {
      this.props.dispatchUpdateCookingTime(value);
    }
  }
  updatePrice(e) {
    const value = e.target.getAttribute('data-index');
    this.props.dispatchUpdatePrice(value);
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
              value={this.props.desc}
              onChange={this.updateDesc}
            />
          </div>
          <hr />
          <InputListForm
            listItems={this.props.ingredients}
            addListItem={this.addIng}
            removeListItem={this.removeIng}
            updateListItem={this.updateIng}
            buttonDisabled={this.props.ingButtonDisabled}
            listLabels={["Ingrédients", "Ajouter un ingrédient"]}
          />
          <hr />
          <DurationsForm
            prepTime={this.props.prep}
            cookingTime={this.props.cooking}
            updatePrepTime={this.updatePrepTime}
            updateCookingTime={this.updateCookingTime}
          />
          <hr />
          <PriceForm
            selectedPrice={this.props.price}
            updateSelectedPrice={this.updatePrice}
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
            removeListItem={this.removeStep}
            updateListItem={this.updateStep}
            buttonDisabled={this.props.stepsButtonDisabled}
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
    dispatchUpdateDesc: updateDesc,
    dispatchAddListItem: addListItem,
    dispatchUpdateListItem: updateListItem,
    dispatchRemoveListItem: removeListItem,
    dispatchUpdatePrepTime: updatePrepTime,
    dispatchUpdateCookingTime: updateCookingTime,
    dispatchUpdatePrice: updatePrice
  }
)(Add);
