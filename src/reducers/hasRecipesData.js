const hasRecipesData = (state = false, action) => {
  switch (action.type) {
    case 'SET_HAS_RECIPES_DATA':
      return true;
    default:
      return state;
  }
};

export default hasRecipesData;
