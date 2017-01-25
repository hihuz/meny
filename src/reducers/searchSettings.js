const DEFAULT = { season: 0, };

const searchSettings = (state = DEFAULT, action) => {
  switch (action.type) {
    case 'SET_SEASON_FILTER':
      return Object.assign({}, state, { season: action.season });
    default:
      return state;
  }
};

export default searchSettings;
