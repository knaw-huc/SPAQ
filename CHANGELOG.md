# log & changelog

## 11-3-2021

- timestamps in filenamesd
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