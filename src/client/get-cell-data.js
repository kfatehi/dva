import { List } from 'immutable';

export default function getCellData(cellsById, cellId) {
  let root = cellsById.get(cellId);
  switch (root.get('cellType')) {
    case 'DATA':
      return root.get('data');
    case 'TRANSFORM':
      return transformTo(parentGetter(cellsById), root);
  }
  return List();
}

function parentGetter(cellsById) {
  return function(cell) {
    return cellsById.get(cell.get('parentId'));
  }
}

function transformTo(getCellParent, cell, _chain = List()) {
  const parentId = cell.get('parentId');
  const chain = _chain.push(Function("data", cell.get('func')))
  const parentCell = getCellParent(cell)

  switch (parentCell.get('cellType')) {
    case 'DATA':
      return applyChain(chain, parentCell.get('data'))
    case 'TRANSFORM':
      return transformTo(getCellParent, parentCell, chain);
  }
}

function applyChain(chain, data) {
  return chain.reverse().reduce((data,fn) => fn(data), data)
}
