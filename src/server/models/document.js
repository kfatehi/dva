'use strict';
module.exports = function(sequelize, DataTypes) {
  var Document = sequelize.define('Document', {
    ownerId: DataTypes.INTEGER,
    datasetId: DataTypes.INTEGER,
    vizId: DataTypes.STRING,
    vizOpts: DataTypes.TEXT,
    thumbnail: DataTypes.STRING,
    public: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Document;
};