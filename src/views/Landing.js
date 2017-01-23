import React from 'react';
import { connect } from 'react-redux';
import Link from 'react-router/Link';
import { fetchFeatured } from '../actions/';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import LandingHeader from '../components/LandingHeader';

class Landing extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    if (this.props.featured.length === 0) {
      this.props.dispatchFetchFeatured();
    }
  }
  render() {
    console.log(this.props.featured);
    return (
      <main className='landing'>
        <Header background={'landing'}>
          <LandingHeader />
        </Header>
        <div className='container'>
          <div className='row'>
            {this.props.featured.map((recipe) => <RecipeCard
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
  featured: state.featured
});

const mapDispatchToProps = dispatch => ({
  dispatchFetchFeatured: () => dispatch(fetchFeatured())
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
