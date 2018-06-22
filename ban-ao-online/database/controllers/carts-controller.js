var cartsModel = require('../models').Cart;
var cartItemsModel = require('../models').CartItem;
var productsModel = require('../models').Product;
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

    addItemToCart(cartID, itemPrice, done) {
        return cartsModel
            .update({
                totalQuantiles: sequelize.literal('\"totalQuantiles\"+1'),
                totalPrice: sequelize.literal('\"totalPrice\"+' + itemPrice.toString()),
            },
            {
                where: {id: cartID,}
            })
            .then(function() {
                done(null);
            })
            .catch(function(err) {
                done(err);
            });
    },

    getCartInformation(cartID, done) {
        return cartsModel
            .findOne({
                where: {
                    id: cartID,
                },
            })
            .then(function(cart) {
                done(null, cart);
            })
            .catch(function(error) {
                done(error);
            });
    },

    getCartDetailInformation(cartID, done) {
        return cartsModel
            .findOne({
                where: { id: cartID, },
                include: [{
                    model: cartItemsModel,
                    as: 'cartitems',
                    include: [{
                        model: productsModel,
                    }],
                }],
            })
            .then(function(cart) {
                done(null, cart);
            })
            .catch(function(err) {
                done(err);
            })
    }
};

