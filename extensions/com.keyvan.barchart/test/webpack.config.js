module.exports = {
  entry: `${__dirname}/index.js`,
  output: {
    path: `${__dirname}`,
    library: "test",
    filename: 'bundle.js'
  }
}
