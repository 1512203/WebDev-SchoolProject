'use strict';
module.exports = (sequelize, DataTypes) => {
  var Cart = sequelize.define('Cart', {
    totalQuantiles: DataTypes.INTEGER,
    totalPrice: DataTypes.FLOAT,
  }, {});
  Cart.associate = function(models) {
    // associations can be defined here
    Cart.hasMany(models.CartItem, {
        foreignKey: 'cartID',
        as: 'cartitems',
    });
  };
  return Cart;
};
