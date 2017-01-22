import React from 'react';
import Match from 'react-router/Match';
import AsyncRoute from './AsyncRoute';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import '../styles/normalize.css';
import '../styles/milligram.css';
import '../styles/main.css';

const App = () => (
  <div>
    <NavBar />
    <Match
      exactly
      pattern='/'
      component={props => <AsyncRoute
        props={props}
        loadingPromise={System.import('./Landing')}
      />}
    />
    <Match
      pattern='/search'
      component={props => <AsyncRoute
        props={props}
        loadingPromise={System.import('./SearchPage')}
      />}
    />
    <Match
      pattern='/results'
      component={props => <AsyncRoute
        props={props}
        loadingPromise={System.import('./ResultsPage')}
      />}
    />
    <Match
      pattern='/edit'
      component={props => <AsyncRoute
        props={props}
        loadingPromise={System.import('./AddEdit')}
      />}
    />
    <Match
      pattern='/recipe/:id'
      component={(props) => {
        // const shows = preload.shows.filter((show) => props.params.id === show.imdbID)
        return (<AsyncRoute
          props={props}
          loadingPromise={System.import('./RecipePage')}
        />);
      }}
    />
    <Footer />
  </div>
);

export default App;
