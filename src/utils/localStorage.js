const loadState = () => {
  try {
    const addForm = localStorage.getItem('addForm');
    const curUser = localStorage.getItem('curUser');
    if (addForm === null) {
      return undefined;
    }
    return Object.assign({}, JSON.parse(addForm), JSON.parse(curUser));
  } catch (err) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('addForm', serializedState);
  } catch (err) {
    // add later
  }
};

export { loadState, saveState };
