import curSeason from '../curSeason';

describe('curSeason', () => {
  test('unsupported action types should return state unchanged', () => {
    const stateBefore = '1';
    const action = { type: 'FOO_BAR', season: '2' };

    expect(curSeason(stateBefore, action)).toEqual(stateBefore);
  });
  test('SET_CUR_SEASON action should update state with given season', () => {
    const stateBefore = '1';
    const action = { type: 'SET_CUR_SEASON', season: '2' };
    const stateAfter = '2';

    expect(curSeason(stateBefore, action)).toEqual(stateAfter);
  });
});
