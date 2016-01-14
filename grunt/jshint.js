'use strict';

module.exports = {
  options: {
    jshintrc: true
  },
  grunt: {
    src: ['Gruntfile.js', 'grunt/**/*.js']
  },
  app: {
    src: ['app/**/*.js']
  },
  test: {
    src: ['test/**/*.js']
  },
};
