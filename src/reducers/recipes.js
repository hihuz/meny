// This reducer handles the list of recipes stored in the client
// Name of action types are a bit confusing because I originally wanted to use a separate page
const recipes = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_RECIPES':
      return action.recipes;
    case 'ADD_RECIPE':
      return [
        ...state,
        Object.assign({}, action.recipe, { index: state.length })
      ];
    case 'UPDATE_RECIPE': {
      const updatedRecipe = Object.assign({},
        state[action.recipeIndex],
        { [action.name]: action.value }
      );
      return [
        ...state.slice(0, action.recipeIndex),
        updatedRecipe,
        ...state.slice(action.recipeIndex + 1)
      ];
    }
    default:
      return state;
  }
};

export default recipes;

export const getMatchingRecipe = (state, id) => state.find(
  recipe => recipe.id === id
);

export const getVisibleRecipes = (recipeList, filters, searchTerm) => {
  const term = searchTerm.toUpperCase();
  const filterRecipes = (recipe) => {
    if (recipe.season !== '0' &&
        filters.season !== '0' &&
        filters.season !== recipe.season) { return false; }
    if (recipe.type !== '0' &&
        filters.type !== '0' &&
        filters.type !== recipe.type) { return false; }

    let found = false;
    if (filters.name &&
        recipe.name.toUpperCase().indexOf(term) !== -1) { found = true; }
    if (filters.desc &&
        recipe.desc.toUpperCase().indexOf(term) !== -1) { found = true; }
    if (filters.ingredients &&
        recipe.ingredients
          .filter(ing => ing.toUpperCase().indexOf(term) !== -1).length > 0) {
      found = true;
    }
    if (!filters.name && !filters.desc && !filters.ingredients) { found = true; }
    return found;
  };
  return recipeList.filter(filterRecipes);
};
