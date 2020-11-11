import dom_template from "./template";
import formatNumber from "./../modules/formatNumber";
import startCarousel from "./startCarousel";
import pollFunction from "./../modules/pollFunction";
import loadExternalJS from "./../modules/loadExternalJS";
import loadExternalCSS from "./../modules/loadExternalCSS";
import safeLoop from "./../modules/safeLoop";

export default function render(config, jsonPlacement) {

    // * main render function, run once the carousel below this is evaluated
    function main_render() {

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
                let placement_el = config_data.placement_selector;

                // * loop over each item
                safeLoop(items, (idx, item) => {
                    // * create a div for the item
                    let template_dom = document.createElement("div");

                    // * get a copy of the dom template
                    let item_html = dom_template;

                    // * convert to a HTML item to manipulate 
                    template_dom.innerHTML = item_html;

                    // * handle image
                    let image = template_dom.querySelector(".product-carousel__image");
                    if (item.image) {
                        image.src = item.image;
                    } else {
                        image.remove();
                    }

                    // * handle image
                    let url = template_dom.querySelector(".product-carousel__link");
                    if (item.url) {
                        url.href = item.url;
                    }

                    // * handle was price (main product price)
                    let was_price = template_dom.querySelector(".product-carousel__was-price");
                    if (item.price) {
                        was_price.textContent = "was £".concat(item.price);
                    } else {
                        was_price.remove();
                    }

                    // * handle sale price (on sale price)
                    let sale_price = template_dom.querySelector(".product-carousel__price");
                    if (item.saleprice) {
                        sale_price.textContent = "£".concat(item.saleprice);
                    } else {
                        sale_price.remove();
                    }

                    // * if sale price and price are different, handle badge
                    let badge = template_dom.querySelector('.product-carousel__sale-badge');
                    if (formatNumber(item.saleprice, 0) === formatNumber(item.price, 0)) {
                        was_price && was_price.remove();
                        badge && badge.remove();
                    } else {
                        if (badge) {
                            badge.textContent = "Save £" + (formatNumber(item.price) - formatNumber(item.saleprice)).toFixed(2);
                        }
                    }

                    // * handle title
                    let title = template_dom.querySelector(".product-carousel__title");
                    if (item.name) {
                        title.textContent = item.name;
                    } else {
                        title.remove();
                    }

                    // * insert item from template to placement
                    placement_el.insertAdjacentElement("beforeend", template_dom.children[0]);

                });

                // * start carousel
                startCarousel(placement_el, config.carousel_config);
            };
        });
    }

    // * Check for relevant carousel before running render
    if (!!$().owlCarousel) {
        main_render();
    } else {
        loadExternalJS("https://images2.drct2u.com:443/repo/common/owl-carousel-2/owl.carousel.min.js", () => {
            pollFunction(() => {
                return !!$().owlCarousel;
            }, () => {
                main_render()
            });
        });
        loadExternalCSS("https://images2.drct2u.com:443/repo/common/owl-carousel-2/owl.carousel.css");
    }
}