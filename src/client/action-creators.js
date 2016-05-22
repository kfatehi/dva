import genUUID from '../uuid';

export function draggedToBucket(columnIndex, bucketKey) {
  return {
    type: 'DRAGGED_TO_BUCKET',
    columnIndex,
    bucketKey
  }
}

export function appendCell(cellType, props) {
  return Object.assign({}, {
    type: "APPEND_CELL", cellType,
    uuid: genUUID()
  }, props);
}

export function editCell(cellId) {
  return {
    type: "EDIT_CELL",
    uuid: cellId,
  }
}

export function updateCell(cellId, params) {
  return {
    type: "UPDATE_CELL",
    uuid: cellId,
    params
  };
}

export function cancelEditCell(cellId) {
  return {
    type: "CANCEL_EDIT_CELL",
    uuid: cellId
  };
}

export function toggleCompressCell(cellId) {
  return {
    type: "TOGGLE_COMPRESS_CELL",
    uuid: cellId,
  }
}

export function removeCell(cellId) {
  return {
    type: "REMOVE_CELL",
    uuid: cellId,
  }
}

export function moveCellUp(cellId) {
  return {
    type: "MOVE_CELL_UP",
    uuid: cellId,
  }
}

export function moveCellDown(cellId) {
  return {
    type: "MOVE_CELL_DOWN",
    uuid: cellId,
  }
}

export function loadNotebook(uuid) {
  return {
    meta: { remote: true },
    type: 'LOAD_NOTEBOOK', uuid
  }
}

export function unsetNotebook() {
  return {
    type: 'UNSET_NOTEBOOK'
  }
}
