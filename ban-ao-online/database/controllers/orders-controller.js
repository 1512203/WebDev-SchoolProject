var ordersModel = require('../models').Order;
var cartsModel = require('../models').Cart;
var cartItemsModel = require('../models').CartItem;
var productsModel = require('../models').Product;
var usersModel = require('../models').User;
var sequelize = require('../models').sequelize;

module.exports = {
    createNewOrder(orderData, done) {
        orderData.orderStatus = 1; // PENDING
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
                order: [
                    ['createdAt', 'DESC'],
                ],
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

    changeStatus(orderID, newStatus, done) {
        return ordersModel
            .update({
                orderStatus: newStatus,
            }, {
                where: {
                    id: orderID,
                }
            })
            .then(function() {
                done(null);
            })
            .catch(function(error) {
                done(error);
            });
    },

    getOrdersPriceForStatistic(done) {
        return sequelize
            .query("SELECT SUM(\"totalPrice\"), date_trunc('day', \"Order\".\"createdAt\") as date FROM \"Orders\" AS \"Order\" LEFT OUTER JOIN \"Carts\" AS \"Cart\" ON \"Order\".\"cartID\" = \"Cart\".\"id\" GROUP BY date_trunc('day', \"Order\".\"createdAt\") ORDER BY date_trunc('day', \"Order\".\"createdAt\");", {
                type: sequelize.QueryTypes.SELECT,
            })
            .then(function(sumList) {
                done(null, sumList);
            })
            .catch(function(error) {
                done(error);
            });
        /*
        return ordersModel
            .findAll({
                attributes: [sequelize.fn('SUM', sequelize.col('totalPrice'))],
                group: [sequelize.fn('date_trunc', 'day', sequelize.col('createdAt'))],
                include: [{
                    model: cartsModel,
                }],
            })
            .then(function(orders) {
                done(null, orders);
            })
            .catch(function(error) {
                done(error);
            });
            */
    },
}
