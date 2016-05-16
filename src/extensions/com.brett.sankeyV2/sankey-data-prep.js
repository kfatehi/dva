import d3 from "d3"

export default function (data){
  //creates the structure of our prepared data
  var prepedGraph = {"nodes" : [], "links" : []};

  //cycles through the unprepared data to populate our new formatting
  data.forEach(function(d){
    //pushes the soure node of a data entry into our node list
    prepedGraph['nodes'].push({"name" : d['source']});

    //pushes the target node of a data entry into our node list
    prepedGraph['nodes'].push({"name" : d['target']});

    //populates all of the links
    prepedGraph['links'].push({ "source" : d['source'],
                                "target" : d['target'],
                                "value"  : parseInt(d['value'])
                            });
  });
 
  //***Disclaimer: there are better ways to get non-duplicates, but this will work for what
  //                we are doing
     
  //used to temporarily store all of the unique names before being
  //  pushed back into the prepedFraph instance
  var nameArr = [];

  //placing just the  names into an array
  prepedGraph['nodes'].forEach(function(d){
    nameArr.push(d['name']);
  });

  //determining the unique names
  var uniqueArr = nameArr.filter(function(n, i){
    return nameArr.indexOf(n) == i;
  })

  //pushes the uniqes back into the preped graph notes as an array of names
  prepedGraph['nodes'] = uniqueArr;

  //converts all of the links from names to index numbers
  prepedGraph['links'].forEach(function (d, i){
    prepedGraph['links'][i]['source'] = prepedGraph['nodes'].indexOf(prepedGraph['links'][i]['source']);
    prepedGraph['links'][i]['target'] = prepedGraph['nodes'].indexOf(prepedGraph['links'][i]['target']);
  });
 

  //we need to rid all of the duplicates from the nodes list and make the names an array
  //of objects
  prepedGraph['nodes'].forEach(function(d, i){
    prepedGraph['nodes'][i] = {"name" : d};   
  });

  return prepedGraph;
}


