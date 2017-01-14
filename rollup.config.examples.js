import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
  entry: 'examples/src/main.js',
  plugins: [
    nodeResolve(),
    babel(babelrc())
  ],
  dest: 'examples/dist/main.js',
  format: 'iife',
  sourceMap: true
};
