'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userID: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
            model: 'Users',
            key: 'id',
            as: 'userID',
        },
      },
      cartID: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
            model: 'Carts',
            key: 'id',
            as: 'cartID',
        },
      },
        orderStatus: {
            type: Sequelize.INTEGER,
        },
      address: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      paymentID: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Orders');
  }
};
