import firebase from 'firebase';
import config from '../../private/firebaseConf.json'

firebase.initializeApp(config);

const recipes = firebase.database().ref().child('recipes');

export function fetchRecipes() {
  return dispatch => {
    recipes.on('value', snap => {
      dispatch({
        type: 'FETCH_RECIPES',
        recipes: snap.val()
      });
    });
  };
}
