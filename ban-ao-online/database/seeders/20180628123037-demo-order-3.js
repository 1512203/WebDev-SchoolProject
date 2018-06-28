'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      var order = [{
          userID: 3,
          cartID: 3,
          address: "Cầu Ông Lãnh, Quận 1, Hồ Chí Minh",
          name: "Nguyễn Đức Nhân",
          orderStatus: 2,
          createdAt: Sequelize.literal("'2018-06-28 23:04:11.764+07'"),
          updatedAt: Sequelize.literal("'2018-06-28 23:04:11.764+07'"),
      }];
      return queryInterface.bulkInsert('Orders', order, {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Orders', null, {});
  }
};
