import genUUID from '../uuid';

export function appendCell(cellType, props) {
  return Object.assign({}, {
    meta: { remote: true },
    type: "APPEND_CELL", cellType,
    uuid: genUUID()
  }, props);
}

export function editNotebook() {
  return {
    type: "EDIT_NOTEBOOK",
  }
}

export function updateNotebook(params) {
  return {
    meta: { remote: true },
    type: "UPDATE_NOTEBOOK",
    params
  }
}

export function cancelEditNotebook() {
  return {
    type: "CANCEL_EDIT_NOTEBOOK"
  };
}

export function editCell(cellId) {
  return {
    type: "EDIT_CELL",
    uuid: cellId,
  }
}

export function updateCell(cellId, params) {
  return {
    meta: { remote: true },
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
    meta: { remote: true },
    type: "TOGGLE_COMPRESS_CELL",
    uuid: cellId,
  }
}

export function removeCell(cellId) {
  return {
    meta: { remote: true },
    type: "REMOVE_CELL",
    uuid: cellId,
  }
}

export function moveCellUp(cellId) {
  return {
    meta: { remote: true },
    type: "MOVE_CELL_UP",
    uuid: cellId,
  }
}

export function moveCellDown(cellId) {
  return {
    meta: { remote: true },
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

export function createNewNotebook() {
  return {
    meta: { remote: true },
    type: 'CREATE_NEW_NOTEBOOK'
  }
}
