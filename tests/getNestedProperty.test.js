/* eslint-disable no-undef */
const getNestedProperty = require("./../prod/test/modules/getNestedProperty.js")
    .default;

test("getNestedProperty return true from { 'test': true }, 'test', false", () => {
    expect(getNestedProperty({ test: true }, "test", false)).toBeTruthy();
});
test("getNestedProperty return true from { 'lvl1': { 'lvl2': true} }, 'lvl1.lvl2', false", () => {
    expect(
        getNestedProperty({ lvl1: { lvl2: true } }, "lvl1.lvl2", false)
    ).toBeTruthy();
});
test("getNestedProperty return true from { 'lvl1': { 'lvl2': [true]} }, 'lvl1.lvl2.0', false", () => {
    expect(
        getNestedProperty({ lvl1: { lvl2: [true] } }, "lvl1.lvl2.0", false)
    ).toBeTruthy();
});
test("getNestedProperty return true from { 'lvl1': { 'lvl2': [1, {'lvl4': true}]} }, 'lvl1.lvl2.1.lvl4', false", () => {
    expect(
        getNestedProperty(
            { lvl1: { lvl2: [1, { lvl4: true }] } },
            "lvl1.lvl2.1.lvl4",
            false
        )
    ).toBeTruthy();
});
test("getNestedProperty return true from [[2,[{test: [true]},3]], 1], '0.1.0.test.0', false", () => {
    expect(
        getNestedProperty([[1, [{ test: [true] }]]], "0.1.0.test.0", false)
    ).toBeTruthy();
});
test("getNestedProperty return false from { 'lvl1': { 'lvl2': [1, {'lvl4': true}]} }, 'lvl1.lvl2.0.lvl4', false", () => {
    expect(
        getNestedProperty(
            { lvl1: { lvl2: [1, { lvl4: true }] } },
            "lvl1.lvl2.0.lvl4",
            false
        )
    ).toBeFalsy();
});

test("getNestedProperty return false from {test: false}, '', false", () => {
    expect(getNestedProperty({ test: false }, "", false)).toBeFalsy();
});
