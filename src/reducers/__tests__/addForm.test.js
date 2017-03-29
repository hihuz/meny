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
  const stateBefore = { ingredients: ['a', 'b'], steps: ['c', 'd'] };
  test('should add an item to the corresponding list 1', () => {
    const action = { type: 'ADD_ADDPAGE_INPUT', field: 'ingredients' };
    const stateAfter = { ingredients: ['a', 'b', ''], steps: ['c', 'd'] };

    expect(addForm(stateBefore, action)).toEqual(stateAfter);
  });
  test('should add an item to the corresponding list 2', () => {
    const action = { type: 'ADD_ADDPAGE_INPUT', field: 'steps' };
    const stateAfter = { ingredients: ['a', 'b'], steps: ['c', 'd', ''] };

    expect(addForm(stateBefore, action)).toEqual(stateAfter);
  });
  test('should not add anything given an invalid list', () => {
    const action = { type: 'ADD_ADDPAGE_INPUT', field: 'ho' };
    const stateAfter = { ingredients: ['a', 'b'], steps: ['c', 'd'] };

    expect(addForm(stateBefore, action)).toEqual(stateAfter);
  });
});

describe('REMOVE_ADDPAGE_INPUT', () => {
  const stateBefore = { ingredients: ['a', 'b', 'c'], steps: ['d', 'e', 'f'] };
  test('should remove an item, first position 1', () => {
    const action = { type: 'REMOVE_ADDPAGE_INPUT', field: 'ingredients', index: 0 };
    const stateAfter = { ingredients: ['b', 'c'], steps: ['d', 'e', 'f'] };

    expect(addForm(stateBefore, action)).toEqual(stateAfter);
  });
  test('should remove an item, first position 2', () => {
    const action = { type: 'REMOVE_ADDPAGE_INPUT', field: 'steps', index: 0 };
    const stateAfter = { ingredients: ['a', 'b', 'c'], steps: ['e', 'f'] };

    expect(addForm(stateBefore, action)).toEqual(stateAfter);
  });
  test('should remove an item, end position 1', () => {
    const action = { type: 'REMOVE_ADDPAGE_INPUT', field: 'ingredients', index: 2 };
    const stateAfter = { ingredients: ['a', 'b'], steps: ['d', 'e', 'f'] };

    expect(addForm(stateBefore, action)).toEqual(stateAfter);
  });
  test('should remove an item, end position 2', () => {
    const action = { type: 'REMOVE_ADDPAGE_INPUT', field: 'steps', index: 2 };
    const stateAfter = { ingredients: ['a', 'b', 'c'], steps: ['d', 'e'] };

    expect(addForm(stateBefore, action)).toEqual(stateAfter);
  });
  test('should remove an item, mid position 1', () => {
    const action = { type: 'REMOVE_ADDPAGE_INPUT', field: 'ingredients', index: 1 };
    const stateAfter = { ingredients: ['a', 'c'], steps: ['d', 'e', 'f'] };

    expect(addForm(stateBefore, action)).toEqual(stateAfter);
  });
  test('should remove an item, mid position 2', () => {
    const action = { type: 'REMOVE_ADDPAGE_INPUT', field: 'steps', index: 1 };
    const stateAfter = { ingredients: ['a', 'b', 'c'], steps: ['d', 'f'] };

    expect(addForm(stateBefore, action)).toEqual(stateAfter);
  });
  test('should not remove anything given an invalid list', () => {
    const action = { type: 'REMOVE_ADDPAGE_INPUT', field: 'hello', index: 1 };
    const stateAfter = { ingredients: ['a', 'b', 'c'], steps: ['d', 'e', 'f'] };

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
    name: '1',
    price: '2',
    type: '0',
    season: '3'
  };

  // here I am looping for some tests since they should have exactly the same signature
  ['name', 'desc', 'note'].forEach((field) => {
    test(`"${field}" should update the ${field} field`, () => {
      const action = { type: 'UPDATE_ADDPAGE_INPUT', field, value: 'baa', index: 9999 };
      const stateAfter = Object.assign({}, stateBefore, { [field]: 'baa' });

      expect(addForm(stateBefore, action)).toEqual(stateAfter);
    });
    test(`should work w/o index provided for ${field} field`, () => {
      const action = { type: 'UPDATE_ADDPAGE_INPUT', field, value: 'bar' };
      const stateAfter = Object.assign({}, stateBefore, { [field]: 'bar' });

      expect(addForm(stateBefore, action)).toEqual(stateAfter);
    });
  });

  ['ingredients', 'steps'].forEach((field) => {
    test(`"${field}" should update at the provided index, start pos`, () => {
      const action = { type: 'UPDATE_ADDPAGE_INPUT', field, value: 'HO', index: 0 };
      const stateAfter = Object.assign({}, stateBefore, { [field]: ['HO', 'b', 'c'] });

      expect(addForm(stateBefore, action)).toEqual(stateAfter);
    });
    test(`"${field}" should update at the provided index, mid pos`, () => {
      const action = { type: 'UPDATE_ADDPAGE_INPUT', field, value: 'HI', index: 1 };
      const stateAfter = Object.assign({}, stateBefore, { [field]: ['a', 'HI', 'c'] });

      expect(addForm(stateBefore, action)).toEqual(stateAfter);
    });
    test(`"${field}" should update at the provided index, end pos`, () => {
      const action = { type: 'UPDATE_ADDPAGE_INPUT', field, value: 'HU', index: 2 };
      const stateAfter = Object.assign({}, stateBefore, { [field]: ['a', 'b', 'HU'] });

      expect(addForm(stateBefore, action)).toEqual(stateAfter);
    });
    test(`"${field}" with no index should default to first index`, () => {
      const action = { type: 'UPDATE_ADDPAGE_INPUT', field, value: 'HU' };
      const stateAfter = Object.assign({}, stateBefore, { [field]: ['HU', 'b', 'c'] });

      expect(addForm(stateBefore, action)).toEqual(stateAfter);
    });
  });

  ['prepTime', 'cookingTime', 'servings'].forEach((field) => {
    test(`"${field}" should update ${field} field based off passed value`, () => {
      const action = { type: 'UPDATE_ADDPAGE_INPUT', field, value: '12', index: 1 };
      const stateAfter = Object.assign({}, stateBefore, { [field]: '12' });

      expect(addForm(stateBefore, action)).toEqual(stateAfter);
    });
    test(`"${field}" should not update if value is not a number`, () => {
      const action = { type: 'UPDATE_ADDPAGE_INPUT', field, value: 'boo', index: 1 };

      expect(addForm(stateBefore, action)).toEqual(stateBefore);
    });
    test(`"${field}" should not update if value is more than 3 characters`, () => {
      const action = { type: 'UPDATE_ADDPAGE_INPUT', field, value: '1234', index: 1 };

      expect(addForm(stateBefore, action)).toEqual(stateBefore);
    });
    test(`"${field}" should update even w/o index`, () => {
      const action = { type: 'UPDATE_ADDPAGE_INPUT', field, value: '9' };
      const stateAfter = Object.assign({}, stateBefore, { [field]: '9' });

      expect(addForm(stateBefore, action)).toEqual(stateAfter);
    });
  });

  ['price', 'type', 'season'].forEach((field) => {
    test(`"${field}" should update the ${field} field based off passed index`, () => {
      const action = { type: 'UPDATE_ADDPAGE_INPUT', field, index: 123 };
      const stateAfter = Object.assign({}, stateBefore, { [field]: '123' });

      expect(addForm(stateBefore, action)).toEqual(stateAfter);
    });
    test(`"${field}" should update the ${field} field to 0 if no index passed`, () => {
      const action = { type: 'UPDATE_ADDPAGE_INPUT', field, };
      const stateAfter = Object.assign({}, stateBefore, { [field]: '0' });

      expect(addForm(stateBefore, action)).toEqual(stateAfter);
    });
  });

  test('should not change state if action field is invalid', () => {
    const action = { type: 'UPDATE_ADDPAGE_INPUT', field: 'test', value: 'boo' };

    expect(addForm(stateBefore, action)).toEqual(stateBefore);
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

  // here I am looping for some tests since they should have exactly the same signature
  ['ingredients', 'steps'].forEach((field) => {
    test(`"${field}" / "up" dir should move the specified index up (mid)`, () => {
      const action = { type: 'MOVE_ADDPAGE_INPUT', field, index: 1, dir: 'up' };
      const stateAfter = Object.assign({}, stateBefore, { [field]: ['b', 'a', 'c'] });

      expect(addForm(stateBefore, action)).toEqual(stateAfter);
    });
    test(`"${field}" / "up" dir should move the specified index up (end)`, () => {
      const action = { type: 'MOVE_ADDPAGE_INPUT', field, index: 2, dir: 'up' };
      const stateAfter = Object.assign({}, stateBefore, { [field]: ['a', 'c', 'b'] });

      expect(addForm(stateBefore, action)).toEqual(stateAfter);
    });
    test(`"${field}" / "up" with first index should have no effect`, () => {
      const action = { type: 'MOVE_ADDPAGE_INPUT', field, index: 0, dir: 'up' };

      expect(addForm(stateBefore, action)).toEqual(stateBefore);
    });
    test(`"${field}" / "down" dir should move the specified index down (mid)`, () => {
      const action = { type: 'MOVE_ADDPAGE_INPUT', field, index: 1, dir: 'down' };
      const stateAfter = Object.assign({}, stateBefore, { [field]: ['a', 'c', 'b'] });

      expect(addForm(stateBefore, action)).toEqual(stateAfter);
    });
    test(`"${field}" / "down" dir should move the specified index down (first)`, () => {
      const action = { type: 'MOVE_ADDPAGE_INPUT', field, index: 0, dir: 'down' };
      const stateAfter = Object.assign({}, stateBefore, { [field]: ['b', 'a', 'c'] });

      expect(addForm(stateBefore, action)).toEqual(stateAfter);
    });
    test(`"${field}" / "down" with last index should have no effect`, () => {
      const action = { type: 'MOVE_ADDPAGE_INPUT', field, index: 2, dir: 'down' };

      expect(addForm(stateBefore, action)).toEqual(stateBefore);
    });
    test(`"${field}" / invalid dir should act as "down" dir`, () => {
      const action = { type: 'MOVE_ADDPAGE_INPUT', field, index: 1, dir: 'foo' };
      const stateAfter = Object.assign({}, stateBefore, { [field]: ['a', 'c', 'b'] });

      expect(addForm(stateBefore, action)).toEqual(stateAfter);
    });
  });
  test('should return state if invalid field is passed in action', () => {
    const action = { type: 'MOVE_ADDPAGE_INPUT', field: 'blahblah', index: 1, dir: 'up' };

    expect(addForm(stateBefore, action)).toEqual(stateBefore);
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
