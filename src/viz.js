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

	var seriesKeys = [];
	var groupKeys = [];
	var valueKeys = [];

	var i;
	//gets the series key fields
	for(i = 0; i < mapping.series.length; i++){
		seriesKeys.push(mapping.series[i]);	
	}

	//gets the group key fields
       for(i = 0; i < mapping.group.length; i++){
                groupKeys.push(mapping.group[i]);
        }
		
	//gets the value key fields
        for(i = 0; i < mapping.value.length; i++){
                valueKeys.push(mapping.value[i]);
        }

	
	var seriesFinal = [];
	var groupFinal = [];
	var valueFinal = [];

	//compiles the series field
	for(i = 0; i < seriesKeys.length; i++){
		seriesFinal.push(data[seriesKeys[i]]);
	}

	//compiles the group field
        for(i = 0; i < groupKeys.length; i++){
               groupFinal.push(data[groupKeys[i]]);
        }

	//compiles the value field
        for(i = 0; i < valueKeys.length; i++){
                valueFinal.push(data[valueKeys[i]]);
        }

	var returnObj = new Object;
	returnObj.series = seriesFinal;
	returnObj.group = groupFinal;
	returnObj.value = valueFinal;

	return returnObj;
	 }
  }
  

  return { dataset }
}
