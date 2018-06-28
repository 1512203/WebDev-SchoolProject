'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      var carts = [{
          totalQuantiles: 7,
          totalPrice: 700000,
          createdAt: Sequelize.literal("'2018-06-26 18:04:11.764+07'"),
          updatedAt: Sequelize.literal("'2018-06-26 18:04:11.764+07'"),
      }];
      return queryInterface.bulkInsert('Carts', carts, {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Carts', null, {});
  }
};
