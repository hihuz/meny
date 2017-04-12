import getRecipeValidState from '../commonSelectors';

describe('getRecipeValidState', () => {
  test('should return false for each invalid prop / false as isValidState if any false', () => {
    const state = {
      name: '',
      desc: '',
      ingredients: ['a', '', 'c'],
      steps: ['d', 'e', ''],
      prepTime: 'a',
      cookingTime: 'b',
      price: 'c',
      type: 'd',
      season: 'e',
      servings: '',
      note: '',
      img: true
    };
    const actual = getRecipeValidState(state);
    const expected = {
      name: false,
      ingredients: false,
      steps: false,
      prepTime: false,
      cookingTime: false,
      price: false,
      type: false,
      season: false,
      servings: false,
      isValidState: false
    };

    expect(actual).toEqual(expected);
  });

  test('should return true for each valid prop / true as isValidState if all is valid', () => {
    const state = {
      name: 'a',
      desc: '',
      ingredients: ['a', 'b', 'c'],
      steps: ['d', 'e', 'f'],
      prepTime: '10',
      cookingTime: '20',
      price: '1',
      type: '2',
      season: '3',
      servings: '4',
      note: '',
      img: true
    };
    const actual = getRecipeValidState(state);
    const expected = {
      name: true,
      ingredients: true,
      steps: true,
      prepTime: true,
      cookingTime: true,
      price: true,
      type: true,
      season: true,
      servings: true,
      isValidState: true
    };

    expect(actual).toEqual(expected);
  });

  test('should return false as isValidState if any field is not valid 1', () => {
    const state = {
      name: 'a',
      desc: '',
      ingredients: ['a', 'b', 'c'],
      steps: ['d', '', 'f'],
      prepTime: '10',
      cookingTime: '20',
      price: '1',
      type: '2',
      season: '3',
      servings: '4',
      note: '',
      img: true
    };
    const actual = getRecipeValidState(state);
    const expected = {
      name: true,
      ingredients: true,
      steps: false,
      prepTime: true,
      cookingTime: true,
      price: true,
      type: true,
      season: true,
      servings: true,
      isValidState: false
    };

    expect(actual).toEqual(expected);
  });

  test('should return false as isValidState if any field is not valid 4', () => {
    const state = {
      name: '',
      desc: '',
      ingredients: ['a', 'b', ''],
      steps: ['d', 'e', 'f'],
      prepTime: '10',
      cookingTime: 'a',
      price: '1',
      type: '',
      season: '3',
      servings: '4',
      note: '',
      img: true
    };
    const actual = getRecipeValidState(state);
    const expected = {
      name: false,
      ingredients: false,
      steps: true,
      prepTime: true,
      cookingTime: false,
      price: true,
      type: false,
      season: true,
      servings: true,
      isValidState: false
    };

    expect(actual).toEqual(expected);
  });
});
