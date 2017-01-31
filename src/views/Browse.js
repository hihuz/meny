import React from 'react';
import { connect } from 'react-redux';
import { fetchRecipes, setSearchTerm } from '../actions/';
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
          <div className="row">
            {this.props.recipes.map(recipe => <Card
              key={recipe.id}
              name={recipe.name}
              desc={recipe.desc}
              img={recipe.img}
              id={recipe.id}
            />)}
          </div>
        </div>
      </main>
    );
  }
}

const mapStateToProps = state => ({
  recipes: state.recipes,
  searchTerm: state.searchTerm
});

const mapDispatchToProps = dispatch => ({
  dispatchFetchRecipes: () => dispatch(fetchRecipes()),
  dispatchSetSearchTerm: value => dispatch(setSearchTerm(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(Browse);
