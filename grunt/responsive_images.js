'use strict';

module.exports = {
  options: {
    engine: 'im'
  },
  thumbs: {
    options: {
      sizes: [
        {width: 320},
        {width: 640},
      ]
    },
    files: [{
      expand: true,
      src: ['*.png'],
      cwd: 'images/',
      custom_dest: 'app/img/{%= width %}/'
    }]
  }
};
