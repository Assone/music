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
};
