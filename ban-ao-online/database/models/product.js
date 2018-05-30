'use strict';
module.exports = (sequelize, DataTypes) => {
  var Product = sequelize.define('Product', {
    productName: DataTypes.STRING,
    productPrice: DataTypes.FLOAT,
    availProducts: DataTypes.INTEGER,
    pathToImg: DataTypes.STRING
  }, {});
  Product.associate = function(models) {
    // associations can be defined here
	Product.belongsTo(models.Style, {
		foreignKey: 'productStyleID',
		onDelete: 'CASCADE',
	});
  };
  return Product;
};
