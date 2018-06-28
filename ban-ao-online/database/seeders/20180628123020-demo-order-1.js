'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      var order = [{
          userID: 2,
          cartID: 1,
          address: "A6, Khu phố 6, Phường Tân Tiến",
          name: "Nguyễn Quốc Huy",
          orderStatus: 2,
          createdAt: Sequelize.literal("'2018-06-26 23:04:11.764+07'"),
          updatedAt: Sequelize.literal("'2018-06-26 23:04:11.764+07'"),
      }];
      return queryInterface.bulkInsert('Orders', order, {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Orders', null, {});
  }
};
