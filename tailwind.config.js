const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  // NOTE: configure this if you have another folder with tsx files or (that uses stylinggs)
  purge: ['./src/pages/**/*.tsx', './src/components/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    // add all default colors
    colors,

    // NOTE: Add the lines below if you want to add a google font
    // fontFamily: {
    //   sans: ['"name of google font"', 'sans-serif']
    // },
    extend: {}
  },
  variants: {
    extend: {}
  },
  plugins: []
};
