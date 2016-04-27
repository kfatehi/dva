"use strict";
const Promise = require('bluebird');
const axios = require('axios');
const applyBucketMapping = require('./apply-bucket-mapping');

/**
 * Constructs a `viz` object
 *
 * This module is designed to be isomorphic meaning that it
 * works on the server or in the browser (via webpack or browserify)
 */
module.exports = () => {

  let dataset = {
    load: (id) => {
      return new Promise(function(resolve, reject) {
        axios.get(`/datasets/${id}`).then(function (response) {
          resolve(response)
        })
      });
    },

    applyBucketMapping
  }
  

  return { dataset }
}
