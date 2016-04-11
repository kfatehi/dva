'use strict';
const bcrypt = require('bcrypt');
const Promise = require('bluebird')

var hashPassword = function(password) {
  return new Promise(function(resolve, reject) {
    bcrypt.genSalt(10, function(err, salt) {
      if (err) return reject(err);
      bcrypt.hash(password, salt, function(err, hash) {
        if (err) return reject(err);
        resolve(hash);
      });
    });
  });
}

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    bio: DataTypes.TEXT,
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
        return hashPassword(password).then(function(hash) {
          attributes.password = hash;
          return User.create(attributes);
        });
      },
      associate: function(models) {
        // associations can be defined here
      }
    },
    instanceMethods: {
      comparePassword: function(password) {
        var user = this;
        return new Promise(function(resolve, reject) {
          if (!password) return reject();
          bcrypt.compare(password, user.password || '', function (err, isValid) {
            if (err) throw err;
            if (isValid) resolve(user);
            else reject();
          });
        });
      },
    }
  });
  return User;
};
