import addForm, { getAddFormValidState } from '../addForm';

test('unsupported action types should return state unchanged', () => {
  const stateBefore = {
    ingredients: ['a', 'b', 'c'],
    steps: ['a', 'b', 'c'],
    desc: 'boo',
    note: 'foo',
    whatever: 'heyhey',
    name: '1',
    price: '2',
    type: '0',
    season: '3'
  };
  const action = { type: 'FOO_BAR', field: 'desc', value: 'boo', index: 1 };

  expect(addForm(stateBefore, action)).toEqual(stateBefore);
});

// I am only testing a simple case for each of these actions since
// the underlying logic is already tested in fieldUpdates.test
describe('ADD_ADDPAGE_INPUT', () => {
  const stateBefore = { ingredients: ['e', 'f'], steps: ['g', 'h'] };
  test('test ADD action', () => {
    const action = { type: 'ADD_ADDPAGE_INPUT', field: 'ingredients' };
    const stateAfter = { ingredients: ['e', 'f', ''], steps: ['g', 'h'] };

    expect(addForm(stateBefore, action)).toEqual(stateAfter);
  });
});

describe('REMOVE_ADDPAGE_INPUT', () => {
  const stateBefore = { ingredients: ['e', 'f', 'g'], steps: ['h', 'i', 'j'] };
  test('test REMOVE action', () => {
    const action = { type: 'REMOVE_ADDPAGE_INPUT', field: 'steps', index: 0 };
    const stateAfter = { ingredients: ['e', 'f', 'g'], steps: ['i', 'j'] };

    expect(addForm(stateBefore, action)).toEqual(stateAfter);
  });
});

describe('UPDATE_ADDPAGE_INPUT', () => {
    const stateBefore = {
      ingredients: ['a', 'b', 'c'],
      steps: ['a', 'b', 'c'],
      desc: 'boo',
      note: 'foo',
      whatever: 'heyhey',
      name: 'boo',
      price: '2',
      type: '0',
      season: '3'
    };
    test('test UPDATE action', () => {
      const field = 'name';
      const action = { type: 'UPDATE_ADDPAGE_INPUT', field, value: 'baa', index: 9999 };
      const stateAfter = { ...stateBefore, [field]: 'baa' };

      expect(addForm(stateBefore, action)).toEqual(stateAfter);
    });
});

describe('MOVE_ADDPAGE_INPUT', () => {
  const stateBefore = {
    ingredients: ['a', 'b', 'c'],
    steps: ['a', 'b', 'c'],
    desc: 'foo',
    note: 'bar',
    name: 'baz'
  };

  test('test MOVE action', () => {
    const field = 'ingredients';
    const action = { type: 'MOVE_ADDPAGE_INPUT', field, index: 1, dir: 'up' };
    const stateAfter = { ...stateBefore, [field]: ['b', 'a', 'c'] };

    expect(addForm(stateBefore, action)).toEqual(stateAfter);
  });
});

describe('ADD_RECIPE', () => {
  test('should reset all fields to default values', () => {
    const DEFAULT = {
      name: '',
      desc: '',
      ingredients: [''],
      steps: [''],
      prepTime: '20',
      cookingTime: '20',
      price: '1',
      type: '2',
      season: '0',
      servings: '2',
      note: '',
      img: false
    };
    const stateBefore = {
      name: 'foo',
      desc: 'bar',
      ingredients: ['a', 'b', 'c'],
      steps: ['d', 'e', 'f'],
      prepTime: '10',
      cookingTime: '40',
      price: '3',
      type: '1',
      season: '2',
      servings: '20',
      note: 'baz',
      img: true
    };
    const action = { type: 'ADD_RECIPE' };

    expect(addForm(stateBefore, action)).toEqual(DEFAULT);
  });
});

describe('CHANGE_ADD_RECIPE', () => {
  test('should replace the state with passed action.recipe', () => {
    const stateBefore = {
      name: 'foo',
      desc: 'bar',
      ingredients: ['z', 'y', 'x'],
      steps: ['w', 'v', 'u'],
      prepTime: '25',
      cookingTime: '15',
      price: '2',
      type: '2',
      season: '0',
      servings: '15',
      note: 'baz',
      img: false
    };
    const recipe = {
      name: 'boo',
      desc: 'baa',
      ingredients: ['hey', 'ho'],
      steps: ['hi', 'hu'],
      prepTime: '15',
      cookingTime: '20',
      price: '1',
      type: '0',
      season: '2',
      servings: '15',
      note: 'rrr',
      img: true
    };
    const action = { type: 'CHANGE_ADD_RECIPE', recipe };

    expect(addForm(stateBefore, action)).toEqual(recipe);
  });
});

// I am only testing a simple case for this selector since
// the underlying logic is already tested in commonSelectors.test
describe('getAddFormValidState', () => {
  test('test getAddFormValidState', () => {
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
    const actual = getAddFormValidState(state);
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
});
