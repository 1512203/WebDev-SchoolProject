'use strict';
module.exports = (sequelize, DataTypes) => {
  var Style = sequelize.define('Style', {
    styleName: DataTypes.STRING
  }, {});
  Style.associate = function(models) {
    // associations can be defined here
    Style.hasMany(models.Product, {
        foreignKey: 'productStyleID',
        as: 'products',
    });
  };
  return Style;
};
