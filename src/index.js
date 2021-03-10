import init from "./init";
import render from "./render";

// * entry point for the RR Loader Module 
const RR_LOADER_MODULE = function (data) {
    if (!data.config) {
        console.warn("No RR Placement config found. Have you set up RR_LOADER_PLACEMENT_DATA?");
    }
    init(data);
};

// * begin the module
RR_LOADER_MODULE(
    {
        config: window.RR_LOADER_PLACEMENT_DATA,
        render
    }
);