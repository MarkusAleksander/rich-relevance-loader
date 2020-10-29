import checkDefined from "./checkDefined.js";

/**
 * Check if an element is in view, by default checks if partly in view. Set false to check fully in view
 * @param {element} el 
 * @param {boolean} is_part_view
 */
export default function checkIsInVIew(el, is_part_view = true) {
    if (!checkDefined(el) || !el.nodeType) return false;

    const rect = el.getBoundingClientRect();

    if (is_part_view) {
        return (
            rect.top >= 0 ||
            rect.left >= 0 ||
            rect.bottom <=
            (window.innerHeight ||
                document.documentElement.clientHeight) ||
            rect.right <=
            (window.innerWidth || document.documentElement.clientWidth)
        );
    } else {
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <=
            (window.innerHeight ||
                document.documentElement.clientHeight) &&
            rect.right <=
            (window.innerWidth || document.documentElement.clientWidth)
        );
    }
}