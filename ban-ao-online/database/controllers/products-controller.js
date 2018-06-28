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
    }
};
