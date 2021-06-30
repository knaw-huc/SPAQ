#!/usr/bin/env python3

import time
from watchdog.observers import Observer
from watchdog.events import PatternMatchingEventHandler
import subprocess
import os

def on_created(event):
    print(f"{event.src_path} created")
    if os.path.exists(event.src_path):
        print("yes, ready for conversion")
        reception = event.src_path
        basename = os.path.basename(event.src_path)
        # conversion = os.path.dirname(event.src_path) + '/conv_' + basename
        conversion = conversion_path + '/' + basename + '.mp4'

        cmd = "/usr/bin/ffmpeg -i " +  reception + " " + conversion 
        # print(cmd)
        # subprocess.run(["ls", "-l"])
        # subprocess.run(cmd)
        # not the best solution: https://stackabuse.com/executing-shell-commands-with-python TODO better and safer
        os.system(cmd)

    else:
        print("no")        

def on_deleted(event):
    print(f"{event.src_path} was deleted")

def on_modified(event):
    print(f"{event.src_path} has been modified")

def on_moved(event):
    print(f"{event.src_path} is moved to {event.dest_path}")


if __name__ == "__main__":
    patterns = ["*"]
    ignore_patterns = None #
    ignore_directories = False
    case_sensitive = True
    my_event_handler = PatternMatchingEventHandler(patterns, ignore_patterns, ignore_directories, case_sensitive)

    my_event_handler.on_created = on_created
    my_event_handler.on_deleted = on_deleted
    my_event_handler.on_modified = on_modified
    my_event_handler.on_moved = on_moved
    
    '''Constants in Python? '''
    reception_path = os.path.abspath("./static/reception/")
    conversion_path = os.path.abspath("./static/conversion/")

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
