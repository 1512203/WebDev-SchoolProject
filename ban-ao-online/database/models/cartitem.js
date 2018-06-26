'use strict';
module.exports = (sequelize, DataTypes) => {
  var CartItem = sequelize.define('CartItem', {
      productQuantity: DataTypes.INTEGER,
      productSize: DataTypes.INTEGER,
  }, {});
  CartItem.associate = function(models) {
    CartItem.belongsTo(models.Cart, {
        foreignKey: 'cartID',
        onDelete: 'CASCADE',
    });
    CartItem.belongsTo(models.Product, {
        foreignKey: 'productID', 
        onDelete: 'CASCADE',
    });
  };
  return CartItem;
};
