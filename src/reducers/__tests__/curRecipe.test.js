import curRecipe, { getCurRecipe, getCurRecipeValidState } from "../curRecipe";

test("unsupported action types should return state unchanged", () => {
  const stateBefore = {
    ingredients: ["a", "b", "c"],
    steps: ["a", "b", "c"],
    desc: "boo",
    note: "foo",
    name: "1",
    price: "2",
    type: "0",
    season: "3",
    servings: "2",
    cookingTime: "15",
    prepTime: "20",
    img: false
  };

  const action = { type: "FOO_BAR", field: "desc", value: "boo", index: 1 };

  expect(curRecipe(stateBefore, action)).toEqual(stateBefore);
});

// I am only testing a simple case for each of these actions since
// the underlying logic is already tested in fieldUpdates.test
describe("ADD_EDITPAGE_INPUT", () => {
  const stateBefore = { ingredients: ["e", "f"], steps: ["g", "h"] };
  test("test ADD action", () => {
    const action = { type: "ADD_EDITPAGE_INPUT", field: "ingredients" };
    const stateAfter = { ingredients: ["e", "f", ""], steps: ["g", "h"] };

    expect(curRecipe(stateBefore, action)).toEqual(stateAfter);
  });
});

describe("REMOVE_EDITPAGE_INPUT", () => {
  const stateBefore = { ingredients: ["e", "f", "g"], steps: ["h", "i", "j"] };
  test("test REMOVE action", () => {
    const action = { type: "REMOVE_EDITPAGE_INPUT", field: "steps", index: 0 };
    const stateAfter = { ingredients: ["e", "f", "g"], steps: ["i", "j"] };

    expect(curRecipe(stateBefore, action)).toEqual(stateAfter);
  });
});

describe("UPDATE_EDITPAGE_INPUT", () => {
  const stateBefore = {
    ingredients: ["a", "b", "c"],
    steps: ["a", "b", "c"],
    desc: "boo",
    note: "foo",
    whatever: "heyhey",
    name: "boo",
    price: "2",
    type: "0",
    season: "3"
  };
  test("test UPDATE action", () => {
    const field = "name";
    const action = { type: "UPDATE_EDITPAGE_INPUT", field, value: "baa", index: 9999 };
    const stateAfter = { ...stateBefore, [field]: "baa" };

    expect(curRecipe(stateBefore, action)).toEqual(stateAfter);
  });
});

describe("MOVE_EDITPAGE_INPUT", () => {
  const stateBefore = {
    ingredients: ["a", "b", "c"],
    steps: ["a", "b", "c"],
    desc: "foo",
    note: "bar",
    name: "baz"
  };

  test("test MOVE action", () => {
    const field = "ingredients";
    const action = { type: "MOVE_EDITPAGE_INPUT", field, index: 1, dir: "up" };
    const stateAfter = { ...stateBefore, [field]: ["b", "a", "c"] };

    expect(curRecipe(stateBefore, action)).toEqual(stateAfter);
  });
});

describe("CHANGE_CUR_RECIPE", () => {
  test("should replace the state with passed action.recipe", () => {
    const stateBefore = {
      name: "foo",
      desc: "bar",
      ingredients: ["z", "y", "x"],
      steps: ["w", "v", "u"],
      prepTime: "25",
      cookingTime: "15",
      price: "2",
      type: "2",
      season: "0",
      servings: "15",
      note: "baz",
      img: false
    };
    const recipe = {
      name: "boo",
      desc: "baa",
      ingredients: ["hey", "ho"],
      steps: ["hi", "hu"],
      prepTime: "15",
      cookingTime: "20",
      price: "1",
      type: "0",
      season: "2",
      servings: "15",
      note: "rrr",
      img: true
    };
    const action = { type: "CHANGE_CUR_RECIPE", recipe };

    expect(curRecipe(stateBefore, action)).toEqual(recipe);
  });
});

describe("getCurRecipe", () => {
  test("should simply return state", () => {
    const state = {
      foo: "bar",
      hi: "hu"
    };
    const actual = getCurRecipe(state);
    const expected = state;
    expect(actual).toEqual(expected);
  });
});

// I am only testing a simple case for this selector since
// the underlying logic is already tested in commonSelectors.test
describe("getCurRecipeValidState", () => {
  test("test getCurRecipeValidState", () => {
    const state = {
      name: "",
      desc: "",
      ingredients: ["a", "", "c"],
      steps: ["d", "e", ""],
      prepTime: "a",
      cookingTime: "b",
      price: "c",
      type: "d",
      season: "e",
      servings: "",
      note: "",
      img: true
    };
    const actual = getCurRecipeValidState(state);
    const expected = {
      name: false,
      ingredients: false,
      steps: false,
      prepTime: false,
      cookingTime: false,
      price: false,
      type: false,
      season: false,
      servings: false,
      isValidState: false
    };

    expect(actual).toEqual(expected);
  });
});
