#!/bin/sh

cw=${PWD##*/} 


for directory in cache templates_c config temp logs resources; do
    if [ ! -d $directory ]; then
        mkdir $directory
    	echo "Created $directory it didn't exist"
    fi
done

for dir in cache templates_c temp logs resources; do
    chmod 777 $dir
    echo "chmod 777 on $dir"
done


rm -fr templates_c/*
echo "Removed compiled Smarty templates from templates_c"

