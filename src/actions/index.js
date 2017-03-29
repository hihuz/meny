import firebase from 'firebase';
import fbConf from '../../private/firebaseConf.json';

firebase.initializeApp(fbConf);

const dbRef = firebase.database().ref();

export const mapSnapToArray = (snap) => {
  const keys = Object.keys(snap);
  const values = Object.values(snap);
  return values.map((value, i) => Object.assign({}, value, { id: keys[i], index: i }));
};

export const getFullRecipeDataObject = ({
  recipe,
  stamp,
  type
}) => Object.assign({}, recipe, {
  updated: stamp
}, type === 'add' ? { created: stamp } : {});

export const getSearchDataObject = ({
  recipe,
  stamp
}) => ({
  desc: recipe.desc,
  ingredients: recipe.ingredients,
  img: recipe.img,
  name: recipe.name,
  season: recipe.season,
  type: recipe.type,
  updated: stamp
});

export const getFirebaseRecipeObject = ({ key, recipeData, searchData }) => ({
  [`/recipes/${key}`]: recipeData,
  [`/recipesSearch/${key}`]: searchData,
  [`/userRecipes/${recipeData.authorId}/${key}`]: true
});

export function addRecipeToStore(recipe) {
  return {
    type: 'ADD_RECIPE',
    recipe
  };
}
export function updateStoreRecipe(recipe) {
  return {
    type: 'UPDATE_RECIPE',
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

export function showNotification({ msg, id, notifType }) {
  return {
    type: 'SHOW_NOTIFICATION',
    msg,
    id,
    notifType
  };
}

export function hideNotification(id) {
  return {
    type: 'HIDE_NOTIFICATION',
    id
  };
}

export function notify(dispatch, { msg, id, notifType }) {
  dispatch(showNotification({ msg, id, notifType }));
  setTimeout(() => dispatch(hideNotification(id)), 4000);
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

export function addFormInput({ field, type }) {
  return { type: `ADD_${type.toUpperCase()}PAGE_INPUT`, field };
}

export function removeFormInput({ field, index, type }) {
  return {
    type: `REMOVE_${type.toUpperCase()}PAGE_INPUT`,
    index: Number(index),
    field
  };
}

export function updateFormInput({ field, index, value, type }) {
  return {
    type: `UPDATE_${type.toUpperCase()}PAGE_INPUT`,
    index: Number(index),
    value,
    field
  };
}

export function moveFormInput({ field, index, dir, type }) {
  return {
    type: `MOVE_${type.toUpperCase()}PAGE_INPUT`,
    index: Number(index),
    field,
    dir
  };
}

export function changeCurRecipe(recipe) {
  return { type: 'CHANGE_CUR_RECIPE', recipe };
}

export function changeAddRecipe(recipe) {
  return { type: 'CHANGE_ADD_RECIPE', recipe };
}

export function updateRecipe(recipe, { index, id }) {
  const stamp = new Date().getTime();
  // this object stores all data for the recipe to be passed to firebase
  const fbRecipeData = getFullRecipeDataObject({
    recipe,
    stamp,
    type: 'update'
  });
  // this object stores only the data used in search mode
  // this is not used for now, just stored on firebase
  const fbSearchData = getSearchDataObject({ recipe, stamp });

  // this object is for the redux store
  const storeRecipeData = Object.assign({}, fbRecipeData, {
    id,
    index
  });
  // firebase updates object is used to update multiple fields in firebase at once
  const updates = getFirebaseRecipeObject({
    key: id,
    recipeData: fbRecipeData,
    searchData: fbSearchData
  });
  return (dispatch) => {
    // this initial dispatch updates the redux store
    // and resets "editing" mode on the recipeEditing reducer
    dispatch(updateStoreRecipe(storeRecipeData));

    dbRef
      .update(updates)
      .then(() => {
        // firebase was updated successfully
        // show a notification to the user to confirm
        notify(dispatch, {
          msg: 'Votre mise à jour a bien été prise en compte !',
          id: new Date().getTime(),
          notifType: 'success'
        });
      }, (err) => {
        // error updating the recipe
        // show a notification to the user
        notify(dispatch, {
          msg: `Oops, votre mise à jour n'a pas pu être enregistrée : ${err}`,
          id: new Date().getTime(),
          notifType: 'error'
        });
      });
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

export function addNewRecipe(recipe) {
  // get a key for the new recipe from firebases
  const newRecipeKey = dbRef.child('recipes').push().key;
  const stamp = new Date().getTime();
  // this object stores all data for the recipe to be passed to firebase
  const fbRecipeData = getFullRecipeDataObject({
    recipe,
    stamp,
    type: 'add'
  });
  // this object stores only the data used in search mode
  // this is not used for now, just stored on firebase
  const fbSearchData = getSearchDataObject({ recipe, stamp });

  // this object is for the redux store
  const storeRecipeData = Object.assign({}, fbRecipeData, {
    id: newRecipeKey
  });

  // firebase updates object is used to update multiple fields in firebase at once
  const updates = getFirebaseRecipeObject({
    key: newRecipeKey,
    recipeData: fbRecipeData,
    searchData: fbSearchData
  });

  return (dispatch) => {
    const transitionConfig = {
      title: `Merci pour cette nouvelle recette ${recipe.authorName} ! :D`,
      left: {
        path: '/add',
        text: 'Ajouter une autre recette'
      },
      right: {
        path: newRecipeKey,
        text: 'Voir la page de votre recette'
      }
    };
    // instantly show transition screen
    dispatch(showTransition(transitionConfig));

    // instantly add the new recipe to the redux store
    // this action will also be understood by addForm reducer to clear the form data
    dispatch(addRecipeToStore(storeRecipeData));

    dbRef
      .update(updates)
      .then(() => {
        // firebase was updated successfully
        // show a notification to the user to confirm
        notify(dispatch, {
          msg: 'Votre recette a été ajoutée !',
          id: new Date().getTime(),
          notifType: 'success'
        });
      }, (err) => {
        // error updating the recipe
        // show a notification to the user
        notify(dispatch, {
          msg: `Oops, votre recette n'a pas pu être ajoutée : ${err}`,
          id: new Date().getTime(),
          type: 'error'
        });
      });
  };
}
