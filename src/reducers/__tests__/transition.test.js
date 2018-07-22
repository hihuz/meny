import transition from "../transition";

const testState = {
  shown: false,
  config: {
    title: "foo",
    left: {
      path: "/a",
      text: "bar"
    },
    right: {
      path: "/b",
      text: "baz"
    }
  }
};

describe("transition", () => {
  test("unsupported action types should return state unchanged", () => {
    const stateBefore = testState;
    const action = { type: "FOO_BAR", config: "baz" };

    expect(transition(stateBefore, action)).toEqual(stateBefore);
  });
  test("SHOW_TRANSITION action should update state with given config", () => {
    const stateBefore = testState;
    const config = {
      title: "hi",
      left: {
        path: "/c",
        text: "ho"
      },
      right: {
        path: "/d",
        text: "ha"
      }
    };
    const action = { type: "SHOW_TRANSITION", config };
    const stateAfter = { shown: true, config };

    expect(transition(stateBefore, action)).toEqual(stateAfter);
  });
  test("HIDE_TRANSITION action should set shown field to false", () => {
    const stateBefore = { ...testState, shown: true };
    const action = { type: "HIDE_TRANSITION" };
    const stateAfter = testState;

    expect(transition(stateBefore, action)).toEqual(stateAfter);
  });
});
