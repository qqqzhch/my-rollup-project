import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';

import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'

// import less from 'rollup-plugin-less';
// import html from '@rollup/plugin-html';
// import image from '@rollup/plugin-image'


export default {
    input: 'src/main.js',
    output: {
      file: 'bundle.js',
      format: 'iife',
      name:"myBundle",
      plugins: []
    },
    plugins: [ livereload(), 
        // less(),
        // html(),
        // image(),
        serve({
            open : true,
            port : 8888,
            contentBase: '',
            openPage: '/test/',
        })]
  };