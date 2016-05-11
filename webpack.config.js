const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'eval-source-map',
  entry: {
    bundle: `${__dirname}/src/client/index.jsx`,
    vendor: [
      'redux',
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'react-dnd',
      'react-dnd-html5-backend',
      'react-addons-pure-render-mixin',
      'react-faux-dom',
      'd3',
      'socket.io-client',
      'immutable',
    ]
  },
  output: {
    path: `${__dirname}/public`,
    library: 'bundle',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
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
