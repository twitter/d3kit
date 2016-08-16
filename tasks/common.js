const $ = require('gulp-load-plugins')();
import {newer, wrap} from './core.js';

export const copyJson = wrap(function(src, dest){
  return newer(src, dest)
    .pipe($.jsonminify())
});

export const copy = wrap(function(src, dest){
  return newer(src, dest);
});

export const compileHtml = wrap(function(src, dest){
  return newer(src, dest)
    .pipe($.htmlmin({
      removeComments: true,
      collapseWhitespace: true,
      conservativeCollapse: true
    }));
});