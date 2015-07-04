module.exports = {
  dist: {
    src: [
      '<%= yeoman.src %>/d3kit_prefix.js',
      '<%= yeoman.tmp %>/d3kit_unwrapped.js',
      '<%= yeoman.src %>/d3kit_suffix.js'
    ],
    dest: '<%= yeoman.dist %>/<%= yeoman.outputName %>.js',
  }
};