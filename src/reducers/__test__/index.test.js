import {
  getOrderedRecipes
} from '../';

describe('getOrderedRecipes', () => {
  test('takes an array and an object as params, returns an array', () => {
    const list = [];
    const sort = {};
    expect(getOrderedRecipes.resultFunc(list, sort)).toEqual([]);
  });
});
