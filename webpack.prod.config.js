const { join } = require('path');

module.exports = {
  entry: [
    join(__dirname, '/src/')
  ],
  output: {
    path: __dirname,
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
