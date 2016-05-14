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

function transformTo(getCellParent, cell) {
  const parentId = cell.get('parentId');

  let funcChain = List.of(Function("data", cell.get('func')));

  // go through parents until you find a DATA
  const parentCell = getCellParent(cell)

  if (parentCell.get('cellType') === 'DATA') {
    // get the data and run the func chain
    return funcChain.reduce((data,fn) => fn(data), parentCell.get('data'))
  } else {
    return null;
  }
}
