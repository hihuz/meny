import { addIngredient, removeIngredient, changeIngredient } from './';

describe('addIngredient', () => {
  test('should return an ADD_INGREDIENT action', () => {
    const action = { type: 'ADD_INGREDIENT' };
    expect(addIngredient()).toEqual(action);
  });
});

describe('removeIngredient', () => {
  test('should return an REMOVE_INGREDIENT action with the correct index 1', () => {
    const action = { type: 'REMOVE_INGREDIENT', index: 0 };
    expect(removeIngredient(0)).toEqual(action);
  });
  test('should return an REMOVE_INGREDIENT action with the correct index 2', () => {
    const action = { type: 'REMOVE_INGREDIENT', index: 2 };
    expect(removeIngredient(2)).toEqual(action);
  });
  test('should convert the string provided as index to a number', () => {
    const action = { type: 'REMOVE_INGREDIENT', index: 2 };
    expect(removeIngredient('2')).toEqual(action);
  });
});

describe('changeIngredient', () => {
  test('should return an CHANGE_INGREDIENT action with correct index/value 1', () => {
    const action = { type: 'CHANGE_INGREDIENT', index: 0, value: 'boo' };
    expect(changeIngredient(0, 'boo')).toEqual(action);
  });
  test('should return an CHANGE_INGREDIENT action with correct index/value 2', () => {
    const action = { type: 'CHANGE_INGREDIENT', index: 3, value: 'baa' };
    expect(changeIngredient(3, 'baa')).toEqual(action);
  });
  test('should convert the string provided as index to a number', () => {
    const action = { type: 'CHANGE_INGREDIENT', index: 3, value: 'baa' };
    expect(changeIngredient('3', 'baa')).toEqual(action);
  });
});
