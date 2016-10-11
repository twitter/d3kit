'use strict';

const del           = require('del');
const gulp          = require('gulp');
const $             = require('gulp-load-plugins')();
const webpack       = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');
const browserSync   = require('browser-sync');

import {createBuildAndWatchTasks} from './tasks/core.js';

// -------------------------------------------
// Configuration
// -------------------------------------------

const paths = {
  src      : __dirname + '/src',
  dist     : __dirname + '/dist',
  examples : __dirname + '/examples',
  bower    : __dirname + '/examples/bower_components'
};

const patterns = {
  js : paths.src + '/**/*.js'
};

gulp.task('clean', function () {
  return del([
    paths.dist + '/**/*',
    paths.examples + '/dist/**/*'
  ]);
});

gulp.task('webpack', function() {
  return gulp.src(paths.src + '/main.js')
    .pipe(webpack(Object.assign({}, webpackConfig, {
      output: {
        filename: 'd3kit.js',
        sourceMapFilename: '[file].map',
        library: 'd3Kit',
        libraryTarget: 'umd',
        umdNamedDefine: false
      },
      externals: {
        'd3-selection': {
          root: 'd3',
          commonjs2: 'd3-selection',
          commonjs: 'd3-selection',
          amd: 'd3-selection'
        },
        'd3-dispatch': {
          root: 'd3',
          commonjs2: 'd3-dispatch',
          commonjs: 'd3-dispatch',
          amd: 'd3-dispatch'
        }
      },
    })))
    .on('error', function handleError() {
      this.emit('end'); // Recover from errors
    })
    .pipe(gulp.dest(paths.dist))
    .pipe(gulp.dest(paths.examples+'/dist'))
    .pipe($.uglify({
      report: 'min',
      mangle: true,
      compress: true,
      preserveComments: false
    }))
    .pipe($.rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(paths.dist))
    .pipe(gulp.dest(paths.examples+'/dist'));
});

const buildTasks = [{name: 'webpack', pattern: patterns.js}];
createBuildAndWatchTasks(buildTasks);

gulp.task('browser-sync', ['build'], function() {
  browserSync.init({
    server: './examples',
    files: ['examples/**/*.*'],
    browser: 'google chrome',
    port: 7000,
  });
});

gulp.task('run', ['watch', 'browser-sync']);
gulp.task('default', ['run']);
