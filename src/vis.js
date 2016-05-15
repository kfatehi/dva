import { Map, List, fromJS } from 'immutable';
import applyBucketMapping from './apply-bucket-mapping';

function newVisConfig() {
  return Map({
    config: Map({}),
    bucketMapping: Map({
      bucketMap: Map({}),
      columnMap: Map({})
    })
  });
}

export function genVizConfig(columns, rows, bucketMapping) {
  let zippedRows = zipColumnsRows(columns, rows).toJS();
  return Map({
    height: 500,
    width: 500,
    data: fromJS(applyBucketMapping(zippedRows, bucketMapping.toJS()))
  })
}

function zipColumnsRows(columns, rows) {
  return rows.map(row => {
    return columns
      .zip(row)
      .map(pair => Map([pair]))
      .reduce((a, b) => a.merge(b))
  })
}

export function bucketsFilled(schemaBuckets, bucketMap) {
  return fromJS(schemaBuckets).reduce((yes, bucket) => {
    let list = bucketMap.get(bucket.get('key'))
    if (!list) return false;
    let size = list.size;
    let min = bucket.get('min');
    let max = bucket.get('max');
    return yes && size >= min && size <= max;
  }, true)
}

export function mkVisConfigFromJSON(visConfigJSON) {
  let visConfig = null;
  if (visConfigJSON && visConfigJSON.length > 0) {
    visConfig = fromJS(JSON.parse(visConfigJSON))
  } else {
    visConfig = newVisConfig()
  }
  return visConfig
}

export function generateVisConfig(visConfigJSON, rows, columns) {
  let visConfig = mkVisConfigFromJSON(visConfigJSON);
  let bucketMap = visConfig.getIn(['bucketMapping', 'bucketMap']);
  return genVizConfig(columns, rows, bucketMap)
}
