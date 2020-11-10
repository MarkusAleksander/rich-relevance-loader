import loadExternalJS from "./../modules/loadExternalJS";

// * initialise the RR
export default function initialiseRR(cb) {
    // * is the RR code available yet?
    if (typeof r3 === "function") {
        // * yes, so run now
        cb();
    } else {
        // * no, so load it then run
        loadExternalJS(
            "https://media.richrelevance.com/rrserver/js/1.2/p13n.js",
            () => {
                cb();
            }
        )
    }
}