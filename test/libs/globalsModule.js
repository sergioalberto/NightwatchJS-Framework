
const dotenv = require('dotenv');
// const Report = require('./libs/report.js');

dotenv.load();

module.exports = {
  // this controls whether to abort the test execution when an assertion failed and skip the rest
  // it's being used in waitFor commands and expect assertions
  abortOnAssertionFailure: true,

  // this will overwrite the default polling interval (currently 500ms) for waitFor commands
  // and expect assertions that use retry
  waitForConditionPollInterval: 300,

  // default timeout value in milliseconds for waitFor commands and implicit waitFor value for
  // expect assertions
  waitForConditionTimeout: 10000,

  // this will cause waitFor commands on elements to throw an error if multiple
  // elements are found using the given locate strategy and selector
  throwOnMultipleElementsReturned: false,

  // controls the timeout time for async hooks. Expects the done() callback to be invoked within this time
  // or an error is thrown
  asyncHookTimeout: 50000,

  default: {
    myGlobal() {
      return 'I\'m a method';
    },
  },

  test_env: {
    myGlobal: 'test_global',
    beforeEach() {

    },
  },

  before(done) {
    console.log('GLOBAL BEFORE');
    done();
  },

  beforeEach(browser, done) {
    console.log('GLOBAL beforeEach');
    browser.init();
    done();
  },

  after(done) {
    console.log('GLOBAL AFTER');

    /* if (process.env.SEND_REPORT === "true"){
            console.log("Sending the report result ...");
            let report = new Report(false);
            report.reportSend();
        } */

    done();
  },

  afterEach(browser, done) {
    browser.perform(() => {
      console.log('GLOBAL afterEach');
      browser.close();
      done();
    });
  },

  reporter(results, done) {
    console.log(`Result:${results}`);
    done();
  },

  write(results, options, done) {
    console.log(`Result:${results}`);
    done();
  },

};
