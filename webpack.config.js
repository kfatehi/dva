var path = require('path');

module.exports = {
  devtool: 'eval-source-map',
  entry: path.join(__dirname, './js/index.js'),
  output: {
    path: path.join(__dirname, 'js/dst'),
    library: 'myapp',
    filename: 'myapp.js'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },

  externals: {
    'React': 'React',
    'Redux': 'Redux',
    'react-dom': 'ReactDOM'
  }
};
