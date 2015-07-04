module.exports = {
  options: {
    configFile: 'karma.conf.js',
    browsers: [
      'PhantomJS'
    ]
  },
  dev: {
    singleRun: false,
    autoWatch: true
  },
  ci: {
    singleRun: true,
    autoWatch: false
  }
};