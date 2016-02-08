'use strict';

module.exports = {

  options: {
    sourceMap: true,
  },

  dist: {
    files: {
      '<%= paths.dist %>/js/main.min.js': '<%= paths.temp %>/js/main.js',
    },
  },

};
