import { join } from 'path';

// eslint-disable-next-line import/prefer-default-export
export const config = {
  // ==================
  // Specify Test Files
  // ==================
  // Define which test specs should run. The pattern is relative to the directory
  // from which `wdio` was called. Notice that, if you are calling `wdio` from an
  // NPM script (see https://docs.npmjs.com/cli/run-script) then the current working
  // directory is where your package.json resides, so `wdio` will be called from there.
  //
  specs: [join(__dirname, '/tests/e2e/**/*.spec.ts'), join(__dirname, '/tests/e2e/**/*.spec.js')],
  // Patterns to exclude.
  exclude: [
    // 'test/spec/multibrowser/**',
    // 'test/spec/mobile/**'
  ],
  //
  // ===================
  // Test Configurations
  // ===================
  // Define all options that are relevant for the WebdriverIO instance here
  //
  // Level of logging verbosity: trace | debug | info | warn | error | silent
  logLevel: 'trace',
  //
  // Set directory to store all logs into
  outputDir: join(__dirname, 'tests/e2e/logs'),
  //
  // If you only want to run your tests until a specific amount of tests have failed use
  // bail (default is 0 - don't bail, run all tests).
  bail: 0,
  //
  // Default timeout for all waitFor* commands.
  waitforTimeout: 1000,
  //
  // Framework you want to run your specs with.
  // The following are supported: Mocha, Jasmine, and Cucumber
  // see also: https://webdriver.io/docs/frameworks.html
  //
  // Make sure you have the wdio adapter package for the specific framework
  // installed before running any tests.
  framework: 'mocha',
  //
  // The number of times to retry the entire specfile when it fails as a whole
  specFileRetries: 1,
  //
  // Retried specfiles are inserted at the beginning of the queue and retried immediately
  specFileRetriesDeferred: false,
  //
  // Test reporter for stdout.
  // The only one supported by default is 'dot'
  // see also: https://webdriver.io/docs/dot-reporter.html
  reporters: ['spec'],
  //
  // Options to be passed to Mocha.
  // See the full list at http://mochajs.org/
  mochaOpts: {
    ui: 'bdd',
    timeout: 30000,
    require: 'ts-node/register',
  },
};
