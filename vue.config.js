const path = require('path');

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@api': path.resolve(__dirname, 'src/api'),
        '@assets': path.resolve(__dirname, 'src/assets'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@views': path.resolve(__dirname, 'src/views'),
        '@structures': path.resolve(__dirname, 'src/structures'),
        '@services': path.resolve(__dirname, 'src/services'),
      },
    },
  },
};
