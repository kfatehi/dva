var viz = require('')
var d3 = require('d3');

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

  viz.render(document.body, {
    width: 500,
    height: 400,
    data: majorValues,
    buckets: null,
    props: null
  })
});
