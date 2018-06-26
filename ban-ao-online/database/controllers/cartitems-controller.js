var cartitemsModel = require('../models').CartItem;
const Sequelize = require('sequelize');

module.exports = {
    addItemToCart(productID, cartID, productQuantity, productSize, done) {
        return cartitemsModel
            .findOne({
                where: {
                    cartID: cartID,
                    productID: productID,
                    productSize: productSize,
                },
            })
            .then(function(cartitem) {
                if (cartitem) {
                    return cartitemsModel
                        .update({
                            productQuantity: Sequelize.literal('\"productQuantity\"+' + productQuantity.toString()),
                        }, {
                            where: {
                                productID: productID,
                                cartID: cartID,
                                productSize: productSize,
                            },
                            returning: true,
                        })
                        .then(function(cartitem) {
                            console.log("DEBUGGING UPDATED CARTITEM", cartitem[1][0]);
                            done(null, cartitem[1][0]);
                        })
                        .catch(function(error) {
                            console.log("DEBUGGING 1", error);
                            done(error);
                        });
                }
                else {
                    return cartitemsModel
                        .create({
                            cartID: cartID,
                            productID: productID,
                            productQuantity: productQuantity,
                            productSize: productSize,
                        })
                        .then(function(cartitem) {
                            done(null, cartitem);
                        })
                        .catch(function(error) {
                            console.log("DEBUGGING 2", error);
                            done(error);
                        });
                }
            })
            .catch(function(error) {
                console.log("DEBUGGING 3", error);
                done(error);
            });
    },

    findCartItemByID(cartItemID, done) {
        return cartitemsModel
            .findById(cartItemID)
            .then(function(cartitem) {
                done(null, cartitem);
            })
            .catch(function(error) {
                done(error);
            });
    },
};
