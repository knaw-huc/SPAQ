#!/bin/sh

cw=${PWD##*/} 


for directory in storage inspect reception  tmp logs ; do
    if [ ! -d $directory ]; then
        mkdir $directory
        echo "Created $directory it didn't exist"
    fi
done

for dir in storage inspect reception  tmp logs ; do
    chmod 777 $dir
    echo "chmod 777 on $dir"
done



rm -fr templates_c/*
echo "Removed compiled Smarty templates from templates_c"

