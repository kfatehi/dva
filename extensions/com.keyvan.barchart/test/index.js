var $ = require('jquery');
var d3 = require('d3');
var ext = require('../index.js');

$(function() {
  d3.csv('data.csv', function(err, data) {
    if (err) throw err;

    var majors = {}
    data.forEach(function(d) {
      if (majors[d.Major]) {
        majors[d.Major] ++;
      } else {
        majors[d.Major] = 1;
      }
    })

    var majorNames = Object.keys(majors);
    var majorValues = [];

    majorNames.forEach(function(name) {
      majorValues.push(majors[name]);
    })

    var div = $('<div>');
    $('body').append(div)

    console.log(majorValues);

    ext.render(div.get(0), {
      width: 500,
      height: 400,
      data: majorValues,
      buckets: null,
      props: null
    })
  });
})
