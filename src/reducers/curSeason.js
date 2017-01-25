const curSeason = (state = { season: 0, seasonText: '' }, action) => {
  switch (action.type) {
    case 'SET_CUR_SEASON':
      return { season: action.season, seasonText: action.seasonText }
    default:
      return state;
  }
};

export default curSeason;
