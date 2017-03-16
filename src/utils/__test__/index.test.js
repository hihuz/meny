import { mapArrayToObject } from '../index';

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
