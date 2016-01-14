'use strict';

module.exports = {
  app: {
    options: {
      compress: process.env.NORD_DEBUG ? false : true
    },
    files: {
      'app/css/styles.css': 'less/<%= pkg.name %>.less'
    }
  }
};
