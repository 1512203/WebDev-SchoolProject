'use strict';
module.exports = (sequelize, DataTypes) => {
  var Product = sequelize.define('Product', {
    productName: DataTypes.STRING,
    productDescription: DataTypes.TEXT,
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
    Product.belongsTo(models.User, {
        foreignKey: 'postedBy',
        onDelete: 'SET NULL',
    });
    Product.hasMany(models.CartItem, {
        foreignKey: 'productID',
        as: 'cartitems',
    });
  };
  return Product;
};
