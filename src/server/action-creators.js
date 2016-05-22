export function setNotebooks(notebooks) {
  return {
    type: 'SET_NOTEBOOKS',
    notebooks: notebooks.map(nb=>{
      return {
        uuid: nb.uuid,
        name: nb.name,
      }
    })
  }
}


export function setNotebook(uuid, cells, cellsById) {
  return {
    type: 'SET_NOTEBOOK',
    uuid, cells, cellsById
  }
}
