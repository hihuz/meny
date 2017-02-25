import React from 'react';
import Match from 'react-router/Match';
import { connect } from 'react-redux';
import { fetchRecipes, fetchUsers, setCurSeason, hideTransition } from '../actions/';
import AsyncRoute from './AsyncRoute';
import Landing from './Landing';
import Browse from './Browse';
import Transition from './Transition';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import '../styles/normalize.css';
import '../styles/milligram.css';
import '../styles/main.css';
import '../styles/icomoon.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.hideTransition = this.hideTransition.bind(this);
  }
  componentDidMount() {
    this.props.dispatchSetCurSeason();
    if (!this.props.hasRecipesData) {
      this.props.dispatchFetchRecipes();
    }
    if (this.props.users.length === 0) {
      this.props.dispatchFetchUsers();
    }
  }
  hideTransition() {
    this.props.dispatchHideTransition();
  }
  render() {
    return (
      <div>
        {this.props.transition.shown ?
          <Transition
            {...this.props.transition.config}
            hideTransition={this.hideTransition}
          /> :
          ''
        }
        <NavBar users={this.props.users} />
        <Match
          exactly
          pattern="/"
          component={Landing}
        />
        <Match
          pattern="/browse"
          component={Browse}
        />
        <Match
          pattern="/favorites"
          component={props => <AsyncRoute
            props={props}
            loadingPromise={System.import('./Favorites')}
          />}
        />
        <Match
          pattern="/add"
          component={props => <AsyncRoute
            props={props}
            loadingPromise={System.import('./Add')}
          />}
        />
        <Match
          pattern="/recipes/:id"
          component={(props) => {
            const matchingRecipe = this.props.recipes
              .find(recipe => props.params.id === recipe.id);
            return (<AsyncRoute
              props={matchingRecipe}
              loadingPromise={System.import('./RecipePage')}
            />);
          }}
        />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users,
  transition: state.transition,
  recipes: state.recipes,
  hasRecipesData: state.hasRecipesData
});

export default connect(
  mapStateToProps,
  {
    dispatchFetchRecipes: fetchRecipes,
    dispatchSetCurSeason: setCurSeason,
    dispatchFetchUsers: fetchUsers,
    dispatchHideTransition: hideTransition
  }
)(App);
