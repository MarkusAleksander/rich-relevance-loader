
// * go through config and ensure all is correct
export default function processConfig(config) {
    let placement = config.placement;

    if (!placement) return false;

    if (
        // * if no placement selector..
        !placement.placement_selector ||
        // * or the item_ids isn't an array
        !Array.isArray(placement.item_ids) ||
        (!config.rr_api_key || config.rr_api_key === "") ||
        !Array.isArray(placement.placement_types)
    ) {
        // * then we can't continue
        return false;
    }

    let dom_el = document.querySelector(placement.placement_selector);

    if (!dom_el) return false;

    placement.placement_selector = dom_el;

    return config;
}