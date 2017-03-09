import {
  getOrderedRecipes
} from '../';


describe('getOrderedRecipes', () => {
  test('takes an array and an object as params', () => {
    const list = [];
    const sort = {};
    expect(getOrderedRecipes.resultFunc(list, sort)).toEqual([]);
  });
});
