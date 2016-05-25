'use strict';
module.exports = function(sequelize, DataTypes) {
  var Notebook = sequelize.define('Notebook', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    isPublic: DataTypes.BOOLEAN,
    ownerId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    jsonData: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Notebook;
};
