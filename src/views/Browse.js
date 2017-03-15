import React from 'react';
import { connect } from 'react-redux';
import { setSearchTerm, setHasRecipesData } from '../actions/';
import { getVisibleRecipes } from '../reducers';
import Header from '../components/Header';
import SearchHeader from '../components/SearchHeader';
import RecipeCard from '../components/RecipeCard';

class Browse extends React.Component {
  constructor(props) {
    super(props);
    this.setSearchTerm = this.setSearchTerm.bind(this);
  }
  setSearchTerm(e) {
    this.props.dispatchSetSearchTerm(e.target.value);
  }
  render() {
    return (
      <main className="browse">
        <Header page={'browse'}>
          <SearchHeader
            handleSearchTermChange={this.setSearchTerm}
            searchTerm={this.props.searchTerm}
            page={'browse'}
          />
        </Header>
        <div className="container">
          {(() => {
            if (!this.props.hasRecipesData) {
              return (<div className="loader-container">
                <div className="loader">
                  Chargement...
                </div>
              </div>);
            } else if (this.props.visibleRecipes.length > 0) {
              return (this.props.visibleRecipes.map(recipe => <RecipeCard
                title={recipe.name}
                text={recipe.desc}
                infos={{
                  cookingTime: recipe.cookingTime,
                  prepTime: recipe.prepTime,
                  servings: recipe.servings
                }}
                id={recipe.id}
                background={'woof'}
                key={recipe.id}
              />));
            }
            return (<h3 className="content-title" style={{ margin: '8rem 0' }}>
              Aucune recette ne correspond à vos critères :-c
            </h3>);
          })()}
        </div>
      </main>
    );
  }
}

const mapStateToProps = state => ({
  recipes: state.recipes,
  visibleRecipes: getVisibleRecipes(state),
  searchTerm: state.searchTerm,
  hasRecipesData: state.hasRecipesData
});

export default connect(
  mapStateToProps,
  {
    dispatchSetSearchTerm: setSearchTerm,
    dispatchSetHasRecipesData: setHasRecipesData
  }
)(Browse);
