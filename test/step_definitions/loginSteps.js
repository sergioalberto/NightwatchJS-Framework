const { client } = require('nightwatch-cucumber')
const { When, Then } = require('cucumber')
const { expect } = require('chai');

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
    return loginPage.setValue('@usernameInput', username)
})

When(/^I fill in with (\w+) password$/, (password) => {
    return loginPage.setValue('@passwordInput', password)
})

Then(/^I click Sign in button$/, () => {
    return loginPage.click('@signInInput')
})
