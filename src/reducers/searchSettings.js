// type property of orderBy is ltf (last to first) or ftl (first to last)
const DEFAULT = {
  season: 0,
  orderBy: 'name',
  orderType: 'ftl',
  recipeType: 0,
  name: true,
  desc: false,
  ingredients: false
};

const searchSettings = (state = DEFAULT, action) => {
  switch (action.type) {
    case 'SET_NAME_FILTER':
      return Object.assign({}, state, { name: action.value });
    case 'SET_DESC_FILTER':
      return Object.assign({}, state, { desc: action.value });
    case 'SET_INGREDIENTS_FILTER':
      return Object.assign({}, state, { ingredients: action.value });
    case 'SET_SEASON_FILTER':
      return Object.assign({}, state, { season: action.value });
    case 'SET_RECIPETYPE_FILTER':
      return Object.assign({}, state, { recipeType: action.value });
    case 'SET_ORDERBY_FILTER':
      return Object.assign({}, state, { orderBy: action.value });
    default:
      return state;
  }
};

export default searchSettings;
