import firebase from 'firebase';
import fbConf from '../../private/firebaseConf.json';

// exported for tests
export const mapSnapToArray = (snap) => {
  const valObj = snap.val();
  const keys = Object.keys(valObj);
  const values = Object.values(valObj);
  return values.map((value, i) => Object.assign({}, value, { id: keys[i] }));
};

export const mapArrayToObject = array => (array.reduce((acc, cur, i) => {
  acc[i] = cur;
  return acc;
}, {}));

export const getFullRecipeDataObject = ({
  recipe,
  user,
  stamp,
  ingredients,
  steps
}) => Object.assign({}, recipe, {
  created: stamp,
  updated: stamp,
  ingredients,
  steps,
  rating: null,
  author: user.sn
});

export const getSearchDataObject = ({
  recipe,
  stamp,
  ingredients
}) => ({
  desc: recipe.desc,
  img: recipe.img,
  ingredients,
  name: recipe.name,
  season: recipe.season,
  type: recipe.type,
  updated: stamp
});

export const getFirebaseNewRecipeObject = ({ key, recipeData, searchData, userid }) => ({
  [`/recipes/${key}`]: recipeData,
  [`/recipesSearch/${key}`]: searchData,
  [`/recipeVotes/${key}`]: null,
  [`/userRecipes/${userid}/${key}`]: true
});

firebase.initializeApp(fbConf);

const dbRef = firebase.database().ref();

let notifId = 0;


export function addRecipe(recipe) {
  return {
    type: 'ADD_RECIPE',
    recipe
  };
}
export function showTransition(config) {
  return {
    type: 'SHOW_TRANSITION',
    config
  };
}
export function hideTransition() {
  return {
    type: 'HIDE_TRANSITION'
  };
}
export function showNotification({ msg, id }) {
  return {
    type: 'SHOW_NOTIFICATION',
    msg,
    id
  };
}
export function hideNotification(id) {
  return {
    type: 'HIDE_NOTIFICATION',
    id
  };
}
export function notify(msg) {
  const id = notifId++;
  return (dispatch) => {
    dispatch(showNotification({ msg, id }));
    setTimeout(dispatch(hideNotification()), 4000);
  };
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
export function setHasRecipesData() {
  return { type: 'SET_HAS_RECIPES_DATA' };
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
export function addFormMoveInput(config) {
  return {
    type: 'MOVE_ADDFORM_INPUT',
    index: Number(config.index),
    name: config.name,
    dir: config.dir
  };
}

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
        dispatch(setHasRecipesData());
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
  // get a key for the new recipe from firebaseDB
  const newRecipeKey = dbRef.child('recipes').push().key;
  const stamp = new Date().getTime();
  const mappedIngs = mapArrayToObject(recipe.ingredients);
  const mappedSteps = mapArrayToObject(recipe.steps);
  // this object stores all data for the recipe
  const fbRecipeData = getFullRecipeDataObject(recipe, {
    user,
    stamp,
    ingredients: mappedIngs,
    steps: mappedSteps
  });
  // this object stores only the data used in search mode
  // this is not used for now
  const fbSearchData = getSearchDataObject({ recipe, stamp, ingredients: mappedIngs });
  // firebase updates object
  const updates = getFirebaseNewRecipeObject({
    key: newRecipeKey,
    recipeData: fbRecipeData,
    searchData: fbSearchData,
    userid: user.id
  });

  return (dispatch) => {
    const transitionConfig = {
      title: `Merci pour cette nouvelle recette ${user.sn} ! :D`,
      left: {
        path: 'add',
        text: 'Ajouter une autre recette'
      },
      right: {
        path: 'recipe',
        text: 'Voir la page de votre recette'
      }
    };
    // instantly show transition screen
    dispatch(showTransition(transitionConfig));

    // here I need to include ings / steps as arrays again, this is not very elegent
    // I also need to append the id
    // This action will also be understood by addForm reducer to clear the form data
    const storeRecipeData = Object.assign({}, fbRecipeData, {
      ingredients: recipe.ingredients,
      steps: recipe.steps,
      id: newRecipeKey
    });
    // instantly add the new recipe to the state
    dispatch(addRecipe(storeRecipeData));

    // notification is not yet implemented, this is for later
    // probably duplicate with transition for this
    notify('Trying to add your recipe !');

    dbRef
      .update(updates)
      .then((res) => {
        console.log(`success (sort of): ${res}`);
        // firebase was updated successfully
        // notification is not yet implemented, this is for later
        notify(`Your recipe has been added to firebase ! ${res}`);
      }, (err) => {
        console.log(`errorz :c ${err}`);
        // notification is not yet implemented, this is for later
        notify(`Oops, there was an issue : ${err}`);
      });
  }
}

