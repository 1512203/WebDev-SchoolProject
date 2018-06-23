module.exports = {
    extractListOfCartItems(cartWithIncludedCartItems) {
        var cartItems = [], cartQuantity = 0, cartPrice = 0;
        if (Boolean(cartWithIncludedCartItems)) {
            cartQuantity = cartWithIncludedCartItems.dataValues.totalQuantiles;
            cartPrice = cartWithIncludedCartItems.dataValues.totalPrice;
            for (let i = 0; i < cartWithIncludedCartItems.dataValues.cartitems.length; ++i) {
                var cartItem = cartWithIncludedCartItems.dataValues.cartitems[i].dataValues.Product.dataValues;
                cartItem.cartItemID = cartWithIncludedCartItems.dataValues.cartitems[i].dataValues.id;
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
