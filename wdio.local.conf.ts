import { config as baseConfig } from './wdio.shared.conf';

// eslint-disable-next-line import/prefer-default-export
export const config = {
  /**
   * base config
   */
  ...baseConfig,
  /**
   * config for local testing
   */
  maxInstances: 1,
  services: ['chromedriver', 'geckodriver'],
  capabilities: [
    {
      browserName: 'chrome',
      acceptInsecureCerts: true,
      'goog:chromeOptions': {
        args: process.argv.includes('--headless') ? ['--headless', '--disable-gpu'] : [],
      },
    },
    {
      browserName: 'firefox',
      acceptInsecureCerts: true,
      'moz:firefoxOptions': {
        binary: '/Applications/Firefox Developer Edition.app/Contents/MacOS/firefox-bin',
      },
    },
  ],
};
