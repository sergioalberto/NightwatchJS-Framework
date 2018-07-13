#!/bin/bash

echo "Run on Firefox: $FIREFOX"

if [ $FIREFOX == 'true' ]
then
	npm run firefox_test
else
	npm run chrome_test
fi
