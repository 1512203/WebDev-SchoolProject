var ordersModel = require('../models').Order;
var cartsModel = require('../models').Cart;
var cartItemsModel = require('../models').CartItem;
var productsModel = require('../models').Product;

module.exports = {
    createNewOrder(orderData, done) {
        return ordersModel
            .create(orderData)
            .then(function(order) {
                done(null, order);
            })
            .catch(function(error) {
                done(error);
            });
    },

    getOrdersDetailInformationByUser(userID, done) {
        return ordersModel 
            .findAll({
                where: { userID: userID, },
                include: [{
                    model: cartsModel,
                    include: [{
                        model: cartItemsModel,
                        as: 'cartitems',
                        include: [{
                            model: productsModel,
                        }],
                    }],
                }],
            })
            .then(function(carts) {
                done(null, carts);
            })
            .catch(function(err) {
                done(err);
            })
    },
}
