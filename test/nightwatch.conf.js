const seleniumServer = require('selenium-server');
const chromedriver = require('chromedriver');
const geckodriver = require('geckodriver');

require('nightwatch-cucumber')({
  cucumberArgs: [
    '--require', 'libs/hooks.js',
    '--require', 'libs/globalsModule.js',
    '--require', 'step_definitions',
    '--format', 'node_modules/cucumber-pretty',
    '--format', 'json:reports/cucumber.json',
    'features'],
});

module.exports = {
  output_folder: 'reports',
  custom_assertions_path: 'assertions/',
  custom_commands_path: 'commands/',
  page_objects_path: 'page_objects',
  live_output: false,
  disable_colors: false,
  globals_path: './libs/globalsModule.js',
  test_workers: {
    enabled: false,
    workers: 2,
  },
  selenium: {
    start_process: true,
    server_path: seleniumServer.path,
    log_path: '',
    host: '127.0.0.1',
    port: 4444,
    cli_args: {
      'webdriver.chrome.driver': chromedriver.path,
      'webdriver.gecko.driver': geckodriver.path,
    },
  },
  test_settings: {
    default: {
      globals: {
        waitForConditionTimeout: 30000,
        waitForConditionPollInterval: 1000,
        asyncHookTimeout: 50000,
      },
      screenshots: {
        enabled: true,
        on_failure: true,
        path: 'screenshots',
      },
      videos: {
        enabled: false,
        delete_on_success: true,
        path: 'videos',
      },
      launch_url: 'https://vacations-management.herokuapp.com/',
      selenium_port: 4444,
      selenium_host: process.env.SELENIUM_HOST || 'localhost',
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true,
      },
      selenium: {
        cli_args: {
          'webdriver.chrome.driver': chromedriver.path,
        },
      },
    },
    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true,
      },
      selenium: {
        cli_args: {
          'webdriver.chrome.driver': chromedriver.path,
        },
      },
    },
    headless: {
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true,
        chromeOptions: {
          args: ['headless', 'no-sandbox', 'disable-gpu'],
        },

      },
      selenium: {
        cli_args: {
          'webdriver.chrome.driver': chromedriver.path,
        },
      },
    },
    firefox: {
      desiredCapabilities: {
        browserName: 'firefox',
        javascriptEnabled: true,
        marionette: true,
        acceptSslCerts: true,
      },
      selenium: {
        cli_args: {
          'webdriver.gecko.driver': geckodriver.path,
        },
      },
    },
  },
};
