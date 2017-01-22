import firebase from 'firebase';
import config from '../../private/firebaseConf.json'

firebase.initializeApp(config);

const dbRef = firebase.database().ref();

export function fetchFeatured() {
  const featuredRef = dbRef.child('featured');
  return dispatch => {
    featuredRef
      .once('value')
      .then(snap => {
        const featuredObj = snap.val();
        const keys = Object.keys(featuredObj);
        const values = Object.values(featuredObj);
        const featured = values.map((value, i) => Object.assign({}, value, { id: keys[i] }));
        console.log(featured);
        dispatch({
          type: 'FETCH_FEATURED',
          featured
        });
      });
  };
}
