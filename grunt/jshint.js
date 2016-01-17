'use strict';

module.exports = {
  options: {
    jshintrc: true
  },
  grunt: {
    src: ['Gruntfile.js', 'grunt/**/*.js']
  },
  app: {
    src: [
      '<%= pkg.main %>',
      'src/**/*.js'
    ]
  },
  test: {
    src: ['test/**/*.js']
  },
};
