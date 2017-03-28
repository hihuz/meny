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
  const action = { type: 'FOO_BAR', name: 'desc', value: 'boo', index: 1 };

  expect(addForm(stateBefore, action)).toEqual(stateBefore);
});

describe('ADD_ADDPAGE_INPUT action', () => {
  const stateBefore = { ingredients: ['a', 'b'], steps: ['c', 'd'] };
  test('should add an item to the corresponding list 1', () => {
    const action = { type: 'ADD_ADDPAGE_INPUT', name: 'ingredients' };
    const stateAfter = { ingredients: ['a', 'b', ''], steps: ['c', 'd'] };

    expect(addForm(stateBefore, action)).toEqual(stateAfter);
  });
  test('should add an item to the corresponding list 2', () => {
    const action = { type: 'ADD_ADDPAGE_INPUT', name: 'steps' };
    const stateAfter = { ingredients: ['a', 'b'], steps: ['c', 'd', ''] };

    expect(addForm(stateBefore, action)).toEqual(stateAfter);
  });
  test('should not add anything given an invalid list', () => {
    const action = { type: 'ADD_ADDPAGE_INPUT', name: 'ho' };
    const stateAfter = { ingredients: ['a', 'b'], steps: ['c', 'd'] };

    expect(addForm(stateBefore, action)).toEqual(stateAfter);
  });
});

describe('REMOVE_ADDPAGE_INPUT action', () => {
  const stateBefore = { ingredients: ['a', 'b', 'c'], steps: ['d', 'e', 'f'] };
  test('should remove an item, first position 1', () => {
    const action = { type: 'REMOVE_ADDPAGE_INPUT', name: 'ingredients', index: 0 };
    const stateAfter = { ingredients: ['b', 'c'], steps: ['d', 'e', 'f'] };

    expect(addForm(stateBefore, action)).toEqual(stateAfter);
  });
  test('should remove an item, first position 2', () => {
    const action = { type: 'REMOVE_ADDPAGE_INPUT', name: 'steps', index: 0 };
    const stateAfter = { ingredients: ['a', 'b', 'c'], steps: ['e', 'f'] };

    expect(addForm(stateBefore, action)).toEqual(stateAfter);
  });
  test('should remove an item, end position 1', () => {
    const action = { type: 'REMOVE_ADDPAGE_INPUT', name: 'ingredients', index: 2 };
    const stateAfter = { ingredients: ['a', 'b'], steps: ['d', 'e', 'f'] };

    expect(addForm(stateBefore, action)).toEqual(stateAfter);
  });
  test('should remove an item, end position 2', () => {
    const action = { type: 'REMOVE_ADDPAGE_INPUT', name: 'steps', index: 2 };
    const stateAfter = { ingredients: ['a', 'b', 'c'], steps: ['d', 'e'] };

    expect(addForm(stateBefore, action)).toEqual(stateAfter);
  });
  test('should remove an item, mid position 1', () => {
    const action = { type: 'REMOVE_ADDPAGE_INPUT', name: 'ingredients', index: 1 };
    const stateAfter = { ingredients: ['a', 'c'], steps: ['d', 'e', 'f'] };

    expect(addForm(stateBefore, action)).toEqual(stateAfter);
  });
  test('should remove an item, mid position 2', () => {
    const action = { type: 'REMOVE_ADDPAGE_INPUT', name: 'steps', index: 1 };
    const stateAfter = { ingredients: ['a', 'b', 'c'], steps: ['d', 'f'] };

    expect(addForm(stateBefore, action)).toEqual(stateAfter);
  });
  test('should not remove anything given an invalid list', () => {
    const action = { type: 'REMOVE_ADDPAGE_INPUT', name: 'hello', index: 1 };
    const stateAfter = { ingredients: ['a', 'b', 'c'], steps: ['d', 'e', 'f'] };

    expect(addForm(stateBefore, action)).toEqual(stateAfter);
  });
});

