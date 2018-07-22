const DEFAULT = {
  shown: false,
  config: {
    title: "",
    left: {
      path: "",
      text: ""
    },
    right: {
      path: "",
      text: ""
    }
  }
};

const transition = (state = DEFAULT, action) => {
  switch (action.type) {
    case "SHOW_TRANSITION":
      return {
        shown: true,
        config: action.config
      };
    case "HIDE_TRANSITION":
      return Object.assign({}, state, { shown: false });
    default:
      return state;
  }
};

export default transition;
