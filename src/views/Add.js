import React from 'react';
import { connect } from 'react-redux';
import { addIngredient, changeIngredient, removeIngredient } from '../actions/';
import Header from '../components/Header';
import AddHeader from '../components/AddHeader';
import IngredientsForm from '../components/IngredientsForm';

class Add extends React.Component {
  constructor(props) {
    super(props);
    this.changeIngredient = this.changeIngredient.bind(this);
    this.removeIngredient = this.removeIngredient.bind(this);
  }

  changeIngredient(e) {
    const index = e.target.getAttribute('data-index');
    const value = e.target.value;
    this.props.dispatchChangeIngredient(index, value);
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
          <IngredientsForm
            ingredients={this.props.ingredients}
            addIngredient={this.props.dispatchAddIngredient}
            removeIngredient={this.removeIngredient}
            changeIngredient={this.changeIngredient}
          />
          <div>Temps de préparation : <input className="add-form-textfield" type="number" maxLength="2" /> minutes</div>
          <div>Temps de cuisson : <input className="add-form-textfield" type="number" maxLength="2" /> minutes</div>
          <div>Prix (icons):
            <fieldset>
              <label><input type="radio" name="price" /> peu cher</label>
              <label><input type="radio" name="price" /> moyennement cher</label>
              <label><input type="radio" name="price" /> cher</label>
              <label><input type="radio" name="price" /> très cher!</label>
            </fieldset>
          </div>
          <div>nombre d'assiettes (slider ?) : <input type="number" maxLength="2" /></div>
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
  dispatchRemoveIngredient: (index) => dispatch(removeIngredient(index))
});
export default connect(mapStateToProps, mapDispatchToProps)(Add);
