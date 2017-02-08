const DEFAULT = {
  shown: false,
  msg: '',
  id: ''
}

const notification = (state = DEFAULT, action) => {
  switch(action.type) {
    case 'SHOW_NOTIFICATION':
      return {
        shown: true,
        msg: action.msg,
        id : action.id
      };
    case 'HIDE_NOTIFICATION':
      if (state.id === action.id) {
        return {
          shown: false,
        };
      }
    default:
      return state;
  }
};

export default notification;
