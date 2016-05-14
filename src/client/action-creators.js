import genUUID from '../uuid';

export function selectExtension(id) {
  return {
    meta: { remote: true },
    type: "SELECT_VISUALIZATION_EXTENSION",
    id
  }
}

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
