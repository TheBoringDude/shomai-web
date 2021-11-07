const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  // NOTE: configure this if you have another folder with tsx files or (that uses stylinggs)
  purge: ['./src/layouts/**/*.tsx', './src/components/**/*.tsx', './src/modules/**/*.tsx'],
  mode: 'jit',
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      // theme colors
      gunmetal: '#202C39',
      charcoal: '#283845',
      sage: '#B8B08D',
      'deep-champagne': '#F2D492',
      'atomic-tangerine': '#F29559',
      transparent: 'transparent',

      // add all default colors
      ...colors
    },

    // NOTE: Add the lines below if you want to add a google font
    fontFamily: {
      sans: ['"Inter"', ...defaultTheme.fontFamily.sans]
    },

    brightness: {
      30: '30%'
    },

    extend: {}
  },
  variants: {
    extend: {}
  },
  plugins: []
};
