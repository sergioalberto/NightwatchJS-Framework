#!/bin/bash

echo "Run on Firefox: $FIREFOX"

if [ $FIREFOX == 'true' ]
then
	npm run firefox-test
else
	npm run chrome-test
fi
