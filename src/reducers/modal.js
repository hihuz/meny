const DEFAULT = {
  opened: false,
};

const modal = (state = DEFAULT, action) => {
  switch (action.type) {
    case 'SHOW_MODAL':
      return { opened: true };
    case 'HIDE_MODAL':
      return { opened: false };
    default:
      return state;
  }
};

export default modal;
