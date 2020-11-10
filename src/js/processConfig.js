// * go through config and ensure all is correct
export default function processConfig(config) {
    // * initial check
    if (
        // * if there's no placements..
        !config.placements ||
        // * or if there's no api_key
        (!config.rr_api_key || config.rr_api_key === "")
    ) return false;

    // * check placements are valid
    let placements = config.placements.filter((placement) => {
        if (
            // * if no placement selector..
            !placement.placement_selector ||
            // * or the item_ids isn't an array..
            !Array.isArray(placement.item_ids) ||
            // * if no placement name..
            (!placement.placement_name || placement.placement_name === "")
        ) {
            return false;
        }

        // * check we have a valid dom selector
        let dom_el = document.querySelector(placement.placement_selector);

        // * if not, return
        if (!dom_el) return false;

        // * store dom selection for later
        placement.placement_selector = dom_el;

        return true;
    });

    // * check we have at least one valid placement
    if (!placements) return false;

    // * store placements in config
    config.placements = placements;

    // * return processed config
    return config;
}