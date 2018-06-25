var ordersModel = require('../models').Order;

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
}
