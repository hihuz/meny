import addForm from '../addForm';

describe('addForm reducer', () => {
  test('ADD_ADDFORM_INPUT action should add an item to the corresponding list 1', () => {
    const stateBefore = { ingredients: ['a', 'b'], steps: ['c', 'd'] };
    const action = { type: 'ADD_ADDFORM_INPUT', name: 'ingredients' };
    const stateAfter = { ingredients: ['a', 'b', ''], steps: ['c', 'd'] };

    expect(addForm(stateBefore, action)).toEqual(stateAfter);
  });

  test('ADD_ADDFORM_INPUT action should add an item to the corresponding list 2', () => {
    const stateBefore = { ingredients: ['a', 'b'], steps: ['c', 'd'] };
    const action = { type: 'ADD_ADDFORM_INPUT', name: 'steps' };
    const stateAfter = { ingredients: ['a', 'b'], steps: ['c', 'd', ''] };

    expect(addForm(stateBefore, action)).toEqual(stateAfter);
  });

  test('ADD_ADDFORM_INPUT action should not add anything given an invalid list', () => {
    const stateBefore = { ingredients: ['a', 'b'], steps: ['c', 'd'] };
    const action = { type: 'ADD_ADDFORM_INPUT', name: 'ho' };
    const stateAfter = { ingredients: ['a', 'b'], steps: ['c', 'd'] };

    expect(addForm(stateBefore, action)).toEqual(stateAfter);
  });

  test('REMOVE_ADDFORM_INPUT action should remove an item, first position 1', () => {
    const stateBefore = { ingredients: ['a', 'b'], steps: ['c', 'd'] };
    const action = { type: 'REMOVE_ADDFORM_INPUT', name: 'ingredients', index: 0 };
    const stateAfter = { ingredients: ['b'], steps: ['c', 'd'] };

    expect(addForm(stateBefore, action)).toEqual(stateAfter);
  });

  test('REMOVE_ADDFORM_INPUT action should remove an item, first position 2', () => {
    const stateBefore = { ingredients: ['a', 'b'], steps: ['c', 'd'] };
    const action = { type: 'REMOVE_ADDFORM_INPUT', name: 'steps', index: 0 };
    const stateAfter = { ingredients: ['a', 'b'], steps: ['d'] };

    expect(addForm(stateBefore, action)).toEqual(stateAfter);
  });

  test('REMOVE_ADDFORM_INPUT action should remove an item, end position 1', () => {
    const stateBefore = { ingredients: ['a', 'b', 'c'], steps: ['d', 'e', 'f'] };
    const action = { type: 'REMOVE_ADDFORM_INPUT', name: 'ingredients', index: 2 };
    const stateAfter = { ingredients: ['a', 'b'], steps: ['d', 'e', 'f'] };

    expect(addForm(stateBefore, action)).toEqual(stateAfter);
  });

  test('REMOVE_ADDFORM_INPUT action should remove an item, end position 2', () => {
    const stateBefore = { ingredients: ['a', 'b', 'c'], steps: ['d', 'e', 'f'] };
    const action = { type: 'REMOVE_ADDFORM_INPUT', name: 'steps', index: 2 };
    const stateAfter = { ingredients: ['a', 'b', 'c'], steps: ['d', 'e'] };

    expect(addForm(stateBefore, action)).toEqual(stateAfter);
  });

  test('REMOVE_ADDFORM_INPUT action should remove an item, mid position 1', () => {
    const stateBefore = { ingredients: ['a', 'b', 'c'], steps: ['d', 'e', 'f'] };
    const action = { type: 'REMOVE_ADDFORM_INPUT', name: 'ingredients', index: 1 };
    const stateAfter = { ingredients: ['a', 'c'], steps: ['d', 'e', 'f'] };

    expect(addForm(stateBefore, action)).toEqual(stateAfter);
  });

  test('REMOVE_ADDFORM_INPUT action should remove an item, mid position 2', () => {
    const stateBefore = { ingredients: ['a', 'b', 'c'], steps: ['d', 'e', 'f'] };
    const action = { type: 'REMOVE_ADDFORM_INPUT', name: 'steps', index: 1 };
    const stateAfter = { ingredients: ['a', 'b', 'c'], steps: ['d', 'f'] };

    expect(addForm(stateBefore, action)).toEqual(stateAfter);
  });

  test('REMOVE_ADDFORM_INPUT action should not remove anything given an invalid list', () => {
    const stateBefore = { ingredients: ['a', 'b', 'c'], steps: ['d', 'e', 'f'] };
    const action = { type: 'REMOVE_ADDFORM_INPUT', name: 'hello', index: 1 };
    const stateAfter = { ingredients: ['a', 'b', 'c'], steps: ['d', 'e', 'f'] };

    expect(addForm(stateBefore, action)).toEqual(stateAfter);
  });

  test('UPDATE_ADDFORM_INPUT action with "name" name should update the name field', () => {
    const stateBefore = { ingredients: ['a', 'b', 'c'], whatever: 'heyhey', name: 'a' };
    const action = { type: 'UPDATE_ADDFORM_INPUT', name: 'name', value: 'boo', index: 9999 };
    const stateAfter = { ingredients: ['a', 'b', 'c'], whatever: 'heyhey', name: 'boo' };

    expect(addForm(stateBefore, action)).toEqual(stateAfter);
  });
});
