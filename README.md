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

We use docker compose to run a chromedriver image (like selenium), that also runs a vnc server, and an image with the tests and nightwatch binary that runs the test.

Reports are written to the reports folder, and videos and screenshots are available on failure in their respectively named folders.

You can watch the tests run by connecting to the VNC server running on the chromedriver image (VNC port is forwarded to [localhost:5900](localhost:5900) from docker compose) or geckodriver/firefox ([localhost:5901](localhost:5901)) with the password `secret`

## Features
- Can use Docker to run the test cases
- Create screenshots (on fails) and videos
- Support several browsers, like Chrome and Firefox driver
- Integrate Cucumber framework and support the POM pattern
- Generate an HTML report
- Send email reports
- Support CLI and SSH connections
- Use WebSocket to Debugger
- Run parallel test cases on several browsers

## Future features
- Use custom assertions to generate logs
- Slack notifications
- Integrate with Testrail and Jira
- Connection with GCloud
- Transfer files with SFTP
- Send test results to Cloud (non-relational database)
- Use Machine Learning algorithms to improve the performance framework
- More ...

## License
Released under the [MIT license](https://opensource.org/licenses/MIT).

## Author
[Sergio GQ](https://sergioalbertogq.blogspot.com)

Email: sergioalbertogq@gmail.com

Skype: sergiogqts

