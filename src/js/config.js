const config = {
    // * can have one or many placements
    placements: [
        {
            // * placement name
            placement_name: "home_page.rr1",
            // * selector where RR is to appear
            placement_selector: ".owl-carousel",
            // * item id/s to seed, if required
            item_ids: ["ZL827"],
            // * message to appear on the RR - leave blank to use RR title
            strategy_message: "",
        },
    ],
    // * RR API key
    rr_api_key: "",
    // * is the RR in testing or live?
    is_live: true,
    // * options for the RR carousel
    carousel_config: {
        items: 2,
        nav: true,
        dots: false,
        loop: true,
        margin: 10,
        responsive: {
            768: {
                items: 4,
                margin: 15
            },
            1024: {
                items: 5,
                margin: 15
            }
        }
    },
    // * page type: one of "" || "home" || "category" || "item" || "cart" || "brand"
    page_type: "home"
}

export default config;