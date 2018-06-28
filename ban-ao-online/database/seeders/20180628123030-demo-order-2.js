'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      var order = [{
          userID: 3,
          cartID: 2,
          address: "Cầu Ông Lãnh, Quận 1, Hồ Chí Minh",
          name: "Nguyễn Đức Nhân",
          orderStatus: 2,
          createdAt: Sequelize.literal("'2018-06-27 23:04:11.764+07'"),
          updatedAt: Sequelize.literal("'2018-06-27 23:04:11.764+07'"),
      }];
      return queryInterface.bulkInsert('Orders', order, {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Orders', null, {});
  }
};
