
const Report = require('./core/report.js');
const dotenv = require('dotenv');
dotenv.load();

module.exports = {
    // this controls whether to abort the test execution when an assertion failed and skip the rest
    // it's being used in waitFor commands and expect assertions
    abortOnAssertionFailure : true,

    // this will overwrite the default polling interval (currently 500ms) for waitFor commands
    // and expect assertions that use retry
    waitForConditionPollInterval : 300,

    // default timeout value in milliseconds for waitFor commands and implicit waitFor value for
    // expect assertions
    waitForConditionTimeout : 5000,

    // this will cause waitFor commands on elements to throw an error if multiple
    // elements are found using the given locate strategy and selector
    throwOnMultipleElementsReturned : false,

    // controls the timeout time for async hooks. Expects the done() callback to be invoked within this time
    // or an error is thrown
    asyncHookTimeout : 10000,

    'default' : {
        myGlobal : function() {
            return 'I\'m a method';
        }
    },

    'test_env' : {
        myGlobal: 'test_global',
        beforeEach : function() {

        }
    },

    before : function(done) {
        console.log('GLOBAL BEFORE');
        done();
    },

    beforeEach : function(browser, done) {
        console.log('GLOBAL beforeEach');
        done();
    },

    after : function(done) {
        console.log('GLOBAL AFTER');

        if (process.env.SEND_REPORT === "true"){
            console.log("Sending the report result ...");
            let report = new Report(false);
            report.reportSend();
        }

        done();
    },

    afterEach : function(browser, done) {
        browser.perform(function() {
            console.log('GLOBAL afterEach');
            done();
        })
    },

    reporter : function(results, done) {
        console.log("Result:" +results);
        done();
    },

    write : function(results, options, done) {
        console.log("Result:" +results);
        done();
    }

};
