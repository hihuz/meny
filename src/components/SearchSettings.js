import React from 'react';
import { connect } from 'react-redux';
import { setSearchFilter } from '../actions/';

class SearchSettings extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange(e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.props.dispatchSetSearchFilter({ name, value });
  }
  render() {
    return (
      <div className="search-settings">
        <div className="search-settings-fieldset">
          <div className="search-settings-group">
            <div className="search-settings-title">Rechercher dans :</div>
            <label className="label-inline" htmlFor="search-filter-name">
              <input
                type="checkbox"
                id="search-filter-name"
                name="name"
                checked={this.props.name}
                onChange={this.handleInputChange}
              />
              Nom de la recette
            </label>
            <label className="label-inline" htmlFor="search-filter-desc">
              <input
                type="checkbox"
                id="search-filter-desc"
                name="desc"
                checked={this.props.desc}
                onChange={this.handleInputChange}
              />
              Description de la recette
            </label>
            <label className="label-inline" htmlFor="search-filter-ingredients">
              <input
                type="checkbox"
                id="search-filter-ingredients"
                name="ingredients"
                checked={this.props.ingredients}
                onChange={this.handleInputChange}
              />
              Liste d{"'"}ingrédients
            </label>
          </div>
        </div>
        <div className="search-settings-fieldset">
          <div className="search-settings-group">
            <div className="search-settings-title">Saison :</div>
            <select
              value={this.props.season}
              onChange={this.handleInputChange}
              name="season"
            >
              <option value="0">Toutes</option>
              <option value="2">Printemps</option>
              <option value="3">Eté</option>
              <option value="4">Automne</option>
              <option value="1">Hiver</option>
            </select>
          </div>
          <div className="search-settings-group">
            <div className="search-settings-title">Type de plat :</div>
            <select
              value={this.props.recipeType}
              onChange={this.handleInputChange}
              name="recipeType"
            >
              <option value="0">Tous</option>
              <option value="1">Entrée</option>
              <option value="2">Plat principal</option>
              <option value="3">Accompagnement</option>
              <option value="4">Dessert</option>
            </select>
          </div>
          <div className="search-settings-group">
            <div className="search-settings-title">Classer par :</div>
            <select
              value={this.props.orderBy}
              onChange={this.handleInputChange}
              name="orderBy"
            >
              <option value="name">Nom</option>
              <option value="date">Date de modification</option>
            </select>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => Object.assign({}, state.searchSettings, state.recipesOrdering);

export default connect(
  mapStateToProps,
  {
    dispatchSetSearchFilter: setSearchFilter
  }
)(SearchSettings);
