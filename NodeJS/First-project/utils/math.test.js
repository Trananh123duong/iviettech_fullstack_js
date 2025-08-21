// utils/math.test.js
const { add, getUser, isPositive, getNullValue, getFruits } = require("./math");

describe("Jest matchers example", () => {
  test("add() → toBe", () => {
    expect(add(2, 3)).toBe(5);   // dùng .toBe cho số, boolean, string
  });

  test("getUser() → toEqual", () => {
    expect(getUser()).toEqual({ id: 1, name: "Duong" }); // so sánh object/array
  });

  test("isPositive() → toBeTruthy / toBeFalsy", () => {
    expect(isPositive(10)).toBeTruthy();   // true
    expect(isPositive(-5)).toBeFalsy();    // false
  });

  test("getNullValue() → toBeNull", () => {
    expect(getNullValue()).toBeNull();     // null
  });

  test("getFruits() → toContain", () => {
    const fruits = getFruits();
    expect(fruits).toContain("banana");    // trong array có phần tử này
  });
});
