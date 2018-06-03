var cartitemsModel = require('../models').CartItem;

module.exports = {
    addItemToCart(productID, cartID, done) {
        return cartitemsModel
            .create({
                cartID: cartID,
                productID: productID,
            })
            .then(function(cartitem) {
                done(null, cartitem);
            })
            .catch(function(error) {
                done(error);
            });
    },
};
