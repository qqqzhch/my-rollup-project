// rollup.config.js
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';

export default {
    input: 'src/main.js',
    output: {
      file: 'bundle.js',
      format: 'iife',
      name:"myBundle",
      plugins: [terser()]
    },
    plugins: [json()]
  };