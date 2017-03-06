import firebase from 'firebase';
import fbConf from '../../private/firebaseConf.json';

firebase.initializeApp(fbConf);

const dbRef = firebase.database().ref();

export const mapSnapToArray = (snap) => {
  const keys = Object.keys(snap);
  const values = Object.values(snap);
  return values.map((value, i) => Object.assign({}, value, { id: keys[i], index: i }));
};

export const mapArrayToObject = array => (array.reduce((acc, cur, i) => {
  acc[i] = cur;
  return acc;
}, {}));

export const getFullRecipeDataObject = ({
  recipe,
  author,
  stamp,
  ingredients,
  steps
}) => Object.assign({}, recipe, {
  created: stamp,
  updated: stamp,
  ingredients,
  steps,
  rating: null,
  author
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

export function addRecipeToStore(recipe) {
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

export function notify(msg, id) {
  return (dispatch) => {
    dispatch(showNotification({ msg, id }));
    setTimeout(dispatch(hideNotification(id)), 4000);
  };
}

export function setSearchFilter(settings) {
  const type = `SET_${settings.name.toUpperCase()}_FILTER`;
  return { type, value: settings.value };
}

export function setCurSeason() {
  // get current season 1 = winter, 2 = spring, 3 = summer, 4 = autumn, 0 = all
  // this is a very rough estimate, no need to be too specific here
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

// recipeIndex param in the below actions is optionnal
// it is required for recipes reducer but not for addForm reducer
export function addFormInput({ name, type, recipeIndex }) {
  return { type: `ADD_${type.toUpperCase()}PAGE_INPUT`, name, recipeIndex };
}

export function removeFormInput({ name, index, type, recipeIndex }) {
  return {
    type: `REMOVE_${type.toUpperCase()}PAGE_INPUT`,
    index: Number(index),
    name,
    recipeIndex
  };
}

export function updateFormInput({ name, index, value, type, recipeIndex }) {
  return {
    type: `UPDATE_${type.toUpperCase()}PAGE_INPUT`,
    index: Number(index),
    value,
    name,
    recipeIndex
  };
}

export function moveFormInput({ name, index, dir, type, recipeIndex }) {
  return {
    type: `MOVE_${type.toUpperCase()}PAGE_INPUT`,
    index: Number(index),
    name,
    dir,
    recipeIndex
  };
}

export function editRecipeField(name) {
  return { type: 'EDIT_RECIPE_FIELD', name };
}

export function cancelEditRecipe() {
  return { type: 'CANCEL_EDIT_RECIPE' };
}

// This is the more complex one, it needs to update redux store + firebase so this is a thunk
// + reset the "editing" mode also for the field
export function updateRecipe(config) {
  return { type: 'UPDATE_RECIPE', config };
}

export function fetchRecipes() {
  const recipesRef = dbRef.child('recipes');
  return (dispatch) => {
    recipesRef
      .once('value')
      .then((snap) => {
        dispatch({
          type: 'FETCH_RECIPES',
          recipes: mapSnapToArray(snap.val())
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
          users: mapSnapToArray(snap.val())
        });
      });
  };
}

export function addNewRecipe(recipe, user) {
  // get a key for the new recipe from firebases
  const newRecipeKey = dbRef.child('recipes').push().key;
  const stamp = new Date().getTime();
  const mappedIngs = mapArrayToObject(recipe.ingredients);
  const mappedSteps = mapArrayToObject(recipe.steps);
  // this object stores all data for the recipe to be passed to firebase
  const fbRecipeData = getFullRecipeDataObject({
    recipe,
    author: user.id,
    stamp,
    ingredients: mappedIngs,
    steps: mappedSteps
  });
  // this object stores only the data used in search mode
  // this is not used for now
  const fbSearchData = getSearchDataObject({ recipe, stamp, ingredients: mappedIngs });
  // firebase updates object this will be used to update multiple fields in firebase at once
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
        path: '/add',
        text: 'Ajouter une autre recette'
      },
      right: {
        path: `/recipes/${newRecipeKey}`,
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
    // instantly add the new recipe to the redux store
    dispatch(addRecipeToStore(storeRecipeData));

    // notification is not yet implemented, this is for later
    // probably not needed for this because of the transition screen
    notify('Trying to add your recipe !', new Date().getTime());

    dbRef
      .update(updates)
      .then((res) => {
        console.log(`success (sort of): ${res}`);
        // firebase was updated successfully
        // notification is not yet implemented, this is for later
        notify(`Your recipe has been added to firebase ! ${res}`, new Date().getTime());
      }, (err) => {
        console.log(`errorz :c ${err}`);
        // notification is not yet implemented, this is for later
        notify(`Oops, there was an issue : ${err}`, new Date().getTime());
      });
  };
}
