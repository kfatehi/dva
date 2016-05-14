export function getIds() {
  return [
    'com.keyvan.barchart',
    'com.keyvan.barchart2'
  ]
}

export function getExtensions() {
  return getIds().map(id => getSchema(id));
}

export function getSchema(id) {
  return require(`../extensions/${id}/schema.json`)
}

function getStyleHandle(id) {
  try {
    return require(`../extensions/${id}/style.useable.css`);
  } catch (e) {
    return {
      use: () => {},
      unuse: () => {}
    }
  }
}

export function getModule(id) {
  return {
    render: require(`../extensions/${id}/index.js`).render,
    style: getStyleHandle(id)
  }
}
