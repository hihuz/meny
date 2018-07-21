export default function getRecipeValidState(state) {
  const ingredients = state.ingredients.filter(ingredient => ingredient.length === 0).length === 0;
  const steps = state.steps.filter(step => step.length === 0).length === 0;
  const isNum = /^\d+$/;
  const validState = {
    name: state.name.length > 0,
    ingredients,
    steps,
    prepTime: isNum.test(state.prepTime),
    cookingTime: isNum.test(state.cookingTime),
    price: isNum.test(state.price),
    type: isNum.test(state.type),
    season: isNum.test(state.season),
    servings: isNum.test(state.servings)
  };
  const isValidState =
    Object.keys(validState)
      .map(key => validState[key])
      .filter(fieldState => !fieldState).length === 0;
  return Object.assign(validState, { isValidState });
}
