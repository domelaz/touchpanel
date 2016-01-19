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
    files: [
      '<%= dist %>/css/styles.css',
      '<%= dist %>/index.html',
    ],
    options: {
      livereload: true,
    },
  },
};
