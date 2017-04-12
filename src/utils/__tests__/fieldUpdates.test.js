import {
  updateStateField,
  addStateField,
  removeStateField,
  moveStateField
} from '../fieldUpdates';

describe('updateStateField', () => {
  const stateBefore = {
    ingredients: ['a', 'b', 'c'],
    steps: ['a', 'b', 'c'],
    desc: 'boo',
    note: 'foo',
    whatever: 'heyhey',
    name: 'hello',
    price: '2',
    type: '0',
    season: '3'
  };

  // here I am looping for some tests since they should have exactly the same signature
  ['name', 'desc', 'note'].forEach((field) => {
    test(`"${field}" should update the ${field} state field`, () => {
      const value = 'baa';
      const index = 9999;
      const expected = { ...stateBefore, [field]: value };
      const actual = updateStateField(stateBefore, { field, value, index });

      expect(actual).toEqual(expected);
    });
    test(`should work w/o index provided for ${field} field`, () => {
      const value = 'bar';
      const expected = { ...stateBefore, [field]: value };
      const actual = updateStateField(stateBefore, { field, value });

      expect(actual).toEqual(expected);
    });
  });

  ['ingredients', 'steps'].forEach((field) => {
    test(`"${field}" should update at the provided index, start pos`, () => {
      const value = 'HO';
      const index = 0;
      const expected = { ...stateBefore, [field]: ['HO', 'b', 'c'] };
      const actual = updateStateField(stateBefore, { field, value, index });

      expect(actual).toEqual(expected);
    });
    test(`"${field}" should update at the provided index, mid pos`, () => {
      const value = 'HI';
      const index = 1;
      const expected = { ...stateBefore, [field]: ['a', 'HI', 'c'] };
      const actual = updateStateField(stateBefore, { field, value, index });

      expect(actual).toEqual(expected);
    });
    test(`"${field}" should update at the provided index, end pos`, () => {
      const value = 'HU';
      const index = 2;
      const expected = { ...stateBefore, [field]: ['a', 'b', 'HU'] };
      const actual = updateStateField(stateBefore, { field, value, index });

      expect(actual).toEqual(expected);
    });
    test(`"${field}" with no index should default to first index`, () => {
      const value = 'HU';
      const expected = { ...stateBefore, [field]: ['HU', 'b', 'c'] };
      const actual = updateStateField(stateBefore, { field, value });

      expect(actual).toEqual(expected);
    });
  });

  ['prepTime', 'cookingTime', 'servings'].forEach((field) => {
    test(`"${field}" should update ${field} field based off passed value`, () => {
      const value = '12';
      const index = 1;
      const expected = { ...stateBefore, [field]: value };
      const actual = updateStateField(stateBefore, { field, value, index });

      expect(actual).toEqual(expected);
    });
    test(`"${field}" should not update if value is not a number`, () => {
      const value = 'boo';
      const index = 1;
      const actual = updateStateField(stateBefore, { field, value, index })
      ;
      expect(actual).toEqual(stateBefore);
    });
    test(`"${field}" should not update if value is more than 3 characters`, () => {
      const value = '1234';
      const index = 1;
      const actual = updateStateField(stateBefore, { field, value, index });

      expect(actual).toEqual(stateBefore);
    });
    test(`"${field}" should update even w/o index`, () => {
      const value = '9';
      const expected = { ...stateBefore, [field]: value };
      const actual = updateStateField(stateBefore, { field, value });

      expect(actual).toEqual(expected);
    });
  });

  ['price', 'type', 'season'].forEach((field) => {
    test(`"${field}" should update the ${field} field based off passed index`, () => {
      const actual = updateStateField(stateBefore, { field, index: 123 });
      const expected = { ...stateBefore, [field]: '123' };

      expect(actual).toEqual(expected);
    });
    test(`"${field}" should update the ${field} field to 0 if no index passed`, () => {
      const actual = updateStateField(stateBefore, { field });
      const expected = { ...stateBefore, [field]: '0' };

      expect(actual).toEqual(expected);
    });
  });

  test('should not change state if action field is invalid', () => {
    const field = 'test';
    const value = 'boo';
    const index = 1;
    const actual = updateStateField(stateBefore, { field, value, index });

    expect(actual).toEqual(stateBefore);
  });
});

describe('addStateField', () => {
  const stateBefore = { ingredients: ['a', 'b'], steps: ['c', 'd'] };

  test('should add an item to the corresponding list 1', () => {
    const field = 'ingredients';
    const actual = addStateField(stateBefore, { field });
    const expected = { ingredients: ['a', 'b', ''], steps: ['c', 'd'] };

    expect(actual).toEqual(expected);
  });
  test('should add an item to the corresponding list 2', () => {
    const field = 'steps';
    const actual = addStateField(stateBefore, { field });
    const expected = { ingredients: ['a', 'b'], steps: ['c', 'd', ''] };

    expect(actual).toEqual(expected);
  });
  test('should not add anything given an invalid list', () => {
    const field = 'ho';
    const actual = addStateField(stateBefore, { field });

    expect(actual).toEqual(stateBefore);
  });
});

