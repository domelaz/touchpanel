/**
 * Copyright (c) 2016 Anton Domolazov
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  require('load-grunt-config')(grunt, {
    data: {
      pkg: grunt.file.readJSON('package.json'),
      dist: 'app',
      elver: '0.36.3', // Current electron version, may altered by NORD_ELVER env
      brand: 'Nord-Interactive' // Brand app name, like package.json `name`
    }
  });

  grunt.registerTask('default', ['jade', 'less', 'webpack:build', 'responsive_images']);
  grunt.registerTask('build', ['default', 'exec:build']);
  grunt.registerTask('resize', ['responsive_images']);
};
