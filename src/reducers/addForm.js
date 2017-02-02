const DEFAULT = {
  ingredients: [""]
};

const addForm = (state = DEFAULT, action) => {
  switch (action.type) {
    case 'ADD_INGREDIENT':
      const ingredients = state.ingredients.slice(0);
      ingredients.push('');
      return Object.assign({}, state, {
        ingredients
      });
    case 'REMOVE_INGREDIENT':
      return Object.assign({}, state, {
        ingredients: [
          ...state.ingredients.slice(0, action.index),
          ...state.ingredients.slice(action.index + 1)
        ]
      });
    case 'CHANGE_INGREDIENT':
      return Object.assign({}, state, {
        ingredients: [
          ...state.ingredients.slice(0, action.index),
          action.value,
          ...state.ingredients.slice(action.index + 1)
        ]
      })
    default:
      return state;
  }
};

export default addForm;
