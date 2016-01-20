'use strict';

let sources = [
  'node_modules/jquery/dist/jquery.js',
  'src/**/*.js', 
];

// Заглушка для "электронного" кода в обычном режиме браузера
if (process.env.NORD_BUILD) {
  sources.pop('!src/electrons.js');
} else {
  sources.unshift('src/electrons.js');
}

module.exports = {
  app: {
    src: sources,
    dest: '<%= dist %>/js/scripts.js'
  }
};
