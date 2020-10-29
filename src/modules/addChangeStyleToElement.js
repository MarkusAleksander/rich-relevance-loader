import safeLoop from "./safeLoop.js";

/**
 *  Extends the given element with style change functionality
 * @param {NodeList} elementArray
 */
export default function addChangeStyleToElement(elementArray) {
    /**
     * Change Style on an element
     * @param {string} prop - style property to change
     * @param {string} value - value to change the property to
     */
    safeLoop(elementArray, (scope, idx, element) => {
        if (element.changeStyle && typeof element.changeStyle === "function")
            return;

        element.changeStyle = function(prop, value) {
            let s = this.style;
            s[prop] = value;
        };
    });
}
