#!/bin/sh
# set -x;
cw=${PWD##*/} 


if [ $cw = "flaskpython" ]; then
	echo 'yes flaskpython directory'
	for dir in static/storage/reception static/storage/conversion ; do
    		rm -fr  $dir/*
    		echo "rm contens of  $dir"
	done
else
	echo 'not server dir'
fi






