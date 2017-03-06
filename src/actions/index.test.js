import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  addFormInput,
  removeFormInput,
  updateFormInput,
  moveFormInput,
  mapArrayToObject,
  mapSnapToArray,
  getFullRecipeDataObject,
  getSearchDataObject,
  getFirebaseNewRecipeObject,
  addRecipeToStore,
  showTransition,
  hideTransition,
  showNotification,
  hideNotification,
  notify,
  setSearchFilter,
  setCurSeason,
  setSearchTerm,
  setCurUser,
  setHasRecipesData
} from './';

// this mock redux store will be used to test async action creators
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// this will mock native timer functions for the following tests
jest.useFakeTimers();

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
  test('should convert the passed object to an array of object, with keys as id & index', () => {
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
        season: '0',
        index: 0
      },
      {
        id: 'haha',
        season: '2',
        type: '2',
        index: 1
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
  test('should return an object with only search fields', () => {
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

describe('getFirebaseNewRecipeObject', () => {
  test('should return an object formatted for firebase updates', () => {
    const input = {
      key: 'hi',
      recipeData: 'test1',
      searchData: 'test2',
      userid: 'hihuz'
    };
    const actual = getFirebaseNewRecipeObject(input);
    const expected = {
      '/recipes/hi': 'test1',
      '/recipesSearch/hi': 'test2',
      '/recipeVotes/hi': null,
      '/userRecipes/hihuz/hi': true
    };
    expect(actual).toEqual(expected);
  });
});

describe('addRecipeToStore', () => {
  test('should return an ADD_RECIPE action with param as recipe prop', () => {
    const action = { type: 'ADD_RECIPE', recipe: 'test' };
    expect(addRecipeToStore('test')).toEqual(action);
  });

  test('should pass object param as prop too', () => {
    const action = { type: 'ADD_RECIPE', recipe: { a: 'b', c: 0 } };
    expect(addRecipeToStore({ a: 'b', c: 0 })).toEqual(action);
  });
});

describe('showTransition', () => {
  test('should return an SHOW_TRANSITION action with param as config prop', () => {
    const action = { type: 'SHOW_TRANSITION', config: 'boo' };
    expect(showTransition('boo')).toEqual(action);
  });

  test('should pass object param as prop too', () => {
    const action = { type: 'SHOW_TRANSITION', config: { a: 1, c: 'd' } };
    expect(showTransition({ a: 1, c: 'd' })).toEqual(action);
  });
});

describe('hideTransition', () => {
  test('should return a plain HIDE_TRANSITION action', () => {
    const action = { type: 'HIDE_TRANSITION' };
    expect(hideTransition()).toEqual(action);
  });
});

describe('showNotification', () => {
  test('should return an SHOW_NOTIFICATION action with msg and id params as props', () => {
    const action = { type: 'SHOW_NOTIFICATION', id: 123, msg: 'boo' };
    expect(showNotification({ id: 123, msg: 'boo' })).toEqual(action);
  });
});

describe('hideNotification', () => {
  test('should return a HIDE_NOTIFICATION action with id param as props', () => {
    const action = { type: 'HIDE_NOTIFICATION', id: 456 };
    expect(hideNotification(456)).toEqual(action);
  });
});

describe('notify', () => {
  test('should dispatch showNotification and hideNotification (after delay) actions', () => {
    const id = new Date().getTime();
    const expectedActions = [
      { type: 'SHOW_NOTIFICATION', msg: 'hello', id },
      { type: 'HIDE_NOTIFICATION', id }
    ];
    const store = mockStore({});
    store.dispatch(notify('hello', id));
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('should call a setTimeout of 4000 on hideNotification', () => {
    notify('hello', new Date().getTime());
    expect(setTimeout.mock.calls.length).toBe(1);
    expect(setTimeout.mock.calls[0][1]).toBe(4000);
  });
});

describe('setSearchFilter', () => {
  test('should return a SET_*_FILTER action based on passed name and value 1', () => {
    const action = { type: 'SET_BOO_FILTER', value: 1 };
    expect(setSearchFilter({ name: 'boo', value: 1 })).toEqual(action);
  });

  test('should return a SET_*_FILTER action based on passed name and value 2', () => {
    const action = { type: 'SET_HI_FILTER', value: 'hu' };
    expect(setSearchFilter({ name: 'hi', value: 'hu' })).toEqual(action);
  });
});

describe('setCurSeason', () => {
  test('should return a SET_CUR_SEASON action with estimated season', () => {
    const curMonth = new Date().getMonth() + 1;
    let season;
    if (curMonth <= 3) {
      season = 1;
    } else if (curMonth >= 4 && curMonth <= 6) {
      season = 2;
    } else if (curMonth >= 7 && curMonth <= 9) {
      season = 3;
    } else if (curMonth >= 10) {
      season = 4;
    }
    const action = { type: 'SET_CUR_SEASON', season };
    expect(setCurSeason()).toEqual(action);
  });
});

describe('setSearchTerm', () => {
  test('should return an SET_SEARCH_TERM action with value params passed as searchTerm', () => {
    const action = { type: 'SET_SEARCH_TERM', searchTerm: 'test' };
    expect(setSearchTerm('test')).toEqual(action);
  });
});

describe('setCurUser', () => {
  test('should return an SET_CUR_USER action with params obj passed as id/sn', () => {
    const action = { type: 'SET_CUR_USER', id: 789, sn: 'hihuz' };
    expect(setCurUser({ id: 789, sn: 'hihuz' })).toEqual(action);
  });
});

describe('setHasRecipesData', () => {
  test('should return a plain SET_HAS_RECIPES_DATA action', () => {
    const action = { type: 'SET_HAS_RECIPES_DATA' };
    expect(setHasRecipesData()).toEqual(action);
  });
});

describe('addFormInput', () => {
  test('should return an ADD_ADDPAGE_INPUT action passing the name arg', () => {
    const name = 'boo';
    const action = { type: 'ADD_ADDPAGE_INPUT', name };
    expect(addFormInput({ name, type: 'add' })).toEqual(action);
  });

  test('should return an ADD_EDITPAGE_INPUT action passing the name arg', () => {
    const name = 'buu';
    const action = { type: 'ADD_EDITPAGE_INPUT', name };
    expect(addFormInput({ name, type: 'edit' })).toEqual(action);
  });

  test ('should pass a recipeIndex param if provided', () => {
    const name = 'baa';
    const recipeIndex = 7;
    const action = { type: 'ADD_EDITPAGE_INPUT', name, recipeIndex };
    expect(addFormInput({ name, type: 'edit', recipeIndex })).toEqual(action);
  });
});

describe('removeFormInput', () => {
  test('should return a REMOVE_ADDPAGE_INPUT action with the correct index and name 1', () => {
    const index = 0;
    const name = 'kewkew';
    const action = { type: 'REMOVE_ADDPAGE_INPUT', index, name };
    expect(removeFormInput({ index, name, type: 'add' })).toEqual(action);
  });
  test('should return a REMOVE_ADDPAGE_INPUT action with the correct index and name 2', () => {
    const index = 2;
    const name = 'booboo';
    const action = { type: 'REMOVE_ADDPAGE_INPUT', index, name };
    expect(removeFormInput({ index, name, type: 'add' })).toEqual(action);
  });
  test('should convert the string provided as index to a number', () => {
    const name = 'hohoho';
    const action = { type: 'REMOVE_ADDPAGE_INPUT', index: 2, name };
    expect(removeFormInput({ index: '2', name, type: 'add' })).toEqual(action);
  });
  test('should return a REMOVE_EDITPAGE_INPUT action with the correct index and name', () => {
    const index = 8;
    const name = 'booboo';
    const action = { type: 'REMOVE_EDITPAGE_INPUT', index, name };
    expect(removeFormInput({ index, name, type: 'edit' })).toEqual(action);
  });
  test('should pass a recipeIndex param if provided', () => {
    const index = 8;
    const name = 'booboo';
    const recipeIndex = 95;
    const action = { type: 'REMOVE_EDITPAGE_INPUT', index, name, recipeIndex };
    expect(removeFormInput({ index, name, type: 'edit', recipeIndex })).toEqual(action);
  });
});

describe('updateFormInput', () => {
  test('should return an UPDATE_ADDPAGE_INPUT action with correct index/value/name 1', () => {
    const index = 0;
    const value = 'boo';
    const name = 'heyyy';
    const action = { type: 'UPDATE_ADDPAGE_INPUT', index, value, name };
    expect(updateFormInput({ index, value, name, type: 'add' })).toEqual(action);
  });
  test('should return an UPDATE_ADDPAGE_INPUT action with correct index/value/name 2', () => {
    const index = 3;
    const value = true;
    const name = 'hiii';
    const action = { type: 'UPDATE_ADDPAGE_INPUT', index, value, name };
    expect(updateFormInput({ index, value, name, type: 'add' })).toEqual(action);
  });
  test('should convert the string provided as index to a number', () => {
    const value = 'baa';
    const name = 'boo';
    const action = { type: 'UPDATE_ADDPAGE_INPUT', index: 3, value, name };
    expect(updateFormInput({ index: '3', value, name, type: 'add' })).toEqual(action);
  });
  test('should return an UPDATE_EDITPAGE_INPUT action with correct index/value/name 2', () => {
    const index = 3;
    const value = 123;
    const name = 'hooo';
    const action = { type: 'UPDATE_EDITPAGE_INPUT', index, value, name };
    expect(updateFormInput({ index, value, name, type: 'edit' })).toEqual(action);
  });
  test('should pass a recipeIndex param if provided', () => {
    const index = 1;
    const value = 45;
    const name = 'santa';
    const recipeIndex = 5;
    const action = { type: 'UPDATE_EDITPAGE_INPUT', index, value, name, recipeIndex };
    expect(updateFormInput({ index, value, name, type: 'edit', recipeIndex })).toEqual(action);
  });
});

describe('moveFormInput', () => {
  test('should return an MOVE_ADDPAGE_INPUT action with correct index/name/dir 1', () => {
    const index = 1;
    const name = 'ingredients';
    const dir = 'up';
    const action = { type: 'MOVE_ADDPAGE_INPUT', index, name, dir };
    expect(moveFormInput({ index, name, dir, type: 'add' })).toEqual(action);
  });
  test('should return an MOVE_ADDPAGE_INPUT action with correct index/name/dir 2', () => {
    const index = 2;
    const name = 'steps';
    const dir = 'down';
    const action = { type: 'MOVE_ADDPAGE_INPUT', index, name, dir };
    expect(moveFormInput({ index, name, dir, type: 'add' })).toEqual(action);
  });
  test('should return an MOVE_EDITPAGE_INPUT action with correct index/name/dir', () => {
    const index = 3;
    const name = 'steps';
    const dir = 'down';
    const action = { type: 'MOVE_EDITPAGE_INPUT', index, name, dir };
    expect(moveFormInput({ index, name, dir, type: 'edit' })).toEqual(action);
  });
  test('should pass a recipeIndex param if provided', () => {
    const index = 4;
    const name = 'steps';
    const dir = 'up';
    const recipeIndex = 9;
    const action = { type: 'MOVE_EDITPAGE_INPUT', index, name, dir, recipeIndex };
    expect(moveFormInput({ index, name, dir, type: 'edit', recipeIndex })).toEqual(action);
  });
  test('should convert the string provided as index to a number', () => {
    const action = { type: 'MOVE_ADDPAGE_INPUT', index: 3, name: 'hi', dir: 'up' };
    expect(moveFormInput({ index: '3', name: 'hi', dir: 'up', type: 'add' })).toEqual(action);
  });
});
