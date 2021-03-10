/**
 * Load a css file and provide optional onload and onerror callbacks
 * @param {string} cssLink 
 * @param {function} onload 
 * @param {function} onerror 
 */

export default function loadExternalCSS(cssLink, onload = null, onerror = null) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = cssLink;
    onload && (link.onload = onload);
    onerror && (link.onerror = onerror);
    document.getElementsByTagName("head")[0].appendChild(link);
}
