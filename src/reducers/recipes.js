const recipes = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_RECIPES':
      return action.recipes;
    default:
      return state;
  }
};

export default recipes;

export const getVisibleRecipes = (state, filters, searchTerm) => {
  const term = searchTerm.toUpperCase();
  const filterRecipes = (recipe) => {
    console.log(recipe);
    console.log(filters);
    if (filters.season !== 0 &&
        filters.season !== recipe.season) { return false; }
    if (filters.recipeType !== 0 &&
        filters.recipeType !== recipe.recipeType) { return false; }
    if (filters.name &&
        recipe.name.toUpperCase().indexOf(term) === -1) { return false; }
    if (filters.desc &&
        recipe.desc.toUpperCase().indexOf(term) === -1) { return false; }
    if (filters.ingredients &&
        recipe.ingredients
          .filter(ing => ing.toUpperCase().indexOf(term) !== -1).length === 0) {
      return false;
    }
    return true;
  }
  return state.filter(filterRecipes);
};
