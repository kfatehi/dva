import { Map, List, fromJS } from 'immutable';

export function notebook(state = Map(), action) {
  function createCell(action) {
    function createDataCell(action) {
      function parseData(contentType, data) {
        switch (contentType) {
          case 'application/json':
            return fromJS(JSON.parse(data));
        }
      }
      return Map({
        cellType: 'DATA',
        name: action.name,
        data: parseData(action.contentType, action.data)
      })
    }

    function createTransformCell(action) {
      return Map({
        cellType: 'TRANSFORM',
        name: action.name,
        parentId: action.parentId,
        func: action.func
      })
    }

    switch (action.cellType) {
      case 'DATA':
        return createDataCell(action);
      case 'TRANSFORM':
        return createTransformCell(action);
    }
  }

  function appendCell(state, uuid, cell) {
    return state
      .updateIn(['cellsById', uuid], () => cell)
      .update('cells', list => {
        if (list) return list.push(uuid);
        else return List.of(uuid);
      })
  }

  function flagNotebook(state, uuid, key, value) {
    return state.update(key, () => value ? uuid : false);
  }

  function updateCell(state, uuid, key, value) {
    return state.updateIn(['cellsById', uuid, key], () => value);
  }

  switch (action.type) {
    case 'APPEND_CELL':
      return appendCell(state, action.uuid, createCell(action));
    case 'FLAG_NOTEBOOK':
      return flagNotebook(state, action.uuid, action.key, action.value);
    case 'UPDATE_CELL':
      return updateCell(state, action.uuid, action.key, action.value);
  }
  return state;
}
