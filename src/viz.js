"use strict";
var Promise = require('bluebird')

module.exports = function () {

  let extensions = [];

  extensions.load = (name) => {
    return new Promise((resolve, reject) => {
      let ext = require(`${__dirname}/../extensions/${name}`);
      extensions.push(ext);
      resolve(ext);
    });
  }

  return {
    extensions: extensions
  }
}
