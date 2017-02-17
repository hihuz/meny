const curSeason = (state = '0', action) => {
  switch (action.type) {
    case 'SET_CUR_SEASON':
      return String(action.season);
    default:
      return state;
  }
};

export default curSeason;
