import { sortByName, sortByDate } from '../sortMethods';

describe('sortByName', () => {
  test('should return -1 if first param name prop is < second param name prop', () => {
    const a = { name: 'hihuz' };
    const b = { name: 'typhon' };
    const actual = sortByName(a, b);
    const expected = -1;
    expect(actual).toEqual(expected);
  });
  test('should return 1 if first param name prop is > second param name prop', () => {
    const a = { name: 'typhon' };
    const b = { name: 'hihuz' };
    const actual = sortByName(a, b);
    const expected = 1;
    expect(actual).toEqual(expected);
  });
  test('should return 1 if first param name prop is == second param name prop', () => {
    const a = { name: 'typhon' };
    const b = { name: 'typhon' };
    const actual = sortByName(a, b);
    const expected = 1;
    expect(actual).toEqual(expected);
  });
});

describe('sortByDate', () => {
  test('should return the difference between 2 object updated prop 1', () => {
    const a = { updated: 1234 };
    const b = { updated: 1233 };
    const actual = sortByDate(a, b);
    const expected = 1;
    expect(actual).toEqual(expected);
  });
  test('should return the difference between 2 object updated prop 2', () => {
    const a = { updated: 99 };
    const b = { updated: 110 };
    const actual = sortByDate(a, b);
    const expected = -11;
    expect(actual).toEqual(expected);
  });
  test('should return the difference between 2 object updated prop 2', () => {
    const a = { updated: 5 };
    const b = { updated: 5 };
    const actual = sortByDate(a, b);
    const expected = 0;
    expect(actual).toEqual(expected);
  });
});
