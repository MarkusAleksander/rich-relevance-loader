import { getSessionId, getUserId } from "./rr_lib";
import safeLoop from "./libs/safeLoop";
import rr_loader_config from "./rr_loader_config";

export default function processRR(data) {

    const config = data.config;
    const render = data.render;

    // * set up interval callback to catch the jsonPlacement return
    // * Recommended RR.jsonCallback has not been found to work correctly
    (function () {

        // * get the placement names to test the returned json data against
        let config_placements = config.placements.reduce((acc, placement) => {
            return acc.concat(placement.placement_name);
        }, []);

        let callback_interval = window.setInterval(function () {
            // * if not defined, return
            if (!window.jsonPlacement) return;

            // * if defined, is it an Array? and it has length
            if (!Array.isArray(window.jsonPlacement) || !window.jsonPlacement.length) return;

            // * check jsonPlacement has the placements we're after
            // * check each item returned contains the placements
            if (!window.jsonPlacement.every((json_placement) => {
                return config_placements.indexOf(json_placement.placement_name) > -1;
            })) return;

            // * all is fine, so stop the interval
            window.clearInterval(callback_interval);

            // * pass data to render method
            render(config, window.jsonPlacement);
        }, 1);
    })();

    // * primary RR functionality
    // * set up R3_COMMON
    // eslint-disable-next-line no-undef
    var R3_COMMON = new r3_common();

    // * set the api key
    R3_COMMON.setApiKey(config.rr_api_key);
    // * set the base url for the RR file
    R3_COMMON.setBaseUrl("https://".concat(config.is_live ? rr_loader_config.RR_base_url_live_fragment : rr_loader_config.RR_base_url_testing_fragment).concat(rr_loader_config.RR_base_url_fragment));
    // * set click through server
    R3_COMMON.setClickthruServer("https://".concat(window.location.host));
    // * set session id
    R3_COMMON.setSessionId(getSessionId());
    // * set current user id
    R3_COMMON.setUserId(getUserId());
    // * set placement types
    safeLoop(config.placements, (idx, placement) => {
        R3_COMMON.addPlacementType(placement.placement_name);
        // * set item id/s for each placement
        safeLoop(placement.item_ids, (idx, item_id) => {
            R3_COMMON.addItemId(item_id.trim().toLocaleUpperCase());
        });
    });

    if (config.page_type === "") {
        // TODO
        // eslint-disable-next-line no-unused-vars
        var R3_GENERIC =
            // eslint-disable-next-line no-undef
            new r3_generic();
    }
    if (config.page_type === "home") {
        // TODO
        // eslint-disable-next-line no-unused-vars
        var R3_HOME =
            // eslint-disable-next-line no-undef
            new r3_home();
    }
    if (config.page_type === "category") {
        // TODO
        // eslint-disable-next-line no-unused-vars
        var R3_CATEGORY =
            // eslint-disable-next-line no-undef
            new r3_category();
        safeLoop(config.placements, (idx, placement) => {
            R3_CATEGORY.setId(placement.category_id);
            R3_CATEGORY.setName(placement.category_name);
        });
    }
    if (config.page_type === "item") {
        // TODO
        // eslint-disable-next-line no-unused-vars
        var R3_ITEM =
            // eslint-disable-next-line no-undef
            new r3_item();
        // TODO - Get code of item
        // R3_ITEM.setId(config.placement.item_id);
        // TODO - Get name of item
        // R3_ITEM.setName(config.placement.item_name);
        // if (config.placement.category_hint_id && config.placement.category_hint_id !== "") {
        //     R3_COMMON.addCategoryHintId(config.placement.category_hint_id);
        // }
    }
    if (config.page_type === "cart") {
        // TODO
        // eslint-disable-next-line no-unused-vars
        var R3_CART =
            // eslint-disable-next-line no-undef
            new r3_cart();

        // TODO - loop through cart products
        // R3_CART.addItemId('21666189', '9876A');
    }
    if (config.page_type === "brand") {
        R3_COMMON.setPageBrand(config.brand);
        // eslint-disable-next-line no-unused-vars
        var R3_BRAND =
            // eslint-disable-next-line no-undef
            new r3_brand();
    }

    // * request the RR placement
    // eslint-disable-next-line no-undef
    rr_flush_onload();
    // eslint-disable-next-line no-undef
    r3();
}