import recipes, {
  getMatchingRecipe,
  getVisibleRecipes,
  getCurRecipeValidState
} from '../recipes';

const testState = [
  {
    author: 'hihuz',
    cookingTime: '30',
    created: 1485868420435,
    desc: 'blah blah',
    img: true,
    ingredients: ['3 oeufs', '150g de farine', '50g de beurre'],
    name: 'tarte !',
    note: 'boo',
    prepTime: '10',
    price: '1',
    rating: '4.1',
    season: '0',
    servings: '4',
    steps: ['mélanger ceci', 'ajouter cela', 'faire cuire ceci cela'],
    type: '2',
    updated: 1485868420435,
    id: 'test1',
    index: 7
  },
  {
    author: 'typhon',
    cookingTime: '40',
    created: 1485868459243,
    desc: 'coucouuuu',
    img: true,
    ingredients: ['tomates', 'viande hachée', 'haricots rouges'],
    name: 'chili con carne',
    note: 'baaa',
    prepTime: '20',
    price: '2',
    rating: '4.5',
    season: '0',
    servings: '3',
    steps: ['step 1 bla bla', 'step 2 bla bla', 'step 3 moo'],
    type: '2',
    updated: 1485868459243,
    id: 'test2',
    index: 8
  }
];

describe('recipes', () => {
  test('unsupported action types should return state unchanged', () => {
    const stateBefore = testState;
    const action = { type: 'FOO_BAR', recipes: 'test' };

    expect(recipes(stateBefore, action)).toEqual(stateBefore);
  });
});

describe('getMatchingRecipe', () => {
  test('should return the recipe matching the provided id 1', () => {
    const actual = getMatchingRecipe(testState, 'test2');
    const expected = testState[1];

    expect(actual).toEqual(expected);
  });
  test('should return the recipe matching the provided id 2', () => {
    const actual = getMatchingRecipe(testState, 'test1');
    const expected = testState[0];

    expect(actual).toEqual(expected);
  });
  test('should return undefined if no match', () => {
    const actual = getMatchingRecipe(testState, 'nope');

    expect(actual).toEqual(undefined);
  });
});

describe('getVisibleRecipes, name filter only', () => {
  const filters = {
    season: '0',
    type: '0',
    name: true,
    desc: false,
    ingredients: false
  };
  test('one result expected 1', () => {
    const searchTerm = 'c';
    const actual = getVisibleRecipes(testState, filters, searchTerm);
    const expected = [testState[1]];

    expect(actual).toEqual(expected);
  });
  test('one result expected 2', () => {
    const searchTerm = 'ta';
    const actual = getVisibleRecipes(testState, filters, searchTerm);
    const expected = [testState[0]];

    expect(actual).toEqual(expected);
  });
  test('no result expected', () => {
    const searchTerm = 'blabla';
    const actual = getVisibleRecipes(testState, filters, searchTerm);
    const expected = [];

    expect(actual).toEqual(expected);
  });
  test('two results expected', () => {
    const searchTerm = 'a';
    const actual = getVisibleRecipes(testState, filters, searchTerm);
    const expected = testState;

    expect(actual).toEqual(expected);
  });
});

// describe('getVisibleRecipes, name filter only', () => {
//     const filters = {
//       season: '0',
//       type: '0',
//       name: true,
//       desc: false,
//       ingredients: false
//     };
//   test('one result expected 1', () => {
//     const searchTerm = 'c';
//     const actual = getVisibleRecipes(testState, filters, searchTerm);
//     const expected = [testState[1]];

//     expect(actual).toEqual(expected);
//   });
//   test('one result expected 2', () => {
//     const searchTerm = 'ta';
//     const actual = getVisibleRecipes(testState, filters, searchTerm);
//     const expected = [testState[0]];

//     expect(actual).toEqual(expected);
//   });
// });
