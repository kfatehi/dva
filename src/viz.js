"use strict";
const Promise = require('bluebird');
const axios = require('axios');

/**
 * Constructs a `viz` object
 *
 * This module is designed to be isomorphic meaning that it
 * works on the server or in the browser (via webpack or browserify)
 */
module.exports = () => {

  let extensions = [];

  extensions.load = (name) => {
    return new Promise((resolve, reject) => {
      let ext = {
        name,
        schema: require(`${__dirname}/../extensions/${name}/schema`),
        script: require(`${__dirname}/../extensions/${name}`),
      }
      extensions.push(ext);
      resolve(ext);
    });
  }

  let dataset = {
    load: (id) => {
      return new Promise(function(resolve, reject) {
        axios.get(`/datasets/${id}`).then(function (response) {
          resolve(response)
        })
      });
    }
  }
  

  return { extensions, dataset }
}
