const DEFAULT = {
  name: false,
  desc: false,
  prepTime: false,
  cookingTime: false,
  servings: false,
  ingredients: false,
  steps: false,
  note: false
};

const recipeEditing = (state = DEFAULT, action) => {
  switch (action.type) {
    case 'EDIT_RECIPE_FIELD':
      // assigning from DEFAULT here because I want to allow only
      // one field to be in editing mode at a time
      return Object.assign({}, DEFAULT, {
        [action.name]: true
      });
    // both of these should trigger a reset to false in this reducer
    case 'UPDATE_RECIPE':
    case 'CHANGE_CUR_RECIPE':
      return Object.assign({}, DEFAULT);
    default:
      return state;
  }
};

export default recipeEditing;

export const getRecipeEditing = state => state;
