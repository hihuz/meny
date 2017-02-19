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

firebase.initializeApp(fbConf);

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
  const recipeData = Object.assign({}, recipe, {
    created: stamp,
    updated: stamp,
    ingredients: mappedIngs,
    steps: mappedSteps,
    rating: null,
    author: user.sn
  });
  // this object stores only the data used in search mode
  // this is not used for now
  const searchData = {
    desc: recipe.desc,
    img: recipe.img,
    ingredients: mappedIngs,
    name: recipe.name,
    season: recipe.season,
    type: recipe.type,
    updated: stamp
  };
  // firebase updates object
  const updates = {
    [`/recipes/${newRecipeKey}`]: recipeData,
    [`/recipesSearch/${newRecipeKey}`]: searchData,
    [`/recipeVotes/${newRecipeKey}`]: null,
    [`/userRecipes/${user.id}/${newRecipeKey}`]: true
  };

  return (dispatch) => {
    // instantly show transition screen
    dispatch({
      type: 'SHOW_TRANSITION',
      config: {
        title: `Merci pour cette nouvelle recette ${user.sn} ! :D`,
        left: {
          path: 'add',
          text: 'Ajouter une autre recette'
        },
        right: {
          path: 'recipe',
          text: 'Voir la page de votre recette'
        }
      }
    });

    // instantly add the new recipe in the state
    // here I need to include ings / steps as arrays again, this is not very elegent
    // I also need to append the id
    // This action will also be understood by addForm reducer to clear the form data
    dispatch({
      type: 'ADD_RECIPE',
      recipe: Object.assign({}, recipeData, {
        ingredients: recipe.ingredients,
        steps: recipe.steps,
        id: newRecipeKey
      })
    });

    // notification is not yet implemented, this is for later
    const id = notifId++;
    dispatch({
      type: 'SHOW_NOTIFICATION',
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
        console.log("success (sort of): " + res);
        // firebase was updated successfully
        // notification is not yet implemented, this is for later
        const id2 = notifId++;
        dispatch({
          type: 'SHOW_NOTIFICATION',
          msg: 'Your recipe has been added ! ' + res,
          id: id2
        });
      }, (err) => {
        console.log(err);
        // notification is not yet implemented, this is for later
        const id3 = notifId++;
        dispatch({
          type: 'SHOW_NOTIFICATION',
          msg: 'Oops. there was an issue : ' + err,
          id: id3
        });
      });
  }
}

export function hideTransition() {
  return {
    type: 'HIDE_TRANSITION'
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
  }
}
