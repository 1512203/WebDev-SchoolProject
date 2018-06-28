var productsModel = require('../models').Product;
var stylesModel = require('../models').Style;

module.exports = {
    updateProductInfo(productName, productDesp, productID, done) {
        let newData = {};
        if (productName != undefined && productName)
            newData.productName = productName;
        if (productDesp != undefined && productDesp)
            newData.productDescription = productDesp;
        return productsModel
            .update(newData, {
                where: {
                    id: productID,
                }
            })
            .then(function() {
                done(null);
            })
            .catch(function(error) {
                done(error);
            });
    },
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
    }
};
