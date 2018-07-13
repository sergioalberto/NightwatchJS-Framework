@login @regression @positive
Feature: Validate successful login to GAP's Vacations System
  As an application user I would like to validate that users can login to the application using a valid credential
  Owner: Sergio Gonzalez Q.
  TC_ID: 1234

  Background:
    Given I navigate to the login page
      Then I validate that login page is displayed

  Scenario: Login to GAP's Vacations System
    When I fill in with "gap-automation-test@mailinator.com" user name
      Then I fill in with 12345678 password
      And I click Sign in button
      And I validate that employee page was loaded
