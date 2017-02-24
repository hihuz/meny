const DEFAULT = {
  name: '',
  desc: '',
  ingredients: [''],
  steps: [''],
  prepTime: '20',
  cookingTime: '20',
  price: '1',
  type: '2',
  season: '0',
  servings: '2',
  note: '',
  img: false
};

// exported for tests
// having "name" as param is a bit confusing, I should change that to "field" or something
export function updateStateField(state, { name, value, index = 0 }) {
  switch (name) {
    case 'name':
    case 'desc':
    case 'note':
      return Object.assign({}, state, {
        [name]: value
      });
    case 'ingredients':
    case 'steps':
      return Object.assign({}, state, {
        [name]: [
          ...state[name].slice(0, index),
          value,
          ...state[name].slice(index + 1)
        ]
      });
    case 'prepTime':
    case 'cookingTime':
    case 'servings':
      if (/^\d*$/.test(value) && value.length <= 3) {
        return Object.assign({}, state, {
          [name]: value
        });
      }
      return state;
    case 'price':
    case 'type':
    case 'season':
      return Object.assign({}, state, {
        [name]: String(index)
      });
    default:
      return state;
  }
}
export function addStateField(state, { name }) {
  switch (name) {
    case 'ingredients':
    case 'steps':
      return Object.assign({}, state, {
        [name]: [...state[name], '']
      });
    default:
      return state;
  }
}
export function removeStateField(state, { name, index }) {
  switch (name) {
    case 'ingredients':
    case 'steps':
      return Object.assign({}, state, {
        [name]: [
          ...state[name].slice(0, index),
          ...state[name].slice(index + 1)
        ]
      });
    default:
      return state;
  }
}
export function moveStateField(state, { dir, name, index }) {
  switch (name) {
    case 'ingredients':
    case 'steps':
      // these two conditionnals below are to avoid bugs in case somehow up dir + index 0
      // or down dir + last index would be passed in an action
      // this should never happen though
      if (dir === 'up' && index === 0) {
        return state;
      } else if (dir === 'down' && index === state[name].length - 1) {
        return state;
      }
      return dir === 'up' ?
        Object.assign({}, state, {
          [name]: [
            ...state[name].slice(0, index - 1),
            state[name][index],
            state[name][index - 1],
            ...state[name].slice(index + 1)
          ]
        }) :
        Object.assign({}, state, {
          [name]: [
            ...state[name].slice(0, index),
            state[name][index + 1],
            state[name][index],
            ...state[name].slice(index + 2)
          ]
        });
    default:
      return state;
  }
}

const addForm = (state = DEFAULT, action) => {
  switch (action.type) {
    case 'UPDATE_ADDFORM_INPUT':
      return updateStateField(state, action);
    case 'ADD_ADDFORM_INPUT':
      return addStateField(state, action);
    case 'REMOVE_ADDFORM_INPUT':
      return removeStateField(state, action);
    case 'MOVE_ADDFORM_INPUT':
      return moveStateField(state, action);
    case 'ADD_RECIPE':
      // ADD_RECIPE should reset all fields to default
      return DEFAULT;
    default:
      return state;
  }
};

export default addForm;

export const getAddFormValidState = (state) => {
  const ingredients = state.ingredients
    .filter(ing => ing.length === 0)
    .length === 0;
  const steps = state.steps
    .filter(step => step.length === 0)
    .length === 0;
  const isNum = /^\d+$/;
  const validState = {
    name: state.name.length > 0,
    ingredients,
    steps,
    prepTime: isNum.test(state.prepTime),
    cookingTime: isNum.test(state.cookingTime),
    price: isNum.test(state.price),
    type: isNum.test(state.type),
    season: isNum.test(state.season),
    servings: isNum.test(state.servings)
  };
  const isValidState = Object.keys(validState)
    .map(key => validState[key])
    .filter(fieldState => !fieldState).length === 0;
  return Object.assign({}, validState, { isValidState });
};
