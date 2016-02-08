'use strict';

module.exports = {

  options: {
    processors: [
      require('pixrem')(),
      require('autoprefixer')({
        browsers: [
          'Android 2.3',
          'Android >= 4',
          'Chrome >= 20',
          'Firefox >= 38', // Latest ESR
          'Explorer >= 8',
          'iOS >= 6',
          'Opera >= 12',
          'Safari >= 6',
        ],
      }),
      require('cssnano')(),
    ],
  },
  dist: {
    src: '<%= paths.temp %>/main.css',
    dest: '<%= paths.dist %>/css/main.min.css',
  },

};
