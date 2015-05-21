// Define module using Universal Module Definition pattern
// https://github.com/umdjs/umd/blob/master/amdWeb.js

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // Support AMD. Register as an anonymous module.
    // EDIT: List all dependencies in AMD style
    define(['d3'], factory);
  } else if (typeof exports === 'object') {
    // Support CommonJS
    // EDIT: List all dependencies in CommonJS style
    module.exports = factory(require('d3'));
  } else {
    // No AMD. Set module as a global variable
    // EDIT: Pass dependencies to factory function
    root.d3Kit = factory(root.d3);
  }
}(this,
//EDIT: The dependencies are passed to this function
function (d3) {
  //---------------------------------------------------
  // BEGIN code for this module
  //---------------------------------------------------

