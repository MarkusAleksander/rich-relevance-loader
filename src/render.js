import dom_template from "./placement_template.html";
import formatNumber from "./libs/formatNumber";
import startCarousel from "./startCarousel";
import pollFunction from "./libs/pollFunction";
import loadExternalJS from "./libs/loadExternalJS";
import loadExternalCSS from "./libs/loadExternalCSS";
import safeLoop from "./libs/safeLoop";
import rr_loader_config from "./rr_loader_config";

export default function render(config, jsonPlacement) {

    // * main render function, run once the carousel below this is evaluated
    function run_render() {

        // * Loop over each return placement 
        safeLoop(jsonPlacement, (idx, placement) => {
            // * get placement items
            let items = placement.items;

            // * find relevant config data
            let config_data = config.placements.find((p) => {
                return p.placement_name === placement.placement_name;
            });

            // * sanity check: check we have the data
            if (config_data) {

                // * get placement dom el
                let placement_el = config_data.placement_el;

                // * if custom HTML is provided, use that otherwise, default template
                let template = config_data.custom_template ? config_data.custom_template : dom_template;

                // * loop over each item
                safeLoop(items, (idx, item) => {
                    // * create a working template to use for the updates
                    let working_template = template;

                    let placement_data = [
                        {
                            placement_tag: "{url}",
                            placement_data: item.url
                        },
                        {
                            placement_tag: "{image}",
                            placement_data: item.image
                        },
                        {
                            placement_tag: "{price}",
                            placement_data: item.saleprice
                        },
                        {
                            placement_tag: "{was}",
                            placement_data: item.price
                        },
                        {
                            placement_tag: "{save}",
                            placement_data: (formatNumber(item.price) - formatNumber(item.saleprice)).toFixed(2)
                        },
                        {
                            placement_tag: "{title}",
                            placement_data: item.name
                        }
                    ];

                    safeLoop(placement_data, function (idx, data) {
                        if (working_template.indexOf(data.placement_tag) > -1) {
                            // * create regex
                            let regex = new RegExp(data.placement_tag, "g");
                            // * replace
                            working_template = working_template.replace(regex, data.placement_data.trim());
                        }
                    });

                    // * insert item from template to placement
                    placement_el.insertAdjacentHTML("beforeend", working_template);
                    // eslint-disable-next-line no-debugger

                });

                if (typeof config_data.strategy_message === "string") {

                    let message = config_data.strategy_message;
                    let message_el = document.createElement("p");

                    if (message === "") {
                        message_el.textContent = placement.message;
                    } else {
                        message_el.textContent = message;
                    }

                    placement_el.insertAdjacentElement("beforebegin", message_el);
                }

                // * start carousel
                startCarousel(placement_el, config.carousel_config);
            }
        });
    }

    // * Check for relevant carousel before running render
    // eslint-disable-next-line no-extra-boolean-cast
    if (!!$().owlCarousel) {
        run_render();
    } else {
        loadExternalJS(rr_loader_config.carousel_script, () => {
            pollFunction(() => {
                return !!$().owlCarousel;
            }, () => {
                run_render()
            });
        });
        loadExternalCSS(rr_loader_config.carousel_css);
    }
}