const DEFAULT = {
  shown: false,
  msg: '',
  id: ''
}

const notifications = (state = DEFAULT, action) => {
  switch(action.type) {
    case 'SHOW_NOTIFICATION': {
      console.log(action.msg);
      return {
        shown: true,
        msg: action.msg,
        id : action.id
      };
    }
    case 'HIDE_NOTIFICATION': {
      if (state.id === action.id) {
        console.log("HIDE NOTIF");
        return {
          shown: false,
        }
      }
    }
    default:
      return state;
  }
};
