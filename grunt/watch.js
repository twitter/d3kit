module.exports = {
  // if src or script change, rebuild and signal page reload
  scripts: {
    files: ['src/**/*.js'],
    tasks: ['build'],
    options: {
      spawn: false,
    },
  }
};