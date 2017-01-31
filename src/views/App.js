import React from 'react';
import Match from 'react-router/Match';
import { connect } from 'react-redux';
import { fetchUsers, setCurSeason } from '../actions/';
import AsyncRoute from './AsyncRoute';
import Landing from './Landing';
import Browse from './Browse';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import '../styles/normalize.css';
import '../styles/milligram.css';
import '../styles/main.css';
import '../styles/icomoon.css';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.dispatchSetCurSeason();
    if (this.props.users.length === 0) {
      this.props.dispatchFetchUsers();
    }
  }

  render() {
    return (
      <div>
        <NavBar users={this.props.users} />
        <Match
          exactly
          pattern="/"
          component={Landing}
        />
        <Match
          pattern="/browse"
          props={props}
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
          pattern="/edit"
          component={props => <AsyncRoute
            props={props}
            loadingPromise={System.import('./Edit')}
          />}
        />
        <Match
          pattern="/recipe/:id"
          component={props => (<AsyncRoute
            props={props}
            loadingPromise={System.import('./RecipePage')}
          />)}
        />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users
});

const mapDispatchToProps = dispatch => ({
  dispatchSetCurSeason: () => dispatch(setCurSeason()),
  dispatchFetchUsers: () => dispatch(fetchUsers())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
