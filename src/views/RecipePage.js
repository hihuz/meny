import React from 'react';
import { connect } from 'react-redux';
import {
  addFormAddInput,
  addFormRemoveInput,
  addFormUpdateInput,
  addFormMoveInput,
  updateRecipe
} from '../actions/';
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
      editing: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.removeInput = this.removeInput.bind(this);
    this.addInput = this.addInput.bind(this);
    this.moveInputUp = this.moveInputUp.bind(this);
    this.moveInputDown = this.moveInputDown.bind(this);
  }
  // All of the methods below exist also in Add.js, create a container component for this
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
    const target = e.currentTarget;
    const name = target.name;
    const index = target.getAttribute('data-index') || 0;
    this.props.dispatchAddFormRemoveInput({ name, index });
  }
  moveInputUp(e) {
    const dir = 'up';
    const target = e.currentTarget;
    const name = target.name;
    const index = target.getAttribute('data-index') || 0;
    this.props.dispatchAddFormMoveInput({ name, index, dir });
  }
  moveInputDown(e) {
    const dir = 'down';
    const target = e.currentTarget;
    const name = target.name;
    const index = target.getAttribute('data-index') || 0;
    this.props.dispatchAddFormMoveInput({ name, index, dir });
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
          <RecipeItemList
            listItems={ingredients}
            listTitle={'Ingrédients :'}
          />
          <hr />
          <RecipeItemList
            listItems={steps}
            listTitle={'Préparation :'}
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
// const RecipePage = ({
//   name,
//   ingredients,
//   steps,
//   desc,
//   note,
//   servings,
//   prepTime,
//   cookingTime,
//   img,
//   author,
//   id
// }) => (
//   <main className="recipe">
//     <Header page="recipe" id={id} img={img}>
//       <RecipeHeader name={name} desc={desc} author={author} />
//     </Header>
//     <div className="container">
//       <section className="recipe-details">
//         <div><i className="icon-clock-o" /> {prepTime} minutes de préparation</div>
//         <div><img src="/public/pan.svg" alt="pan" /> {cookingTime} minutes de cuisson</div>
//         <div>
//           <i className="icon-group" /> Les quantités indiquées sont pour {servings} personnes
//         </div>
//       </section>
//       <hr />
//       <RecipeItemList
//         listItems={ingredients}
//         listTitle={'Ingrédients :'}
//       />
//       <hr />
//       <RecipeItemList
//         listItems={steps}
//         listTitle={'Préparation :'}
//       />
//       {note ?
//         <hr />
//         <section className="section">
//           <p className="section__title">Notes supplémentaires :</p>
//           <p className="recipe-notes">{note}</p>
//         </section> :
//         ''
//       }
//     </div>
//   </main>
// );

const mapStateToProps = (state) => {
  const editable = getEditableStatus(state);
  return { editable };
};

export default connect(
  mapStateToProps,
  {
    dispatchAddFormAddInput: addFormAddInput,
    dispatchAddFormRemoveInput: addFormRemoveInput,
    dispatchAddFormUpdateInput: addFormUpdateInput,
    dispatchAddFormMoveInput: addFormMoveInput,
    dispatchUpdateRecipe: updateRecipe
  }
)(RecipePage);
