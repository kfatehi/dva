'use strict';

/*
different types of data sources
*/
const TYPES = [{
  id: "mysql",
  label: "MySQL",
},{
  id: "csv",
  label: "Flat CSV"
},{
  id: "json",
  label: "Flat JSON"
}]
/* examples...
type: db-mysql
db_host: 
db_password:
db_port: 
db_name:
db_table:
db_query:
data: text

type: flat-csv
data: text

type: flat-json
data: text

type: web-json
url: string
data: text

sequelize model:create --name DataSources --attributes 'type:string, data:text, url:string, db_host:string, db_password:string, db_port:integer, db_name:string, db_table:string, db_query:string'
*/

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
      TYPES: TYPES,
      associate: function(models) {
        DataSources.belongsTo(models.User)
      },
    }
  });
  return DataSources;
};
