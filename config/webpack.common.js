const webpack = require('webpack')
    , HtmlWebpackPlugin = require('html-webpack-plugin')
    , ExtractTextPlugin = require('extract-text-webpack-plugin')
    , ProgressBarPlugin = require('progress-bar-webpack-plugin')
    , path = require('path')
    , helpers = require('./helpers');

module.exports = {
  resolve: {
    extensions: ['.ts', '.js']
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|otf|ico)$/,
        loader: 'file-loader?name=assets/[name].[hash].[ext]'
      },
      {
        test: /\.sass$/,
        // exclude: helpers.root('src', 'app'),
        include: helpers.root('src/assets'),
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?sourceMap', 'sass-loader?sourceMap']
          // use: ['css-loader?sourceMap', 'resolve-url-loader', 'sass-loader?sourceMap']
        })
      },
      {
        test: /\.sass$/,
        // include: helpers.root('src', 'app'),
        exclude: helpers.root('src/assets'),
        use: ['raw-loader', 'sass-loader?sourceMap']
      }
    ]
  },

  plugins: [
    // Workaround for angular/angular#11580
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      ///angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      //helpers.root('./src'), // location of your src
      //{} // a map of your routes
      /angular(\\|\/)core(\\|\/)@angular/,
      path.resolve(__dirname, '../src')
    ),

    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),

    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html'
    }),

    new ProgressBarPlugin()
  ]
};
