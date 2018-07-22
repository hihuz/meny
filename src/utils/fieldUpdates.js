// These functions are used in a few reducers so I extracted them here
// File structure may not be optimal and subject to be updated

export function updateStateField(state, { field, value, index = 0 }) {
  switch (field) {
    case "name":
    case "desc":
    case "note":
      return Object.assign({}, state, {
        [field]: value
      });
    case "ingredients":
    case "steps":
      return Object.assign({}, state, {
        [field]: [...state[field].slice(0, index), value, ...state[field].slice(index + 1)]
      });
    case "prepTime":
    case "cookingTime":
    case "servings":
      if (/^\d*$/.test(value) && value.length <= 3) {
        return Object.assign({}, state, {
          [field]: value
        });
      }
      return state;
    case "price":
    case "type":
    case "season":
      return Object.assign({}, state, {
        [field]: String(index)
      });
    default:
      return state;
  }
}
export function addStateField(state, { field }) {
  switch (field) {
    case "ingredients":
    case "steps":
      return Object.assign({}, state, {
        [field]: [...state[field], ""]
      });
    default:
      return state;
  }
}
export function removeStateField(state, { field, index }) {
  switch (field) {
    case "ingredients":
    case "steps":
      return Object.assign({}, state, {
        [field]: [...state[field].slice(0, index), ...state[field].slice(index + 1)]
      });
    default:
      return state;
  }
}
export function moveStateField(state, { dir, field, index }) {
  switch (field) {
    case "ingredients":
    case "steps":
      // these two conditionnals below are to avoid bugs in case somehow up dir + index 0
      // or down dir + last index would be passed in an action
      // this should never happen though
      if (dir === "up" && index === 0) {
        return state;
      } else if (dir === "down" && index === state[field].length - 1) {
        return state;
      }
      return dir === "up"
        ? Object.assign({}, state, {
            [field]: [
              ...state[field].slice(0, index - 1),
              state[field][index],
              state[field][index - 1],
              ...state[field].slice(index + 1)
            ]
          })
        : Object.assign({}, state, {
            [field]: [
              ...state[field].slice(0, index),
              state[field][index + 1],
              state[field][index],
              ...state[field].slice(index + 2)
            ]
          });
    default:
      return state;
  }
}
