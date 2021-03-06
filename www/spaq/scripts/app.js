// set up basic variables for app

const recordButton = document.querySelector('.recordButton');
const stopButton = document.querySelector('.stopButton');
const soundClips = document.querySelector('.sound-clips');
const canvas = document.querySelector('.visualizer');
const mainSection = document.querySelector('.main-controls');
const message = document.getElementById('message');
// let t;

// disable stopButton button while not recording

stopButton.disabled = true;

// visualiser setup - create web audio api context and canvas
let audioCtx;
const canvasCtx = canvas.getContext("2d");

const constraints = {
    audio: true,
    video: false
};


const MAXRECORDINGTIME = 10000; // 10s;
let timeoutID;
const endpoint = '../server/upload.php';
// const endpoint = 'http://localhost/server/upload.php';
let counter = 0; // name audio files

let words = ['kat', 'muis', 'hond'];


//main block for doing the audio recording

navigator.mediaDevices.getUserMedia(constraints)
    .then(function (stream) {

        // Determine mimetype

        const types = {
            "audio/mp4": "mp4",
            "audio/mpeg": "mp4", // away?
            "audio/ogg": "ogg",
            "audio/webm": "webm"

        };
        let mimetype = "audio/ogg";
        mimetype = "audio/webm";
        for (let i of Object.keys(types)) {
            console.log(i + " supported? " + (MediaRecorder.isTypeSupported(i) ? "Yes" : "No"));
            if (MediaRecorder.isTypeSupported(i)) {
                mimetype = i;
                break;
            }
        }
        console.log('mimetype: ', mimetype);
        fileextension = types[mimetype];

        let chunks = [];

        // change for development of production host

        const options = {
            mimeType: mimetype
        };

        const mediaRecorder = new MediaRecorder(stream);
        // https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder

        visualize(stream);

        message.innerHTML = words[counter];


        recordButton.onclick = function () {

            let clip = document.querySelector('div.clip');
            if (clip !== null) {
                clip.parentNode.removeChild(clip);
            }

            mediaRecorder.start();
            timeoutID = setTimeout(stopRecording, MAXRECORDINGTIME);
            console.log('state', mediaRecorder.state);
            console.log('mimetype', mediaRecorder.mimeType);
            console.log('timeoutID', timeoutID);

            console.log("recorder started");
            recordButton.style.background = "red";
              stopButton.disabled = false;
            recordButton.disabled = true;
        }

        function stopRecording() {
            if (mediaRecorder.state === "recording") {
                mediaRecorder.stop();
                console.log(mediaRecorder.state); // inactive
                console.log("recorder stopped");
                recordButton.style.background = "";
                recordButton.style.color = "";
                // mediaRecorder.requestData();
                // message.innerHTML = '';

                stopButton.disabled = true;
                recordButton.disabled = false;
                console.log('timeoutID after stopButton', timeoutID);
                // audioCtx.resume(); // Necessary for Chrome  https://developers.google.com/web/updates/2017/09/autoplay-policy-changes#webaudio


            }
            // audioCtx.resume(); // Necessary for Chrome  https://developers.google.com/web/updates/2017/09/autoplay-policy-changes#webaudio

        }

        stopButton.onclick = function () {
            clearTimeout(timeoutID); // cancel the timeout before the timeout...
            // https://stackoverflow.com/questions/52956179/cleartimeout-isnt-clearing-the-timeout
            // A function call like clearTimeout(timer) cannot change the timer variable. JS doesn't have pass-by-reference calls. – Bergi Oct 23 '18 at 19:08

            stopRecording();
        }

        mediaRecorder.onstop = function (e) {
            // audioCtx.resume(); // Necessary for Chrome  https://developers.google.com/web/updates/2017/09/autoplay-policy-changes#webaudio

            console.log("data available after MediaRecorder.stopButton() called.");

            // this does not make it a file from a certain type...
            let mimestring = '';
            if (mimetype === "audio/mp4") {
                mimestring = mimetype;
            } else {
                mimestring = `${mimetype}; codecs=opus`;
            }
            const blob = new Blob(chunks, { 'type': mimestring });
            // chuncks is array filled during the recording stage, '.ondataavailable' event handler
            chunks = [];
            const audioURL = window.URL.createObjectURL(blob);
            console.log('audiourl: ', audioURL);
            console.log("blob", blob);

            // VISUAL representation
            // if(counter === 5) {
            //     console.log('enough is enough');
            //     message.innerHTML = 'Bedankt!';

            // } else {
            //     // console.log('word:', counter, words[counter + 1]);

            // }
            // const soundClipContainer = createAudioPlayer(counter, audioURL);

            // let clipName = 'Audio' + counter;
            console.log('word after stop:', counter, words[counter]);

            let clipName = words[counter];

            const soundClipContainer = document.createElement('div');
            const clipLabel = document.createElement('p');
            const audio = document.createElement('audio');
            const deleteButton = document.createElement('button');
            const downloadButton = document.createElement('button');
            const downloadLink = document.createElement('a');
            const storeButton = document.createElement('button');

            soundClipContainer.classList.add('clip');
            audio.setAttribute('controls', '');
            deleteButton.textContent = 'Delete';
            deleteButton.className = 'delete';

            downloadButton.textContent = 'Download';
            downloadButton.className = 'download';

            storeButton.textContent = 'Store';
            storeButton.className = 'store';

            console.log('audioelement', audio);
            clipLabel.textContent = words[counter];


            soundClipContainer.appendChild(audio);
            soundClipContainer.appendChild(clipLabel);
            soundClipContainer.appendChild(deleteButton);
            soundClipContainer.appendChild(storeButton);
            audio.controls = true;
            audio.src = audioURL;


            // download handling
            downloadLink.href = audioURL;
            // let filenaam = clipLabel.textContent; // not necessary anymore "global" clipName is changed 

            // downloadLink.setAttribute('download', `${clipName}.${fileextension}`);
            // downloadLink.text = 'Download';
            downloadLink.appendChild(downloadButton);
            soundClipContainer.appendChild(downloadLink);
            soundClips.appendChild(soundClipContainer); // declared at the top

            // store handling store means store on a server

            // eventlisteners 
            // download file
            downloadButton.onclick = function (e) {
                downloadLink.setAttribute('download', `${clipName}.${fileextension}`);
            }

            // delete file
            deleteButton.onclick = function (e) {
                let evtTgt = e.target;
                evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
                console.log('delete audiourl: ', audioURL);
                window.URL.revokeObjectURL(audioURL); // necessary otherwise memory leak or not from mediastream?? Does seem to work.
                // https://stackoverflow.com/questions/49209756/do-i-always-need-to-call-url-revokeobjecturl-explicitly

            }

            // push to server
            storeButton.onclick = function (e) {
                console.log('store');
                console.log('clipname', clipName);
                console.log('extension', fileextension);
                let myHeaders = new Headers();
                myHeaders.append('Accept', 'application/json');
                myHeaders.append("X-filename", clipName); // becomes lowercase in the request
                myHeaders.append("X-tension", fileextension);

                fetch(endpoint, { method: "POST", mode: 'cors', headers: myHeaders, body: blob })
                    .then((response) => {
                        // console.log(response);
                        if (response.ok) {
                            // console.log('response status: ' + response.status);
                            console.log('response na ok ', response);

                            // visual feedback
                            // file stored remove store button

                            return response.text();
                        } else {
                            throw Error(`Server returned ${response.status}: ${response.statusText}`)
                        }
                    })
                    .then((data) => {
                        // let data =  response.success;
                        // console.log('response: ' + response.status );
                        console.log('data:' + data);
                        let json = JSON.parse(data);
                        if (json.storestatus === 'OK') {
                            storeButton.textContent = 'Store Succes!';
                            console.log('store succes');
                            if (counter === words.length -1) {
                                console.log('enough is enough');
                                message.innerHTML = 'Bedankt!';
                                // remove everything
                                let evtTgt = e.target;
                                evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);

                                let elem = document.getElementById("buttons")
                                elem.parentNode.removeChild(elem);


                            } else {
                                counter++; // now I realy understand why React can be convenient, it becomes spagetti prety quick  :-)
                                message.innerHTML = words[counter];
                                // remove clip div with class clip
                                let evtTgt = e.target;
                                evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
                            }
                        }
                    })
                    .catch(err => {
                        alert(err);
                    });
            }
        }

        mediaRecorder.ondataavailable = function (e) {
            chunks.push(e.data);
            // console.log(e.data);
        }
        function visualize(stream) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)(); // need to put it here for Safari
            audioCtx.resume(); // Necessary for Chrome  https://developers.google.com/web/updates/2017/09/autoplay-policy-changes#webaudio

            const source = audioCtx.createMediaStreamSource(stream);

            const analyser = audioCtx.createAnalyser();
            analyser.fftSize = 2048;
            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);

            source.connect(analyser);
            //analyser.connect(audioCtx.destination);

            draw();

            function draw() {
                // canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

                const WIDTH = canvas.width
                const HEIGHT = canvas.height;


                // cancelAnimationFrame(t);
                requestAnimationFrame(draw);
                // console.log('t', t);
                console.log('listening & drawing');


                analyser.getByteTimeDomainData(dataArray);
                // analyser.getFloatTimeDomainData(dataArray);

                canvasCtx.fillStyle = 'rgb(200, 200, 200)';
                canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

                canvasCtx.lineWidth = 2;
                canvasCtx.strokeStyle = 'rgb(0, 0, 0)';

                canvasCtx.beginPath();

                let sliceWidth = WIDTH * 1.0 / bufferLength;
                let x = 0;


                for (let i = 0; i < bufferLength; i++) {

                    let v = dataArray[i] / 128.0;
                    let y = v * HEIGHT / 2;

                    if (i === 0) {
                        canvasCtx.moveTo(x, y);
                    } else {
                        canvasCtx.lineTo(x, y);
                    }

                    x += sliceWidth;
                }

                canvasCtx.lineTo(canvas.width, canvas.height / 2);
                canvasCtx.stroke();

            }

            // audioCtx.resume(); // Necessary for Chrome  https://developers.google.com/web/updates/2017/09/autoplay-policy-changes#webaudio

        }


    })
    .catch(function (err) {
        console.log('The following error occured: ' + err);
    });


window.onresize = function () {
    canvas.width = mainSection.offsetWidth;
}

window.onresize();
