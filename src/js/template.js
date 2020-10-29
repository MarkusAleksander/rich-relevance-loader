const dom_template = "".concat('<a href="{url}" class="product-carousel__link">')
    .concat('<div class="product-carousel__header">')
    .concat(
        '<img alt="{name}" class="product-carousel__image" src="{image}">'
    )
    .concat("</div>")
    .concat('<div class="product-carousel__content">')
    .concat('<p class="product-carousel__price">&pound;{salePrice}</p>')
    .concat('<p class="product-carousel__was-price">was &pound;{price}</p>')
    .concat('<p class="product-carousel__title">{name}</p>')
    .concat("</div>")
    .concat("</a>");

export default dom_template;