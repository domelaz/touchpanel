'use strict';

module.exports = {
  main: {
    options: {
      pretty: true,
      data: function() {
        return require('../jade/index.json');
      }
    },
    files: {
      '<%= dist %>/index.html': ['jade/index.jade']
    }
  }
};
