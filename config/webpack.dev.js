const webpackMerge = require('webpack-merge')
    , ExtractTextPlugin = require('extract-text-webpack-plugin')
    , commonConfig = require('./webpack.common.js')
    , helpers = require('./helpers')
    , path = require('path');

module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'app': './src/main-jit.ts'
  },
  output: {
    path: helpers.root('static'),
    publicPath: 'http://localhost:4000/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader', 'angular2-template-loader'],
        exclude: [
          helpers.root('src/main-aot.ts')
        ]
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin('[name].css')
  ],

  devServer: {
    historyApiFallback: true,
    stats: 'minimal',
    inline: true,
    port: 4000
  }
});