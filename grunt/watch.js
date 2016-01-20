'use strict';

module.exports = {
  jshint: {
    files: [
      '<%= jshint.grunt.src %>',
      '<%= jshint.app.src %>',
      '<%= jshint.test.src %>'
    ],
    tasks: ['jshint']
  },
  less: {
    files: ['less/**/*.less'],
    tasks: ['less']
  },
  jade: {
    files: ['jade/**/*.*'],
    tasks: ['jade']
  },
  client: {
    files: '<%= concat.app.src %>',
    tasks: ['concat']
  },
  live: {
    options: {
      livereload: true,
    },
    files: [
      '<%= dist %>/**/*.*',
    ],
    tasks: []
  }
};
