// This reducer is temporary, it will be replaced when I implement actual auth

const curUser = (state = 'unknown', action) => {
  switch (action.type) {
    case 'SET_CUR_USER':
      return action.name;
    default:
      return state;
  }
};

export default curUser;
