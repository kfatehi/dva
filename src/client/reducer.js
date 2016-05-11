import { List, Map, fromJS } from 'immutable';

import { setSourceData } from './set-source-data';

import applyBucketMapping from '../apply-bucket-mapping';

function setVisualizationExtensions(state, action) {
  return state.updateIn(["viz", "available"], () => {
    return List(action.extensions.map(ext => Map(ext)));
  })
}

function setVisualizationSchema(state, action) {
  let buckets = fromJS(action.schema.buckets);
  return state
    .updateIn(['viz', 'selected', 'id'], () => action.schema.info.id)
    .updateIn(['viz', 'selected', 'buckets'], () => buckets)
    .updateIn(['viz', 'selected', 'bucketMapping'], () => {
      return Map({
        columnMap: Map({}),
        bucketMap: Map(buckets.map(bkt => [bkt.get('key'), List()]))
      })
    })
}

function draggedToBucket(state, action) {
  let { columnIndex, bucketKey } = action;
  let columnKey = String(columnIndex);
  let columns = state.getIn(['data', 'sink', 'columns']);
  let schemaBuckets = state.getIn(['viz','selected','buckets'])
  let name = columns.get(columnIndex);
  return state.updateIn(['viz', 'selected'], tmp => {
    let vizSelected = tmp.update('bucketMapping', old => {
      let bucketMapping = old.updateIn(['columnMap', columnKey], () => bucketKey)
      let colMap = bucketMapping.get('columnMap')
      return bucketMapping
        .update('bucketMap', () => genBucketMap(colMap, schemaBuckets, columns));
    })
    
    return vizSelected.update('config', () => {
      let rows = state.getIn(['data', 'sink', 'rows']);
      let bucketMap = vizSelected.getIn(['bucketMapping','bucketMap']);
      return genVizConfig(columns, rows, bucketMap)
    })
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

function genVizConfig(columns, rows, bucketMapping) {
  let zippedRows = zipColumnsRows(columns, rows).toJS();
  try {
    return Map({
      height: 500,
      width: 500,
      data: fromJS(applyBucketMapping(zippedRows, bucketMapping.toJS()))
    })
  } catch (e) {
    return null;
  }
}

function genBucketMap(columnMap, schemaBuckets, columns) {
  return Map(schemaBuckets.map(bucket => {
    let bucketKey = bucket.get('key');
    let list = columns.filter((colName, i) => {
      return columnMap.get(String(i)) === bucketKey;
    })
    return [bucketKey, list]
  }))
}

export default function (state = Map(), action) {
  switch (action.type) {
    case 'SET_SOURCE_DATA':
      return setSourceData(state, action);
    case 'SET_VISUALIZATION_EXTENSIONS':
      return setVisualizationExtensions(state, action);
    case 'SET_VISUALIZATION_SCHEMA':
      return setVisualizationSchema(state, action);
    case 'DRAGGED_TO_BUCKET':
      return draggedToBucket(state, action);
  }
  return state;
}
