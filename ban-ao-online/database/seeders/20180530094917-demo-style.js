'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    var styles = [
        {
            styleName: "Áo phông hè",
            createdAt: Sequelize.literal('NOW()'),
            updatedAt: Sequelize.literal('NOW()')
        },
        {
            styleName: "Áo phông Tết",
            createdAt: Sequelize.literal('NOW()'),
            updatedAt: Sequelize.literal('NOW()')
        },
        {
            styleName: "Áo phông du lịch",
            createdAt: Sequelize.literal('NOW()'),
            updatedAt: Sequelize.literal('NOW()')
        },
        {
            styleName: "Áo thun phong cách",
            createdAt: Sequelize.literal('NOW()'),
            updatedAt: Sequelize.literal('NOW()')
        },
        {
            styleName: "Áo thun trơn",
            createdAt: Sequelize.literal('NOW()'),
            updatedAt: Sequelize.literal('NOW()')
        },
        {
            styleName: "Áo nhóm, áo lớp đẹp",
            createdAt: Sequelize.literal('NOW()'),
            updatedAt: Sequelize.literal('NOW()')
        },
        {
            styleName: "Áo thun Pokemon",
            createdAt: Sequelize.literal('NOW()'),
            updatedAt: Sequelize.literal('NOW()')
        },
        {
            styleName: "Áo thun One Vietnam",
            createdAt: Sequelize.literal('NOW()'),
            updatedAt: Sequelize.literal('NOW()')
        },

    ];
    return queryInterface.bulkInsert('Styles', styles, {});
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Styles', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
