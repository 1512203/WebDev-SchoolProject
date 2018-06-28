'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      var users = [{
          fullname: "Nguyễn Quốc Huy",
          isAdmin: false,
          isActive: true,
          email: "nqh@gmail.com",
          password: "$2a$05$fxVBTHIUDYiEGY5w9IoEmukS8ReBWQEAX9kw0TJNf8eRxMXnevpnC",
          phonenumber: "0123456789",
          address: "A6, Khu phố 6, Phường Tân Tiến",
          createdAt: Sequelize.literal("'2018-06-23 22:04:11.764+07'"),
          updatedAt: Sequelize.literal("'2018-06-23 22:04:11.764+07'"),
      }, {
          fullname: "Nguyễn Đức Nhân",
          isAdmin: false,
          isActive: true,
          email: "ndn@gmail.com",
          password: "$2a$05$duYy4Y39oMjuSdW5x0egpeBQpfV2cpv2Kkdc3Jy8Ud8MkM8/TefnK",
          phonenumber: "0987654321",
          address: "Cầu Ông Lãnh, Quận 1, Hồ Chí Minh",
          createdAt: Sequelize.literal("'2018-06-25 21:04:11.764+07'"),
          updatedAt: Sequelize.literal("'2018-06-25 21:04:11.764+07'"),
      }];
      return queryInterface.bulkInsert('Users', users, {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Users', null, {});
  }
};
