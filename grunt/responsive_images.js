'use strict';

/**
 * Screen ratios to process
 */
const densities = [1, 2, 3];

/**
 * Resize presets
 *
 * Sizes for base density (1x)
 */
const presets = {
  thumbs: {
    'sm': 75,
    'md': 110,
    'lg': 150,
    'xl': 220,
    path: 'thumbs',
  },
  content: {
    'sm': 410,
    'md': 594,
    'lg': 800,
    'xl': 1200,
  },
};

function getExports() {
  /**
   * Global task options
   */
  let exp = {
    options: {
      engine: 'im'
    },
  };

  /**
   * Build sizes tree for every screen density
   */
  Object.keys(presets).forEach(name => {
    densities.forEach(ratio => {
      // Target Name
      const targetName = `${name}${ratio}x`;
      
      // Build sizes array
      let baseSizes = Object.assign({}, presets[name]);
      // Pick path if present
      let path = '.';
      if (baseSizes.path) {
        path = baseSizes.path;
        delete baseSizes.path;
      }
      const sizes = Object.keys(baseSizes).map(size => {
        return {
          name: size,
          width: baseSizes[size] * ratio
        };
      });
      
      // Create destination
      const files = getFiles({
        path: path,
        dpr: ratio
      });
      
      // Keep target record
      exp[targetName] = {
        options: {
          sizes: sizes
        },
        files: [files]
      };
    });
  });

  //console.log(JSON.stringify(exp, null, '  '));

  return exp;
}

function getFiles(opt) {
  const path = opt.path;
  const dpr = opt.dpr;

  return {
    expand: true,
    src: ['*.png'],
    cwd: 'images/slides/',
    custom_dest: `app/img/${dpr}x/{%= name %}/${path}`
  };
}

module.exports = getExports();
