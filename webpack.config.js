const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: {
    bundle: `${__dirname}/src/client/index.jsx`,
    vendor: [
      'redux',
      'redux-immutablejs',
      'react-codemirror',
      'redux-form',
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'react-dnd',
      'react-dnd-html5-backend',
      'react-addons-pure-render-mixin',
      'react-faux-dom',
      'react-bootstrap',
      'react-fontawesome',
      'react-markdown',
      'd3',
      'socket.io-client',
      'immutable',
      'debounce',
      'babel-standalone',
      'font-awesome/less/font-awesome.less',
      'bootstrap/less/bootstrap.less',
      'codemirror/lib/codemirror.css',
      'codemirror/mode/markdown/markdown',
      'codemirror/mode/javascript/javascript',
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
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.css$/, exclude: /\.useable\.css$/, loader: "style!css" },
      { test: /\.useable\.css$/, loader: "style/useable!css" },
      { test: /\.json/, loader: "json" },
      { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
      { test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
      { test: /\.md$/, loader: "raw" },
      { test: /\.jpe?g$/, loader: "file" },
      { test: /\.gif$/, loader: "file" },
      { test: /\.csv$/, loader: "raw" },
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js"),
  ]
};
