var cartsModel = require('../models').Cart;
var sequelize = require('sequelize');

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

    addItemToCart(cartID, done) {
        return cartsModel
            .update({
                totalQuantiles: sequelize.literal('\"totalQuantiles\"+1')
            },
            {
                where: {id: cartID,}
            })
            .then(function() {
                done(null);
            })
            .catch(function(err) {
                console.log(err);
                done(err);
            });
    },
};

