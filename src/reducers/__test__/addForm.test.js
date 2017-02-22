import addForm from '../addForm';

describe('ADD_ADDFORM_INPUT action', () => {
  test('should add an item to the corresponding list 1', () => {
    const stateBefore = { ingredients: ['a', 'b'], steps: ['c', 'd'] };
    const action = { type: 'ADD_ADDFORM_INPUT', name: 'ingredients' };
    const stateAfter = { ingredients: ['a', 'b', ''], steps: ['c', 'd'] };

    expect(addForm(stateBefore, action)).toEqual(stateAfter);
  });

  test('should add an item to the corresponding list 2', () => {
    const stateBefore = { ingredients: ['a', 'b'], steps: ['c', 'd'] };
    const action = { type: 'ADD_ADDFORM_INPUT', name: 'steps' };
    const stateAfter = { ingredients: ['a', 'b'], steps: ['c', 'd', ''] };

    expect(addForm(stateBefore, action)).toEqual(stateAfter);
  });

  test('should not add anything given an invalid list', () => {
    const stateBefore = { ingredients: ['a', 'b'], steps: ['c', 'd'] };
    const action = { type: 'ADD_ADDFORM_INPUT', name: 'ho' };
    const stateAfter = { ingredients: ['a', 'b'], steps: ['c', 'd'] };

    expect(addForm(stateBefore, action)).toEqual(stateAfter);
  });
});

