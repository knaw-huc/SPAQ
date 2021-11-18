# README 

## SPAQ

SPeech AQuisition (using Surveys) is a CLARIAH+ WP3 task

This repository is for local development, experiments, findings with webaudio / mediacapture
The tool is based on web-dictaphone.

NOT PRODUCTION READY

## Background 

See the wiki pages on:
https://github.com/knaw-huc/SPAQ/wiki


[Powerpoint presentation Clariah TechDay March, 25th 2021](
https://github.com/knaw-huc/SPAQ/wiki/files/HuC-DI-SD-CLP-WP3-SPAQ.pdf "techday presentation ")


## Techniques

- JavaScript: WebAudio
- Flask / Python, for several microservices
- Docker
- PHP / MariaDB for LimeSurvey

## Prerequisites

* Docker is up and running
* a *nix based system

## First run

infra.sh creates a couple of "working" directories not in git

    ./infra.sh

## Quickstart

Startup:  ```docker-compose up -d ``` from root directory.

### Test if audio reception is working

1] open spaqclient/index.html in your browser, give permission to your audiorecording device

2] server (view the submitted files standalone)

* http://localhost:8087/watch/reception/

### Workflow of one type of audio question (wordlists)

Summary: create an .lsq file with one type of audio-recording question (for now it's the wordlist), 
import that question into a limesurvey question. 


1] visit limesurvey (login with admin / password)

* http://localhost:8082/admin/

2] submit a text file, with words, for the creation of an lsq file

* http://localhost:8089/submitwordlist/

Result: automatic download of an .lsq file suitable for import in LimeSurvey

3] import the .lsq file in a new question LimeSurvey
    
4] view submitted audio files 

* http://localhost:8087/watch/reception/

Naming convention of the folders. Down.

    
## Utility script

    
    ./clean.sh

removes all audio files in storage dir


## create .lsq file with recording possibility

- create wordlist in text editor, each phrase on a different line, example zinnen.txt in root folder
- submit this list to http://localhost:8089/submitwordlist/
- download list
- import in an local LimeSurvey instance when creating a new survey


## collected audiorecordings

They end up in storage/reception/
storage is a bind folder for two services

### Naming of folders

- Standalone: reception/{SID}/{SAVEDID}/
- LimeSurvey / preview: reception/testing/9999/
- LimeSurvey / activated : reception/<surveyid>/<responseid>

The <responseid> is an actualized {SAVEID} of a running Limesurvey.
The <surveyid> is an actualized {SID} of a running Limesurvey.

One LimeSurvey instance can have several Surveys, with slightly different use-cases.
To accomodate that, hierarchy is now in place.


## LINKS

### LimeSurvey

- https://community.limesurvey.org/
- https://hub.docker.com/r/acspri/limesurvey
- https://github.com/adamzammit/limesurvey-docker

### WebRecording

- https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Recording_API
- https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Recording_API/Using_the_MediaStream_Recording_API


### Flask / Python

- https://flask.palletsprojects.com/en/2.0.x/
- http://thepythoncorner.com/dev/how-to-create-a-watchdog-in-python-to-look-for-filesystem-changes/
- https://pypi.org/project/watchdog/



