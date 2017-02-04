import React from 'react';
import { connect } from 'react-redux';
import {
  addIngredient,
  changeIngredient,
  removeIngredient,
  updatePrepTime,
  updateCookingTime
} from '../actions/';
import { getIngButtonState } from '../reducers'
import Header from '../components/Header';
import AddHeader from '../components/AddHeader';
import IngredientsForm from '../components/IngredientsForm';
import DurationsForm from '../components/DurationsForm';
import PriceForm from '../components/PriceForm';

class Add extends React.Component {
  constructor(props) {
    super(props);
    this.changeIngredient = this.changeIngredient.bind(this);
    this.removeIngredient = this.removeIngredient.bind(this);
    this.updatePrepTime = this.updatePrepTime.bind(this);
    this.updateCookingTime = this.updateCookingTime.bind(this);
  }
  changeIngredient(e) {
    const index = e.target.getAttribute('data-index');
    const value = e.target.value;
    this.props.dispatchChangeIngredient(index, value);
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
  removeIngredient(e) {
    const index = e.target.getAttribute('data-index');
    this.props.dispatchRemoveIngredient(index);
  }
  render() {
    return (
      <main className="add">
        <Header background={'add'}>
          <AddHeader />
        </Header>
        <div className="container add-form">
          <div className="add-form-block">
            Description de la recette <em>(optionnel)</em> :
            <input className="add-form-textfield" type="text" />
          </div>
          <hr />
          <IngredientsForm
            ingredients={this.props.ingredients}
            addIngredient={this.props.dispatchAddIngredient}
            removeIngredient={this.removeIngredient}
            changeIngredient={this.changeIngredient}
            buttonDisabled={this.props.ingButtonDisabled}
          />
          <hr />
          <DurationsForm
            prepTime={this.props.prep}
            cookingTime={this.props.cooking}
            updatePrepTime={this.updatePrepTime}
            updateCookingTime={this.updateCookingTime}
          />
          <hr />
          <PriceForm />
          <hr />
          <div>nombre d'assiettes (slider ?) : <input className="add-form-numberfield" type="number" maxLength="2" /></div>
          <div>type (icons) :
              <label><input type="radio" name="type" /> entrée</label>
            <label><input type="radio" name="type" /> plat principal</label>
            <label><input type="radio" name="type" /> dessert</label>
          </div>
          <div>
            étape 1 : <input className="add-form-textfield" type="text" />
            étape 2 : <input className="add-form-textfield" type="text" />
          </div>
          <div>image (add later)</div>
          <div>additional note <input className="add-form-textfield" type="text" /></div>

          <button>Ajouter ma recette !</button>
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => Object.assign({}, state.addForm, {
  ingButtonDisabled: getIngButtonState(state)
});

export default connect(
  mapStateToProps,
  {
    dispatchAddIngredient: addIngredient,
    dispatchChangeIngredient: changeIngredient,
    dispatchRemoveIngredient: removeIngredient,
    dispatchUpdatePrepTime: updatePrepTime,
    dispatchUpdateCookingTime: updateCookingTime
  }
)(Add);
