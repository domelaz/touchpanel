'use strict';

const path = require('path');

module.exports = {
  options: {
    webpack: {
      entry: [
        path.join(__dirname, '../src/app.tsx')
      ],
      devtool: 'sourcemap',
      output: {
        filename: 'scripts.js',
        pathinfo: true,
      },
      plugins: [],
      module: {
        loaders: [{
          test: /\.tsx?$/,
          loader: 'webpack-typescript',
          include: path.join(__dirname, '../src/'),
          query: {
            target: 'ES5',
            jsx: 'react',
          }
        }]
      }
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
