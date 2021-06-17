// set up basic variables for app

(function () {

    const MAXRECORDINGTIME = 10000; // 10s; maybe warning
    let timeoutID;
    // const endpoint = '../server/upload.php'; // FOR DEVELOPMENT SERVER
    // const endpoint = 'http://localhost/server/upload.php';
    const endpoint = 'http://localhost:8087/upload/'; // for Flask
    const randomisation = true;


    let counter = 0; // name audio files

    let responseID = 2; // dynamic from unique, from LimeSurvey 


    // let phrases = [
    //     { "id": 34, "phrase": "De kat is ziek" },
    //     { "id": 12, "phrase": "de muis zit gevangen" },
    //     { "id": 1, "phrase": "de hond blaft" },

    // ]; 


    let phrases = [{"id": 1, "phrase": "koud"}, {"id": 2, "phrase": "warm"}, {"id": 3, "phrase": "kil"}];

    // get from api, doesn't work async shit, another plus for react 
    // easier/cleaner with event ready on data arrival, componentdidmount ?
    // https://reactjs.org/docs/faq-ajax.html

    // fetch('http://localhost:8087/getphrases/')
    //     .then(response => response.json())
    //     .then(data => {console.log(data);phrases = data});

    // fetch('http://localhost:8087/getphrases/')
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log(data);
    //         phrases = data
    //     })
    //     .catch((error) => {
    //         console.error('Error:', error);
    //     }
    // );


    // async function fetchPhrases() {
    //     let response = await fetch('http://localhost:8087/getphrases/');
    //     let data = await response.json();
    //     console.log(data);
    //     return data;
    // }
    // async caller() {
    //     phrases = await this.fetchPhrases();
    // }


    let listlength = phrases.length;

    if (randomisation === true) {
        phrases = [...phrases].sort(() => Math.random() - 0.5);
    }


    const recordButton = document.querySelector('.recordButton');
    const stopButton = document.querySelector('.stopButton');
    const soundClips = document.querySelector('.sound-clips');
    const canvas = document.querySelector('.visualizer');
    const mainSection = document.querySelector('.main-controls');
    const question = document.getElementById('question');
    const message = document.getElementById('message');


    // disable stopButton button while not recording

    stopButton.disabled = true;

    // visualiser setup - create web audio api context and canvas
    let audioCtx;
    const canvasCtx = canvas.getContext("2d");

    const constraints = {
        audio: true,
        video: false
    };





    //main block for doing the audio recording

    navigator.mediaDevices.getUserMedia(constraints)
        .then(function (stream) {

            // Determine mimetype

            const types = {
                "audio/ogg": "ogg", // FireFox, although is suppports also webm
                "audio/webm": "webm", // Chrome
                "audio/mp4": "mp4", // Safari

            };



            let mimetype = "audio/webm";
            for (let i of Object.keys(types)) {
                console.log(i + " supported? " + (MediaRecorder.isTypeSupported(i) ? "Yes" : "No"));
                if (MediaRecorder.isTypeSupported(i)) {
                    mimetype = i;
                    break;
                }
            }

            console.log('mimetype: ', mimetype);
            const fileextension = types[mimetype];


            let chunks = [];

            // change for development of production host

            const options = {
                mimeType: mimetype
            };

            const mediaRecorder = new MediaRecorder(stream);

            // https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder

            visualize(stream);

            // question.innerHTML = words[counter];
            question.innerHTML = phrases[counter].phrase;

            function startRecording() {
                let clip = document.querySelector('div.clip');
                if (clip !== null) {
                    clip.parentNode.removeChild(clip);
                }
                message.innerHTML = '';
                mediaRecorder.start();
                timeoutID = setTimeout(stopRecording, MAXRECORDINGTIME);
                console.log('state', mediaRecorder.state);
                // console.log('mimetype', mediaRecorder.mimeType);
                console.log('timeoutID', timeoutID);

                console.log("recorder started");
                recordButton.style.background = "red";
                stopButton.disabled = false;
                recordButton.disabled = true;
            }

            recordButton.addEventListener("click", function (e) {
                e.preventDefault();

                console.log(e);
                startRecording(e);
            });

            document.addEventListener("keydown", function (e) {
                // console.log(e);
                if (e.key === 'r') {
                    startRecording(e);
                } else if (e.key === 's') {
                    stopRecording();
                } else if (e.key === 'p') {
                    https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/paused
                    if (document.getElementById('myrecording').paused) {
                        document.getElementById('myrecording').play();
                    } else {
                        document.getElementById('myrecording').pause();
                    }

                } else if (e.key === 'a') {
                    console.log('archive from the top', e.key);
                } else {
                    // console.log(e.key);
                }


            });

            function stopRecording() {
                if (mediaRecorder.state === "recording") {
                    mediaRecorder.stop();
                    console.log(mediaRecorder.state); // inactive
                    console.log("recorder stopped");
                    recordButton.style.background = "";
                    recordButton.style.color = "";

                    stopButton.disabled = true;
                    recordButton.disabled = false;
                    console.log('timeoutID after stopButton', timeoutID);
                    // audioCtx.resume(); // Necessary for Chrome  https://developers.google.com/web/updates/2017/09/autoplay-policy-changes#webaudio


                }
                // audioCtx.resume(); // Necessary for Chrome  https://developers.google.com/web/updates/2017/09/autoplay-policy-changes#webaudio

            }

            stopButton.addEventListener('click', function (e) {
                e.preventDefault();
                clearTimeout(timeoutID); // cancel the timeout before the timeout...
                // https://stackoverflow.com/questions/52956179/cleartimeout-isnt-clearing-the-timeout
                // A function call like clearTimeout(timer) cannot change the timer variable. JS doesn't have pass-by-reference calls. – Bergi Oct 23 '18 at 19:08

                stopRecording();
            });

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
                //     question.innerHTML = 'Bedankt!';

                // } else {
                //     // console.log('word:', counter, words[counter + 1]);

                // }
                // const soundClipContainer = createAudioPlayer(counter, audioURL);

                // let clipName = 'Audio' + counter;
                // console.log('word after stop:', counter, words[counter]);

                // let clipName = words[counter];
                let clipName = phrases[counter].phrase;

                // let clipID = counter + 1;
                let clipID = phrases[counter].id;


                const soundClipContainer = document.createElement('div');
                const clipLabel = document.createElement('p');
                const audio = document.createElement('audio');
                const deleteButton = document.createElement('button');
                // const downloadButton = document.createElement('button');
                // const downloadLink = document.createElement('a');
                const storeButton = document.createElement('button');

                soundClipContainer.classList.add('clip');
                audio.setAttribute('controls', '');
                audio.setAttribute("id", "myrecording");
                deleteButton.textContent = 'Delete';
                deleteButton.className = 'delete';

                // downloadButton.textContent = 'Download';
                // downloadButton.className = 'download';

                storeButton.textContent = 'Store';
                storeButton.className = 'store';

                console.log('audioelement', audio);
                // clipLabel.textContent = words[counter];
                clipLabel.textContent = phrases[counter].phrase;



                soundClipContainer.appendChild(audio);
                soundClipContainer.appendChild(clipLabel);
                soundClipContainer.appendChild(deleteButton);
                soundClipContainer.appendChild(storeButton);
                audio.controls = true;
                audio.src = audioURL;


                // download handling
                // downloadLink.href = audioURL;
                // downloadLink.innerHTML = 'Download';
                // let filenaam = clipLabel.textContent; // not necessary anymore "global" clipName is changed 

                // downloadLink.setAttribute('download', `${clipName}.${fileextension}`);
                // downloadLink.text = 'Download';
                // downloadLink.appendChild(downloadButton);
                // soundClipContainer.appendChild(downloadLink);
                soundClips.appendChild(soundClipContainer); // declared at the top

                // store handling store means store on a server

                // eventlisteners 

                // download file
                // downloadButton.addEventListener("click", function (e) {
                //     // e.stopImmediatePropagation();

                //     console.log('download');

                //     // downloadLink.setAttribute('download', `${clipName}.${fileextension}`);
                //     // e.preventDefault(); does not work?

                // });


                // downloadLink.addEventListener("click", function (e) {
                //     // e.stopImmediatePropagation();
                //     // e.preventDefault(); // does not work?
                //     console.log('download');

                //     downloadLink.setAttribute('download', `${clipName}.${fileextension}`);
                //     // e.preventDefault(); does not work?

                // });

                // delete blob
                deleteButton.addEventListener("click", function (e) {
                    e.preventDefault();
                    let evtTgt = e.target;
                    evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
                    console.log('delete audiourl: ', audioURL);
                    window.URL.revokeObjectURL(audioURL); // necessary otherwise memory leak or not from mediastream?? Does seem to work.
                    // https://stackoverflow.com/questions/49209756/do-i-always-need-to-call-url-revokeobjecturl-explicitly

                });
                // push to server, archive
                storeButton.addEventListener("click", function (e) {
                    e.preventDefault();
                    console.log('archive');
                    archive(e);
                });

                document.addEventListener("keydown", function (e) {
                    // console.log(e); // Does not work.
                    // if (e.key === 'a') {
                    //     console.log('archive within', e.key);
                    //     archive(e);
                    // }


                });



                function archive(e) { // post/push to the server
                    console.log('e', e);
                    console.log('store');
                    console.log('clipname', clipName);
                    console.log('extension', fileextension);
                    let myHeaders = new Headers();
                    myHeaders.append('Accept', 'application/json');
                    myHeaders.append("X-clipID", clipID);
                    myHeaders.append("X-responseID", responseID);

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
                                if (counter === listlength - 1) {
                                    console.log('enough is enough');
                                    // question.innerHTML = 'Thanx!';
                                    message.innerHTML = clipName + ' stored succesful!';
                                    setTimeout(function () {
                                        message.style.transition = '.5s';
                                        message.style.opacity = '0';
                                        message.style.visibility = 'hidden';
                                    }, 1250);
                                    question.innerHTML = '';

                                    setTimeout(function () {
                                        message.innerHTML = 'Thank you!';

                                        message.style.transition = '0.5s';
                                        message.style.opacity = '1';
                                        message.style.visibility = 'visible';
                                    }, 2000);

                                    // remove everything
                                    // let evtTgt = e.target;
                                    // evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
                                    let clip = document.querySelector("div.clip");
                                    if (clip !== null) {
                                        clip.parentNode.removeChild(clip);
                                    }

                                    let elem = document.getElementById("buttons"); // stop and record button
                                    elem.parentNode.removeChild(elem);


                                } else {
                                    counter++; // now I realy understand why React can be convenient, it becomes spagetti prety quick  :-)
                                    message.innerHTML = clipName + ' stored succesful!';
                                    setTimeout(function () {
                                        message.style.transition = '.5s';
                                        message.style.opacity = '0';
                                        message.style.visibility = 'hidden';
                                    }, 1250);
                                    // question.innerHTML = words[counter];
                                    question.innerHTML = phrases[counter].phrase;

                                    // remove clip div with class clip
                                    // let evtTgt = e.target;
                                    // evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
                                    let clip = document.querySelector("div.clip");
                                    if (clip !== null) {
                                        clip.parentNode.removeChild(clip);
                                    }
                                }
                            }
                        })
                        .catch(err => {
                            alert(err);
                        });
                    message.style.visibility = 'visible';
                    message.style.opacity = '1';

                }


                // push to server
                // storeButton.onclick = function (e) {
                //     archive(e);


                // }




                // window.addEventListener("keydown", function (e) {
                //     // console.log(e);
                //     if (e.key === 'a') {
                //         archive(e);
                //     }

                // });
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



})();