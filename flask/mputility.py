from os import listdir 
from os.path import isfile, join
from genericpath import isdir



def listFiles(mypath):
    onlyfiles = [f for f in listdir(mypath) if isfile(join(mypath, f))]
    return onlyfiles

def listDirs(mypath):
    onlydirs = [f for f in listdir(mypath) if isdir(join(mypath, f))]
    return onlydirs