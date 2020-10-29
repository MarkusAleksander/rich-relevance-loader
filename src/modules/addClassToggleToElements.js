import safeLoop from "./safeLoop.js";

/**
 *  Extends the Element object with class toggle functionality
 * @param {Nodelist} elementArray
 */
export default function addClassToggleToElements(elementArray) {
    /**
     * Toggle class on element
     * @param {string} class_name - class to toggle
     */
    safeLoop(elementArray, (scope, idx, element) => {
        if (element.toggleClass && typeof element.toggleClass === "function")
            return;

        element.toggleClass = function (class_name) {
            let cl = this.classList;
            cl.contains(class_name) ? cl.remove(class_name) : cl.add(class_name);
        };
    });
}
