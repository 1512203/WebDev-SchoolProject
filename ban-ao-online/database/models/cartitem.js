'use strict';
module.exports = (sequelize, DataTypes) => {
  var CartItem = sequelize.define('CartItem', {
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
