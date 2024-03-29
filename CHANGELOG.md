# log & changelog

## 13-2-2023

- start with rememberance of already pushed soundfiles after break, shed material

## Issues to solve

- todo bugfix: next button disappears in LimeSurvey? I think only with no interuption flag
- todo serverside validation in Flask on textfile
- todo more info to browser
- more userfriendly (JS) with changing language in question template maker

## 7-2-2024

- goal succeeded: question (in JS) knows now about status (finished) and which files are stored wiht the help of local storage
- finished flag in local storage
- from shed to dev
- test and develop it works
- added it to the ninja template
- feature: flexible input message concluded push to server
- fix: no more ask for camera/mic permissions if survey is concluded


## 31-01-2024

- local storage in shed file
- inform the client with filename from the backend
- TODO: local storage in the client, for back forth navigation
- created a shed for html / js tests
- separated css from the templates in questiontemplatemaker

## 24-01-2024

- experiment with latest version of LimeSurvey
- test: SPAQ with version 6.4.2 does not work, also test with standalone
- image: acspri/limesurvey:5.6.51 does work it's now 5.2.2 also on K8s, had to give full permissions to bind mount


## 23-02-2023

- interupt => interrupt
LimeSurvey specific question about next button and resume button. Hide them optional during recording
Default is in this stadium. Allow interruption. 

- interruption boolean in HTML/Ninja submission template
- handling in Python app.py
- added functions in JavaScript audioapplhtml
- tested the principles in analyses/SimpleTest.html
- implemented it

## 22-02-2023

- quotes around word or phrase

On request:
- longer 
- change in default wordings end message series of question
- download sound-files possible, zipped

- more context around the demo/fake passwords

## 28-10-2022

- on request, make the concluding text after the last test phrase, configurable, sometimes no message is necessary

## 9-2-2022

- interface bug: there was no translation for store
- counter / total phrases left visual feedback


## 31-1-2022

### request: dutch translations in template
done

### new feature: also standalone html generation

done (the basics), option in the questiontemplatemaker (html)

- Also convenient for testing, you don't need a limesurvey for it.
- Also convenient when you want this type of question handle by a own / different backend


- bug solve: to many escapes on the phrases json, needed the safe parameter in the jinja template
- seperate templates for .lsq and .html
- tested the results
- 
TODO: 
- bug in css with dutch translation (disapearing submit button)
- generalize solution for language, language files in json probably

## 20-1-2022

- started implementing researcher request for the template maker
- refactored variables to template, now via dictionary)
- escaped variable in template, more to do

### request: determine the max record time for a phrase in the userinterface, default 10 seconds
done: addes also a safety limit to 1 minute

### request: 'words or phrases (default: words)"
done: but more flexible (like LimeSurvey), formulate your own sentence with default sentence about words 

### request: 'words or phrases countdown'
done: 

## 15-11-2021

- removed php server for the spaqclient from the stack
- more feedback in the audio reception service
- simplified .lsq creation, env of endpoint to flask templatemaker
- cleanups

## 14-11-2021

- build the images as standalone
- small optimisations
- env of endpoint in questiontemplatemaker

## 13-11-2021

- solved cors problems
- more tests on the upload function in flask
- php build failed => older version adapted the gd module
- deployment substitution endpoint


## 12-11-2021

- basic authentication in Flask, for now only in the audioreception service
- credentials via env variables, change them in the docker-compose to your taste
- cors problems on dev server

## 11-11-2021

- back to php7.3, 7.4 does not work on portainer (does not exist?)
- working on portainer

## 10-11-2021

- gunicorn experiments, gunicorn instead of flask for development! Start with reload and acceslog flags
- app.logger.info, experiments, succeeded
- new limesurvey 5.2.0 https://community.limesurvey.org/release/211110/
- the LimeSurvey roadmap: https://manual.limesurvey.org/LimeSurvey_roadmap
- tested it with preview LS and activated survey
- One LimeSurvey instance can have several Surveys, with slightly different use-cases. To accomodate that, hierarchy is now in place.
- wwatch reception, working again
- separate template files TODO abstract and streamline

