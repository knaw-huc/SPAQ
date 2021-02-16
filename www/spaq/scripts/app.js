// set up basic variables for app

const record = document.querySelector('.record');
const stop = document.querySelector('.stop');
const soundClips = document.querySelector('.sound-clips');
const canvas = document.querySelector('.visualizer');
const mainSection = document.querySelector('.main-controls');
const message = document.getElementById('message');


// disable stop button while not recording

stop.disabled = true;

// visualiser setup - create web audio api context and canvas

let audioCtx;
const canvasCtx = canvas.getContext("2d");

//main block for doing the audio recording
const constraints = {
    audio: true,
    video: false



};
// const supportedConstraints = navigator.mediaDevices.getSupportedConstraints();
// console.log('constraints supported', supportedConstraints);

if (navigator.mediaDevices.getUserMedia(constraints)) {
    console.log('getUserMedia supported.');
    
    // Determine mimetype
    const types = {
        "audio/mp4": "mp4",
        "audio/mpeg" : "mp4",
        "audio/ogg" : "ogg",
        "audio/webm" : "webm"
    
    };
    let mimetype = "audio/ogg";
    for (let i of Object.keys(types)) {
        console.log(i + " supported? " + (MediaRecorder.isTypeSupported(i) ? "Yes" : "No"));
        if (MediaRecorder.isTypeSupported(i)) {
            mimetype = i;
            // break;
        }
    }
    console.log('mimetype: ', mimetype);
    fileextension = types[mimetype];

    let chunks = [];

  
    const endpoint = '../server/upload.php';


    // change for development of production host

    let onSuccess = function (stream) { // function expression called from a resolved promise  line 173
        const options = {
            mimeType: mimetype
        };

        const mediaRecorder = new MediaRecorder(stream);
        // https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder
        // console.log('mimetype', mediaRecorder.mimeType);

        if (mimetype === "audio/mp4") { // Safari
            message.innerHTML = 'Ready for recording';
            visualize(stream); // draw an osciloscope, visual feedback


        } else {
            // audio ctx not supported yet in visualize
            visualize(stream); // draw an osciloscope, visual feedback
        }
        record.onclick = function () {
            mediaRecorder.start();
            console.log('state', mediaRecorder.state);
            console.log('mimetype', mediaRecorder.mimeType);

            console.log("recorder started");
            record.style.background = "red";
            message.innerHTML = '';


            stop.disabled = false;
            record.disabled = true;
        }

        stop.onclick = function () {
            mediaRecorder.stop();
            console.log(mediaRecorder.state); // inactive
            console.log("recorder stopped");
            record.style.background = "";
            record.style.color = "";
            // mediaRecorder.requestData();

            stop.disabled = true;
            record.disabled = false;
            message.innerHTML = 'Ready for recording';

        }

        mediaRecorder.onstop = function (e) {
            console.log("data available after MediaRecorder.stop() called.");

            let clipName = prompt('Enter a name for your sound clip?', 'My unnamed clip');
            // let it's a global within function can change after name-eventchange

            const clipContainer = document.createElement('article');
            const clipLabel = document.createElement('p');
            const audio = document.createElement('audio');
            const deleteButton = document.createElement('button');
            const downloadButton = document.createElement('button');
            const downloadLink = document.createElement('a');
            const storeButton = document.createElement('button');



            clipContainer.classList.add('clip');
            audio.setAttribute('controls', '');
            deleteButton.textContent = 'Delete';
            deleteButton.className = 'delete';

            downloadButton.textContent = 'Download';
            downloadButton.className = 'download';

            storeButton.textContent = 'Store';
            storeButton.className = 'store';

            console.log('audioelement', audio);

            if (clipName === null) {
                clipLabel.textContent = 'My unnamed clip';
            } else {
                clipLabel.textContent = clipName;
            }

            clipContainer.appendChild(audio);
            clipContainer.appendChild(clipLabel);
            clipContainer.appendChild(deleteButton);
            clipContainer.appendChild(storeButton);



            audio.controls = true;
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

            audio.src = audioURL;
            console.log("recorder stopped, audioURL added");
            console.log("blob", blob);

            // download handling
            downloadLink.href = audioURL;
            // let filenaam = clipLabel.textContent; // not necessary anymore "global" clipName is changed 

            // downloadLink.setAttribute('download', `${clipName}.${fileextension}`);
            // downloadLink.text = 'Download';
            downloadLink.appendChild(downloadButton);
            clipContainer.appendChild(downloadLink);

            soundClips.appendChild(clipContainer);


            // store handling store means store on a server


            // download file

            downloadButton.onclick = function (e) {
                downloadLink.setAttribute('download', `${clipName}.${fileextension}`);
                // add clipName late, cause maybe a namechange has occured
                console.log('')
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
                        // console.log(JSON.parse(data)); // it works but why ...
                        if (json.storestatus === 'OK') {
                            storeButton.textContent = 'Store Succes!';
                            console.log('store succes')

                        }
                    }).then(() => {
                        console.log('He tied her up');
                    }).then(() => {
                        console.log('He threw her on the railroad tracks ');
                    }).then(() => {
                        console.log('A train started comin\'');
                    }).then(() => {
                    }).then(() => {
                    }).then(() => {
                        console.log('Along Came Jones', 'https://www.youtube.com/watch?v=eFyr49TwuiI');
                    })
                    .catch(err => {
                        alert(err);
                    });

                // console.log('ajax: ' + ajax.status);    
            }


            // change name of clip
            clipLabel.onclick = function () {
                const existingName = clipLabel.textContent;
                const newClipName = prompt('Enter a new name for your sound clip?');
                if (newClipName === null) {
                    clipLabel.textContent = existingName;
                } else {
                    clipLabel.textContent = newClipName;
                    // downloadLink.setAttribute('download', `${newClipName}.${fileextension}`); // not neccessary anymore
                    clipName = newClipName;

                }

            }
        }

        mediaRecorder.ondataavailable = function (e) {
            chunks.push(e.data);
            // console.log(e.data);
        }
    }

    let onError = function (err) {
        console.log('The following error occured: ' + err);
    }
    // here it starts

    navigator.mediaDevices.getUserMedia(constraints)
        .then(onSuccess, onError);

} else {
    console.log('getUserMedia not supported on your browser!');
}


let isAudioContextSupported = function () {
    // This feature is still prefixed in Safari
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    if(window.AudioContext){
        return true;
    }
    else {
        return false;
    }
};




function visualize(stream) {

    var audioContext;
    if(isAudioContextSupported()) {
        audioContext = new window.AudioContext();
        console.log('audiocontext supported')
    } else {
        console.log('audiocontext NOT supported')
        return;
    }



    if (!audioCtx) {
        audioCtx = new AudioContext();
    }

    const source = audioCtx.createMediaStreamSource(stream);

    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 2048;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    source.connect(analyser);
    //analyser.connect(audioCtx.destination);

    draw()

    function draw() {
        const WIDTH = canvas.width
        const HEIGHT = canvas.height;

        requestAnimationFrame(draw);

        analyser.getByteTimeDomainData(dataArray);

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
}

window.onresize = function () {
    canvas.width = mainSection.offsetWidth;
}

window.onresize();
