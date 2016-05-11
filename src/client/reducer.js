import { List, Map, fromJS } from 'immutable';

import { setSourceData } from './set-source-data';

function setVisualizationExtensions(state, action) {
  return state.updateIn(["viz", "available"], () => {
    return List(action.extensions.map(ext => Map(ext)));
  })
}

function setVisualizationSchema(state, action) {
  let buckets = fromJS(action.schema.buckets);
  let bktMapping = Map(buckets.map(bkt => [bkt.get('key'), List()]));
  return state
    .updateIn(['viz', 'selected', 'id'], () => action.schema.info.id)
    .updateIn(['viz', 'selected', 'buckets'], () => buckets)
    .updateIn(['viz', 'selected', 'bucketMapping'], () => bktMapping)
}

function draggedToBucket(state, action) {
  let { columnIndex, bucketKey } = action;
  let col = state.getIn(['data', 'sink', 'columns']).get(columnIndex);
  return state
    .updateIn(['viz', 'selected', 'bucketMapping'], bktMapping => {
      return bktMapping.map((list, key) => {
        let index = list.findIndex(() => col);
        let included = index >= 0;
        if (key === bucketKey)
          return included ? list : list.push(col);
        else if (key !== bucketKey && included)
          return list.remove(index);
        else
          return list;
      })
    })
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
