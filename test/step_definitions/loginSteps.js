const { client } = require('nightwatch-cucumber')
const { When, Then, And, Given, But } = require('cucumber')
const { expect } = require('chai');

var dotenv = require('dotenv');
dotenv.load();

global.loginPage = client.page.loginPage()

When(/^I navigate to the login page$/, () => {
    return client.url(client.launch_url).pause(3500)
})

When(/^I validate that login page is displayed$/, () => {
    var text = "Vacations Management Site - Growth Acceleration Partners"
    return client
        .title(({ value }) => {
            expect(value).to.equal(text);
        })
})

When(/^I fill in with "(.*?)" user name$/, (username) => {
    
    if (username.trim() === "GAP_ACCT_USER"){
        return loginPage.setValue('@usernameInput', process.env.GAP_ACCT_USER)
    }else{
        return loginPage.setValue('@usernameInput', username)
    }

})

When(/^I fill in with (\w+) password$/, (password) => {

    if (password.trim() === "GAP_ACCT_PASS"){
        return loginPage.setValue('@passwordInput', process.env.GAP_ACCT_PASS)
    }else{
        return loginPage.setValue('@passwordInput', password)
    }

})

Then(/^I click Sign in button$/, () => {
    return loginPage.click('@signInInput')
})
