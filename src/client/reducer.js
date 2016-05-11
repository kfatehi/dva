import { List, Map, fromJS } from 'immutable';

import { setSourceData } from './set-source-data';

function setVisualizationExtensions(state, action) {
  return state.updateIn(["viz", "available"], () => {
    return List(action.extensions.map(ext => Map(ext)));
  })
}

function setVisualizationSchema(state, action) {
  return state
    .updateIn(['viz', 'selected', 'id'], () => action.schema.info.id)
    .updateIn(['viz', 'selected', 'buckets'], () => fromJS(action.schema.buckets))
}

export default function (state = Map(), action) {
  switch (action.type) {
    case 'SET_SOURCE_DATA':
      return setSourceData(state, action);
    case 'SET_VISUALIZATION_EXTENSIONS':
      return setVisualizationExtensions(state, action);
    case 'SET_VISUALIZATION_SCHEMA':
      return setVisualizationSchema(state, action);
  }
  return state;
}
