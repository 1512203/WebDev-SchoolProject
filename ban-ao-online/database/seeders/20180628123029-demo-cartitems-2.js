'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      var cartitems = [{
          productQuantity: 5,
          productSize: 2,
          cartID: 2,
          productID: 6,
          createdAt: Sequelize.literal("'2018-06-27 22:55:32.841+07'"),
          updatedAt: Sequelize.literal("'2018-06-27 22:55:32.841+07'"),
      }, {
          productQuantity: 5,
          productSize: 3,
          cartID: 2,
          productID: 14, 
          createdAt: Sequelize.literal("'2018-06-27 22:55:56.961+07'"),
          updatedAt: Sequelize.literal("'2018-06-27 22:55:56.961+07'"),
      }];
      return queryInterface.bulkInsert('CartItems', cartitems, {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('CartItems', cartitems, {});
  }
};
