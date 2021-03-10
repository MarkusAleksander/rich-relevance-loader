import rr_loader_config from "./rr_loader_config";
import loadExternalJS from "./libs/loadExternalJS";

// * initialise the RR
export default function initialiseRR(cb) {
    // * is the RR code available yet?
    if (typeof r3 === "function") {
        // * yes, so run now
        cb();
    } else {
        // * no, so load it then run
        loadExternalJS(
            rr_loader_config.RR_lib_url,
            () => {
                cb();
            }
        )
    }
}