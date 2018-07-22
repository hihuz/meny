import React from "react";
import { connect } from "react-redux";
import Link from "react-router-dom/Link";
import { changeAddRecipe } from "../actions/";

class RecipeMetaActions extends React.Component {
  constructor(props) {
    super(props);
    this.duplicateRecipe = this.duplicateRecipe.bind(this);
  }
  duplicateRecipe() {
    const {
      name,
      desc,
      ingredients,
      steps,
      prepTime,
      cookingTime,
      price,
      type,
      season,
      servings,
      note,
      img
    } = this.props.storedRecipe;
    this.props.dispatchChangeAddRecipe({
      name,
      desc,
      ingredients,
      steps,
      prepTime,
      cookingTime,
      price,
      type,
      season,
      servings,
      note,
      img
    });
  }
  render() {
    return (
      <div className="recipe-main__media">
        <Link to="/add" onClick={this.duplicateRecipe}>
          <i className="icon-copy" /> Copier
        </Link>
      </div>
    );
  }
}

export default connect(
  null,
  {
    dispatchChangeAddRecipe: changeAddRecipe
  }
)(RecipeMetaActions);
