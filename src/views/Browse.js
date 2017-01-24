import React from 'react';
import { connect } from 'react-redux';
import { fetchRecipes } from '../actions/';
import Header from '../components/Header';
import BrowseHeader from '../components/BrowseHeader';
import Card from '../components/Card';

class Browse extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    if (this.props.recipes.length === 0) {
      this.props.dispatchFetchRecipes();
    }
  }
  render() {
    return (
      <main className='browse'>
        <Header background={'browse'}>
          <BrowseHeader />
        </Header>
        <div className='container'>
          <h3 className='browse-title'>Boo '°,°'</h3>
          <div className='row'>
            {this.props.recipes.map((recipe) => <Card
              key={recipe.id}
              name={recipe.name}
              description={recipe.description}
              image={recipe.image}
              id={recipe.id}
            />)}
          </div>
        </div>
      </main>
    );
  }
}

const mapStateToProps = state => ({
  recipes: state.recipes
});

const mapDispatchToProps = dispatch => ({
  dispatchFetchRecipes: () => dispatch(fetchRecipes())
});

export default connect(mapStateToProps, mapDispatchToProps)(Browse);
