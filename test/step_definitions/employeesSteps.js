const { client } = require('nightwatch-cucumber')
const { When, Then, And, Given, But } = require('cucumber')
var expect = require('chai').expect;

global.employeesPage = client.page.employeesPage()

Then(/^I validate that employee page (was|was not) loaded$/, (was_loaded) => {

    if(was_loaded == "was"){
        return employeesPage.waitForElementVisible('@successfullSignIn', 10000).assert.visible('@successfullSignIn')
    }else{
        return employeesPage.expect.element('@successfullSignIn').to.not.be.present.before(1000)
    }

})
