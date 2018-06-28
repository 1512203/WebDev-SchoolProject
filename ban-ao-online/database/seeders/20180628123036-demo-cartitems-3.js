'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      var cartitems = [{
          productQuantity: 3,
          productSize: 2,
          cartID: 3,
          productID: 3,
          createdAt: Sequelize.literal("'2018-06-28 22:55:32.841+07'"),
          updatedAt: Sequelize.literal("'2018-06-28 22:55:32.841+07'"),
      }, {
          productQuantity: 2,
          productSize: 3,
          cartID: 3,
          productID: 15, 
          createdAt: Sequelize.literal("'2018-06-28 22:55:56.961+07'"),
          updatedAt: Sequelize.literal("'2018-06-28 22:55:56.961+07'"),
      }, {
          productQuantity: 4,
          productSize: 4,
          cartID: 3,
          productID: 17, 
          createdAt: Sequelize.literal("'2018-06-28 22:55:56.961+07'"),
          updatedAt: Sequelize.literal("'2018-06-28 22:55:56.961+07'"),
      }];
      return queryInterface.bulkInsert('CartItems', cartitems, {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('CartItems', cartitems, {});
  }
};
