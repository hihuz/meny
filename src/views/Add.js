import React from 'react';
import { connect } from 'react-redux';
import {
  addIngredient,
  changeIngredient,
  removeIngredient,
  updatePrepTime,
  updateCookingTime
} from '../actions/';
import Header from '../components/Header';
import AddHeader from '../components/AddHeader';
import IngredientsForm from '../components/IngredientsForm';
import DurationsForm from '../components/DurationsForm';

class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredientsButtonDisabled: true
    }
    this.changeIngredient = this.changeIngredient.bind(this);
    this.removeIngredient = this.removeIngredient.bind(this);
    this.updatePrepTime = this.updatePrepTime.bind(this);
    this.updateCookingTime = this.updateCookingTime.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    const emptyIngredients = nextProps.ingredients.filter((ing) => ing.length === 0);
    const disabled = emptyIngredients.length > 0;
    this.setState({
      ingredientsButtonDisabled: disabled
    });
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
            buttonDisabled={this.state.ingredientsButtonDisabled}
          />
          <hr />
          <DurationsForm
            prepTime={this.props.prep}
            cookingTime={this.props.cooking}
            updatePrepTime={this.updatePrepTime}
            updateCookingTime={this.updateCookingTime}
          />
          <hr />
          <div className="add-form-block add-form-block--flex">Coût de la recette:
            <label>
              <i className="icon-vcheap"></i>
              <input id="price0" className="hidden-input" type="radio" name="price" />
              Très bon marché
            </label>
            <label>
              <i className="icon-vcheap"></i>
              <input id="price1" className="hidden-input" type="radio" name="price" />
              Bon marché
            </label>
            <label>
              <i className="icon-exp"></i>
              <input id="price2" className="hidden-input" type="radio" name="price" />
              Assez cher
            </label>
            <label>
              <i className="icon-vexp"></i>
              <input id="price3" className="hidden-input" type="radio" name="price" />
              Cher
            </label>
          </div>
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

const mapStateToProps = (state) => state.addForm;

const mapDispatchToProps = dispatch => ({
  dispatchAddIngredient: () => dispatch(addIngredient()),
  dispatchChangeIngredient: (index, value) => dispatch(changeIngredient(index, value)),
  dispatchRemoveIngredient: (index) => dispatch(removeIngredient(index)),
  dispatchUpdatePrepTime: (time) => dispatch(updatePrepTime(time)),
  dispatchUpdateCookingTime: (time) => dispatch(updateCookingTime(time))
});
export default connect(mapStateToProps, mapDispatchToProps)(Add);
