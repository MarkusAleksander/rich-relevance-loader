import dom_template from "./template";
import formatNumber from "./../modules/formatNumber";
import startCarousel from "./startCarousel";

export default function render(config, jsonPlacement) {
    // TODO - receiving array, should really just recieving the object
    if (!jsonPlacement[0]) {
        console.warn("No item data returned from RR");
        return;
    }
    let items = jsonPlacement[0].items,
        placement_el = config.placement.placement_selector;

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
    let title = document.createElement("h3");
    let title_span = document.createElement("span");
    title.classList.add("hp-rr-insert__title");
    title_span.textContent = config.placement.strategy_message !== "" ? config.placement.strategy_message : jsonPlacement[0].message;
    title.insertAdjacentElement("afterbegin", title_span);
    placement_el.insertAdjacentElement("beforebegin", title);

    // * start carousel
    startCarousel(placement_el, config.carousel_config);

}