## 9-11-2021

- adaptation of the README
- IMPORTANT LS 5 is probably near: https://forums.limesurvey.org/forum/installation-a-update-issues/125837-hi,-which-edition-should-i-install-lts-3-x-or-5-x%EF%BC%9F#221612
- new version 5.1.18 
- getting back into Flask
- survey ID folder creation TODO rewrite Flask code, get into it again


## 5-11-2021

- getting acquainted again with this stack again, got it working localy

## 3-9-2021

- failed attempt to get the docker-compose working on our development server

## 27-8-2021

- added randomisation choice with list of phrases
- for LS 5.1 the base language of the survey is required, added that to the form as option
- solved not working stack by comparing last working version
- restored php server for SPAQ client, this solved the cors problems

## 26-8-2021

- added filepatterns for .ogg and .webm to the watcher, audioconvertor
- more cleanup chores, removed ffmpeg from dockerfiles, optimized infra.sh
- started with freezing versions for flask. used pip freeze in the container
- troubleshooting cors problems, no result, frustrating

## 25-8-2021

### refactor day

- renaming, more function then technique (technique in comments)
- separate microservice for making a .lsq template from the flaskserver
- bug fix shared volume for two microservices
- removed php server for the client, not necessary
- adapted readmes
- tested from scratch 

New LimeSurvey version, dangerous bugs in the previous one. 
Also import of question templates possible... Investigate

## 20-7-2021

- separate watchdog for audio conversion

## 7-7-2021

- started decoupling watcher and flask to separate microservices
- ffmpeg relative osx  homebrew version on a different place then ubuntu docker for testing

## 30-6-2021

- cleanup

## 24-6-2021

- added ffmpeg conversion to watcher
- updated Python image to 3.9
- added ffmpeg to Python image
- extending and refactoring watcher


## 23-6-2021

- added first version of watchdog script. python daemon 
- new version LimeSurvey 5.0.5 and  tested it, also  with .lsq generation: OK
- fixed the 5.0.5 version in docker-compose files
- fixed mariadb at 10.5
- more info in readme

## 22-6-2021

- integrated an instance of limesurvey into spaq stack for easy testing

## 18-6-2021

- solved preview problem in LimeSurvey with imported .lsq 
- tested, standalone, preview and activated survey. It works. 
- tested windows returns submitted wordlist file
- todo finetuning

## 17-6-2021

- added test.txt
- it works uploading a text file and converting it into a .lsq that works
- upload text file to flask for wordbulks
- import .lsq in LimeSurvey no succes, bug found, the 2json output from jinja2, is not compatible with LimeSurvey .lsq (WEIRD)
- solution: create json from flask instead of jinja2, with the indent option

## 16-6-2021

- create a .lsq file start

## 11-6-2021

- harvest in js, .json TODO
- serve .json with phrases
- list of responses
- responseid in client => dir in backend

## 10-6-2021

- flask solved audio file serv problem
- from now on, use flask/python as backend instead of apache/php

## 9-6-2021

- flask: templates basic
- static problem css?

## 4-6-2021

- more flexible for phrases instead of words, list of objects
- id pushed to server instead of name
- randomisation option
- refactor code to new phrase structure

## 3-6-2021

- start rebuilding php server in flask

## 2-6-2021

- added Flask server as alternative
- solving cors trouble, options request (different domain) created ghost files
- https://www.moesif.com/blog/technical/cors/Authoritative-Guide-to-CORS-Cross-Origin-Resource-Sharing-for-REST-APIs/

## 19-5-2021

- added LimeSurvey structure file, with audio question, for import in LimeSurvey
- lifted variables to the top

## 21-4-2021

- PHP7.4
- GD adaptation for rebuild

## 8-4-2021

- getenv()
- primitive logging

## 7-4-2021

- solved CORS problem
- UX improvement record button
- preventDefault() on click eventHandlers, 
- integration in LS template uses submit default for the buttons, embedded in form
- removed download button

## 26-3-2021

- added Powerpoint Presentation

## 25-3-2021

- fixed url for server

## 19-3-2021

