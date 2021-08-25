#!/bin/sh

cw=${PWD##*/} 


for directory in storage/conversion storage/reception storage/uploads flask/static/conversion flask/static/uploads flask/log watchdog/storage/reception watchdog/storage/conversion watchdog/storage/uploads limesurvey/config limesurvey/plugins limesurvey/upload;  do
    if [ ! -d $directory ]; then
        mkdir -p $directory
        echo "Created $directory it didn't exist"
    fi
done






