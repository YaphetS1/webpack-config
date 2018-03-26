const webpackConfig = require('./webpack.test');

module.exports = function (config) {
  var _config = {
    basePath: '',

    browsers: ['Chrome'],
    browserNoActivityTimeout: 0,

    frameworks: ['jasmine'],

    files: [
      {pattern: './config/karma-test-shim.js', watched: false}
    ],

    preprocessors: {
      './config/karma-test-shim.js': ['webpack', 'sourcemap']
    },

    webpack: webpackConfig,

    webpackMiddleware: {
      stats: 'errors-only'
    },

    webpackServer: {
      noInfo: true
    },

    reporters: ['kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['Chrome'],
    //singleRun: true
  };

  config.set(_config);
};
