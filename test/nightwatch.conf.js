const seleniumServer = require('selenium-server');
const chromedriver = require('chromedriver');
const geckodriver = require('geckodriver');

require('nightwatch-cucumber')({
    cucumberArgs: [
        '--require', 'hooks.js',
        '--require', 'globalsModule.js',
        '--require', 'step_definitions',
        '--format', 'node_modules/cucumber-pretty',
        '--format', 'json:reports/cucumber.json',
        'features']
});

module.exports = {
    output_folder: 'reports',
    custom_assertions_path: '',
    page_objects_path: 'page_objects',
    live_output: false,
    disable_colors: false,
    globals_path: "./globalsModule.js",
    selenium: {
        start_process: true,
        server_path: seleniumServer.path,
        log_path: '',
        host: '127.0.0.1',
        port: 4444,
        cli_args: {
            'webdriver.chrome.driver': chromedriver.path,
            'webdriver.gecko.driver': geckodriver.path
        }
    },
    test_settings: {
        default: {
            screenshots: {
                enabled: true,
                on_failure: true,
                path: "screenshots"
            },
            videos: {
                enabled: false,
                delete_on_success: true,
                path: "videos"
            },
            launch_url: 'https://vacations-management.herokuapp.com/users/sign_in',
            selenium_port: 4444,
            selenium_host: process.env.SELENIUM_HOST || "localhost",
            desiredCapabilities: {
                browserName: 'chrome',
                javascriptEnabled: true,
                acceptSslCerts: true
            },
            selenium: {
                cli_args: {
                    'webdriver.chrome.driver': chromedriver.path
                }
            }
        },
        chrome: {
            desiredCapabilities: {
                browserName: 'chrome',
                javascriptEnabled: true,
                acceptSslCerts: true
            },
            selenium: {
                cli_args: {
                    'webdriver.chrome.driver': chromedriver.path
                }
            }
        },
        headless: {
            desiredCapabilities: {
                browserName: 'chrome',
                javascriptEnabled: true,
                acceptSslCerts: true,
                chromeOptions: {
                    args: ['use-fake-ui-for-media-stream', '--headless', '--no-sandbox', 'disable-gpu']
                }

            },
            selenium: {
                cli_args: {
                    'webdriver.chrome.driver': chromedriver.path
                }
            }
        },
        firefox: {
            desiredCapabilities: {
                browserName: "firefox",
                javascriptEnabled: true,
                marionette: true,
                acceptSslCerts: true
            },
            selenium: {
                cli_args: {
                    'webdriver.gecko.driver': geckodriver.path
                }
            }
        }
    }
};
