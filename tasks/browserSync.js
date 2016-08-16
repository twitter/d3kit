// Make sure to install these dependencies before using express
//  npm install express --save-dev
//  npm install ejs --save-dev
//  npm install gulp-nodemon --save-dev

const gulp        = require('gulp');
const browserSync = require('browser-sync');

export function createBrowserSyncTask(root="dist", useProxy=false, proxyPort=7008, useExpress=false){
  const isProduction = process.env.NODE_ENV=='production';
  if(useExpress){
    gulp.task('server', ['build'], function (cb) {
      var started = false;
      $.nodemon({
        script: 'server.js',
        nodeArgs: isProduction ? ['--harmony'] : ['--debug', '--harmony'],
        ignore: ['node_modules/**', 'src/**/*', 'dist/**/*'],
        ext: 'js, ejs',
        env: {
          NODE_ENV: isProduction ? 'production' : 'development'
        }
      }).on('start', function () {
        if (!started) {
          cb();
          started = true;
        }
      });
    });

    gulp.task('browser-sync', ['server'], function() {
      browserSync.init({
        proxy: 'http://localhost:' + proxyPort,
        files: [`${root}/**/*.*`, 'server/**/*.ejs'],
        browser: 'google chrome',
        port: 7000,
      });
    });
  }
  else if(useProxy){
    gulp.task('browser-sync', ['build'], function() {
      browserSync.init({
        proxy: 'http://localhost:' + proxyPort,
        files: [`${root}/**/*.*`],
        browser: 'google chrome',
        port: 7000,
      });
    });
  }
  else{
    gulp.task('browser-sync', ['build'], function() {
      browserSync.init({
        server: `./${root}`,
        files: [`${root}/**/*.*`],
        browser: 'google chrome',
        port: 7000,
      });
    });
  }
}