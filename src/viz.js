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
      let dirname = `${__dirname}/../extensions/${name}`;
      try {
        let ext = {
          name,
          dirname,
          schema: require(`${dirname}/schema`),
          script: require(dirname),
        }
        extensions.push(ext);
        resolve(ext);
      } catch (e) {
        reject(e)
      }
    });
  }

  let dataset = {
    load: (id) => {
      return new Promise(function(resolve, reject) {
        axios.get(`/datasets/${id}`).then(function (response) {
          resolve(response)
        })
      });
    },
    /**
     * apply a bucket mapping to a dataset
     */
    applyBucketMapping: (data, mapping) => {
/*
	var jsonMapping = JSON.parse(mapping);
	var jsonData = JSON.parse(data);

	//first get all of the fields mapping to the series
	for(i = 0; i < j.......)	
	//next get all of the fields mapping to the group

	//Lastly get all of the fields mapping to the value


	//loop through entire jsonData file and "bucket" it according to the mapping
*/	
    }
  }
  

  return { extensions, dataset }
}
