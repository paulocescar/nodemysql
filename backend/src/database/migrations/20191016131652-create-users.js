'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
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
    },{
      
      freezeTableName: true,
      instanceMethods: {
          generateHash(password) {
              return bcrypt.hash(password, bcrypt.genSaltSync(8));
          },
          validPassword(password) {
              return bcrypt.compare(password, this.password);
          }
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};
