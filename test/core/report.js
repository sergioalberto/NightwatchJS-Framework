'use strict';

/**
 * @description Class to generate reports
 * @author Sergio Gonzalez Q <squiros@growthaccelerationpartners.com>
 * @source https://www.npmjs.com/package/cucumber-html-reporter
 * @place Cartago, Costa Rica
 * @date Jul 2018
 */

const reporter = require('cucumber-html-reporter');
const fs = require('fs');
let Email = require('../core/email.js');

const dotenv = require('dotenv');
dotenv.load();

module.exports = class Report{

    constructor(launchReport=false){

        this.options = {
            theme: 'bootstrap',
            jsonFile: 'reports/cucumber.json',
            output: 'reports/index.html',
            reportSuiteAsScenarios: true,
            launchReport: launchReport,
            metadata: {
                "App Version": "0.1",
                "Test Environment": "STAGING",
                "Browser": "Chrome ",
                "Platform": "Ubuntu 18",
                "Parallel": "Scenarios",
                "Executed": "Remote"
            }
        };

    }

    reportGenerate(){
        //more info on `metadata` is available in `options` section below.
        //to generate consodilated report from multi-cucumber JSON files, please use `jsonDir` option instead of `jsonFile`. More info is available in `options` section below.
        reporter.generate(this.options);
    }

    reportSend(){

        this.reportGenerate();

        let bodyEmail = '';
        fs.readFile('reports/index.html', function(err, data) {
            bodyEmail = ''+data;
            //console.log(bodyEmail);
        });

        let email = new Email(process.env.EMAIL_FROM, process.env.EMAIL_PASS);
        let myDate = new Date().toISOString();
        let attachments = [{   // file on disk as an attachment
            filename: 'index.html',
            path: 'reports/index.html' // stream this file
        },
        {
            filename: 'cucumber.json',
            path: 'reports/cucumber.json' // stream this file
        }];

        email.sendAttachmentEmail(process.env.EMAIL_TO, "Automation Results: "+myDate, "Automation Results", attachments, bodyEmail);
    }

};
