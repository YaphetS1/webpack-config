const webpack = require('webpack')
    , webpackMerge = require('webpack-merge')
    , ExtractTextPlugin = require('extract-text-webpack-plugin')
    , commonConfig = require('./webpack.common.js')
    , helpers = require('./helpers')
    , AotPlugin = require('@ngtools/webpack').AotPlugin;

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(commonConfig, {
  devtool: 'none',
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'app': './src/main-aot.ts'
  },
  output: {
    path: helpers.root('static'),
    publicPath: '/',
    filename: '[name].[hash].js',
    chunkFilename: '[id].[hash].chunk.js'
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        loaders: ['@ngtools/webpack']
      },
    ]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),

    new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
      mangle: {
        keep_fnames: true
      }
    }),

    new ExtractTextPlugin('[name].[hash].css'),

    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(ENV)
      }
    }),

    new webpack.LoaderOptionsPlugin({
      htmlLoader: {
        minimize: false // workaround for ng2
      }
    }),

    new AotPlugin({
      tsConfigPath: './tsconfig.json',
      entryModule: helpers.root('src/app/app.module.ts#AppModule')
    })
  ]
});