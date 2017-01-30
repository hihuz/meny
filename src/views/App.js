import React from 'react';
import Match from 'react-router/Match';
import AsyncRoute from './AsyncRoute';
import Landing from './Landing';
import Browse from './Browse';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import '../styles/normalize.css';
import '../styles/milligram.css';
import '../styles/main.css';
import '../styles/icomoon.css';

const App = () => (
  <div>
    <NavBar />
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

export default App;
