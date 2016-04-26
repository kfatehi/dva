'use strict';
module.exports = function(sequelize, DataTypes) {
  var Transform = sequelize.define('Transform', {
    documentId: DataTypes.INTEGER,
    functionBody: DataTypes.STRING,
    order: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Transform;
};