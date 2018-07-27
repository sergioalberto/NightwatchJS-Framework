const { AfterAll, BeforeAll, Before, After } = require('cucumber')

// This is a hack because nightwatch-video-recorder expects to be hooked in at the nightwatch level
//   but nightwatch-cucumber currently has an issue where beforeEach and afterEach don't work,
//   https://github.com/mucsi96/nightwatch-cucumber/issues/362
//   so the solution is to create an object, that looks like the nightwatch client, here in the
//   cucumber hooks, and pass it to the recorder, which expects the nightwatch client

// Source: https://github.com/cucumber/cucumber-js/blob/master/docs/support_files/api_reference.md
//         https://github.com/cucumber/cucumber-js/blob/master/docs/support_files/hooks.md

const nightwatchConf = require('./nightwatch.conf.js')
const browser = {
    currentTest: {
        module: "tests",
        results: {
            failed: false,
        }
    },
    globals: {
        test_settings: {
            videos: nightwatchConf.test_settings.default.videos,
            selenium_host: nightwatchConf.test_settings.default.selenium_host
        }
    }
}

BeforeAll((options, callback) => {
    console.log("-------------------------------------------------------------------")
    console.log("Before all scenarios.")
    console.log("-------------------------------------------------------------------")
})

AfterAll((options, callback) => {
    console.log("-------------------------------------------------------------------")
    console.log("After all scenarios have completed.")
    console.log("-------------------------------------------------------------------")
})

Before((options, callback) => {
    console.log("###################################################################")
    console.log("Before each scenario.")
    console.log("###################################################################")
    console.log('Runnung the TC: '+options.sourceLocation.uri)
    browser.currentTest.module = options.pickle.name
    require('nightwatch-video-recorder').start(browser, callback)
})

Before({tags: "@login and @regression"}, function () {
    // This hook will be executed before scenarios tagged with @login and @regression
    console.log("Before scenarios tags.")
})

After((options, callback) => {
    console.log("###################################################################")
    console.log("After each scenario.")
    console.log("###################################################################")

    browser.currentTest.module = options.pickle.name
    browser.currentTest.results.failed = options.result.status == 'failed'
    require('nightwatch-video-recorder').stop(browser, callback)
})
