var webpack = require('webpack');

module.exports = {
  devtool: 'eval-source-map',
  entry: {
    bundle: `${__dirname}/src/index.js`,
    vendor: ['react-dom', 'redux', 'react']
  },
  output: {
    path: `${__dirname}/public`,
    library: 'bundle',
    filename: 'js/bundle.js'
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
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin("vendor", "js/vendor.bundle.js")
  ]
};
