'use strict';

let path = require('path');

/**
 * Shortcut to platform
 *
 * @var {boolean}
 */
const WINDOWS = process.platform === 'win32';

/**
 * Step up, we use `load-grunt-config` and `pwd` here is 'grunt'
 * @todo Move to Gruntfile.js `data`
 */
const projectRoot = '..';

/**
 * Resolve absolute path of executable, depending on platform
 *
 * @param {string} here Relative path to executable
 * @param {string} name Platform independant executable name
 * @param {string} ext  File extension for Win32
 *
 * @return {string}     Absolute executable path
 */
function getExecutable(here, name, ext) {
  let execExt  = WINDOWS ? `.${ext}` : '';
  let execFull = path.join(__dirname, projectRoot, here, name + execExt);
  return execFull;
}

let cmdBuild = [
  getExecutable('node_modules/.bin', 'electron-packager', 'cmd'),
  '<%= dist %>',  // Source dir
  '<%= brand %>', // App name
  '--platform=' + process.platform,
  '--arch=' + process.arch,
  '--version', process.env.NORD_ELVER || '<%= elver %>',
  '--asar',
  '--overwrite',
  //'--out', '/tmp/nord-interactive',
  //'--icon=./app/images/ni.png'
];

let cmdNpmStart = [
  getExecutable('node_modules/electron-prebuilt/dist', 'electron', 'exe'),
  '<%= pkg.main %>'
];

// @todo fast, but WEIRD
module.exports = {
  build: {
    command: cmdBuild.join(' ')
  },
  npmStart: {
    command: cmdNpmStart.join(' ')
  }
};
