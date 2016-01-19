'use strict';

const path = require('path');

module.exports = {
  options: {
    webpack: {
      entry: [
        path.join(__dirname, '../src/client')
      ],
      devtool: 'sourcemap',
      output: {
        filename: 'scripts.js',
        pathinfo: true,
      },
      plugins: [],
    },
    host: 'localhost',
    hot: true,
    inline: true,
    contentBase: './<%= dist %>/',
    publicPath: 'http://localhost:8080/js/',
    debug: true,
  },
  webpack: {
    keepAlive: true,
  }
};
