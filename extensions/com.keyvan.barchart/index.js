var d3 = require('d3');

module.exports = {
  render: function(container, config) {
    console.log(container, config);
    d3.select(".chart")
    .selectAll("div")
    .data(config.data)
    .enter().append("div")
    .style("width", function(d) { return d * 10 + "px"; })
    .text(function(d) { return d; });
  }
}
