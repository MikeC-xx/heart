'use strict';

module.exports = {

  dist: {
    options: {
      transform: [
        [
          'babelify',
          {
            presets: ['es2015'],
          },
        ],
      ],
    },
    files: [
      {
        '<%= paths.temp %>/js/main.js': ['<%= paths.src %>/js/main.js'],
      },
    ],
  },

};
