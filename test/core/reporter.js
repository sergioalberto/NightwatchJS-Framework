'use strict';

/**
 * @description Class to generate reports
 * @author Sergio Gonzalez Q <squiros@growthaccelerationpartners.com>
 * @source https://www.npmjs.com/package/cucumber-html-reporter
 * @place Cartago, Costa Rica
 * @date Jul 2018
 */

const Report = require('../core/report.js');

let report = new Report(true);
report.reportSend();
