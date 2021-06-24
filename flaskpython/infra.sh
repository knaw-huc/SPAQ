#!/bin/sh

cw=${PWD##*/} 


for directory in static/reception conversion log;  do
    if [ ! -d $directory ]; then
        mkdir $directory
        echo "Created $directory it didn't exist"
    fi
done






