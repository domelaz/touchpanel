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
      '<%= dist %>/**/*.js',
      'src/**/*.js',
      '!<%= concat.app.dest %>'
    ]
  },
  test: {
    src: ['test/**/*.js']
  },
};
