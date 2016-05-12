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

  var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = config.width - margin.left - margin.right,
    height = config.height - margin.top - margin.bottom;

  var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

  var y = d3.scale.linear()
    .range([height, 0]);

  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10, "%");

  var svg = d3.select(container)
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  x.domain(data.map(function(d) { return d['group']; }));
  y.domain([0, d3.max(data, function(d) { return +d['value']; })]);

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Value");

  svg.selectAll(".bar")
    .data(data)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return x(d['group']); })
    .attr("width", x.rangeBand())
    .attr("y", function(d) { return y(+d['value']); })
    .attr("height", function(d) { return height - y(+d['value']); });
}
