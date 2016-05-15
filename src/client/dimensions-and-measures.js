import { List } from 'immutable';


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

export function parse(row) {
  try {
    return {
      measures: parseMeasures(row),
      dimensions: parseDimensions(row)
    };
  } catch (e) {
    return {
      measures: List([]),
      dimensions: List([])
    }
  }
}

export function getDimensions(dimensions, columns) {
  return dimensions.map(columnIndex => {
    return {columnIndex, name: columns.get(columnIndex)}
  });
}

export function getMeasures(measures, columns) {
  return measures.map(columnIndex => {
    return {columnIndex, name: columns.get(columnIndex)}
  });
}
