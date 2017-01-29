// This reducer is temporary, it will be replaced when I implement actual auth

const users = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_USERS':
      return action.users;
    default:
      return state;
  }
};

export default users;