describe('removeStateField', () => {
  const stateBefore = { ingredients: ['a', 'b', 'c'], steps: ['d', 'e', 'f'] };

  test('should remove an item, first position 1', () => {
    const field = 'ingredients';
    const index = 0;
    const actual = removeStateField(stateBefore, { field, index });
    const expected = { ingredients: ['b', 'c'], steps: ['d', 'e', 'f'] };

    expect(actual).toEqual(expected);
  });
  test('should remove an item, first position 2', () => {
    const field = 'steps';
    const index = 0;
    const actual = removeStateField(stateBefore, { field, index });
    const expected = { ingredients: ['a', 'b', 'c'], steps: ['e', 'f'] };

    expect(actual).toEqual(expected);
  });
  test('should remove an item, end position 1', () => {
    const field = 'ingredients';
    const index = 2;
    const actual = removeStateField(stateBefore, { field, index });
    const expected = { ingredients: ['a', 'b'], steps: ['d', 'e', 'f'] };

    expect(actual).toEqual(expected);
  });
  test('should remove an item, end position 2', () => {
    const field = 'steps';
    const index = 2;
    const actual = removeStateField(stateBefore, { field, index });
    const expected = { ingredients: ['a', 'b', 'c'], steps: ['d', 'e'] };

    expect(actual).toEqual(expected);
  });
  test('should remove an item, mid position 1', () => {
    const field = 'ingredients';
    const index = 1;
    const actual = removeStateField(stateBefore, { field, index });
    const expected = { ingredients: ['a', 'c'], steps: ['d', 'e', 'f'] };

    expect(actual).toEqual(expected);
  });
  test('should remove an item, mid position 2', () => {
    const field = 'steps';
    const index = 1;
    const actual = removeStateField(stateBefore, { field, index });
    const expected = { ingredients: ['a', 'b', 'c'], steps: ['d', 'f'] };

    expect(actual).toEqual(expected);
  });
  test('should not remove anything given an invalid list', () => {
    const field = 'hello';
    const index = 1;
    const actual = removeStateField(stateBefore, { field, index });
    const expected = { ingredients: ['a', 'b', 'c'], steps: ['d', 'e', 'f'] };

    expect(actual).toEqual(expected);
  });
});

describe('moveStateField', () => {
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
      const index = 1;
      const dir = 'up';
      const actual = moveStateField(stateBefore, { field, index, dir });
      const expected = { ...stateBefore, [field]: ['b', 'a', 'c'] };

      expect(actual).toEqual(expected);
    });
    test(`"${field}" / "up" dir should move the specified index up (end)`, () => {
      const index = 2;
      const dir = 'up';
      const actual = moveStateField(stateBefore, { field, index, dir });
      const expected = { ...stateBefore, [field]: ['a', 'c', 'b'] };

      expect(actual).toEqual(expected);
    });
    test(`"${field}" / "up" with first index should have no effect`, () => {
      const index = 0;
      const dir = 'up';
      const actual = moveStateField(stateBefore, { field, index, dir });

      expect(actual).toEqual(stateBefore);
    });
    test(`"${field}" / "down" dir should move the specified index down (mid)`, () => {
      const index = 1;
      const dir = 'down';
      const actual = moveStateField(stateBefore, { field, index, dir });
      const expected = { ...stateBefore, [field]: ['a', 'c', 'b'] };

      expect(actual).toEqual(expected);
    });
    test(`"${field}" / "down" dir should move the specified index down (first)`, () => {
      const index = 0;
      const dir = 'down';
      const actual = moveStateField(stateBefore, { field, index, dir });
      const expected = { ...stateBefore, [field]: ['b', 'a', 'c'] };

      expect(actual).toEqual(expected);
    });
    test(`"${field}" / "down" with last index should have no effect`, () => {
      const index = 2;
      const dir = 'down';
      const actual = moveStateField(stateBefore, { field, index, dir });

      expect(actual).toEqual(stateBefore);
    });
    test(`"${field}" / invalid dir should act as "down" dir`, () => {
      const index = 1;
      const dir = 'foo';
      const actual = moveStateField(stateBefore, { field, index, dir });
      const expected = { ...stateBefore, [field]: ['a', 'c', 'b'] };

      expect(actual).toEqual(expected);
    });
  });
  test('should return state if invalid field is passed in action', () => {
    const index = 1;
    const dir = 'up';
    const actual = moveStateField(stateBefore, { field: 'blah', index, dir });

    expect(actual).toEqual(stateBefore);
  });
});
