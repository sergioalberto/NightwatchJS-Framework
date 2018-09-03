

/**
 * @description Class to generate reports
 * @author Sergio Gonzalez Q <sergioalbertogq@gmail.com>
 * @source https://www.npmjs.com/package/cucumber-html-reporter
 * @place Cartago, Costa Rica
 * @date Jul 2018
 */

const Report = require('../libs/report.js');

let launchReport = false;

const argv = require('minimist')(process.argv.slice(2));

try {
  if (argv.l === 'true') {
    launchReport = true;
  }
} catch (e) {
  launchReport = false;
}
const report = new Report(launchReport);
report.reportSend();
