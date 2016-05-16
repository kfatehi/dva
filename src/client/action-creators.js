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
