var stylesModel = require('../models').Style;

module.exports = {
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
