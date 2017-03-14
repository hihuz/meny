import searchTerm from '../searchTerm';

describe('searchTerm', () => {
  test('unsupported action types should return state unchanged', () => {
    const stateBefore = 'boo';
    const action = { type: 'FOO_BAR', searchTerm: 'bah' };

    expect(searchTerm(stateBefore, action)).toEqual(stateBefore);
  });
  test('SET_SEARCH_TERM action should update state with given searchTerm', () => {
    const stateBefore = 'boo';
    const action = { type: 'SET_SEARCH_TERM', searchTerm: 'bah' };
    const stateAfter = 'bah';

    expect(searchTerm(stateBefore, action)).toEqual(stateAfter);
  });
});
