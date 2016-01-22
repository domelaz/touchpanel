'use strict';

const options = require('./webpack.commons.js');

module.exports = {
  options: {
    webpack: options, 
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
