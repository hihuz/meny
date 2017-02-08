import React from 'react';
import Match from 'react-router/Match';
import { connect } from 'react-redux';
import { fetchUsers, setCurSeason, hideTransition } from '../actions/';
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
    if (this.props.users.length === 0) {
      this.props.dispatchFetchUsers();
    }
  }
  hideTransition() {
    console.log('fu');
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
          component={() => <AsyncRoute
            props={this.props}
            loadingPromise={System.import('./Favorites')}
          />}
        />
        <Match
          pattern="/add"
          component={() => <AsyncRoute
            props={this.props}
            loadingPromise={System.import('./Add')}
          />}
        />
        <Match
          pattern="/edit"
          component={() => <AsyncRoute
            props={this.props}
            loadingPromise={System.import('./Edit')}
          />}
        />
        <Match
          pattern="/recipe/:id"
          component={() => (<AsyncRoute
            props={this.props}
            loadingPromise={System.import('./RecipePage')}
          />)}
        />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users,
  transition: state.transition
});

export default connect(
  mapStateToProps,
  {
    dispatchSetCurSeason: setCurSeason,
    dispatchFetchUsers: fetchUsers,
    dispatchHideTransition: hideTransition
  }
)(App);
