module.exports = {
    extractListOfCartItemsOfOrder(order) {
        let items = [];
        let cartitems = order.dataValues.Cart.dataValues.cartitems;
        for (let i = 0; i < cartitems.length; ++i) {
            let i_item = cartitems[i].dataValues;
            let i_product = i_item.Product.dataValues;
            let item = {
                productID: i_product.id,
                productName: i_product.productName,
                productPrice: i_product.productPrice,
                productQuantity: i_item.productQuantity,
            };
            item.totalPrice = item.productPrice * item.productQuantity;

            items.push(item);
        }
        return items;
    }
}
