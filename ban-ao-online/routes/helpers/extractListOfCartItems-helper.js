module.exports = {
    extractListOfCartItems(cartWithIncludedCartItems) {
        var cartItems = [], cartQuantity = 0, cartPrice = 0;
        if (Boolean(cartWithIncludedCartItems)) {
            cartQuantity = cartWithIncludedCartItems.dataValues.totalQuantiles;
            cartPrice = cartWithIncludedCartItems.dataValues.totalPrice;
            for (let i = 0; i < cartWithIncludedCartItems.dataValues.cartitems.length; ++i) {
                let productPrice = cartWithIncludedCartItems.dataValues.cartitems[0].Product.dataValues.productPrice;
                var cartItem = cartWithIncludedCartItems.dataValues.cartitems[i].dataValues.Product.dataValues;
                cartItem.cartItemID = cartWithIncludedCartItems.dataValues.cartitems[i].dataValues.id;
                cartItem.itemQuantity = cartWithIncludedCartItems.dataValues.cartitems[i].dataValues.productQuantity;
                cartItem.itemPrice = productPrice * cartItem.itemQuantity;
                cartItems.push(cartItem);
            }
        }
        return {
            cartQuantity: cartQuantity,
            cartPrice: cartPrice,
            cartItems: cartItems,
        }
    }
}
