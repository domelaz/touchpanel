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
