'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('products', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      categoy_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      price: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      base_price: {
        type: Sequelize.DECIMAL,
        allowNull: true,
      },
      original_price: {
        type: Sequelize.DECIMAL,
        allowNull: true,
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM('A','I'),
        allowNull: false,
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    })

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('products');
  }
};