describe('UPDATE_ADDPAGE_INPUT action', () => {
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

  // I didn't want to duplicate all these tests.. I think it's fine to do a loop here
  ['name', 'desc', 'note'].forEach((field) => {
    test(`"${field}" name should update the ${field} field`, () => {
      const action = { type: 'UPDATE_ADDPAGE_INPUT', name: field, value: 'boo', index: 9999 };
      const stateAfter = Object.assign({}, stateBefore, { [field]: 'boo' });

      expect(addForm(stateBefore, action)).toEqual(stateAfter);
    });
    test(`should work w/o index provided for ${field} field`, () => {
      const action = { type: 'UPDATE_ADDPAGE_INPUT', name: field, value: 'bar' };
      const stateAfter = Object.assign({}, stateBefore, { [field]: 'bar' });

      expect(addForm(stateBefore, action)).toEqual(stateAfter);
    });
  });

  // I didn't want to duplicate all these tests.. I think it's fine to do a loop here
  ['ingredients', 'steps'].forEach((field) => {
    test(`"${field}" name should update at the provided index, start pos`, () => {
      const action = { type: 'UPDATE_ADDPAGE_INPUT', name: field, value: 'HO', index: 0 };
      const stateAfter = Object.assign({}, stateBefore, { [field]: ['HO', 'b', 'c'] });

      expect(addForm(stateBefore, action)).toEqual(stateAfter);
    });
    test(`"${field}" name should update at the provided index, mid pos`, () => {
      const action = { type: 'UPDATE_ADDPAGE_INPUT', name: field, value: 'HI', index: 1 };
      const stateAfter = Object.assign({}, stateBefore, { [field]: ['a', 'HI', 'c'] });

      expect(addForm(stateBefore, action)).toEqual(stateAfter);
    });
    test(`"${field}" name should update at the provided index, end pos`, () => {
      const action = { type: 'UPDATE_ADDPAGE_INPUT', name: field, value: 'HU', index: 2 };
      const stateAfter = Object.assign({}, stateBefore, { [field]: ['a', 'b', 'HU'] });

      expect(addForm(stateBefore, action)).toEqual(stateAfter);
    });
    test(`"${field}" name with no index should default to first index`, () => {
      const action = { type: 'UPDATE_ADDPAGE_INPUT', name: field, value: 'HU' };
      const stateAfter = Object.assign({}, stateBefore, { [field]: ['HU', 'b', 'c'] });

      expect(addForm(stateBefore, action)).toEqual(stateAfter);
    });
  });

  // I didn't want to duplicate all these tests.. I think it's fine to do a loop here
  ['prepTime', 'cookingTime', 'servings'].forEach((field) => {
    test(`"${field}" name should update ${field} field based off passed value`, () => {
      const action = { type: 'UPDATE_ADDPAGE_INPUT', name: field, value: '12', index: 1 };
      const stateAfter = Object.assign({}, stateBefore, { [field]: '12' });

      expect(addForm(stateBefore, action)).toEqual(stateAfter);
    });
    test(`"${field}" should not update if value is not a number`, () => {
      const action = { type: 'UPDATE_ADDPAGE_INPUT', name: field, value: 'boo', index: 1 };

      expect(addForm(stateBefore, action)).toEqual(stateBefore);
    });
    test(`"${field}" should not update if value is more than 3 characters`, () => {
      const action = { type: 'UPDATE_ADDPAGE_INPUT', name: field, value: '1234', index: 1 };

      expect(addForm(stateBefore, action)).toEqual(stateBefore);
    });
    test(`"${field}" should update even w/o index`, () => {
      const action = { type: 'UPDATE_ADDPAGE_INPUT', name: field, value: '9' };
      const stateAfter = Object.assign({}, stateBefore, { [field]: '9' });

      expect(addForm(stateBefore, action)).toEqual(stateAfter);
    });
  });

  // I didn't want to duplicate all these tests.. I think it's fine to do a loop here
  ['price', 'type', 'season'].forEach((field) => {
    test(`"${field}" name should update the ${field} field based off passed index`, () => {
      const action = { type: 'UPDATE_ADDPAGE_INPUT', name: field, index: 123 };
      const stateAfter = Object.assign({}, stateBefore, { [field]: '123' });

      expect(addForm(stateBefore, action)).toEqual(stateAfter);
    });
    test(`"${field}" name should update the ${field} field to 0 if no index passed`, () => {
      const action = { type: 'UPDATE_ADDPAGE_INPUT', name: field, };
      const stateAfter = Object.assign({}, stateBefore, { [field]: '0' });

      expect(addForm(stateBefore, action)).toEqual(stateAfter);
    });
  });

  test('should not change state if action name is invalid', () => {
    const action = { type: 'UPDATE_ADDPAGE_INPUT', name: 'test', value: 'boo' };

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

  // I didn't want to duplicate all these tests.. I think it's fine to do a loop here
  ['ingredients', 'steps'].forEach((field) => {
    test(`"${field}" name / "up" dir should move the specified index up (mid)`, () => {
      const action = { type: 'MOVE_ADDPAGE_INPUT', name: field, index: 1, dir: 'up' };
      const stateAfter = Object.assign({}, stateBefore, { [field]: ['b', 'a', 'c'] });

      expect(addForm(stateBefore, action)).toEqual(stateAfter);
    });
    test(`"${field}" name / "up" dir should move the specified index up (end)`, () => {
      const action = { type: 'MOVE_ADDPAGE_INPUT', name: field, index: 2, dir: 'up' };
      const stateAfter = Object.assign({}, stateBefore, { [field]: ['a', 'c', 'b'] });

      expect(addForm(stateBefore, action)).toEqual(stateAfter);
    });
    test(`"${field}" name / "up" with first index should have no effect`, () => {
      const action = { type: 'MOVE_ADDPAGE_INPUT', name: field, index: 0, dir: 'up' };

      expect(addForm(stateBefore, action)).toEqual(stateBefore);
    });
    test(`"${field}" name / "down" dir should move the specified index down (mid)`, () => {
      const action = { type: 'MOVE_ADDPAGE_INPUT', name: field, index: 1, dir: 'down' };
      const stateAfter = Object.assign({}, stateBefore, { [field]: ['a', 'c', 'b'] });

      expect(addForm(stateBefore, action)).toEqual(stateAfter);
    });
    test(`"${field}" name / "down" dir should move the specified index down (first)`, () => {
      const action = { type: 'MOVE_ADDPAGE_INPUT', name: field, index: 0, dir: 'down' };
      const stateAfter = Object.assign({}, stateBefore, { [field]: ['b', 'a', 'c'] });

      expect(addForm(stateBefore, action)).toEqual(stateAfter);
    });
    test(`"${field}" name / "down" with last index should have no effect`, () => {
      const action = { type: 'MOVE_ADDPAGE_INPUT', name: field, index: 2, dir: 'down' };

      expect(addForm(stateBefore, action)).toEqual(stateBefore);
    });
    test(`"${field}" name / invalid dir should act as "down" dir`, () => {
      const action = { type: 'MOVE_ADDPAGE_INPUT', name: field, index: 1, dir: 'foo' };
      const stateAfter = Object.assign({}, stateBefore, { [field]: ['a', 'c', 'b'] });

      expect(addForm(stateBefore, action)).toEqual(stateAfter);
    });
  });
  test('should return state if invalid name is passed in action', () => {
    const action = { type: 'MOVE_ADDPAGE_INPUT', name: 'blahblah', index: 1, dir: 'up' };

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

describe('getAddFormValidState', () => {
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
    const actual = getAddFormValidState(state);
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
    const actual = getAddFormValidState(state);
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
    const actual = getAddFormValidState(state);
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
