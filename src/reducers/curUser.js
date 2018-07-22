// This reducer is temporary, it will be replaced when I implement actual auth
const DEFAULT = {
  sn: "unknown",
  id: "unknown"
};
const curUser = (state = DEFAULT, action) => {
  switch (action.type) {
    case "SET_CUR_USER":
      return Object.assign(
        {},
        {
          sn: action.sn,
          id: action.id
        }
      );
    default:
      return state;
  }
};

export default curUser;
