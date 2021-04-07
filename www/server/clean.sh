#!/bin/sh
# set -x;
cw=${PWD##*/} 


if [ $cw = "server" ]; then
	echo 'yes server'
	for dir in storage inspect reception  templates_c ; do
    		rm -fr  $dir/*
    		echo "rm contens of  $dir"
	done
else
	echo 'not server dir'
fi






