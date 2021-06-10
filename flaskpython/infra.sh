#!/bin/sh

cw=${PWD##*/} 


for directory in static/reception log;  do
    if [ ! -d $directory ]; then
        mkdir $directory
        echo "Created $directory it didn't exist"
    fi
done

# for directory in reception log;  do
#     chmod 777 $dir
#     echo "chmod 777 on $dir"
# done




