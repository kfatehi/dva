import { Map, List, fromJS } from 'immutable';


function parseData(contentType, data) {
  switch (contentType) {
    case 'application/json':
      return fromJS(JSON.parse(data));
  }
}

function createDataCell(action) {
  return Map({
    name: action.name,
    cellType: 'DATA',
    data: parseData(action.contentType, action.data)
  })
}

function createCell(action) {
  switch (action.cellType) {
    case 'DATA':
      return createDataCell(action);
  }
}

function appendCell(state, uuid, cell) {
  return state
    .updateIn(['cellsById', uuid], () => cell)
    .update('cells', list => {
      if (list) return list.push(uuid);
      else return List.of(uuid);
    })
}

export function notebook(state = Map(), action) {
  switch (action.type) {
    case 'APPEND_CELL':
      return appendCell(state, action.uuid, createCell(action));
  }
}
