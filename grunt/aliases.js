'use strict';

module.exports = {

  'test-less': [
    'lesslint',
  ],

  'test-js': [
    'jshint',
    'jscs',
  ],

  test: [
    'test-less',
    'test-js',
  ],

  'build-css': [
    'less',
    'postcss',
  ],

  'build-js': [
    'browserify',
    'uglify',
  ],

  build: [
    'clean',
    'build-css',
    'build-js',
  ],

  default: [
    'test',
    'build',
  ],

};
