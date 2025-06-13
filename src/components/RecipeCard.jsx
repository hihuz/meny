import React from "react";
import RecipeLink from "./RecipeLink";

const RecipeCard = ({ id, background, title, text, infos }) => (
  <RecipeLink id={id} type="card">
    <div className="card__image" style={{ backgroundImage: `url(/${background}.jpg)` }} />
    <div className="card__content">
      <div className="card__wrapper">
        <div className="card__title">
          <h3 className="card__title__content">{title}</h3>
        </div>
        <div className="card__infos">
          <div>
            <i className="icon-clock-o" /> {`${infos.prepTime}'`}
          </div>
          <div>
            <img src="/pan.svg" alt="pan" /> {`${infos.cookingTime}'`}
          </div>
          <div>
            <i className="icon-group" /> {infos.servings}
          </div>
        </div>
      </div>
      <div className="card__text">{text}</div>
    </div>
  </RecipeLink>
);

export default RecipeCard;
