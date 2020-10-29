const config = {
    placement:
    {
        // * selector where RR is to appear
        placement_selector: "#hp-rr-insert .owl-carousel",
        // * item id/s to seed
        item_ids: [""],
        // * message to appear on the RR - leave blank to use RR title
        strategy_message: "",
        // * placement type/s - WARNING! ARRAY WORK TBD
        placement_types: [""],

        // * if a category page
        // category_id: "",
        // category_name: "",

        // * if an item page (optional)
        // category_hint_id: "",

        // * if brand page
        // brand: "",

    },
    // * RR API key
    rr_api_key: "",
    // * is the RR in testing or live?
    is_live: false,
    // * options for the RR carousel
    carousel_config: {
        nav: false,
        dots: false,
        loop: true,
        autoplay: false,
        autoWidth: true,
        margin: 10,
        responsive: {
            768: {
                autoWidth: false,
                items: 4,
                nav: true,
                margin: 0
            },
            1024: {
                autoWidth: false,
                items: 5,
                nav: true,
                margin: 0
            },
            1200: {
                autoWidth: false,
                items: 6,
                nav: true,
                margin: 0
            },
            1300: {
                autoWidth: false,
                items: 7,
                nav: true,
                margin: 0
            }
        }
    },
    // * page type: one of "" || "home" || "category" || "item" || "cart" || "brand"
    page_type: "home"
}

export default config;