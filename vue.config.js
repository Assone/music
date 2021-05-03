/* eslint-disable @typescript-eslint/no-var-requires */
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const zlib = require('zlib');

/**
 * @type import('@vue/cli-service/types/ProjectOptions').ProjectOptions
 */
module.exports = {
  pluginOptions: {
    i18n: {
      locale: 'zh-cmn-Hans',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false,
    },
  },

  css: {
    requireModuleExtension: true,
    sourceMap: true,
    loaderOptions: {
      scss: {
        prependData: '@import "~@/styles/import.scss";',
        sourceMap: true,
      },
    },
  },

  chainWebpack: (config) => {
    if (process.env.NODE_ENV === 'development') {
      config.plugin('hard-source-webpack-plugin').use(new HardSourceWebpackPlugin());
    } else {
      config.plugin('compression-gz').use(CompressionPlugin, [
        {
          algorithm: 'gzip',
          test: /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i,
          exclude: /\.map$/,
          threshold: 10240,
          minRatio: 0.8,
        },
      ]);
      config.plugin('compression-br').use(CompressionPlugin, [
        {
          filename: '[path][base].br',
          algorithm: 'brotliCompress',
          test: /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i,
          exclude: /\.map$/,
          compressionOptions: {
            params: {
              [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
            },
          },
          threshold: 10240,
          minRatio: 0.8,
        },
      ]);

      config.optimization
        .usedExports(true)
        .minimize(true)
        .sideEffects(true)
        .runtimeChunk({ name: 'runtime' });
    }
  },
};
