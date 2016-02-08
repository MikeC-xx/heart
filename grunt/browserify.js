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
        '<%= paths.src %>/js/main.js': ['<%= paths.src %>/js/main.js'],
      },
    ],
  },

};
