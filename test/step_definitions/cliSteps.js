
const { When, Then, And, Given, But } = require('cucumber')
var SSHClient = require('../core/sshClient.js');
var CLI = require('../core/shell.js');
var assert = require('chai').assert;

When(/^I execute the "(.*?)" command on the "(.*?)" server with the "(.*?)" user and "(.*?)" password$/, function (command, server,  username, password) {
    var ssh = new SSHClient(server, username, password);
    var response = ssh.runCommand(command);
    console.log("SSH Response: "+response);
})

When(/^I execute the "(.*?)" command and expect "(.*?)"$/, async (command, expect) => {
    var cli = new CLI();
    var response = cli.runSpawnCommand(command);
    assert.include(response, expect);
})
