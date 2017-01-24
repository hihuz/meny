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
