export function selectExtension(id) {
  return {
    meta: { remote: true },
    type: "SELECT_VISUALIZATION_EXTENSION",
    id
  }
}

export function draggedToBucket(columnIndex, bucketKey) {
  console.log('dragged to bucket', columnIndex, bucketKey);
  return {
    type: 'DRAGGED_TO_BUCKET',
    columnIndex,
    bucketKey
  }
}
