import checkDefined from "./checkDefined.js";

/**
 * Test is a given variable is a function or not
 * @param {*} func 
 */
export default function checkIsAFunction(func) {
    return checkDefined(func) && (Object.prototype.toString.call(func) === "[object Function]" || "function" === typeof func || func instanceof Function);
}