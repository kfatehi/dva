'use strict';
module.exports = function(sequelize, DataTypes) {
  var Datasource = sequelize.define('Datasource', {
    type: DataTypes.STRING,
    config: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Datasource;
};