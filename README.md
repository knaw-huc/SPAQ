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
- Flask / Python
- Docker

## Prerequisites

* Docker is up and running
* a *nix based system

## First run

infra.sh creates two "working" directories not in git

    cd flaskpython
    ./infra.sh

## Quickstart

Startup:  ```docker-compose up -d ``` from root directory.

Go to:

client:
*    <http://localhost/spaq/>

Or just open the spaq/index.html. You don't need the server.


server (view the submitted files standalone)

* http://localhost:8087/watch/reception/9999/

limesurvey:

* http://localhost:8085/admin/

login with credentials in docker-compose file

* http://localhost:8087/submitwordlist/

submit a text file for the creation of an lsq file
    
## Utility script

    cd flaskpython/
    ./clean.sh

removes all audio files in static dir

## create .lsq file with recording possibility

- create wordlist in text editor, each phrase on a different line, example test.txt
- submit this list to http://localhost:8087/submitwordlist/
- download list
- import in an local LimeSurvey instance when creating a new survey

## Watcher python script
```
cd /flaskpython
python3 watcher.py

# it watches the reception folder and converts added files to the conversion folder

```

or from the docker's POV:

```
docker exec -it <dockerflashid> bash
./watcher.py
```

## collected audiorecordings

They end up in flaskpython/reception/

### Naming of folders

- Standalone: reception/{SAVEDID}/
- LimeSurvey / preview: reception/9999/
- LimeSurvey / activated : reception/<responseid>

The <responseid> is an actualized {SAVEID} of a running Limesurvey



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



