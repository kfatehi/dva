module.exports = {
  devtool: 'eval-source-map',
  entry: `${__dirname}/src/index.js`,
  output: {
    path: `${__dirname}/public`,
    library: 'app',
    filename: 'js/app.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'react']
      }
    }]
  }
};
