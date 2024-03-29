#!/usr/bin/env python3

import time
from watchdog.observers import Observer
from watchdog.events import PatternMatchingEventHandler
import subprocess
import os
# import logging

def on_created(event):
    print(f"{event.src_path} created")
    # if os.path.exists(event.src_path and event.src_path[-3:] == 'ogg'):
    if os.path.exists(event.src_path):

        print("yes, ready for conversion")
        reception = event.src_path
        basename = os.path.basename(event.src_path)
        dname = os.path.dirname(event.src_path)
        dbasename = os.path.basename(dname)

        print('basename', basename)
        print('dname', dname)
        print('dbasename', dbasename)

        dirpath = conversion_path + '/' + dbasename + '/'
        if not os.path.exists(dirpath):
            try:
                os.mkdir(dirpath)
                print ("Created the directory %s !" % dirpath)

            except OSError:
                print ("Creation of the directory %s failed" % dirpath)


        # conversion = os.path.dirname(event.src_path) + '/conv_' + basename
        conversion = conversion_path + '/' + dbasename + '/' + basename + '.mp4'
        print('conv:', conversion)

        cmd = "/usr/bin/ffmpeg -y -hide_banner -loglevel error -i " +  reception + "  " + conversion 
        # logging.info('m', cmd)
        print(cmd, 'commando pingelen')
        # subprocess.run(["ls", "-l"])
        # subprocess.run(cmd)
        # not the best solution: https://stackabuse.com/executing-shell-commands-with-python TODO better and safer
        os.system(cmd)

    else:
        print("no")        

def on_deleted(event):
    # logging.logger.info('delete')

    print(f"{event.src_path} was deleted")

def on_modified(event):
    print(f"{event.src_path} has been modified")

def on_moved(event):
    print(f"{event.src_path} is moved to {event.dest_path}")


if __name__ == "__main__":
    patterns = ["*.ogg", "*.webm"]
    ignore_patterns = None #
    ignore_directories = False
    case_sensitive = True
    my_event_handler = PatternMatchingEventHandler(patterns, ignore_patterns, ignore_directories, case_sensitive)

    my_event_handler.on_created = on_created
    # my_event_handler.on_deleted = on_deleted
    # my_event_handler.on_modified = on_modified
    # my_event_handler.on_moved = on_moved
    
    '''Constants in Python? '''
    reception_path = os.path.abspath("./static/storage/reception/")
    conversion_path = os.path.abspath("./static/storage/conversion/")

    go_recursively = True
    my_observer = Observer()
    my_observer.schedule(my_event_handler, reception_path, recursive=go_recursively)

    my_observer.start()
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        my_observer.stop()
        my_observer.join()
