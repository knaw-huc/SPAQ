# README 

## SPAQ

SPeech AQuisition (using Surveys) is a CLARIAH+ WP3 task

This repository is for local development, experiments, findings.
The tool is for the moment based on web-dictaphone.

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

server
*    <http://localhost/server/>

    
    


