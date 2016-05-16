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

    function createVisualizationCell(action) {
      return Map({
        cellType: 'VISUALIZATION',
        name: action.name,
        parentId: action.parentId
      })
    }

    function createMarkdownCell(action) {
      return Map({
        cellType: 'MARKDOWN',
        name: action.name,
        markdown: action.markdown
      })
    }

    switch (action.cellType) {
      case 'DATA':
        return createDataCell(action);
      case 'TRANSFORM':
        return createTransformCell(action);
      case 'VISUALIZATION':
        return createVisualizationCell(action);
      case 'MARKDOWN':
        return createMarkdownCell(action);
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

  function editCell(state, uuid) {
    return state.update('editingCell', () => uuid);
  }

  function updateCell(state, uuid, params) {
    return state.mergeIn(['cellsById', uuid], params).remove('editingCell');
  }

  function cancelEditCell(state, uuid) {
    return state.remove('editingCell');
  }

  switch (action.type) {
    case 'APPEND_CELL':
      return appendCell(state, action.uuid, createCell(action));
    case 'EDIT_CELL':
      return editCell(state, action.uuid);
    case 'UPDATE_CELL':
      return updateCell(state, action.uuid, action.params);
    case 'CANCEL_EDIT_CELL':
      return cancelEditCell(state, action.uuid);
  }
  return state;
}
