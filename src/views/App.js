import React from 'react';
import Route from 'react-router-dom/Route';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import { connect } from 'react-redux';
import { fetchRecipes, fetchUsers, setCurSeason, hideTransition } from '../actions/';
import AsyncRoute from './AsyncRoute';
import Landing from './Landing';
import Browse from './Browse';
import RecipePage from './RecipePage';
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
      <BrowserRouter>
        <div>
          {this.props.transition.shown ?
            <Transition
              {...this.props.transition.config}
              hideTransition={this.hideTransition}
            /> :
            ''
          }
          <NavBar users={this.props.users} />
          <Route
            exact
            path="/"
            component={Landing}
          />
          <Route
            path="/browse"
            component={Browse}
          />
          <Route
            path="/favorites"
            render={() => <AsyncRoute
              loadingPromise={System.import('./Favorites')}
            />}
          />
          <Route
            path="/add"
            render={() => <AsyncRoute
              loadingPromise={System.import('./Add')}
            />}
          />
          <Route
            path="/recipes/:id"
            component={RecipePage}
          />
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users,
  transition: state.transition,
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
