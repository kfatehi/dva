export function getIds() {
  return [
    'com.keyvan.barchart'
  ]
}

export function getSchema(id) {
  return require(`../extensions/${id}/schema.json`)
}
