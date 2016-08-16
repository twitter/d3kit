const $ = require('gulp-load-plugins')();
import {newer, wrap} from './core.js';

export const compileImage = wrap(function(src, dest){
  return newer(src, dest)
    .pipe($.imagemin())
});