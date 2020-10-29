import safeLoop from "./safeLoop.js";

/**
 *  Extends the Element object with a class replace function
 * @param {NodeList} elementArray
 */
export default function addReplaceClassToElement(elementArray) {
    /**
     * Move element to a specified location
     * @param {string} old_class - old class to remove
     * @param {string} new_class - new class to replace the old
     */
    safeLoop(elementArray, (scope, idx, element) => {
        if (element.replaceClass && typeof element.replaceClass === "function")
            return;

        element.replaceClass = function(old_class, new_class) {
            let cl = this.classList;
            cl.remove(old_class);
            cl.add(new_class);
        };
    });
}
