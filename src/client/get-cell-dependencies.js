export function getDependentCell(cellsById, cellId) {
  return cellsById.reduce((dep, cell, key) => {
    let parentId = cell.get('parentId');
    return parentId === cellId ? key : dep
  }, null)
}
