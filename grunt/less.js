'use strict';

module.exports = {

  dist: {
    options: {
      paths: '<%= paths.bower %>',
      banner: '<%= banner %>',
    },
    files: {
      '<%= paths.temp %>/css/main.css': '<%= paths.src %>/less/main.less',
    },
  },

};
