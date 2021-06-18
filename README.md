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


server (view the submitted files standalone)

* http://localhost:8087/watch/reception/9999/

    
## Utility script

    cd flaskpython/
    ./clean.sh

removes all audio files in static dir

## create .lsq file with recording possibility

- create wordlist in text editor, each phrase on a different line, example test.txt
- submit this list to http://localhost:8087/submitwordlist/
- download list
- import in an local LimeSurvey instance when creating a new survey

## collected audiorecordings

They end up in flaskpython/reception/

### Naming of folders

- Standalone: reception/{SAVEDID}/
- LimeSurvey / preview: reception/9999/
- LimeSurvey / activated : reception/<responseid>

The <responseid> is a actualized {SAVEID} of a running Limesurvey

