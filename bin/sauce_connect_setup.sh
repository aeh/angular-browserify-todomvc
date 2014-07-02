#!/bin/bash

set -e

# Setup and start Sauce Connect for your TravisCI build
# This script requires your .travis.yml to include the following two private env variables:
# SAUCE_USERNAME
# SAUCE_ACCESS_KEY
# Follow the steps at https://saucelabs.com/opensource/travis to set that up.
#
# Curl and run this script as part of your .travis.yml before_script section:
# before_script:
#   - ./bin/sauce_connect_setup.sh

CONNECT_URL="https://d2nkw87yt5k0to.cloudfront.net/downloads/sc-latest-linux.tar.gz"
CONNECT_DIR="/tmp/sauce-connect-$RANDOM"
CONNECT_DOWNLOAD="sc-latest-linux.tar.gz"

# Get connect
mkdir -p $CONNECT_DIR
cd $CONNECT_DIR
curl $CONNECT_URL -o $CONNECT_DOWNLOAD 2> /dev/null 1> /dev/null
mkdir sauce-connect
tar --extract --file=$CONNECT_DOWNLOAD --strip-components=1 --directory=sauce-connect > /dev/null
rm $CONNECT_DOWNLOAD

ARGS=""
# Set tunnel-id only on Travis, to make local testing easier.
if [ ! -z "$TRAVIS_JOB_NUMBER" ]; then
    ARGS="$ARGS --tunnel-identifier $TRAVIS_JOB_NUMBER"
fi
if [ ! -z "$BROWSER_PROVIDER_READY_FILE" ]; then
  ARGS="$ARGS --readyfile $BROWSER_PROVIDER_READY_FILE"
fi

# Start
echo "Starting Sauce Connect in the background with args: $ARGS"
sauce-connect/bin/sc -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY -v $ARGS &

# Wait for Connect to be ready before exiting
while [ ! -f $READY_FILE ]; do
  sleep .5
done
