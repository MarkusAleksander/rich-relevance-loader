export default function findAncestor(el, s) {
    do {
        if (Element.prototype.matches.call(el, s)) return el;
        el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);
    return null;
}