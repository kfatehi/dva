import { List, Map, fromJS } from 'immutable';

import { parseData } from '../parsers';

function getDataFromDataCell(cell, options = {}) {
  const override = key => current => options[key] || current;
  const get = key => cell.update(key, override(key)).get(key);
  return fromJS(parseData(get('parser'),get('data'))) || List();
}

export default function getCellData(cellsById, cellId, options = {}) {
  let root = cellsById.get(cellId).update('parentId', parentId => {
    if (options.parentOverride) return options.parentOverride;
    else return parentId;
  })
  let getParent = cell => cellsById.get(cell.get('parentId'));
  switch (root.get('cellType')) {
    case 'DATA':
      return getDataFromDataCell(root, options);
    case 'TRANSFORM':
      return transformTo(getParent, root, List(), options);
    case 'VISUALIZATION':
      return transformTo(getParent, getParent(root), List(), options);
  }
  return List();
}

function transformTo(getCellParent, cell, _chain = List(), options = {}) {
  const locals = [{
    name: 'List', ref: List,
  },{
    name: 'Map', ref: Map
  }]
  const parentId = cell.get('parentId');
  if (parentId) {
    const funcStr = options.funcOverride || cell.get('func');
    const func = Function('data', ...locals.map(i=>i.name), funcStr);
    const chain = _chain.push(func);
    const parentCell = getCellParent(cell)
    let applyChain = (chain, data) => {
      return chain.reverse().reduce((data,fn) => {
        let args = [data].concat(locals.map(i=>i.ref));
        return fn(...args)
      }, data);
    }
    switch (parentCell.get('cellType')) {
      case 'DATA':
        return applyChain(chain,  getDataFromDataCell(parentCell));
      case 'TRANSFORM':
        return transformTo(getCellParent, parentCell, chain);
    }
  } else {
    return getDataFromDataCell(cell);
  }
}

export function isCircular(cellsById, cellId, seen=Map()) {
  if (seen.get(cellId)) return true;
  if (cellId) {
    return isCircular(
      cellsById,
      cellsById.getIn([cellId, 'parentId']),
      seen.update(cellId, () => true)
    );
  } else {
    return false;
  }
}

export function getParentCandidates(cells, cellsById, cellId) {
  return cells.filter( id => {
    // you cannot make a cell a parent of itself
    if (id === cellId) return false;

    const type = cellsById.getIn([id, 'cellType']);

    // a DATA cell can always be a parent to other cells
    if (type === 'DATA') return true;

    // transforms can be parents
    if (type === 'TRANSFORM') {
      // but be wary of circular dependencies
      const parentId = cellsById.getIn([id, 'parentId']);

      return isCircular(
        cellsById.updateIn([ cellId, 'parentId' ], () => id),
        cellId
      ) ? false : true
    }

    // otherwise do not show this cell as an option
    return false;
  })
}
