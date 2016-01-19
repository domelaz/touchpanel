'use strict';

const webpack = require('webpack');
const path = require('path');

module.exports = {
  options: {
    output: {
      path: path.join(__dirname, '../<%= dist %>/js'),
      filename: 'scripts.js'
    },
    entry: [
      path.join(__dirname, '../src/client'),
    ]
  },
  dev: {
    debug: true,
    devtool: 'sourcemap',
    output: {
      pathinfo: true,
    },
    plugins: [
      new webpack.DefinePlugin({
        "process.env": {
          "NORD_DEBUG": true
        }
      }),
    ]
  },
  build: {
    plugins: [
      new webpack.DefinePlugin({
        'process-env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin()
    ]
  }
};
