/**
 * apply a bucket mapping to a dataset
 */
export default function applyBucketMapping(data, mapping) {

  //array of the compilation of all the mappings
  var returnObj = [];

  //gets all of the keys in the json mapping file. These keys 
  //	will be used in the final mapping of the attributes
  var mappingKeys = Object.keys(mapping);

  //loops through the entire data input file
  var dataLine;
  for(dataLine = 0; dataLine < data.length; dataLine++){

    //tmp object to compile the map for a single data input element
    var tmpDataMapping = {};

    //contains the entire single JSON data element to be mapped
    var currentDataLine = data[dataLine];

    //loops through the keys that were provided in the mapping file
    var mapKeyCt;
    for(mapKeyCt = 0; mapKeyCt < mappingKeys.length; mapKeyCt++){

      //contains the current key that was declared within the mapping file        
      var currentKey = mappingKeys[mapKeyCt];

      //will store all of the values associated with the attributes
      var tmpAttributeArr = [];

      //loops through all of the attributes specified by each key in the mapping file
      var keyAttribute;
      for(keyAttribute = 0; keyAttribute < mapping[mappingKeys[mapKeyCt]].length; keyAttribute++){

        //stores the current attribute based on what was listed within the mapping file
        var currentAttribute = mapping[currentKey][keyAttribute]; 				

        //places the actual attribute into the tmp array
        tmpAttributeArr.push(currentDataLine[currentAttribute]);				  

      }

      //pushes all of the attributes for a key into a temporary object
      tmpDataMapping[currentKey] = tmpAttributeArr;	
    }

    //pushes the temporary object into an array for returning
    returnObj.push(tmpDataMapping);
  }

  return returnObj;
}
