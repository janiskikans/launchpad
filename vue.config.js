const path = require('path');
const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'Launchpad',
    },
  },
  productionSourceMap: process.env.NODE_ENV != 'production',
  configureWebpack: {
    resolve: {
      alias: {
        '@api': path.resolve(__dirname, 'src/api'),
        '@assets': path.resolve(__dirname, 'src/assets'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@views': path.resolve(__dirname, 'src/views'),
        '@structures': path.resolve(__dirname, 'src/structures'),
        '@services': path.resolve(__dirname, 'src/services'),
        '@helpers': path.resolve(__dirname, 'src/helpers'),
        '@store': path.resolve(__dirname, 'src/store'),
        '@loaders': path.resolve(__dirname, 'src/loaders'),
        '@router': path.resolve(__dirname, 'src/router'),
      },
    },
    plugins: [
      new StyleLintPlugin({
        files: ['src/**/*.{vue,scss}'],
      }),
    ],
    devServer: {
      host: 'launchpadapp.test',
    },
  },
};
