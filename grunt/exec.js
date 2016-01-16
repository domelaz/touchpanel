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

let build = [
  getExecutable('node_modules/.bin', 'electron-packager', 'cmd'),
  'app/', // Source dir
  'Nord-Interactive', // App name
  '--platform=' + process.platform,
  '--arch=' + process.arch,
  '--version', '0.36.3',
  '--asar',
  '--overwrite',
  //'--out', '/tmp/nord-interactive',
  //'--icon=./app/images/ni.png'
];

module.exports = {
  build: {
    command: build.join(' ')
  }
};
