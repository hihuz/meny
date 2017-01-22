import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchRecipes } from '../actions/';
import NavBar from '../components/NavBar';
import Header from '../components/Header';
import LandingBody from '../components/LandingBody';
import Footer from '../components/Footer';

class Landing extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    if (!this.props.recipes) {
      this.props.fetchFeatured();
    }
  }
  render() {
    return (
      <div className='landing'>
        <NavBar />
        <Header />
        <LandingBody recipes={this.props.recipes} />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  featured: state.featured
});

const mapDispatchToProps = dispatch => ({
  dispatchFetchRecipes: () => dispatch(fetchRecipes())
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
