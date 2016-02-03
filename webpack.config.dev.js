const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    //'eventsource-polyfill', // necessary for hot reloading with IE
    'webpack-hot-middleware/client',
    path.join(__dirname, './src/')
  ],
  output: {
    path: path.join(__dirname, 'app'),
    filename: 'scripts.js',
    publicPath: '/js/'
  },
  resolve: {
    root: [
      path.join(__dirname, './src/')
    ],
    extensions: ['', '.js', '.ts', '.tsx']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.tsx?/,
      loaders: ['babel', 'ts'],
      include: path.join(__dirname, 'src')
    }]
  }
};
