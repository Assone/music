module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  globals: {
    Model: 'readonly',
  },
  plugins: ['@typescript-eslint'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.ts', '.js', '.jsx', '.json', '.vue'],
      },
    },
    'import/extensions': ['.js', '.jsx', '.mjs', '.ts', '.tsx'],
  },
  extends: [
    // add more generic rulesets here, such as:
    // 'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'eslint-config-airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:prettier/recommended',
    // 'plugin:vue/recommended' // Use this if you are using Vue.js 2.x.
    'prettier',
  ],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/script-setup-uses-vars': 'error',
    'import/extensions': [
      'error',
      'always',
      {
        ignorePackages: true,
        pattern: {
          js: 'never',
          mjs: 'never',
          jsx: 'never',
          ts: 'never',
          tsx: 'never',
        },
      },
    ],
    // 'no-param-reassign': [
    //   'error',
    //   {
    //     props: true,
    //     ignorePropertyModificationsFor: [
    //       'state', // for vuex state
    //       'acc', // for reduce accumulators
    //       'e', // for e.returnvalue
    //     ],
    //   },
    // ],
    // '@typescript-eslint/no-unused-vars': ['warn'],

    'vue/require-default-prop': 'off',
    'import/no-unresolved': [2, { ignore: ['@intlify/vite-plugin-vue-i18n.'] }],
  },
  overrides: [
    {
      files: ['src/apis/**/*.ts', 'src/composables/**/*.ts'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off',
      },
    },
    {
      files: ['src/apis/**/*.ts', 'src/models/**/*.ts'],
      rules: {
        'import/no-cycle': [2, { maxDepth: 1 }],
      },
    },
  ],
};
