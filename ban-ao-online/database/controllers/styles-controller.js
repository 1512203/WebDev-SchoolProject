var stylesModel = require('../models').Style;
var productsModel = require('../models').Product;
var sequelize = require('../models').sequelize;

module.exports = {
    getAllStyles(done) {
        return sequelize
            .query("SELECT \"Styles\".\"id\" AS \"styleID\", \"Styles\".\"styleName\" AS \"styleName\", COUNT(\"Products\".\"id\") AS \"quantity\" FROM \"Styles\" JOIN \"Products\" ON \"Styles\".\"id\" = \"Products\".\"productStyleID\" GROUP BY \"Styles\".\"id\" ORDER BY \"Styles\".\"id\";", {
                type: sequelize.QueryTypes.SELECT,
            })
            .then(function(countList) {
                done(null, countList);
            })
            .catch(function(error) {
                done(error);
            });
 
    },

    getAllStyleNames(constraints, done) {
        return stylesModel
            .findAll({
                where: constraints,
            })
            .then(function(styles) {
                done(null, styles);
            })
            .catch(function(error) {
                done(error);
            });
    }
};
