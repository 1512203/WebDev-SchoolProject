var ordersModel = require('../models').Order;
var cartsModel = require('../models').Cart;
var cartItemsModel = require('../models').CartItem;
var productsModel = require('../models').Product;
var usersModel = require('../models').User;

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

    getAllOrdersFromAllUsers(done) {
        return ordersModel 
            .findAll({
                include: [{
                    model: cartsModel,
                }, {
                    model: usersModel,
                }],
            })
            .then(function(carts) {
                done(null, carts);
            })
            .catch(function(err) {
                done(err);
            })
    },

    getOrderDetailInformationByOrderID(orderid, done) {
        return ordersModel
            .findOne({
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
                where: {
                    id: orderid,
                },
            })
            .then(function(orderresult) {
                done(null, orderresult);
            })
            .catch(function(err) {
                done(err);
            });
    },
}
