import React from 'react';
import Link from 'react-router-dom/Link';

const RecipeMetaActions = ({ duplicate }) => (
  <div className="recipe-main__media">
    <Link to="/add" onClick={duplicate}>Copier cette recette</Link>
  </div>
);

export default RecipeMetaActions;
