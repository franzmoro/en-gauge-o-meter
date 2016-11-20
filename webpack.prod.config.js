const { join } = require('path');

module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: join(__dirname, '/public'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel'], exclude: /node_modules/ },
    ],
  }
}
