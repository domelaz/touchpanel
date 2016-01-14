/**
 * Copyright (c) 2016 Anton Domolazov
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  require('load-grunt-config')(grunt, {
    data: {
      pkg: grunt.file.readJSON('package.json')
    }
  });
};
