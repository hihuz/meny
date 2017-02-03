const DEFAULT = {
  ingredients: [""]
};

const addForm = (state = DEFAULT, action) => {
  const ingredients = state.ingredients.slice(0);
  switch (action.type) {
    case 'ADD_INGREDIENT':
      ingredients.push('');
      return Object.assign({}, state, {
        ingredients
      });
    case 'REMOVE_INGREDIENT':
      return Object.assign({}, state, {
        ingredients: [
          ...ingredients.slice(0, action.index),
          ...ingredients.slice(action.index + 1)
        ]
      });
    case 'CHANGE_INGREDIENT':
      return Object.assign({}, state, {
        ingredients: [
          ...ingredients.slice(0, action.index),
          action.value,
          ...ingredients.slice(action.index + 1)
        ]
      });
    default:
      return state;
  }
};

export default addForm;
