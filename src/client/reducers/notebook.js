import { Map, List, fromJS } from 'immutable';

export function notebook(state = Map(), action) {
  function createCell(action) {
    function createDataCell(action) {
      const { name, parser, data } = action;
      const cellType = 'DATA';
      return Map({ cellType, name, parser, data });
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

  function appendCell(state, uuid, action) {
    const { atIndex } = action;
    const cell = createCell(action);
    return state
      .updateIn(['cellsById', uuid], () => cell)
      .update('cells', list => {
        if (list) {
          if (atIndex === undefined) {
            return list.push(uuid);
          } else {
            return list.insert(atIndex, uuid);
          }
        } else {
          return List.of(uuid);
        }
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

  function toggleCompressCell(state, uuid) {
    const keyPath = ['cellsById', uuid, 'isCompressed'];
    return state.updateIn(keyPath, flag => !!!flag);
  }

  function removeCell(state, uuid) {
    return state
      .removeIn(['cellsById', uuid])
      .update('cells', list => list.filterNot(id=>id===uuid))
  }

  let moveCell = (uuid, direction) => cells => {
    let posA = cells.findIndex(id => id === uuid);
    let posB = posA + direction;
    let valA = uuid;
    let valB = cells.get(posB);
    return cells.set(posB, valA).set(posA, valB);
  }

  function moveCellUp(state, uuid) {
    return state.update('cells', moveCell(uuid, -1));
  }

  function moveCellDown(state, uuid) {
    return state.update('cells', moveCell(uuid, 1));
  }

  function setNotebook(state, action) {
    return state
      .update('uuid', () => action.uuid)
      .update('cells', () => fromJS(action.cells))
      .update('cellsById', () => fromJS(action.cellsById))
  }

  function unsetNotebook(state) {
    return state
      .remove('uuid')
      .remove('cells')
      .remove('cellsById')
  }

  switch (action.type) {
    case 'APPEND_CELL':
      return appendCell(state, action.uuid, action);
    case 'EDIT_CELL':
      return editCell(state, action.uuid);
    case 'UPDATE_CELL':
      return updateCell(state, action.uuid, action.params);
    case 'CANCEL_EDIT_CELL':
      return cancelEditCell(state, action.uuid);
    case 'TOGGLE_COMPRESS_CELL':
      return toggleCompressCell(state, action.uuid);
    case 'REMOVE_CELL':
      return removeCell(state, action.uuid);
    case 'MOVE_CELL_UP':
      return moveCellUp(state, action.uuid);
    case 'MOVE_CELL_DOWN':
      return moveCellDown(state, action.uuid);
    case 'SET_NOTEBOOK':
      return setNotebook(state, action);
    case 'UNSET_NOTEBOOK':
      return unsetNotebook(state);
  }
  return state;
}
