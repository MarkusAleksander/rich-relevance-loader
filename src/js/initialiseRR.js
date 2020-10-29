import loadExternalJS from "./../modules/loadExternalJS";

export default function initialiseRR(cb) {
    if (typeof r3 === "function") {
        cb();
    } else {
        loadExternalJS(
            "https://media.richrelevance.com/rrserver/js/1.2/p13n.js",
            () => {
                cb();
            }
        )
    }
}