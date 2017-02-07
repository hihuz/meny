import {
  addFormAddInput,
  addFormRemoveInput,
  addFormUpdateInput,
  mapArrayToObject
} from './';

describe('addFormAddInput', () => {
  test('should return an ADD_ADDFORM_INPUT action passing the name arg', () => {
    const action = { type: 'ADD_ADDFORM_INPUT', name: 'boo' };
    expect(addFormAddInput('boo')).toEqual(action);
  });
});

describe('addFormRemoveInput', () => {
  test('should return an REMOVE_ADDFORM_INPUT action with the correct index and name 1', () => {
    const index = 0, name = 'kewkew';
    const action = { type: 'REMOVE_ADDFORM_INPUT', index, name };
    expect(addFormRemoveInput({ index, name })).toEqual(action);
  });
  test('should return an REMOVE_ADDFORM_INPUT action with the correct index and name 2', () => {
    const index = 2, name = 'booboo';
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
    const index = 0, value = 'boo', name = 'heyyy';
    const action = { type: 'UPDATE_ADDFORM_INPUT', index, value, name };
    expect(addFormUpdateInput({ index, value, name })).toEqual(action);
  });
  test('should return an UPDATE_ADDFORM_INPUT action with correct index/value/name 2', () => {
    const index = 3, value = true, name = 'hiii'
    const action = { type: 'UPDATE_ADDFORM_INPUT', index, value, name };
    expect(addFormUpdateInput({ index, value, name })).toEqual(action);
  });
  test('should convert the string provided as index to a number', () => {
    const action = { type: 'UPDATE_ADDFORM_INPUT', index: 3, value: 'baa', name: 'boo' };
    expect(addFormUpdateInput({ index: '3', value: 'baa', name: 'boo'})).toEqual(action);
  });
});

describe('mapArrayToObject', () => {
  test('should convert the passed array to an obj with indexes as keys', () => {
    const actual = mapArrayToObject(['woof','meow','gibber','grunt']);
    const expected = {
      0: 'woof',
      1: 'meow',
      2: 'gibber',
      3: 'grunt'
    }
    expect(actual).toEqual(expected);
  });
});
