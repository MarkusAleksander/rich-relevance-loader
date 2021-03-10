/**
 * Load a js script and run optional onload when loaded, or onerror when failed
 * @param {string} src 
 * @param {function} onload 
 * @param {function} onerror 
 */
export default function loadExternalJS(src, onload = null, onerror = null) {
    let script = document.createElement("script");
    script.src = src;
    script.async = true;
    onload && (script.onload = onload);
    onerror && (script.onerror = onerror);
    document.getElementsByTagName("head")[0].appendChild(script);
}
