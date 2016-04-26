'use strict';
module.exports = function(sequelize, DataTypes) {
  var Dataset = sequelize.define('Dataset', {
    ownerId: DataTypes.INTEGER,
    datasourceId: DataTypes.INTEGER,
    jsonData: DataTypes.TEXT,
    deleted: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Dataset;
};