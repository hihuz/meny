import recipeEditing, { getRecipeEditing } from '../recipeEditing';

const DEFAULT = {
  main: false,
  prepTime: false,
  cookingTime: false,
  servings: false,
  ingredients: false,
  steps: false,
  note: false
};

describe('recipeEditing', () => {
  test('unsupported action types should return state unchanged', () => {
    const stateBefore = { testState: true };
    const action = { type: 'BOO_BAH', name: 'desc' };

    expect(recipeEditing(stateBefore, action)).toEqual(stateBefore);
  });
  test('UPDATE_RECIPE action should reset state to default', () => {
    const stateBefore = { whatever: true };
    const action = { type: 'UPDATE_RECIPE' };

    expect(recipeEditing(stateBefore, action)).toEqual(DEFAULT);
  });
  test('CANCEL_EDIT_RECIPE action should reset state to default', () => {
    const stateBefore = { whatever: true };
    const action = { type: 'UPDATE_RECIPE' };

    expect(recipeEditing(stateBefore, action)).toEqual(DEFAULT);
  });
  test('EDIT_RECIPE_FIELD action should set all fields to false except the one passed 1', () => {
    const stateBefore = Object.assign({}, DEFAULT, { step: true });
    const action = { type: 'EDIT_RECIPE_FIELD', name: 'servings' };
    const stateAfter = Object.assign({}, DEFAULT, { servings: true });
    expect(recipeEditing(stateBefore, action)).toEqual(stateAfter);
  });
  test('EDIT_RECIPE_FIELD action should set all fields to false except the one passed 2', () => {
    const stateBefore = DEFAULT;
    const action = { type: 'EDIT_RECIPE_FIELD', name: 'ingredients' };
    const stateAfter = Object.assign({}, DEFAULT, { ingredients: true });
    expect(recipeEditing(stateBefore, action)).toEqual(stateAfter);
  });
});

// this selector for now returns a plain state
describe('getRecipeEditing', () => {
  test('should return state given as param', () => {
    const actual = getRecipeEditing(DEFAULT);
    const expected = DEFAULT;
    expect(actual).toEqual(expected);
  });
});
