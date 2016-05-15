import { List, Map } from 'immutable';

export default function getCellData(cellsById, cellId, options = {}) {
  let root = cellsById.get(cellId).update('parentId', parentId => {
    if (options.parentOverride) return options.parentOverride;
    else return parentId;
  })
  let getParent = cell => cellsById.get(cell.get('parentId'));
  switch (root.get('cellType')) {
    case 'DATA':
      return root.get('data');
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
      return applyChain(chain, parentCell.get('data'));
    case 'TRANSFORM':
      return transformTo(getCellParent, parentCell, chain);
  }
}
