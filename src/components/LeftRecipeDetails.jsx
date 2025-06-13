import React from "react";

const LeftRecipeDetails = ({ prepTime, cookingTime, servings, editing, updateInput }) => (
  <div className="recipe-details__part recipe-details__left">
    <div>
      <i className="icon-clock-o" />
      {editing ? (
        <input
          className="edit-number-input"
          type="number"
          pattern="[0-9]*"
          step="5"
          name="prepTime"
          value={prepTime}
          onChange={updateInput}
        />
      ) : (
        ` ${prepTime}`
      )}{" "}
      minutes de préparation
    </div>
    <div>
      <img src="/pan.svg" alt="pan" />
      {editing ? (
        <input
          className="edit-number-input"
          type="number"
          pattern="[0-9]*"
          step="5"
          name="cookingTime"
          value={cookingTime}
          onChange={updateInput}
        />
      ) : (
        ` ${cookingTime}`
      )}{" "}
      minutes de cuisson
    </div>
    <div>
      <i className="icon-group" />&nbsp;Les quantités indiquées sont pour
      {editing ? (
        <input
          className="edit-number-input"
          type="number"
          pattern="[0-9]*"
          step="1"
          name="servings"
          value={servings}
          onChange={updateInput}
        />
      ) : (
        ` ${servings}`
      )}{" "}
      personnes
    </div>
  </div>
);

export default LeftRecipeDetails;
