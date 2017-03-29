import recipes, {
  getMatchingRecipe,
  getVisibleRecipes
} from '../recipes';

const testState = [
  {
    author: 'hihuz',
    cookingTime: '30',
    created: 1485868420435,
    desc: 'blah bluh',
    img: true,
    ingredients: ['3 oeufs', '150g de farine', '50g de beurre'],
    name: 'tarte !',
    note: 'boo',
    prepTime: '10',
    price: '1',
    rating: '4.1',
    season: '2',
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
    season: '1',
    servings: '3',
    steps: ['step 1 bla bla', 'step 2 bla bla', 'step 3 moo'],
    type: '3',
    updated: 1485868459243,
    id: 'test2',
    index: 8
  }
];

test('unsupported action types should return state unchanged', () => {
  const stateBefore = testState;
  const action = { type: 'FOO_BAR', recipes: 'test' };

  expect(recipes(stateBefore, action)).toEqual(stateBefore);
});

describe('FETCH_RECIPES', () => {
  test('should set passed recipes array as state 1', () => {
    const stateBefore = [];
    const newRecipes = [{ hey: 'ho' }, { hi: 'hu' }];
    const action = { type: 'FETCH_RECIPES', recipes: newRecipes };
    expect(recipes(stateBefore, action)).toEqual(newRecipes);
  });
  test('should set passed recipes array as state 2', () => {
    const stateBefore = [{ hey: 'ho' }, { hi: 'hu' }];
    const newRecipes = [{ boo: 'yah' }];
    const action = { type: 'FETCH_RECIPES', recipes: newRecipes };
    expect(recipes(stateBefore, action)).toEqual(newRecipes);
  });
});

describe('ADD_RECIPE', () => {
  test('should add passed recipe to state 1', () => {
    const stateBefore = [];
    const recipe = { hey: 'ho' };
    const action = { type: 'ADD_RECIPE', recipe };
    const index = stateBefore.length;
    const stateAfter = [...stateBefore, { ...recipe, index }];
    expect(recipes(stateBefore, action)).toEqual(stateAfter);
  });
  test('should add passed recipe to state 2', () => {
    const stateBefore = [{ hey: 'ho' }, { hi: 'hu' }];
    const recipe = { boo: 'yah' };
    const action = { type: 'ADD_RECIPE', recipe };
    const index = stateBefore.length;
    const stateAfter = [...stateBefore, { ...recipe, index }];
    expect(recipes(stateBefore, action)).toEqual(stateAfter);
  });
});

// Needs some more tests for the below
describe('UPDATE_RECIPE', () => {
  test('should update the recipe based off passed index 1', () => {
    const stateBefore = [{ hey: 'ho' }, { hi: 'hu' }, { foo: 'bar' }];
    const recipe = { hey: 'ha', index: 0 };
    const action = { type: 'UPDATE_RECIPE', recipe };
    const stateAfter = [{ hey: 'ha', index: 0 }, { hi: 'hu' }, { foo: 'bar' }];
    expect(recipes(stateBefore, action)).toEqual(stateAfter);
  });
  test('should update the recipe based off passed index 2', () => {
    const stateBefore = [{ hey: 'ho' }, { hi: 'hu' }, { foo: 'bar' }];
    const recipe = { boo: 'yah', index: 2 };
    const action = { type: 'UPDATE_RECIPE', recipe };
    const stateAfter = [{ hey: 'ho' }, { hi: 'hu' }, { boo: 'yah', index: 2 }];
    expect(recipes(stateBefore, action)).toEqual(stateAfter);
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

describe('getVisibleRecipes, desc filter only', () => {
  const filters = {
    season: '0',
    type: '0',
    name: false,
    desc: true,
    ingredients: false
  };
  test('one result expected 1', () => {
    const searchTerm = 'c';
    const actual = getVisibleRecipes(testState, filters, searchTerm);
    const expected = [testState[1]];

    expect(actual).toEqual(expected);
  });
  test('one result expected 2', () => {
    const searchTerm = 'bl';
    const actual = getVisibleRecipes(testState, filters, searchTerm);
    const expected = [testState[0]];

    expect(actual).toEqual(expected);
  });
  test('no result expected', () => {
    const searchTerm = 'mooooo';
    const actual = getVisibleRecipes(testState, filters, searchTerm);
    const expected = [];

    expect(actual).toEqual(expected);
  });
  test('two results expected', () => {
    const searchTerm = 'u';
    const actual = getVisibleRecipes(testState, filters, searchTerm);
    const expected = testState;

    expect(actual).toEqual(expected);
  });
});

describe('getVisibleRecipes, ingredients filter only', () => {
  const filters = {
    season: '0',
    type: '0',
    name: false,
    desc: false,
    ingredients: true
  };
  test('one result expected 1', () => {
    const searchTerm = 't';
    const actual = getVisibleRecipes(testState, filters, searchTerm);
    const expected = [testState[1]];

    expect(actual).toEqual(expected);
  });
  test('one result expected 2', () => {
    const searchTerm = 'oe';
    const actual = getVisibleRecipes(testState, filters, searchTerm);
    const expected = [testState[0]];

    expect(actual).toEqual(expected);
  });
  test('no result expected', () => {
    const searchTerm = 'mooooo';
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

describe('getVisibleRecipes, season & name filters', () => {
  const filters = {
    type: '0',
    name: true,
    desc: false,
    ingredients: false
  };
  test('one result expected 1', () => {
    filters.season = '2';
    const searchTerm = 'a';
    const actual = getVisibleRecipes(testState, filters, searchTerm);
    const expected = [testState[0]];

    expect(actual).toEqual(expected);
  });
  test('one result expected 2', () => {
    filters.season = '1';
    const searchTerm = 'a';
    const actual = getVisibleRecipes(testState, filters, searchTerm);
    const expected = [testState[1]];

    expect(actual).toEqual(expected);
  });
});

describe('getVisibleRecipes, type & name filters', () => {
  const filters = {
    season: '0',
    name: true,
    desc: false,
    ingredients: false
  };
  test('one result expected 1', () => {
    filters.type = '2';
    const searchTerm = 'a';
    const actual = getVisibleRecipes(testState, filters, searchTerm);
    const expected = [testState[0]];

    expect(actual).toEqual(expected);
  });
  test('one result expected 2', () => {
    filters.type = '3';
    const searchTerm = 'a';
    const actual = getVisibleRecipes(testState, filters, searchTerm);
    const expected = [testState[1]];

    expect(actual).toEqual(expected);
  });
});
