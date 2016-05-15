export default function (data){
  //creates the structure of our prepared data
  var prepedGraph = {"nodes" : [], "links" : []};

  //cycles through the unprepared data to populate our new formatting
  data.forEach(function(d){
    //pushes the soure node of a data entry into our node list
    prepedGraph.nodes.push({"Name" : d['source']});

    //pushes the target node of a data entry into our node list
    prepedGraph.nodes.push({"Name" : d['target']});

    //populates all of the links
    prepedGraph.links.push({"source" : d['source'],
                            "target" : d['target'],
                            "value"  : parseInt(d['value'])
                            });
  });
  
  var uniqueNodes = {};

  //we need to rid all of the duplicates from the nodes list
/*  prepedGraph['nodes'] = d3.keys(
                          d3.nest()
                            .key(function (d){ return d.name; })
                              .map(prepedGraph['nodes']));
*/

  console.log(prepedGraph['nodes']);
 return prepedGraph;
}


