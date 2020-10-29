import config from "./config";
import processConfig from "./processConfig";
import initialiseRR from "./initialiseRR";
import processRR from "./processRR";
import render from "./render";

(function init() {

    // * process the config to ensure all is correct
    let processed_config = processConfig(config);

    // * if the processing failed, don't continue
    if (!processed_config) return;

    initialiseRR(processRR.bind(null, processed_config, render));

})();