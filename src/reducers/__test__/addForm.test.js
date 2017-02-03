import addForm from '../addForm';

describe('addForm reducer', () => {
  test('ADD_INGREDIENT action should add an ingredient', () => {
    const stateBefore = { ingredients: ["a", "b"] };
    const action = { type: 'ADD_INGREDIENT' };
    const stateAfter = { ingredients: ["a", "b", ""] };

    expect(addForm(stateBefore, action)).toEqual(stateAfter);
  });

  test('REMOVE_INGREDIENT action should remove an ingredient, first position', () => {
    const stateBefore = { ingredients: ["a", "b"] };
    const action = { type: 'REMOVE_INGREDIENT', index: 0 };
    const stateAfter = { ingredients: ["b"] };

    expect(addForm(stateBefore, action)).toEqual(stateAfter);
  });

  test('REMOVE_INGREDIENT action should remove an ingredient, end position', () => {
    const stateBefore = { ingredients: ["a", "b", "c"] };
    const action = { type: 'REMOVE_INGREDIENT', index: 2 };
    const stateAfter = { ingredients: ["a", "b"] };

    expect(addForm(stateBefore, action)).toEqual(stateAfter);
  });

  test('REMOVE_INGREDIENT action should remove an ingredient, mid position', () => {
    const stateBefore = { ingredients: ["a", "b", "c"] };
    const action = { type: 'REMOVE_INGREDIENT', index: 1 };
    const stateAfter = { ingredients: ["a", "c"] };

    expect(addForm(stateBefore, action)).toEqual(stateAfter);
  });

  test('CHANGE_INGREDIENT action should update the provided index with the provided value', () => {
    const stateBefore = { ingredients: ["a", "b", "c"] };
    const action = { type: 'CHANGE_INGREDIENT', index: 1, value: "boo" };
    const stateAfter = { ingredients: ["a", "boo", "c"] };

    expect(addForm(stateBefore, action)).toEqual(stateAfter);
  });
});
