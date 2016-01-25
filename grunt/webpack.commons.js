'use strict';

const path = require('path');

module.exports = {
  entry: [
    path.join(__dirname, '../src/app.tsx')
  ],
  output: {
    path: path.join(__dirname, '../<%= dist %>/js'),
    filename: 'scripts.js',
    pathinfo: true,
  },
  resolve: {
    root: [
      path.join(__dirname, '../src/')
    ],
    extensions: ['', '.js', '.ts', '.tsx']
  },
  plugins: [],
  module: {
    loaders: [{
      test: /\.tsx?$/,
      loader: 'webpack-typescript',
      include: path.join(__dirname, '../src/'),
      query: {
        module: 'commonjs',
        target: 'ES5',
        jsx: 'react',
      }
    }]
  },
  devtool: 'sourcemap',
};
