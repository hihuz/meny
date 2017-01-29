// This reducer is temporary, it will be replaced when I implement actual auth

const username = (state = 'hihuz', action) => {
  switch (action.type) {
    case 'SET_USERNAME':
      return action.name;
    default:
      return state;
  }
};

export default username;
