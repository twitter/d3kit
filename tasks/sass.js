const $ = require('gulp-load-plugins')();
import {newer, wrap} from './core.js';

export const compileSass = wrap(function(src, dest){
  return newer(src, dest)
    .pipe(
      $.sass({outputStyle: 'compressed'})
        .on('error', $.sass.logError)
    )
});