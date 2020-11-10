import dom_template from "./template";
import formatNumber from "./../modules/formatNumber";
import startCarousel from "./startCarousel";
import safeLoop from "./../modules/safeLoop";

export default function render(config, jsonPlacement) {

    if ($().owlCarousel) {
        render(config, jsonPlacement);
    } else {
        loadExternalJS("https://images2.drct2u.com:443/repo/common/owl-carousel-2/owl.carousel.min.js", () => {
            pollFunction(() => {
                return !!$().owlCarousel;
            }, () => {
                render(config, jsonPlacement)
            });
        });
        loadExternalCSS("https://images2.drct2u.com:443/repo/common/owl-carousel-2/owl.carousel.css");
    }


    // TODO - receiving array, should really just recieving the object
    if (!jsonPlacement[0]) {
        console.warn("No item data returned from RR");
        return;
    }

    function findAncestor(el, s) {
        do {
            if (Element.prototype.matches.call(el, s)) return el;
            el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType === 1);
        return null;
    }

    safeLoop(jsonPlacement, (idx, placement) => {
        // * get items
        let items = placement.items;

        // * find relevant config data
        let config_id = config.placements.findIndex((p) => {
            return p.placement_name === placement.placement_name;
        });

        let config_data = config.placements[config_id];

        let placement_el = config_data.placement_selector;

        for (let i = 0; i < items.length; i++) {
            let item = items[i],
                wrapper = document.createElement("div");

            let item_html = dom_template;

            item_html = item_html.split("{image}").join(item.image);
            item_html = item_html.split("{url}").join(item.url);
            item_html = item_html.split("{price}").join(item.price);
            item_html = item_html.split("{salePrice}").join(item.saleprice);
            item_html = item_html.split("{name}").join(item.name);

            wrapper.classList.add("product-carousel__item");
            wrapper.innerHTML = item_html;

            if (formatNumber(item.saleprice) === formatNumber(item.price)) {
                // * no sale value
                wrapper.querySelector(".product-carousel__was-price").remove();
            } else {
                // * add sale badge
                let badge = document.createElement('p');
                badge.classList.add('product-carousel__sale-badge');
                badge.textContent = "Save £" + (formatNumber(item.price) - formatNumber(item.saleprice)).toFixed(2);
                wrapper.querySelector('.product-carousel__content').insertAdjacentElement('afterbegin', badge);
            }

            // * insert item
            placement_el.insertAdjacentElement("beforeend", wrapper);

        }

        // * create title

        try {
            let section_wrapper = findAncestor(placement_el, "section");

            let section_title = section_wrapper.querySelector("h2");

            section_title.textContent = config_data.strategy_message !== "" ? config_data.strategy_message : placement.message;
        } catch {
            // ...
        }

        // * start carousel
        startCarousel(placement_el, config.carousel_config);

    });
}