import React from 'react';

const RecipePage = ({
  name,
  ingredients
}) => (
  <div className="container">
  <h3 style={{ marginTop: '250px' }}>Nom : {name} </h3>
  <p>ings : {ingredients}</p>
  </div>
);

export default RecipePage;
