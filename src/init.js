import processConfig from "./processConfig";
import initialiseRR from "./initialiseRR";
import processRR from "./processRR";

// * initialisation function
export default function init(data) {
    // * process the config to ensure all is correct
    let processed_config = processConfig(data.config);

    // * if the processing failed, don't continue
    if (!processed_config) return;

    data.config = processed_config;

    // * initialise the RR with processRR bound with the config and render method
    initialiseRR(processRR.bind(null, data));
}