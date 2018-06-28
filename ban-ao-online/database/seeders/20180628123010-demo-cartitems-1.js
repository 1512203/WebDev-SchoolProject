'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      var cartitems = [{
          productQuantity: 1,
          productSize: 5,
          cartID: 1,
          productID: 9,
          createdAt: Sequelize.literal("'2018-06-26 22:55:32.841+07'"),
          updatedAt: Sequelize.literal("'2018-06-26 22:55:32.841+07'"),
      }, {
          productQuantity: 6,
          productSize: 1,
          cartID: 1,
          productID: 13, 
          createdAt: Sequelize.literal("'2018-06-26 22:55:56.961+07'"),
          updatedAt: Sequelize.literal("'2018-06-26 22:55:56.961+07'"),
      }];
      return queryInterface.bulkInsert('CartItems', cartitems, {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('CartItems', cartitems, {});
  }
};
