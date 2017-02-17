// type property of orderType is ltf (last to first) or ftl (first to last)
const DEFAULT = {
  orderBy: 'name',
  orderType: 'ftl'
};

const recipesOrdering = (state = DEFAULT, action) => {
  switch (action.type) {
    case 'SET_ORDERBY_FILTER':
      return Object.assign({}, state, { orderBy: action.value });
    case 'SET_ORDERTYPE_FILTER':
      return Object.assign({}, state, { orderType: action.value });
    default:
      return state;
  }
};

export default recipesOrdering;
