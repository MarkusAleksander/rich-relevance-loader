import addChangeStyleToElement from "./addChangeStyleToElement";
import addClassToggleToElements from "./addClassToggleToElements";
import addReplaceClassToElement from "./addReplaceClassToElement";
import addMoveElementToLocation from "./addMoveElementToLocation";
import safeLoop from "./safeLoop";
import checkDefined from "./checkDefined";

/**
 * Improved version of document.createElement, taking in type and custom object with options
 * @param {string} elementType - string representing the element type
 * @param {object} options - object of options to add to the element: classes, id, attributes, styles
 * 
 * buildCustomElement("div", {
 *  id: "main"
 *  classes: ["column",...]
 *  attributes: {"data-x": "value", ...}
 *  events: [{"click": callback}, ...]
 *  location: {"selector": ".home", "rel_pos": "beforebegin"},
 *  styles: {"position":"absolute", ...}
 * })
 * 
 */
export default function buildCustomElement(
    elementType,
    { id, classes, attributes, events, styles, location }
) {
    // * Create The Element
    let el = document.createElement(elementType);

    // * set id
    el.id = id;

    // * Add extra functionalities
    safeLoop([
        addClassToggleToElements, // toggleClass
        addChangeStyleToElement, // changeStyle
        addReplaceClassToElement, // replaceClass
        addMoveElementToLocation // moveElementToLocation
    ], (scope, idx, func) => {
        func([el]);
    });

    // * set classes
    if (checkDefined(classes) && Array.isArray(classes)) {
        safeLoop(classes, (scope, idx, class_name) => {
            el.toggleClass(class_name);
        });
    }

    // * Add any attributes 
    if (checkDefined(attributes) && typeof attributes === "object") {
        safeLoop(Object.keys(attributes), (scope, idx, attr) => {
            el.setAttribute(attr, attributes[attr]);
        });
    }

    // * Set up any events
    if (checkDefined(events) && Array.isArray(events)) {
        safeLoop(events, (scope, idx, eventObj) => {
            safeLoop(Object.keys(eventObj), (scope, idx, event_type) => {
                el.addEventListener(event_type, eventObj[event_type]);
            });
        });
    }

    // * Add any styles
    if (checkDefined(styles) && typeof styles === "object") {
        safeLoop(Object.keys(styles), (scope, idx, style) => {
            el.changeStyle(style, styles[style]);
        });
    }

    // * Set location
    if (checkDefined(location) && typeof location === "object") {
        let [selector, rel_pos] = location;
        el.moveElementToLocation(document.querySelector(selector), rel_pos);
    }

    // * Return new element
    return el;
}
