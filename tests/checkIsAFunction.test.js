/* eslint-disable no-undef */
const checkIsAFunction = require("./../prod/test/modules/checkIsAFunction.js").default;

test("checkIsAFunction returns true for a function", () => {
    expect(checkIsAFunction(function () { })).toBeTruthy();
});
test("checkIsAFunction returns false for a number", () => {
    expect(checkIsAFunction(1)).toBeFalsy();
});
test("checkIsAFunction returns false for a string", () => {
    expect(checkIsAFunction("1")).toBeFalsy();
});
test("checkIsAFunction returns false for an object", () => {
    expect(checkIsAFunction({ "a": 1 })).toBeFalsy();
});
test("checkIsAFunction returns false for an array", () => {
    expect(checkIsAFunction([1, 2, 3])).toBeFalsy();
});