- thank you note on the right spot
- IFFE wrapper

## 18-3-2021

- feedback about succesful store
- changed colorscheme
- added key control, r: record, s: stop recording, p: play recording

## 11-3-2021

- fixed conversion bug
- timestamps in filenames
- corrected servername
- adapted css & html

## 5-3-2021

- implemented user story: read words 
- refactored 'superfluous' call to getUserMedia away
- refactored in branch 'smallercode'
- added audioContext.resume() (needed for Chrome)
- fixed audio visualisation in Safari, apparently the prompt interaction has consequences there... 
- removed audio renaming, automatic naming with a counter crude but pragmatic and effective way of solving this problem, also not neccessary for real surveys at this moment

## 3-3-2021

- added dictaphone that works also under Safari

## 25-2-2021

- client-side timer (10s) for recordings
- a cleanup, a bit
- cors experiments
- removed cors for now

## 24-2-2021

- changed 'lowres' format for inspect to mp4 (aac), Safari, can't read webm and ogg... so you can use Safari for backend
- mp42mp3 conversion is truncating with fmmpeg, mp3 is obsolete mp4 with aac is now becoming more prominent
- not important now, pragmatic choice is mp4 (aac)
- removed storage part and storage folder for now

## 17-2-2021

- interface tweaks
- prevent command shell injection
- escaping, preventing js injection, although this is just a concept
- added menu for file browsing

## 16-2-2021

- added possibility to show also the inspect (mp3) and storage (wav) versions
- added administration clean.sh script
- ultra-lite back end for web browsing through the uploaded files, just for development, testing
- added smarty
- more informal tests (iPads, iPhones, phones): need server-side browser for testing

## 15-2-2021
- minimal visual feedback for Safari
- informal test with old Motorola G3 with Android 6.0.6 (sec.patch 2017) Chrome: succes but interface trouble

## 11-2-2021

- MAYBE add codec aac for Safari
- a kind of support for Safari implemented, first attempt
- no visualizer for Safari yet
- better fake favicon.ico hack, for development


## 10-2-2021

- conversion with fmmpeg to .mp3 and .wav implemented 
- added ffmpeg to Dockerfile
- test `docker exec -it spaqpublic_php-apache_1 ffmpeg -i /var/www/html/server/reception/recording.webm /var/www/html/server/inspect/recording.mp3` Check
- different server infrastructure (in this demo), prep for conversion
- reception: receives the files from the browser
- inspect: will be used for immediate feedback to researcher, in a format readable with as many browsers as possible
- storage: for 'long' term preservation

## 5-2-2021

- storage problems testscript
- troubleshooting
- ffmpeg -i hoihoi.webm hoihoi.mp3 works 
- todo: ffmpeg install it in docker-image

## 4-2-2021

- adapt php script for development server
- generalized headers js

## 28-1-2021

- ask for supported mime-types
- fixed extension bug server-side
- tried to convert video example to audio example for learning purposes

## 27-1-2021

- bugfix change label after succesfull storage
- adapted instructions for local testing, after checkout test

## 26-1-2021

- brought code to github
- made a SPAQ wiki 

## 22-1-2021

* fetch experimenting, JSON strange from PHP errors
* fetch minimal example
* TODO change audio formats configuration 
* visual feedback from post to server with fetch

## 21-1-2021

* looked into license https://creativecommons.org/publicdomain/zero/1.0/ public domain
* send the given name of the file as an extra header X-filename
* it works! upload to php server from js (fetch) and storage on filesystem server. Lots of tweaking now needed.
* converted the link into a nice button
* convert an audio-blob to a downloadable link with a given name
* wrote some minimal server php code

## 20-1-2021

* css tricks: https://css-tricks.com/the-checkbox-hack/
* modifying and experimenting with web-dictaphone
* added save button
* added revokeObjectURL after delete
* cleanup
* experiments with objectURL Blob

## 15-1-2021

* experiments with async promises
* investigate web-dictaphone
* favicon

## 20-11-2020

* started this repository stack for client and server experiments, JavaScript for client. PHP for server. (LimeSurvey is made in PHP)