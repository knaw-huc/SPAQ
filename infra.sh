#!/bin/sh

cw=${PWD##*/} 


for directory in convert recept flask/static/reception flask/static/conversion flask/log;  do
    if [ ! -d $directory ]; then
        mkdir $directory
        echo "Created $directory it didn't exist"
    fi
done






