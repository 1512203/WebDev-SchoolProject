'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      var admin = [{
          fullname: "Nguyễn Quốc Huy",
          isAdmin: true,
          isActive: true,
          email: "quochuya@live.com",
          password: "$2a$05$Jk.se4g6MS.kJN3gXzNeOuxe2aYpdyxCbokyOe8th6nRWSHzwsJXu",
          phonenumber: "01299656823",
          address: "A6, Khu phố 6, Phường Tân Tiến",
          createdAt: Sequelize.literal("'2018-06-23 19:04:11.764+07'"),
          updatedAt: Sequelize.literal("'2018-06-23 19:04:11.764+07'"),
      }];
      return queryInterface.bulkInsert('Users', admin, {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Users', null, {});
  }
};
