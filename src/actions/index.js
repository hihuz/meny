import firebase from 'firebase';
import config from '../../private/firebaseConf.json'

firebase.initializeApp(config);

const recipes = firebase.database().ref().child('recipes');

export function fetchFeatured() {
  return dispatch => {
    recipes
      .once('value')
      .then(snap => {
      dispatch({
        type: 'FETCH_FEATURED',
        recipes: snap.val()
      });
    });
  };
}
