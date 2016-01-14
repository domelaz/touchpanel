'use strict';

let build = [
  'node_modules/.bin/electron-packager', // Packager executable
  'app/', // Source dir
  'Nord-Interactive', // App name
  '--platform=linux',
  '--arch=ia32',
  '--version', '0.36.3',
  '--asar',
  '--overwrite',
  '--out', '/tmp/nord-interactive',
  //'--icon=./app/images/ni.png'
];

module.exports = {
  build: {
    command: build.join(' ')
  }
};
