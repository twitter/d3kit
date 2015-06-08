/* jshint ignore:start */

'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function(grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // config grunt

  grunt.initConfig({

    // Configure constants
    yeoman: {
      src        : 'src',
      test       : 'test',
      tmp        : 'tmp',
      dist       : 'dist',
      outputName : 'd3kit'
    },

    // Empties folders to start fresh
    clean: {
      // clean distrobution
      tmp: {
        files: [{
          dot: true,
          src: ['<%= yeoman.tmp %>/*']
        }]
      },
      // clean distrobution
      dist: {
        files: [{
          dot: true,
          src: ['<%= yeoman.dist %>/*']
        }]
      },
      // clean dependencies
      dep: {
        files: [{
          dot: true,
          src: ['node_modules', 'bower_components']
        }]
      }
    },

    concat: {
      dist: {
        src: [
          '<%= yeoman.src %>/d3kit_prefix.js',
          '<%= yeoman.tmp %>/d3kit_unwrapped.js',
          '<%= yeoman.src %>/d3kit_suffix.js'
        ],
        dest: '<%= yeoman.dist %>/<%= yeoman.outputName %>.js',
      }
    },

    // Karma test runner configuration options
    karma: {
      dev: {
        configFile: 'karma.conf.js',
        browsers: [
          // 'Firefox'
          // 'Chrome',
          'PhantomJS'
        ],
        autoWatch: true
      }
    },

    requirejs: {
      dist: {
        // Options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
        options: {
          baseUrl: '<%= yeoman.src %>',
          name: 'd3kit',
          out:  '<%= yeoman.tmp %>/<%= yeoman.outputName %>_unwrapped.js',
          optimize: 'none',
          // TODO: Figure out how to make sourcemaps work with grunt-usemin
          // https://github.com/yeoman/grunt-usemin/issues/30
          // generateSourceMaps: true,
          // required to support SourceMaps
          // http://requirejs.org/docs/errors.html#sourcemapcomments
          preserveLicenseComments: true,
          useStrict: false,
          wrap: false,
          uglify2: {},
          paths: {
            'd3':                'empty:',
            'jquery':            'empty:',
            'lodash':            'empty:',
            'underscore.string': 'empty:'
          },
          skipModuleInsertion: true,
          onBuildWrite: function (moduleName, path, contents) {
            return module.require('amdclean').clean({code: contents, wrap:{start:'', end:''}});
          }
        }
      }
    },

    uglify: {
      dist: {
        files: {
          '<%= yeoman.dist %>/<%= yeoman.outputName %>.min.js': [
            '<%= yeoman.dist %>/<%= yeoman.outputName %>.js'
          ]
        },
        options:{
          // report: 'min',
          mangle: true,
          compress: true,
          preserveComments: false
        }
      }
    },

    // watch for changes
    watch: {
      // if src or script change, rebuild and signal page reload
      scripts: {
        files: ['src/**/*.js'],
        tasks: ['build'],
        options: {
          spawn: false,
        },
      }
    }
  });

  // tasks

  grunt.registerTask('build',    'Build D3Kit distribution package.',[
    'requirejs:dist',
    'concat:dist',
    'uglify:dist',
    'clean:tmp'
  ]);
  grunt.registerTask('clear',    'Remove all distribution files.',
    ['clean:dist']);
  grunt.registerTask('clearDev', 'Remove all dependancies and build tools.',
    ['clean:dep']);
  grunt.registerTask('default',  'Watch for changes and trigger builds.',
    ['watch']);
  grunt.registerTask('test', ['karma']);
};
