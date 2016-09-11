'use strict';

var webpack = require('webpack');

module.exports = {
  module:{
    loaders: [
      {
        test: /\.jsx?$/,
        // exclude: /(node_modules|bower_components)/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        query: {
          presets: ['es2015'],
          plugins: ['transform-object-assign']
        }
      }
    ],
  },
  plugins: []
};