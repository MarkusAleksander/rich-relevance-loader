import { getSessionId, getUserId } from "./rr_lib";
import safeLoop from "./../modules/safeLoop";
import checkDefined from "./../modules/checkDefined";

export default function processRR(config, render) {
    // * set up interval callback to catch the jsonPlacement return
    // * Recommended RR.jsonCallback has not been found to work correctly
    (function () {

        // * get the placement names to test the returned json data against
        let config_placements = config.placements.reduce((acc, placement) => {
            return acc.concat(placement.placement_name);
        }, []);

        let callback_interval = window.setInterval(function () {
            // * if not defined, return
            if (!checkDefined(jsonPlacement)) return;

            // * if defined, is it an Array? and it has length
            if (!Array.isArray(jsonPlacement) || !jsonPlacement.length) return;

            // * check jsonPlacement has the placements we're after
            // * check each item returned contains the placements
            if (!jsonPlacement.every((json_placement) => {
                return config_placements.indexOf(json_placement.placement_name) > -1;
            })) return;

            // * all is fine, so stop the interval
            window.clearInterval(callback_interval);

            // * pass data to render method
            render(config, jsonPlacement);
        }, 1);
    })();

    // TODO - NEEDED?
    // try {
    //     processAffinities(itemObjArray);
    // } catch (e) { }

    // * primary RR functionality
    // * set up R3_COMMON
    var R3_COMMON = new r3_common();

    // * set the api key
    R3_COMMON.setApiKey(config.rr_api_key);
    // * set the base url for the RR file
    R3_COMMON.setBaseUrl("https://".concat(config.is_live ? "recs" : "integration").concat(".richrelevance.com/rrserver/"));
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
        var R3_GENERIC = new r3_generic();
    }
    if (config.page_type === "home") {
        // TODO
        var R3_HOME = new r3_home();
    }
    if (config.page_type === "category") {
        // TODO
        var R3_CATEGORY = new r3_category();
        // R3_CATEGORY.setId(config.placement.category_id);
        // R3_CATEGORY.setName(config.placement.category_name);
    }
    if (config.page_type === "item") {
        // TODO
        var R3_ITEM = new r3_item();
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
        var R3_CART = new r3_cart();

        // TODO - loop through cart products
        // R3_CART.addItemId('21666189', '9876A');
    }
    if (config.page_type === "brand") {
        // TODO
        // R3_COMMON.setPageBrand(config.placement.brand);
        var R3_BRAND = new r3_brand();
    }

    // * request the RR placement
    rr_flush_onload();
    r3();
}