import firebase from 'firebase';
import config from '../../private/firebaseConf.json';

// exported for tests
export const mapSnapToArray = (snap) => {
  const valObj = snap.val();
  const keys = Object.keys(valObj);
  const values = Object.values(valObj);
  return values.map((value, i) => Object.assign({}, value, { id: keys[i] }));
};
export const mapArrayToObject = (array) => {
  return array.reduce((acc, cur, i) => {
    acc[i] = cur;
    return acc;
  }, {});
}

firebase.initializeApp(config);

const dbRef = firebase.database().ref();

let notifId = 0;

export function fetchRecipes() {
  const recipesRef = dbRef.child('recipes');
  return (dispatch) => {
    recipesRef
      .once('value')
      .then((snap) => {
        dispatch({
          type: 'FETCH_RECIPES',
          recipes: mapSnapToArray(snap)
        });
      });
  };
}

export function fetchUsers() {
  const usersRef = dbRef.child('users');
  return (dispatch) => {
    usersRef
      .once('value')
      .then((snap) => {
        dispatch({
          type: 'FETCH_USERS',
          users: mapSnapToArray(snap)
        });
      });
  };
}

export function addNewRecipe(recipe, user) {

  // TEMP BELOW
  return {
    type: 'SHOW_TRANSITION',
    config: {
      title: 'Merci pour cette nouvelle recette ' + user.sn + ' ! :D',
      left: {
        path: 'add',
        text: 'Ajouter une autre recette'
      },
      right: {
        path: 'recipe',
        text: 'Voir la page de votre recette'
      }
    }
  };

  /*
  const newRecipeKey = dbRef.child('recipes').push().key;
  const stamp = new Date().getTime();
  const mappedIngs = mapArrayToObject(recipe.ingredients);
  const mappedSteps = mapArrayToObject(recipe.steps);
  const recipeData = Object.assign({}, recipe, {
    created: stamp,
    updated: stamp,
    ingredients: mappedIngs,
    steps: mappedSteps,
    rating: null,
    author: user.sn
  });
  const searchData = {
    desc: recipe.desc,
    img: recipe.img,
    ingredients: mappedIngs,
    name: recipe.name,
    season: recipe.season,
    type: recipe.type,
    updated: stamp
  };
  const updates = {
    [`/recipes/${newRecipeKey}`]: recipeData,
    [`/recipesSearch/${newRecipeKey}`]: searchData,
    [`/recipeVotes/${newRecipeKey}`]: null,
    [`/userRecipes/${user.id}/${newRecipeKey}`]: true
  };

  return (dispatch) => {
    dispatch({
      type: 'SHOW_TRANSITION',
      config: {
        title: 'Merci pour cette nouvelle recette ' + user.sn + ' ! :D',
        left: {
          path: 'add',
          text: 'Ajouter une autre recette'
        },
        right: {
          path: 'recipe',
          text: 'Voir la page de ma recette'
        }
      }
    });

    const id = notifId++;
    dispatch({
      type: 'SHOW_TRANSITION',
      msg: 'Trying to add your recipe !',
      id
    });
    setTimeout(dispatch({
      type: 'HIDE_NOTIFICATION',
      id
    }), 4000);

    dbRef
      .update(updates)
      .then((res) => {
        console.log(res);
        const id = notifId++;
        dispatch({
          type: 'SHOW_NOTIFICATION',
          msg: 'Your recipe has been added ! ' + res,
          id
        });
      }, (err) => {
        console.log(err);
        const id = notifId++;
        dispatch({
          type: 'ADD_RECIPE_FAILURE',
          msg: 'Oops. there was an issue : ' + err,
          id
        });
      });
  }
  */
};

export function hideTransition() {
  return {
    type: 'HIDE_TRANSITION'
  }
}

export function setSearchFilter(settings = { name, value: true }) {
  const type = `SET_${settings.name.toUpperCase()}_FILTER`;
  return { type, value: settings.value };
}
export function setCurSeason() {
  // get current season 1 = winter, 2 = spring, 3 = summer, 4 = autumn, 0 = all
  const season = Math.ceil((new Date().getMonth() + 1) / 3);
  return { type: 'SET_CUR_SEASON', season };
}
export function setSearchTerm(value) {
  return { type: 'SET_SEARCH_TERM', searchTerm: value };
}
export function setCurUser({ id, sn }) {
  return { type: 'SET_CUR_USER', id, sn };
}
export function addFormAddInput(name) {
  return { type: 'ADD_ADDFORM_INPUT', name };
}
export function addFormRemoveInput(config) {
  return {
    type: 'REMOVE_ADDFORM_INPUT',
    index: Number(config.index),
    name: config.name
  };
}
export function addFormUpdateInput(config) {
  return {
    type: 'UPDATE_ADDFORM_INPUT',
    index: Number(config.index),
    value: config.value,
    name: config.name
  };
}
