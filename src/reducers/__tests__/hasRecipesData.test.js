import hasRecipesData from "../hasRecipesData";

describe("hasRecipesData", () => {
  test("unsupported action types should return state unchanged", () => {
    const stateBefore = false;
    const action = { type: "FOO_BAR" };

    expect(hasRecipesData(stateBefore, action)).toEqual(stateBefore);
  });
  test("SET_HAS_RECIPES_DATA action should update state", () => {
    const stateBefore = false;
    const action = { type: "SET_HAS_RECIPES_DATA", season: "2" };
    const stateAfter = true;

    expect(hasRecipesData(stateBefore, action)).toEqual(stateAfter);
  });
});
