const bcrypt = require('bcrypt');
const Promise = require('bluebird');

module.exports = {
  hash: (password) => {
    return new Promise(function(resolve, reject) {
      bcrypt.genSalt(10, function(err, salt) {
        if (err) return reject(err);
        bcrypt.hash(password, salt, function(err, hash) {
          if (err) return reject(err);
          resolve(hash);
        });
      });
    });
  },
  compare: (a, b) => {
    return new Promise(function(resolve, reject) {
      bcrypt.compare(a, b, function (err, isValid) {
        if (err) return reject(err);
        if (isValid) resolve();
        else reject();
      });
    });
  }
}
