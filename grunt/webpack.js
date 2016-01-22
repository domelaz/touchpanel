'use strict';

const webpack = require('webpack');
const options = require('./webpack.commons.js');

module.exports = {
  options: options,
  dev: {
    debug: true,
    devtool: 'sourcemap',
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
