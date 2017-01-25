import firebase from 'firebase';
import config from '../../private/firebaseConf.json';

firebase.initializeApp(config);

const dbRef = firebase.database().ref();

export function fetchRecipes() {
  const recipesRef = dbRef.child('recipes');
  return dispatch => {
    recipesRef
      .once('value')
      .then(snap => {
        const recipesObj = snap.val();
        const keys = Object.keys(recipesObj);
        const values = Object.values(recipesObj);
        const recipes = values.map((value, i) => Object.assign({}, value, { id: keys[i] }));
        console.log(recipes);
        dispatch({
          type: 'FETCH_RECIPES',
          recipes
        });
      });
  };
}

export function setSeasonFilter(season) {
  return { type: 'SET_SEASON_FILTER', season };
}

export function setCurSeason() {
  // get current season 1 = winter, 2 = spring, 3 = summer, 4 = autumn, 0 = all
  const season = (new Date().getMonth() % 4) + 1;
  const texts = {
    0: '',
    1: 'Hiver !!!',
    2: 'Printemps !!!',
    3: 'été !!!!',
    4: 'Automne !!!'
  };
  return { type: 'SET_CUR_SEASON', season, seasonText: texts[season] };
}

export function setOrderBy(settings) {
  return settings;
}
