const featured = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_FEATURED':
      return action.featured;
    default:
      return state;
  }
};

export default featured;
