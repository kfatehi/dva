var d3 = require('d3');
var ext = require('../');

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
  var majorData = [];

  majorNames.forEach(function(name) {
    majorValues.push(majors[name]);
    majorData.push({
      value: majors[name],
      name: name
    })
  })

  ext.render(document.getElementById("container"), {
    width: 500,
    height: 400,
    data: majorData,
    buckets: {
      value: ["major-count"],
      name: ["major"]
    },
    props: {
      "bar-color": "blue"
    }
  })
});
