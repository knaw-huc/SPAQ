# README 

## SPAQ

SPeech AQuisition (using Surveys) is a CLARIAH+ WP3 task

This repository is for local development, experiments, findings with webaudio / mediacapture
The tool is based on web-dictaphone.

NOT PRODUCTION READY

## Background

See the wiki pages on:
https://github.com/knaw-huc/SPAQ/wiki

## Prerequisites

* Docker is up and running
* a *nix based system
* have run the infra.sh at least one time

## infra.sh

You have to run this once.

```bash
cd SPAQ/www/server
./infra.sh #creates the directories with the right privileges
```

## Quickstart

Startup:  ```docker-compose up -d ``` from root directory.

Go to:

client
*    <http://localhost/spaq/>

server (view the submitted files)

* http://localhost/server/watch.php

    
## Utility script

cd server
./clean.sh

removes all audio files  


