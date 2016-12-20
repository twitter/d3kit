// Karma configuration
'use strict';

const babel = require('rollup-plugin-babel');
const babelrc = require('babelrc-rollup').default;
const nodeResolve = require('rollup-plugin-node-resolve');

module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '.',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai'],

    // each file acts as entry point for the webpack configuration
    files: [
      // Add the js files so it will trigger watch,
      // but do not include them as tests
      { pattern: 'src/**/!(*.spec).@(js|jsx)', included: false },
      // Add all files ending in ".spec.js"
      // These are the unit test files
      'src/**/*.spec.js',
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/**/*.spec.js': ['rollup']
    },

    rollupPreprocessor: {
      // rollup settings. See Rollup documentation
      plugins: [
        nodeResolve(),
        babel(babelrc())
      ],
      // will help to prevent conflicts between different tests entries
      format: 'iife',
      sourceMap: 'inline'
    },

    // test results reporter to use
    // possible values: 'dots', 'progress', 'mocha', 'coverage'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha', 'coverage'],

    coverageReporter: {
      reporters: [
        { type: 'text' },
        { type: 'html' }
      ]
    },

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // // enable / disable watching file and executing tests whenever any file changes
    // autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [
      'PhantomJS'
      // 'Chrome',
      // 'Firefox'
    ]

  });
};
