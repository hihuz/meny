import React from 'react';
import { Match } from 'react-router';
import AsyncRoute from '../AsyncRoute/';

const App = () => (
  <div>
    <Match
      exactly
      pattern='/'
      component={(props) => <AsyncRoute
        props={props}
        loadingPromise={System.import('./Landing')}
      />}
    />
    <Match
      pattern='/search'
      component={(props) => <AsyncRoute
        props={(props)}
        loadingPromise={System.import('./SearchPage')}
      />}
    />
    <Match
      pattern='/results'
      component={(props) => <AsyncRoute
        props={(props)}
        loadingPromise={System.import('./ResultsPage')}
      />}
    />
    <Match
      pattern='/edit'
      component={(props) => <AsyncRoute
        props={(props)}
        loadingPromise={System.import('./AddEdit')}
      />}
    />
    <Match
      pattern='/recipe/:id'
      component={(props) => {
        //const shows = preload.shows.filter((show) => props.params.id === show.imdbID)
        return <AsyncRoute
          props={(props)}
          loadingPromise={System.import('./RecipePage')}
        />
      }}
    />
  </div>
);

export default App;
