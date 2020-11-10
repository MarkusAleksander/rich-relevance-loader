import init from "./init";
import config from "./config";
import render from "./render";

// * config for the module
// * render for displaying the data
let RR_module = function (config, render) {
    init(config, render);
};

// * define config
const rr_config = config;
// * define rendering
const rr_render = render;

// * begin the module
RR_module(rr_config, rr_render);