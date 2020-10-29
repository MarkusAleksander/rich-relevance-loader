import { getSessionId, getUserId } from "./rr_lib";
import safeLoop from "./../modules/safeLoop";
import pollFunction from "./../modules/pollFunction";
import loadExternalJS from "./../modules/loadExternalJS";
import loadExternalCSS from "./../modules/loadExternalCSS";

export default function processRR(config, render) {
    (function () {
        let callback_interval = window.setInterval(function () {
            if (typeof jsonPlacement === "undefined") return;

            if (!Array.isArray(jsonPlacement)) return;

            let placements = [];

            safeLoop(jsonPlacement, (idx, placement_data) => {
                if (config.placement.placement_types.includes(placement_data.placement_name)) {
                    placements.push(placement_data);
                }
            });

            // * TODO - improve array is empty check
            if (!placements[0]) return;

            window.clearInterval(callback_interval);

            // * could be looped for multiple placements
            // * render placement here
            if ($().owlCarousel) {
                render(config, placements);
            } else {
                loadExternalJS("https://images2.drct2u.com:443/repo/common/owl-carousel-2/owl.carousel.min.js", () => {
                    pollFunction(() => {
                        return !!$().owlCarousel;
                    }, () => {
                        render(config, placements)
                    });
                });
                loadExternalCSS("https://images2.drct2u.com:443/repo/common/owl-carousel-2/owl.carousel.css");
            }
        }, 1);
    })();

    try {
        processAffinities(itemObjArray);
    } catch (e) { }

    // * primary RR functionality
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
    // * set placement type
    safeLoop(config.placement.placement_types, (idx, placement) => {
        R3_COMMON.addPlacementType(placement);
    });

    if (config.page_type === "") {
        var R3_GENERIC = new r3_generic();
    }
    if (config.page_type === "home") {
        var R3_HOME = new r3_home();
    }
    if (config.page_type === "category") {
        var R3_CATEGORY = new r3_category();
        R3_CATEGORY.setId(config.placement.category_id);
        R3_CATEGORY.setName(config.placement.category_name);
    }
    if (config.page_type === "item") {
        var R3_ITEM = new r3_item();
        // TODO - Get code of item
        // R3_ITEM.setId(config.placement.item_id);
        // TODO - Get name of item
        // R3_ITEM.setName(config.placement.item_name);
        if (config.placement.category_hint_id && config.placement.category_hint_id !== "") {
            R3_COMMON.addCategoryHintId(config.placement.category_hint_id);
        }
    }
    if (config.page_type === "cart") {
        var R3_CART = new r3_cart();

        // TODO - loop through cart products
        // R3_CART.addItemId('21666189', '9876A');
    }
    if (config.page_type === "brand") {
        R3_COMMON.setPageBrand(config.placement.brand);
        var R3_BRAND = new r3_brand();
    }

    // * set item id/s
    safeLoop(config.placement.item_ids, (idx, item_id) => {
        R3_COMMON.addItemId(item_id);
    });

    // * request the RR placement
    rr_flush_onload();
    r3();
}