describe('REMOVE_ADDFORM_INPUT action', () => {
  test('should remove an item, first position 1', () => {
    const stateBefore = { ingredients: ['a', 'b'], steps: ['c', 'd'] };
    const action = { type: 'REMOVE_ADDFORM_INPUT', name: 'ingredients', index: 0 };
    const stateAfter = { ingredients: ['b'], steps: ['c', 'd'] };

    expect(addForm(stateBefore, action)).toEqual(stateAfter);
  });

  test('should remove an item, first position 2', () => {
    const stateBefore = { ingredients: ['a', 'b'], steps: ['c', 'd'] };
    const action = { type: 'REMOVE_ADDFORM_INPUT', name: 'steps', index: 0 };
    const stateAfter = { ingredients: ['a', 'b'], steps: ['d'] };

    expect(addForm(stateBefore, action)).toEqual(stateAfter);
  });

  test('should remove an item, end position 1', () => {
    const stateBefore = { ingredients: ['a', 'b', 'c'], steps: ['d', 'e', 'f'] };
    const action = { type: 'REMOVE_ADDFORM_INPUT', name: 'ingredients', index: 2 };
    const stateAfter = { ingredients: ['a', 'b'], steps: ['d', 'e', 'f'] };

    expect(addForm(stateBefore, action)).toEqual(stateAfter);
  });

  test('should remove an item, end position 2', () => {
    const stateBefore = { ingredients: ['a', 'b', 'c'], steps: ['d', 'e', 'f'] };
    const action = { type: 'REMOVE_ADDFORM_INPUT', name: 'steps', index: 2 };
    const stateAfter = { ingredients: ['a', 'b', 'c'], steps: ['d', 'e'] };

    expect(addForm(stateBefore, action)).toEqual(stateAfter);
  });

  test('should remove an item, mid position 1', () => {
    const stateBefore = { ingredients: ['a', 'b', 'c'], steps: ['d', 'e', 'f'] };
    const action = { type: 'REMOVE_ADDFORM_INPUT', name: 'ingredients', index: 1 };
    const stateAfter = { ingredients: ['a', 'c'], steps: ['d', 'e', 'f'] };

    expect(addForm(stateBefore, action)).toEqual(stateAfter);
  });

  test('should remove an item, mid position 2', () => {
    const stateBefore = { ingredients: ['a', 'b', 'c'], steps: ['d', 'e', 'f'] };
    const action = { type: 'REMOVE_ADDFORM_INPUT', name: 'steps', index: 1 };
    const stateAfter = { ingredients: ['a', 'b', 'c'], steps: ['d', 'f'] };

    expect(addForm(stateBefore, action)).toEqual(stateAfter);
  });

  test('should not remove anything given an invalid list', () => {
    const stateBefore = { ingredients: ['a', 'b', 'c'], steps: ['d', 'e', 'f'] };
    const action = { type: 'REMOVE_ADDFORM_INPUT', name: 'hello', index: 1 };
    const stateAfter = { ingredients: ['a', 'b', 'c'], steps: ['d', 'e', 'f'] };

    expect(addForm(stateBefore, action)).toEqual(stateAfter);
  });
});
describe('UPDATE_ADDFORM_INPUT action', () => {
  test('"name" name should update the name field', () => {
    const stateBefore = { ingredients: ['a', 'b', 'c'], whatever: 'heyhey', name: 'a' };
    const action = { type: 'UPDATE_ADDFORM_INPUT', name: 'name', value: 'boo', index: 9999 };
    const stateAfter = { ingredients: ['a', 'b', 'c'], whatever: 'heyhey', name: 'boo' };

    expect(addForm(stateBefore, action)).toEqual(stateAfter);
  });

  test('"desc" name should update the desc field', () => {
    const stateBefore = { ingredients: ['a', 'b', 'c'], desc: 'heyhey', name: 'b' };
    const action = { type: 'UPDATE_ADDFORM_INPUT', name: 'desc', value: 'hoho', index: 123 };
    const stateAfter = { ingredients: ['a', 'b', 'c'], desc: 'hoho', name: 'b' };

    expect(addForm(stateBefore, action)).toEqual(stateAfter);
  });

  test('"note" name should update the note field', () => {
    const stateBefore = { ingredients: ['a', 'b', 'c'], note: 'foo', blah: 'a' };
    const action = { type: 'UPDATE_ADDFORM_INPUT', name: 'note', value: 'bar', index: 456 };
    const stateAfter = { ingredients: ['a', 'b', 'c'], note: 'bar', blah: 'a' };

    expect(addForm(stateBefore, action)).toEqual(stateAfter);
  });

  test('should work w/o index provided for name/desc/note fields 1', () => {
    const stateBefore = { ingredients: ['a', 'b', 'c'], name: 'foo', blah: 'a' };
    const action = { type: 'UPDATE_ADDFORM_INPUT', name: 'name', value: 'bar' };
    const stateAfter = { ingredients: ['a', 'b', 'c'], name: 'bar', blah: 'a' };

    expect(addForm(stateBefore, action)).toEqual(stateAfter);
  });

  test('should work w/o index provided for name/desc/note fields 2', () => {
    const stateBefore = { steps: ['a', 'b', 'c'], note: 'foo', blah: 'a' };
    const action = { type: 'UPDATE_ADDFORM_INPUT', name: 'note', value: 'bar' };
    const stateAfter = { steps: ['a', 'b', 'c'], note: 'bar', blah: 'a' };

    expect(addForm(stateBefore, action)).toEqual(stateAfter);
  });

  test('should work w/o index provided for name/desc/note fields 3', () => {
    const stateBefore = { test: ['a', 'b', 'c'], desc: 'foo', blah: 'a' };
    const action = { type: 'UPDATE_ADDFORM_INPUT', name: 'desc', value: 'bar' };
    const stateAfter = { test: ['a', 'b', 'c'], desc: 'bar', blah: 'a' };

    expect(addForm(stateBefore, action)).toEqual(stateAfter);
  });

  test('"ingredients" name should update at the provided index, start pos', () => {
    const stateBefore = { ingredients: ['a', 'b', 'c'], desc: 'foo', steps: ['d', 'e', 'f'] };
    const action = { type: 'UPDATE_ADDFORM_INPUT', name: 'ingredients', value: 'HO', index: 0 };
    const stateAfter = { ingredients: ['HO', 'b', 'c'], desc: 'foo', steps: ['d', 'e', 'f'] };

    expect(addForm(stateBefore, action)).toEqual(stateAfter);
  });

  test('"ingredients" name should update at the provided index, mid pos', () => {
    const stateBefore = { ingredients: ['a', 'b', 'c'], desc: 'foo', steps: ['d', 'e', 'f'] };
    const action = { type: 'UPDATE_ADDFORM_INPUT', name: 'ingredients', value: 'HI', index: 1 };
    const stateAfter = { ingredients: ['a', 'HI', 'c'], desc: 'foo', steps: ['d', 'e', 'f'] };

    expect(addForm(stateBefore, action)).toEqual(stateAfter);
  });

  test('"ingredients" name should update at the provided index, end pos', () => {
    const stateBefore = { ingredients: ['a', 'b', 'c'], desc: 'foo', steps: ['d', 'e', 'f'] };
    const action = { type: 'UPDATE_ADDFORM_INPUT', name: 'ingredients', value: 'HU', index: 2 };
    const stateAfter = { ingredients: ['a', 'b', 'HU'], desc: 'foo', steps: ['d', 'e', 'f'] };

    expect(addForm(stateBefore, action)).toEqual(stateAfter);
  });

  test('"ingredients" name with no index should default to first index', () => {
    const stateBefore = { ingredients: ['a', 'b', 'c'], desc: 'foo', steps: ['d', 'e', 'f'] };
    const action = { type: 'UPDATE_ADDFORM_INPUT', name: 'ingredients', value: 'HU' };
    const stateAfter = { ingredients: ['HU', 'b', 'c'], desc: 'foo', steps: ['d', 'e', 'f'] };

    expect(addForm(stateBefore, action)).toEqual(stateAfter);
  });

  test('"steps" name should update at the provided index, start pos', () => {
    const stateBefore = { ingredients: ['a', 'b', 'c'], desc: 'foo', steps: ['d', 'e', 'f'] };
    const action = { type: 'UPDATE_ADDFORM_INPUT', name: 'steps', value: 'hey', index: 0 };
    const stateAfter = { ingredients: ['a', 'b', 'c'], desc: 'foo', steps: ['hey', 'e', 'f'] };

    expect(addForm(stateBefore, action)).toEqual(stateAfter);
  });

  test('"steps" name should update at the provided index, mid pos', () => {
    const stateBefore = { ingredients: ['a', 'b', 'c'], desc: 'foo', steps: ['d', 'e', 'f'] };
    const action = { type: 'UPDATE_ADDFORM_INPUT', name: 'steps', value: 'ho', index: 1 };
    const stateAfter = { ingredients: ['a', 'b', 'c'], desc: 'foo', steps: ['d', 'ho', 'f'] };

    expect(addForm(stateBefore, action)).toEqual(stateAfter);
  });

  test('"steps" name should update at the provided index, end pos', () => {
    const stateBefore = { ingredients: ['a', 'b', 'c'], desc: 'foo', steps: ['d', 'e', 'f'] };
    const action = { type: 'UPDATE_ADDFORM_INPUT', name: 'steps', value: 'lets go', index: 2 };
    const stateAfter = { ingredients: ['a', 'b', 'c'], desc: 'foo', steps: ['d', 'e', 'lets go'] };

    expect(addForm(stateBefore, action)).toEqual(stateAfter);
  });

  test('"steps" name with no index should default to first index', () => {
    const stateBefore = { ingredients: ['a', 'b', 'c'], desc: 'foo', steps: ['d', 'e', 'f'] };
    const action = { type: 'UPDATE_ADDFORM_INPUT', name: 'steps', value: 'boo' };
    const stateAfter = { ingredients: ['a', 'b', 'c'], desc: 'foo', steps: ['boo', 'e', 'f'] };

    expect(addForm(stateBefore, action)).toEqual(stateAfter);
  });
});
