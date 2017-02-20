import {
  addFormAddInput,
  addFormRemoveInput,
  addFormUpdateInput,
  mapArrayToObject,
  mapSnapToArray,
  getFullRecipeDataObject,
  getSearchDataObject,
  getFirebaseNewRecipeObject
} from './';

describe('addFormAddInput', () => {
  test('should return an ADD_ADDFORM_INPUT action passing the name arg', () => {
    const action = { type: 'ADD_ADDFORM_INPUT', name: 'boo' };
    expect(addFormAddInput('boo')).toEqual(action);
  });
});

describe('addFormRemoveInput', () => {
  test('should return an REMOVE_ADDFORM_INPUT action with the correct index and name 1', () => {
    const index = 0;
    const name = 'kewkew';
    const action = { type: 'REMOVE_ADDFORM_INPUT', index, name };
    expect(addFormRemoveInput({ index, name })).toEqual(action);
  });
  test('should return an REMOVE_ADDFORM_INPUT action with the correct index and name 2', () => {
    const index = 2;
    const name = 'booboo';
    const action = { type: 'REMOVE_ADDFORM_INPUT', index, name };
    expect(addFormRemoveInput({ index, name })).toEqual(action);
  });
  test('should convert the string provided as index to a number', () => {
    const action = { type: 'REMOVE_ADDFORM_INPUT', index: 2, name: 'hohoho' };
    expect(addFormRemoveInput({ index: '2', name: 'hohoho' })).toEqual(action);
  });
});

describe('addFormUpdateInput', () => {
  test('should return an UPDATE_ADDFORM_INPUT action with correct index/value/name 1', () => {
    const index = 0;
    const value = 'boo';
    const name = 'heyyy';
    const action = { type: 'UPDATE_ADDFORM_INPUT', index, value, name };
    expect(addFormUpdateInput({ index, value, name })).toEqual(action);
  });
  test('should return an UPDATE_ADDFORM_INPUT action with correct index/value/name 2', () => {
    const index = 3;
    const value = true;
    const name = 'hiii';
    const action = { type: 'UPDATE_ADDFORM_INPUT', index, value, name };
    expect(addFormUpdateInput({ index, value, name })).toEqual(action);
  });
  test('should convert the string provided as index to a number', () => {
    const action = { type: 'UPDATE_ADDFORM_INPUT', index: 3, value: 'baa', name: 'boo' };
    expect(addFormUpdateInput({ index: '3', value: 'baa', name: 'boo' })).toEqual(action);
  });
});

describe('mapArrayToObject', () => {
  test('should convert the passed array to an obj with indexes as keys', () => {
    const actual = mapArrayToObject(['woof', 'meow', 'gibber', 'grunt']);
    const expected = {
      0: 'woof',
      1: 'meow',
      2: 'gibber',
      3: 'grunt'
    };
    expect(actual).toEqual(expected);
  });
});

describe('mapSnapToArray', () => {
  test('should convert the passed object to an array of object, with keys as id', () => {
    const actual = mapSnapToArray({
      hoho: {
        type: '1',
        season: '0'
      },
      haha: {
        type: '2',
        season: '2'
      }
    });
    const expected = [
      {
        id: 'hoho',
        type: '1',
        season: '0'
      },
      {
        id: 'haha',
        season: '2',
        type: '2'
      }
    ];
    expect(actual).toEqual(expected);
  });

  test('should still work on an empty object', () => {
    const actual = mapSnapToArray({});
    const expected = [];
    expect(actual).toEqual(expected);
  });
});

// this function takes a recipe with 'ui' data and merges it
// with additional info needed in the database :
// author id, timestamp, mapped ingredients & steps
describe('getFullRecipeDataObject', () => {
  test('should merge the passed recipe with additionnal passed data', () => {
    const recipe = {
      a: 'b',
      ingredients: 'hi',
      steps: 'boo',
      c: 'd'
    };
    const author = 'hihuz';
    const stamp = new Date().getTime();
    const ingredients = ['hey', 'ho'];
    const steps = ['close eyes', 'sleep'];
    const actual = getFullRecipeDataObject({ recipe, author, stamp, ingredients, steps });
    const expected = {
      a: 'b',
      ingredients,
      steps,
      c: 'd',
      author,
      created: stamp,
      updated: stamp,
      rating: null
    };
    expect(actual).toEqual(expected);
  });
});

describe('getSearchDataObject', () => {
  test('', () => {
    const recipe = {
      a: 'b',
      desc: 'hey',
      img: false,
      name: 'blah',
      season: '0',
      type: '1',
      ingredients: 'hi',
      c: 'd'
    };
    const stamp = new Date().getTime();
    const ingredients = ['hey', 'ho'];
    const actual = getSearchDataObject({ recipe, stamp, ingredients });
    const expected = {
      desc: 'hey',
      img: false,
      name: 'blah',
      season: '0',
      type: '1',
      ingredients,
      updated: stamp
    };
    expect(actual).toEqual(expected);
  });
});
