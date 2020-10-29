/**
 * Safe loop function that iterates over1 arrays and nodelists
 * @param {Array|ArrayLike} arr
 * @param {Function} cb (scope, idx, arrayItem)
 * @param {any} scope
 */

export default function safeLoop(array, cb, scope = undefined) {
    if (
        !Array.isArray(array) &&
        // eslint-disable-next-line no-prototype-builtins
        !NodeList.prototype.isPrototypeOf(array) &&
        // eslint-disable-next-line no-prototype-builtins
        !HTMLCollection.prototype.isPrototypeOf(array)
    )
        return;

    let i = 0,
        l = array.length;

    for (i; i < l; i++) {
        cb.call(scope, i, array[i]);
    }
}
