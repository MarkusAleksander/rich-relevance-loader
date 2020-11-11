const dom_template = "".concat('<div class="product-carousel__item">')
    .concat('<a href="#" class="product-carousel__link">')
    .concat('<div class="product-carousel__header">')
    .concat(
        '<img alt="" class="product-carousel__image" src="#">'
    )
    .concat("</div>")
    .concat('<div class="product-carousel__content">')
    .concat('<p class="product-carousel__sale-badge">Save &pound;{saleBadge}</p>')
    .concat('<p class="product-carousel__price">&pound;{salePrice}</p>')
    .concat('<p class="product-carousel__was-price">was &pound;{price}</p>')
    .concat('<p class="product-carousel__title">{name}</p>')
    .concat("</div>")
    .concat("</a>")
    .concat("</div>");

export default dom_template;