function convertToSize(sizeInInteger) {
    if (sizeInInteger == 1) 
        return "S";
    else if (sizeInInteger == 2) 
        return "M";
    else if (sizeInInteger == 3)
        return "L";
    else if (sizeInInteger == 4)
        return "XL";
    else if (sizeInInteger == 5)
        return "XXL";
    else 
        return "XXXL";
}

module.exports = {
    extractListOfOrders(orders) {
        let carts = [];
        for (let i = 0; i < orders.length; ++i) {
            let i_order = orders[i].dataValues;
            let cart = {};

            cart.cartNumber = i+1;
            cart.checkoutDay = i_order.createdAt;
            cart.numberOfItems = i_order.Cart.dataValues.cartitems.length;
            cart.items = [];

            for (let j = 0; j < cart.numberOfItems; ++j) {
                let j_item = i_order.Cart.dataValues.cartitems[j].dataValues;
                let cartitem = {
                    isFirstRow: Boolean(j == 0),
                    productName: j_item.Product.dataValues.productName,
                    productQuantity: j_item.productQuantity,
                    productSize: convertToSize(j_item.productSize),
                    productID: j_item.productID,
                    productPrice: j_item.Product.dataValues.productPrice,
                };
                cartitem.itemTotal = cartitem.productPrice * cartitem.productQuantity;
                cart.items.push(cartitem);
            }
            carts.push(cart);
        }
        return carts;
    },
}

