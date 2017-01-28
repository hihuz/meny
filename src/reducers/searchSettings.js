// type property of orderBy is ltf (last to first) or ftl (first to last)
const DEFAULT = {
  season: 0,
  orderBy: {
    by: 'name',
    type: 'ftl'
  }
};

const searchSettings = (state = DEFAULT, action) => {
  switch (action.type) {
    case 'SET_SEASON_FILTER':
      return Object.assign({}, state, { season: action.season });
    case 'SET_ORDER_BY':
      return Object.assign({}, state, { orderBy: action.orderBy});
    default:
      return state;
  }
};

export default searchSettings;
