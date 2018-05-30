var productsModel = require('../models').Product;

module.exports = {
    getAllProducts(constraints, done) {
        console.log("Actual run here");
        return productsModel
            .findAll({
                where: constraints,
            })
            .then(function(products) {
                done(null, products);
            })
            .catch(function(error) {
                done(error);
            });
    }
};
