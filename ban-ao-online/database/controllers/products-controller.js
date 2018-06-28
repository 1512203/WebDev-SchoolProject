var productsModel = require('../models').Product;
var stylesModel = require('../models').Style;

module.exports = {
    getAllProducts(constraints, done) {
        return productsModel
            .findAll({
                where: constraints,
                include: [{
                    model: stylesModel,
                }],
            })
            .then(function(products) {
                done(null, products);
            })
            .catch(function(error) {
                done(error);
            });
    },
    findProductByID(productID, done) {
        return productsModel
                .findOne({
                    where: {
                        id: productID,
                    },
                    include: [{
                        model: stylesModel,
                    }],
                })
                .then(function(product) {
                    done(null, product);
                })
                .catch(function(error) {
                    done(error);
                });
    },
    getAllProductsOrders(orderType, done) {
        return productsModel
            .findAll({
                order: [['id', orderType]],
                include: [{
                    model: stylesModel,
                }],
            })
            .then(function(products) {
                done(null, products);
            })
            .catch(function(error) {
                done(error);
            });
    },
    getAllProductsFilterByPrice(priceStart, priceEnd, done) {
        return productsModel
            .findAll({
                productPrice: {
                    $between: [priceStart, priceEnd]
                }, 
                order: [['id', 'ASC']],
                include: [{
                    model: stylesModel,
                }],
            })
            .then(function(products) {
                done(null, products);
            })
            .catch(function(error) {
                done(error);
            });
    },
    getProductsFilterSearchString(searchString, done) {
        return productsModel
            .findAll({
                where: {
                    productName: {
                        $like: '%' + searchString
                    }
                }, 
                order: [['id', 'ASC']],
                include: [{
                    model: stylesModel,
                }],
            })
            .then(function(products) {
                done(null, products);
            })
            .catch(function(error) {
                done(error);
            });
    }
};
