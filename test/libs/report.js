

/**
 * @description Class to generate reports
 * @author Sergio Gonzalez Q <sergioalbertogq@gmail.com>
 * @source https://www.npmjs.com/package/cucumber-html-reporter
 * @place Cartago, Costa Rica
 * @date Jul 2018
 */

const reporter = require('cucumber-html-reporter');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const Email = require('../libs/email.js');
const Utils = require('../libs/utils.js');

dotenv.load();

const utils = new Utils();

module.exports = class Report {
  constructor(launchReport = false) {
    this.options = {
      theme: 'bootstrap',
      jsonFile: 'reports/cucumber.json',
      output: 'reports/index.html',
      reportSuiteAsScenarios: true,
      launchReport,
      metadata: {
        'App Version': '0.1',
        'Test Environment': 'STAGING',
        Browser: 'Chrome',
        Platform: 'Ubuntu 18',
        Parallel: 'Scenarios',
        Executed: 'Remote',
      },
    };
    this.bodyEmail = '<!DOCTYPE html>\n'
        + '<html>\n'
        + '<head>\n'
        + '<title>NightwatchJS - Report Results</title>\n'
        + '<style>\n'
        + 'body {\n'
        + '    background-color: #f5f5f5;\n'
        + '    margin: 0;\n'
        + '    width: 100%;\n'
        + '}\n'
        + '/* Style the header */\n'
        + 'header {\n'
        + '    background-color: #f1f1f1;\n'
        + '    padding: 1px;\n'
        + '    text-align: center;\n'
        + '}\n'
        + '#rcorners {\n'
        + '    margin: auto;\n'
        + '    border-radius: 25px;\n'
        + '    border: 2px solid #73AD21;\n'
        + '    padding: 20px; \n'
        + '    width: 90%;\n'
        + '    height: 70px;    \n'
        + '}\n'
        + 'p, h2{\n'
        + '    color: #777;\n'
        + '}\n'
        + '.center {\n'
        + '    text-align: center;\n'
        + '    color: #777;\n'
        + '}\n'
        + '/* Style the footer */\n'
        + 'footer {\n'
        + '   position: fixed;\n'
        + '   left: 0;\n'
        + '   bottom: 0;\n'
        + '   width: 100%;\n'
        + '   background-color: #f1f1f1;\n'
        + '   color: white;\n'
        + '   text-align: center;\n'
        + '}\n'
        + '</style>\n'
        + '</head>\n'
        + '<body>\n'
        + '<header>\n'
        + '    <h1 class="center">NightwatchJS - Report Results</h1>\n'
        + '</header>\n'
        + '<p></p>\n'
        + '<div id="rcorners">\n'
        + '    <h2>The report files are attached on this email.</h2>\n'
        + '</div>\n'
        + '<p></p>\n'
        + '<footer>\n'
        + '    <p>Sergio GQ</p>\n'
        + '    <p><a href="mailto:sergioalbertogq@gmail.com">sergioalbertogq@gmail.com</a></p>\n'
        + '</footer>\n'
        + '</body>\n'
        + '</html>';
  }

  reportGenerate() {
    // more info on `metadata` is available in `options` section below.
    // to generate consodilated report from multi-cucumber JSON files, please use `jsonDir` option instead of `jsonFile`. More info is available in `options` section below.
    reporter.generate(this.options);
  }

  reportSend() {
    if (process.env.SEND_REPORT === 'true') {
      this.reportGenerate();

      let myPath = `${__filename}`;
      myPath = myPath.replace('libs/report.js', '');

      // const bodyEmail = fs.readFileSync(`${myPath}reports/index.html`).toString();
      // console.log("Email: "+bodyEmail);

      const email = new Email(process.env.EMAIL_FROM, process.env.EMAIL_PASS);
      const myDate = new Date().toISOString();
      const attachments = [{ // file on disk as an attachment
        filename: 'index.html',
        path: `${myPath}reports/index.html`, // stream this file
      },
      {
        filename: 'cucumber.json',
        path: `${myPath}reports/cucumber.json`, // stream this file
      }];

      email.sendAttachmentEmail(process.env.EMAIL_TO, `Automation Results: ${myDate}`, 'Automation Results',
        attachments, this.bodyEmail);
    }
  }
};
