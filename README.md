# Nightwatch-Cucumber Framework

##  Install NodeJS (Ubuntu) 
```
sudo apt-get update
sudo apt-get install nodejs
sudo apt-get install npm
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs
nodejs -v
```
```
sudo npm i -g ntl
```
#### Install Docker (Ubuntu)
[Docker](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-16-04) - [Docker Compose](https://docs.docker.com/compose/install/#install-compose)

## Docker Usage (Ubuntu)
```
make build
make run browser=Chrome
make debug browser=Firefox
make clean
```

## Docker Usage (Windows)
```
runDocker.bat
stopDocker.bat
```

## About the framework

The test framework uses [nightwatch](http://nightwatchjs.org/), [cucumber js](https://cucumber.io/), and [nightwatch-cucumber](https://mucsi96.github.io/nightwatch-cucumber/) to stitch them together.

We use docker compose to run a chromedriver image (like Selenium), that also runs a VNC Server, and an image with the tests and Nightwatch binary that runs the test.

Reports are written to the reports folder, and screenshots are available on failure in their respectively named folders.

You can watch the tests run by connecting to the VNC Server running on the chromedriver image (VNC port is forwarded to [localhost:5900](http://localhost:5900) from docker compose) or geckodriver/firefox ([localhost:5901](http://localhost:5901)) with the password `secret`

## Features
- Can use [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose) to run the test cases
- Create screenshots (on fails)
- Support several browsers, like Chrome and Firefox driver ([WebDriver](https://www.w3.org/TR/webdriver/)). Also, headless browser
- Integrate [Cucumber](https://docs.cucumber.io) framework (using Gherkin syntax and BDD-style) and support the POM pattern
- Generate an HTML report
- Send email reports
- Support CLI and SSH connections
- Use WebSocket to Debugger
- Run parallel test cases on several browsers
- Support [ESLint](https://eslint.org) (E.i: `npm run -s eslint libs/email.js`)
- Integrate with [Testrail](https://secure.gurock.com/customers/testrail/trial)

## Future features
- Record videos
- Use custom assertions to generate logs
- Slack notifications
- Integrate with Jira, [Saucelabs](https://saucelabs.com) and [BrowserStack](https://www.browserstack.com)
- Connection with GCloud
- Transfer files with SFTP protocol
- Send test results to Cloud BD (non-relational database)
- Use Machine Learning algorithms to improve the framework performance (result predictions and smart executions)
- More ...

## License
Released under the [MIT license](https://opensource.org/licenses/MIT).

## Author
[Sergio GQ](https://sergioalbertogq.blogspot.com)

Email: sergioalbertogq@gmail.com

Skype: sergiogqts
