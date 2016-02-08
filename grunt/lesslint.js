'use strict';

module.exports = {

  options: {
    less: {
      paths: '<%= paths.bower %>',
    },
    imports: ['<%= paths.src %>/less/**/*.less'],
    csslint: {
      csslintrc: '.csslintrc',
    },
  },
  all: {
    src: ['<%= paths.src %>/less/main.less'],
  },

};
