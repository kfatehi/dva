import { List, Map, fromJS } from 'immutable';

import { setSourceData } from './set-source-data';

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
  return state
    .updateIn(['viz', 'selected', 'bucketMapping'], old => {
      let bucketMapping = old.updateIn(['columnMap', columnKey], () => bucketKey)
      let colMap = bucketMapping.get('columnMap')
      return bucketMapping
        .update('bucketMap', () => genBucketMap(colMap, schemaBuckets, columns));
    })
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
