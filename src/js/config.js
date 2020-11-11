const config = {
    // * can have one or many placements
    placements: [
        {
            // * placement name
            placement_name: "home_page.rr1",
            // * selector where RR is to appear
            placement_selector: "#product-carousel.owl-carousel",
            // * item id/s to seed, if required
            item_ids: [""],
            // * message to appear on the RR - leave blank to use RR title
            strategy_message: "",
        },
        {
            // * placement name
            placement_name: "home_page.rr3",
            // * selector where RR is to appear
            placement_selector: "#product-carousel.owl-carousel",
            // * item id/s to seed, if required
            item_ids: [""],
            // * message to appear on the RR - leave blank to use RR title
            strategy_message: "",
        }
    ],
    // * RR API key
    rr_api_key: "",
    // * is the RR in testing or live?
    is_live: true,
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