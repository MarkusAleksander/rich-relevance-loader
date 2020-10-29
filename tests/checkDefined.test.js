/* eslint-disable no-undef */
const checkDefined = require("./../prod/test/modules/checkDefined.js").default;

test("checkDefined returns true from 1", () => {
    expect(checkDefined(1)).toBeTruthy();
});
test("checkDefined returns false from undefined", () => {
    expect(checkDefined(undefined)).toBeFalsy();
});
test("checkDefined returns false from null", () => {
    expect(checkDefined(null)).toBeFalsy();
});
test("checkDefined returns true from {}", () => {
    expect(checkDefined({})).toBeTruthy();
});