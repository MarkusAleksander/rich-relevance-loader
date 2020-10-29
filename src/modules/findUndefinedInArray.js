import checkDefined from "./checkDefined";

/**
 * Check if an array contains one or more undefined elements
 * @param {array} arr 
 */
export default function findUndefinedInArray(arr) {
    if (!Array.isArray(arr) || arr.length === 0) return true;

    return arr.some((el) => {
        return !checkDefined(el);
    });
}
