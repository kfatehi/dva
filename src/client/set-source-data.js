import { List, Map } from 'immutable';

function applyTransforms(columns, rows, transforms) {
  // TBD
  return Map({ columns, rows })
}

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

function computeSink(columns, rows, transforms) {
  let ir = applyTransforms(columns, rows, transforms);
  return Map({
    columns: ir.get('columns'),
    rows: ir.get('rows'),
    measures: parseMeasures(ir.get('rows').first()),
    dimensions: parseDimensions(ir.get('rows').first())
  })
}

export function setSourceData(state, action) {
  const columns = List(action.columns);
  const rows = List(action.rows.map(r=>List(r)));
  const sourceData = Map({ columns, rows});
  const transforms = List();
  const sink = computeSink(columns, rows, transforms);
  return state
    .updateIn(['source'], data => sourceData)
    .updateIn(['transforms'], () => transforms)
    .updateIn(['sink'], () => sink)
}
