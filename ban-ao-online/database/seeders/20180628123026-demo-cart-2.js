'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      var carts = [{
          totalQuantiles: 10,
          totalPrice: 1000000,
          createdAt: Sequelize.literal("'2018-06-27 18:04:11.764+07'"),
          updatedAt: Sequelize.literal("'2018-06-27 18:04:11.764+07'"),
      }];
      return queryInterface.bulkInsert('Carts', carts, {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Carts', null, {});
  }
};
