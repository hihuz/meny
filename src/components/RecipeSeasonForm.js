import React from 'react';

const RecipeSeasonForm = ({
  selectedSeason,
  updateSelectedSeason
}) => (
  <div className="add-form__block">
    Quelle est la meilleure saison pour la cuisiner ?
    <div className="flex-container">
      <input
        id="season0"
        className="hidden-input"
        type="radio"
        name="season"
        data-index="0"
        onChange={updateSelectedSeason}
        checked={selectedSeason === '0'}
      />
      <label className="add-form__radio-group" htmlFor="season0">
        <span className="icon-background-container">
          <i className="icon-question icon-background" />
        </span>
        Toutes
      </label>
      <input
        id="season2"
        className="hidden-input"
        type="radio"
        name="season"
        data-index="2"
        onChange={updateSelectedSeason}
        checked={selectedSeason === '2'}
      />
      <label className="add-form__radio-group" htmlFor="season2">
        <span className="icon-background-container">
          <i className="icon-spring icon-background" />
        </span>
        Printemps
      </label>
      <input
        id="season3"
        className="hidden-input"
        type="radio"
        name="season"
        data-index="3"
        onChange={updateSelectedSeason}
        checked={selectedSeason === '3'}
      />
      <label className="add-form__radio-group" htmlFor="season3">
        <span className="icon-background-container">
          <i className="icon-summer icon-background" />
        </span>
        Eté
      </label>
      <input
        id="season4"
        className="hidden-input"
        type="radio"
        name="season"
        data-index="4"
        onChange={updateSelectedSeason}
        checked={selectedSeason === '4'}
      />
      <label className="add-form__radio-group" htmlFor="season4">
        <span className="icon-background-container">
          <i className="icon-autumn icon-background" />
        </span>
        Automne
      </label>
      <input
        id="season1"
        className="hidden-input"
        type="radio"
        name="season"
        data-index="1"
        onChange={updateSelectedSeason}
        checked={selectedSeason === '1'}
      />
      <label className="add-form__radio-group" htmlFor="season1">
        <span className="icon-background-container">
          <i className="icon-winter icon-background" />
        </span>
        Hiver
      </label>
    </div>
  </div>
);

export default RecipeSeasonForm;
