'use strict';
module.exports = function(sequelize, DataTypes) {
  var DataSources = sequelize.define('DataSources', {
    user_id: DataTypes.INTEGER,
    type: DataTypes.STRING,
    data: DataTypes.TEXT,
    url: DataTypes.STRING,
    db_host: DataTypes.STRING,
    db_password: DataTypes.STRING,
    db_port: DataTypes.INTEGER,
    db_name: DataTypes.STRING,
    db_table: DataTypes.STRING,
    db_query: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return DataSources;
};