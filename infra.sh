#!/bin/sh

cw=${PWD##*/} 


for directory in storage/conversion storage/reception audioreception/static/storage/reception audioreception/static/storage/conversion audioreception/static/uploads audioreception/log audioconverter/static/storage/reception audioconverter/static/storage/conversion questiontemplatemaker/static/uploads limesurvey/config limesurvey/plugins limesurvey/upload;  do
    if [ ! -d $directory ]; then
        mkdir -p $directory
        echo "Created $directory it didn't exist"
    fi
done






