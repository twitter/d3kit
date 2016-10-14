import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
  entry: 'src/main.js',
  plugins: [
    nodeResolve(),
    babel(babelrc())
  ],
  external: ['d3-selection', 'd3-dispatch'],
  globals: {
    'd3-selection': 'd3',
    'd3-dispatch': 'd3'
  },
  targets: [
    {
      dest: 'dist/d3kit.js',
      format: 'umd',
      moduleName: 'd3Kit',
      sourceMap: true
    },
    {
      dest: 'dist/d3kit-es.js',
      format: 'es'
    }
  ]
};