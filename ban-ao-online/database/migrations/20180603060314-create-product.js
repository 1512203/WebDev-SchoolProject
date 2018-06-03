'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      productName: {
        type: Sequelize.STRING
      },
	  productStyleID: {
		type: Sequelize.INTEGER,
		onDelete: 'CASCADE',
		references: {
			model: 'Styles',
			key: 'id',
			as: 'productStyleID',
		},
	  },
      productDescription: {
        type: Sequelize.TEXT
      },
      productPrice: {
        type: Sequelize.FLOAT
      },
      availProducts: {
        type: Sequelize.INTEGER
      },
      pathToImg: {
        type: Sequelize.STRING
      },
      postedBy: {
        type: Sequelize.INTEGER,
        onDelete: 'SET NULL',
        references: {
          model: 'Users',
          key: 'id',
          as: 'postedBy',
        },
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
    return queryInterface.dropTable('Products');
  }
};
