
const {
  When, Then, And, Given, But,
} = require('cucumber');
const SSHClient = require('../libs/sshClient.js');
const CLI = require('../libs/shell.js');
const assert = require('chai').assert;

When(/^I execute the "(.*?)" command on the "(.*?)" server with the "(.*?)" user and "(.*?)" password$/, (command, server, username, password) => {
  const ssh = new SSHClient(server, username, password);
  const response = ssh.runCommand(command);
  console.log(`SSH Response: ${response}`);
});

When(/^I execute the "(.*?)" command and expect "(.*?)"$/, async (command, expect) => {
  const cli = new CLI();
  const response = cli.runSpawnCommand(command);
  assert.include(response, expect);
});
