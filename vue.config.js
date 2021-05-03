/* eslint-disable @typescript-eslint/no-var-requires */
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// eslint-disable-next-line import/no-extraneous-dependencies
const TerserPlugin = require('terser-webpack-plugin');
const zlib = require('zlib');

const isDev = process.env.NODE_ENV === 'development';

/**
 * @type import('@vue/cli-service/types/ProjectOptions').ProjectOptions
 */
module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: isDev ? process.env.VUE_APP_API_DEV : process.env.VUE_APP_API_PROD,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/',
        },
      },
    },
  },

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

  configureWebpack: {
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true,
              drop_debugger: true,
            },
          },
        }),
      ],
      splitChunks: {
        cacheGroups: {
          vue: {
            name: 'chunk-vue',
            test: /[\\/]node_modules[\\/]vue[\\/]/,
            priority: 10,
            chunks: 'initial',
          },
          vuex: {
            name: 'chunk-vuex',
            test: /[\\/]node_modules[\\/]vuex[\\/]/,
            priority: 10,
            chunks: 'initial',
          },
          'vue-router': {
            name: 'chunk-vue-router',
            test: /[\\/]node_modules[\\/]vue-router[\\/]/,
            priority: 10,
            chunks: 'initial',
          },
          swiper: {
            name: 'chunk-swiper',
            test: /[\\/]node_modules[\\/]swiper[\\/]/,
            priority: 10,
            chunks: 'initial',
          },
          axios: {
            name: 'chunk-axios',
            test: /[\\/]node_modules[\\/]axios[\\/]/,
            priority: 10,
            chunks: 'initial',
          },
        },
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
      config.plugin('webpack-bundle-analyzer').use(new BundleAnalyzerPlugin());

      config.optimization
        .usedExports(true)
        .minimize(true)
        .sideEffects(true)
        .runtimeChunk({ name: 'runtime' });
    }
  },
};
