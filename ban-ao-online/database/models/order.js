'use strict';
module.exports = (sequelize, DataTypes) => {
  var Order = sequelize.define('Order', {
    address: DataTypes.STRING,
    name: DataTypes.STRING,
    paymentID: DataTypes.STRING,
    orderStatus: DataTypes.INTEGER,
    /*
     * 1: ON PROCESSING
     * 2: DELIVERED
     * 3: CANCELED
     */
  }, {});
  Order.associate = function(models) {
      Order.belongsTo(models.User, {
          foreignKey: 'userID',
          onDelete: 'CASCADE',
      });
      Order.belongsTo(models.Cart, {
          foreignKey: 'cartID',
          onDelete: 'CASCADE',
      });
  };
  return Order;
};
