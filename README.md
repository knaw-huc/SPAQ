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


server (view the submitted files)

* http://localhost:8087/watch/reception/

    
## Utility script

    cd flaskpython/
    ./clean.sh

removes all audio files in static dir


