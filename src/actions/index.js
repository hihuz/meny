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
  console.log(array);
  return array.reduce((acc, cur, i) => {
    acc[i] = cur;
    return acc;
  }, {});
}

firebase.initializeApp(config);

const dbRef = firebase.database().ref();

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
    author: user.name
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
  console.log(updates);
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
