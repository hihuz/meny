import searchSettings from "../searchSettings";

const stateBefore = {
  season: "0",
  type: "0",
  name: true,
  desc: false,
  ingredients: false
};

describe("searchSettings", () => {
  test("unsupported action types should return state unchanged", () => {
    const action = { type: "FOO_BAR", value: false };

    expect(searchSettings(stateBefore, action)).toEqual(stateBefore);
  });
  test("SET_NAME_FILTER action should the name field with passed value", () => {
    const action = { type: "SET_NAME_FILTER", value: false };
    const stateAfter = { ...stateBefore, name: false };

    expect(searchSettings(stateBefore, action)).toEqual(stateAfter);
  });
  test("SET_DESC_FILTER action should the desc field with passed value", () => {
    const action = { type: "SET_DESC_FILTER", value: true };
    const stateAfter = { ...stateBefore, desc: true };

    expect(searchSettings(stateBefore, action)).toEqual(stateAfter);
  });
  test("SET_INGREDIENTS_FILTER action should the ingredients field with passed value", () => {
    const action = { type: "SET_INGREDIENTS_FILTER", value: true };
    const stateAfter = { ...stateBefore, ingredients: true };

    expect(searchSettings(stateBefore, action)).toEqual(stateAfter);
  });
  test("SET_SEASON_FILTER action should the season field with passed value", () => {
    const action = { type: "SET_SEASON_FILTER", value: "2" };
    const stateAfter = { ...stateBefore, season: "2" };

    expect(searchSettings(stateBefore, action)).toEqual(stateAfter);
  });
  test("SET_RECIPETYPE_FILTER action should the type field with passed value", () => {
    const action = { type: "SET_RECIPETYPE_FILTER", value: "3" };
    const stateAfter = { ...stateBefore, type: "3" };

    expect(searchSettings(stateBefore, action)).toEqual(stateAfter);
  });
});
