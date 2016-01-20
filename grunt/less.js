'use strict';

module.exports = {
  options: {
    compress: process.env.NORD_DEBUG ? false : true,
    paths: ['less']
  },
  app: {
    files: {
      '<%= dist %>/css/styles.css': [ 'less/<%= pkg.name %>.less', 'src/**/*.less' ]
    }
  }
};
