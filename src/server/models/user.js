'use strict';
const passUtil = require('../password-utils');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      validate: { isEmail: true },
      unique: true
    },
    password: {
      type: DataTypes.STRING
    },
  }, {
    classMethods: {
      createWithPassword: function(password, attributes) {
        return passUtil.hash(password).then(function(hash) {
          attributes.password = hash;
          return User.create(attributes);
        });
      },
      associate: function(models) {
        User.hasMany(models.Dataset, {
          foreignKey: 'ownerId'
        })
      }
    },
    instanceMethods: {
      comparePassword: function(pw) {
        let user = this;
        let ppw = user.password;
        return passUtil.compare(pw, ppw).then(() => user)
      },
    }
  });
  return User;
};
