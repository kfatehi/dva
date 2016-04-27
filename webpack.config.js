const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'eval-source-map',
  entry: {
    bundle: `${__dirname}/src/client/index.js`,
    vendor: [
      'react-dom',
      'redux',
      'react',
      'react-redux',
      'react-router',
      'react-router-redux',
      'scroll-behavior'
    ]
  },
  output: {
    path: `${__dirname}/public`,
    library: 'bundle',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel'
    },{
      test: /\.css$/i,
      loader: ExtractTextPlugin.extract("style-loader", "css-loader")
    }]
  },
  plugins: [
    new ExtractTextPlugin('style.css'),
    new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js")
  ]
};
