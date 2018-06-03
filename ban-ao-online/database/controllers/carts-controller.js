var cartsModel = require('../models').Cart;

module.exports = {
    createNewShoppingCart(done) {
        return cartsModel
            .create({totalQuantiles: 0, totalPrice: 0})
            .then(function(cart) {
                done(null, cart);
            })
            .catch(function(error) {
                done(error);
            });
    },
};
