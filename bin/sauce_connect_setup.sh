#!/bin/bash

# Setup and start Sauce Connect for your TravisCI build
# This script requires your .travis.yml to include the following two private env variables:
# SAUCE_USERNAME
# SAUCE_ACCESS_KEY
# Follow the steps at https://saucelabs.com/opensource/travis to set that up.
#
# Curl and run this script as part of your .travis.yml before_script section:
# before_script:
#   - ./bin/sauce_connect_setup.sh

CONNECT_URL="https://saucelabs.com/downloads/sc-4.3-linux.tar.gz"
CONNECT_DIR="/tmp/sauce-connect-$RANDOM"
CONNECT_DOWNLOAD="sc-4.3-linux.tar.gz"
CONNECT_BIN="./sc-4.3-linux/bin/sc"
READY_FILE="connect-ready-$RANDOM"

# Get connect and start it
mkdir -p $CONNECT_DIR
cd $CONNECT_DIR
curl $CONNECT_URL > $CONNECT_DOWNLOAD
tar zxvf $CONNECT_DOWNLOAD
rm $CONNECT_DOWNLOAD
$CONNECT_BIN --readyfile $READY_FILE \
  --verbose --doctor \
  --tunnel-identifier $TRAVIS_JOB_NUMBER \
  -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY &

# Wait for Connect to be ready before exiting
while [ ! -f $READY_FILE ]; do
  sleep .5
done
