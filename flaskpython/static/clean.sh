#!/bin/sh
# set -x;
cw=${PWD##*/} 


if [ $cw = "static" ]; then
	echo 'yes static folder'
	for dir in inspect reception  ; do
    		rm -fr  $dir/*
    		echo "rm contens of  $dir"
	done
else
	echo 'not server dir'
fi






