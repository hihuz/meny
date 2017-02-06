const DEFAULT = {
  name: "",
  desc: "",
  ingredients: [""],
  steps: [""],
  prepTime: "20",
  cookingTime: "20",
  price: null,
  type: null,
  season: 0,
  servings: "2",
  note: "",
  img: false
};

// exported for tests
export function updateStateField(state, { name, value, index }) {
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
      if (!isNaN(value) && value.length <= 3) {
        return Object.assign({}, state, {
          [name]: value
        });
      }
      return state;
    case 'price':
    case 'type':
    case 'season':
      return Object.assign({}, state, {
        [name]: index
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

const addForm = (state = DEFAULT, action) => {
  switch (action.type) {
    case 'UPDATE_ADDFORM_INPUT':
      return updateStateField(state, action);
    case 'ADD_ADDFORM_INPUT':
      return addStateField(state, action);
    case 'REMOVE_ADDFORM_INPUT':
      return removeStateField(state, action);
    default:
      return state;
  }
};

export default addForm;

export const getIngValidState = (state) => state.ingredients
  .filter((ing) => ing.length === 0)
  .length > 0;
export const getStepsValidState = (state) => state.steps
  .filter((step) => step.length === 0)
  .length > 0;
export const getAddFormValidState = (state) => {
  const ingredients = state.ingredients
    .filter((ing) => ing.length === 0)
    .length === 0;
  const steps = state.steps
    .filter((step) => step.length === 0)
    .length === 0;
  const validState = {
    name: state.name.length > 0,
    ingredients,
    steps,
    prepTime: !isNaN(state.prepTime),
    cookingTime: !isNaN(state.cookingTime),
    price: state.price !== null,
    type: state.type !== null,
    season: state.season !== null,
    servings: !isNaN(state.servings)
  };
  console.log(validState);
  const isValidState = Object.keys(validState)
    .map(key => validState[key])
    .filter(fieldState => !fieldState).length === 0;
  return Object.assign({}, validState, { isValidState });
};
