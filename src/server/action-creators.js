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


export function setNotebook(notebook) {
  return {
    type: 'SET_NOTEBOOK',
    notebook
  }
}
