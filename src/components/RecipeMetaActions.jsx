import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { changeAddRecipe } from "../actions/";

import { useNavigate } from "react-router-dom";

const RecipeMetaActions = ({ storedRecipe, dispatchChangeAddRecipe }) => {
  const navigate = useNavigate();

  const duplicateRecipe = () => {
    dispatchChangeAddRecipe({ ...storedRecipe });
    navigate("/add");
  };

  return (
    <div className="recipe-main__media">
      <button onClick={duplicateRecipe}>
        <i className="icon-copy" /> Copier
      </button>
    </div>
  );
};

export default connect(
  null,
  { dispatchChangeAddRecipe: changeAddRecipe }
)(RecipeMetaActions);
