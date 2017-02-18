import React from 'react';
import { connect } from 'react-redux';
import { fetchRecipes, setSearchTerm, setHasRecipesData } from '../actions/';
import { getVisibleRecipes } from '../reducers';
import Header from '../components/Header';
import SearchHeader from '../components/SearchHeader';
import Card from '../components/Card';

class Browse extends React.Component {
  constructor(props) {
    super(props);
    this.setSearchTerm = this.setSearchTerm.bind(this);
  }
  componentDidMount() {
    if (this.props.recipes.length === 0) {
      this.props.dispatchFetchRecipes();
    } else {
      this.props.dispatchSetHasRecipesData();
    }
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
              return (<div className="loader">
                Chargement...
              </div>);
            } else if (this.props.visibleRecipes.length > 0) {
              return (this.props.visibleRecipes.map(recipe => <Card
                key={recipe.id}
                name={recipe.name}
                desc={recipe.desc}
                img={recipe.img}
                id={recipe.id}
              />))
            }
            return (<h3 className="content-title">
              Aucune recette ne correspond à vos critères :-(
            </h3>)
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
    dispatchFetchRecipes: fetchRecipes,
    dispatchSetSearchTerm: setSearchTerm,
    dispatchSetHasRecipesData: setHasRecipesData
  }
)(Browse);
