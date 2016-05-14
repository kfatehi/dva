import d3 from 'd3';

// first parameter is a div container that will hold your vesialization
// second parameter is a configuration object that you should use to
// build your visualization
// config = {
//    width: num,
//    height: num,
//    props: {...}, properites that were parsed according to your schema
//    data: [{...}, {...}, ...] an array of json object that were parsed
//    according to what user selected and defined by you bucket mapping
// }

export function render(container, config) {
  let props = config.props;
  let data = config.data;

var units = "Widgets";

var margin = {top: 10, right: 10, bottom: 10, left: 10},
    width = 700 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

var formatNumber = d3.format(",.0f"),    // zero decimal places
    format = function(d) { return formatNumber(d) + " " + units; },
    color = d3.scale.category20();

// append the svg canvas to the page
var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

// Set the sankey diagram properties
var sankey = d3.sankey()
    .nodeWidth(36)
    .nodePadding(40)
    .size([width, height]);

var path = sankey.link();

  //set up graph in same style as original example but empty
  graph = {"nodes" : [], "links" : []};

    data.forEach(function (d) {
      graph.nodes.push({ "name": d['source']});
      graph.nodes.push({ "name": d['target']});
      graph.links.push({ "source": d['source'],
                         "target": d['target'],
                         "value": +d['value'] });
     });

     // return only the distinct / unique nodes
     graph.nodes = d3.keys(d3.nest()
       .key(function (d) { return d.name; })
       .map(graph.nodes));	

}
