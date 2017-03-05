// These functions are used in a few reducers so I extracted them here
// File structure may not be optimal and subject to be updated

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
