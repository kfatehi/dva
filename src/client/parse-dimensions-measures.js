function parsesAsNumber(val) {
  return !isNaN(+val)
}

function parseMeasures(values) {
  return values.map(function(val, i) {
    return parsesAsNumber(val) ? i : null;
  }).filterNot(a => a === null);
}

function parseDimensions(values) {
  return values.map(function(val, i) {
    return parsesAsNumber(val) ? null : i;
  }).filterNot(a => a === null);
}

export default function(row) {
  return {
    measures: parseMeasures(row),
    dimensions: parseDimensions(row)
  };
}
