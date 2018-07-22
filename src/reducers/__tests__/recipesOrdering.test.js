import recipesOrdering from "../recipesOrdering";

const stateBefore = {
  orderBy: "name",
  orderType: "ftl"
};

describe("recipesOrdering", () => {
  test("unsupported action types should return state unchanged", () => {
    const action = { type: "FOO_BAR", value: "baz" };

    expect(recipesOrdering(stateBefore, action)).toEqual(stateBefore);
  });
  test("SET_ORDERBY_FILTER action should update orderBy field with given value", () => {
    const action = { type: "SET_ORDERBY_FILTER", value: "date" };
    const stateAfter = { ...stateBefore, orderBy: "date" };

    expect(recipesOrdering(stateBefore, action)).toEqual(stateAfter);
  });
  test("SET_ORDERTYPE_FILTER action should update orderType field with given value", () => {
    const action = { type: "SET_ORDERTYPE_FILTER", value: "ltf" };
    const stateAfter = { ...stateBefore, orderType: "ltf" };

    expect(recipesOrdering(stateBefore, action)).toEqual(stateAfter);
  });
});
