@cli
Feature: Validate the commands execution
  As an application user I would like to validate the commands execution
  Owner: Sergio Gonzalez Q.
  TC_ID: 1234

  Scenario:
    Given I execute the "pwd" command and expect "nightwatchjs-core-framework"
      #Then I execute the "ssh pi@192.168.0.17" command and expect ":"
      Then I execute the "pwd" command on the "192.168.0.17" server with the "pi" user and "raspberry" password
