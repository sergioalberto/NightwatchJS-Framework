docker-compose up -d hub chrome-debug firefox-debug
docker-compose run --name "nightwatch_framework" -e FIREFOX=false --rm nightwatch
