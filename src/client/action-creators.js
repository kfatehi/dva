export function selectExtension(id) {
  return {
    meta: { remote: true },
    type: "SELECT_VISUALIZATION_EXTENSION",
    id: id
  }
}
