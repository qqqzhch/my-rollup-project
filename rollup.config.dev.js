import commonjs from "@rollup/plugin-commonjs"
import resolve from "@rollup/plugin-node-resolve";
import babel from "rollup-plugin-babel";

import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';

import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'

import less from 'rollup-plugin-less';
import html from '@rollup/plugin-html';
import image from '@rollup/plugin-image'

import pluginhtml from 'rollup-plugin-html';
import jst from 'rollup-plugin-jst'; 

export default {
    input: './src/main.js',
    output: {
      file: 'bundle.js',
      format: 'iife',
      name:"myBundle",
      // moduleName: 'myBundle',
      
      plugins: [ 
        serve({
            open : true,
            port : 8888,
            contentBase: '',
            openPage: '/test/',
        }),
        livereload("src"),       
      ]
    },
    context:"window",
    plugins: [ 
      less(),
      html(),
      image(),
      commonjs(), 
      resolve(), 
      babel({
        exclude: 'node_modules/**',
        runtimeHelpers: true,
        sourceMap: true,
        extensions: [".js"]
      }),
      pluginhtml({
        include: './src/**/*.html'
      }),
      jst({
        
  
        // You can restrict which files are compiled
        // using `include` and `exclude`
        include: './src/**/*.ejs',
  
        // You can pass options to _.template(code, templateOptions)
        templateOptions: {
          variable: 'data' // default variable for template is 'data',
        },
  
        // You can enable HTML minification before the template is compiled
        // by default turned off
        minify: true,
  
        // You can pass options to HTMLMinifier
        // see github.com/kangax/html-minifier for documentation
        minifyOptions: {
          collapseWhitespace: true
        },
  
        // if you do not want to use lodash-es/escape for some reason
        // (e.g because it is quite huge for just escape function)
        // you can set which module to use - it should have single default export
        // you should care about correct resolving and handing of this file
        // if it is not using modules
        escapeModule: 'escape-html'
      }),
      ]
  };