/* eslint-disable no-undef */
const findUndefinedInArray = require("./../prod/test/modules/findUndefinedInArray.js")
    .default;

test("findUndefinedInArray returns false from [1,2,3]", () => {
    expect(findUndefinedInArray([1, 2, 3])).toBeFalsy();
});
test("findUndefinedInArray returns true from [1,undefined,3]", () => {
    expect(findUndefinedInArray([1, undefined, 3])).toBeTruthy();
});
test("findUndefinedInArray returns true from [1,null,3]", () => {
    expect(findUndefinedInArray([1, null, 3])).toBeTruthy();
});
test("findUndefinedInArray returns true from []", () => {
    expect(findUndefinedInArray([])).toBeTruthy();
});
test("findUndefinedInArray returns true from 1", () => {
    expect(findUndefinedInArray(1)).toBeTruthy();
});
test("findUndefinedInArray returns true from {}", () => {
    expect(findUndefinedInArray({})).toBeTruthy();
});
