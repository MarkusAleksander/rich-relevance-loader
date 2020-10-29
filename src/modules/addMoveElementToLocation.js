import selectorExists from "./selectorExists.js";
import safeLoop from "./safeLoop.js";

/**
 *  Extends the Element object with a move to location function
 * @param {NodeList} elementArray
 */
export default function addMoveElementToLocation(elementArray) {
    /**
     * Move element to a specified location
     * @param {Element}  location - element on the page that this will be moved relative to
     * @param {string} rel_pos - relative position this will be moved to around the location element
     */
    safeLoop(elementArray, (scope, idx, element) => {
        if (
            element.moveElementToLocation &&
            typeof element.moveElementToLocation === "function"
        )
            return;

        element.moveElementToLocation = function(location, rel_pos) {
            if (!selectorExists(location)) return;

            location.insertAdjacentElement(rel_pos, this);
        };
    });
}
