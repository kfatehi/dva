'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('DataSources', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING
      },
      data: {
        type: Sequelize.TEXT
      },
      url: {
        type: Sequelize.STRING
      },
      db_host: {
        type: Sequelize.STRING
      },
      db_password: {
        type: Sequelize.STRING
      },
      db_port: {
        type: Sequelize.INTEGER
      },
      db_name: {
        type: Sequelize.STRING
      },
      db_table: {
        type: Sequelize.STRING
      },
      db_query: {
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
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('DataSources');
  }
};