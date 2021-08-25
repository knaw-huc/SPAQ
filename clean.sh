#!/bin/sh
# set -x;
cw=${PWD##*/} 

	for dir in storage/reception storage/conversion ; do
    		rm -fr  $dir/*
    		echo "rm content of  $dir"
	done




