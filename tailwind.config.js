module.exports = {
  purge: ['./src/*.vue', './src/views/*.vue', './src/components/**/*.vue'],
  theme: {
    maxWidth: {
      '1/4': '25%',
      '1/2': '50%',
      '1/3': '33.333333%',
      '1/5': '20%',
      '3/4': '75%',
      '3/5': '60%',
      full: '100%',
    },
    extend: {
      screens: {
        '3xl': '1700px',
      },
    },
  },
};
